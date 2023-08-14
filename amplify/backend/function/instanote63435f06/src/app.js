/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { Configuration, OpenAIApi } = require("openai");
const {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
  ScanCommand,
} = require("@aws-sdk/lib-dynamodb");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const bodyParser = require("body-parser");
const express = require("express");

const ddbClient = new DynamoDBClient({ region: process.env.TABLE_REGION });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

let tableName = "Notes";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + "-" + process.env.ENV;
}

const userIdPresent = false; // TODO: update in case is required to use that definition
const partitionKeyName = "id";
const partitionKeyType = "N";
const sortKeyName = "";
const sortKeyType = "";
const hasSortKey = sortKeyName !== "";
const path = "/tasks";
const UNAUTH = "UNAUTH";
const hashKeyPath = "/:" + partitionKeyName;
const sortKeyPath = hasSortKey ? "/:" + sortKeyName : "";
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// convert url string param to expected Type
const convertUrlType = (param, type) => {
  switch (type) {
    case "N":
      return Number.parseInt(param);
    default:
      return param;
  }
};

/*****************************************
 * HTTP Get method for get single object *
 *****************************************/

app.get(path + "/:id", async function (req, res) {
  let scanItemParams = {
    FilterExpression: "username = :username",
    ExpressionAttributeValues: {
      ":username": req.params.id,
    },
    ProjectionExpression: "id, content, favorite",
    TableName: tableName,
  };

  try {
    const data = await ddbDocClient.send(new ScanCommand(scanItemParams));
    if (data.Items) {
      res.json(data);
    } else {
      res.json({ error: "Could not find items" });
    }
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: "Could not load items: " + err.message });
  }
});

/************************************
 * HTTP put method for insert object *
 *************************************/

app.put(path, async function (req, res) {
  if (userIdPresent) {
    req.body["userId"] =
      req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  }
  let updateItemParams = {
    TableName: tableName,
    Key: {
      id: req.body["id"],
    },
    UpdateExpression: "set favorite = :fav",
    ExpressionAttributeValues: {
      ":fav": "true",
    },
    ReturnValues: "ALL_NEW",
  };
  if (req.body["favorite"] == true) {
    updateItemParams.ExpressionAttributeValues = {
      ":fav": "false",
    };
  }
  try {
    let data = await ddbDocClient.send(new UpdateCommand(updateItemParams));
    res.json(data);
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: err, url: req.url, body: req.body });
  }
});

/************************************
 * HTTP post method for insert object *
 *************************************/
app.post(path, async function (req, res) {
  if (userIdPresent) {
    req.body["userId"] =
      req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  }

  let putItemParams = {
    TableName: tableName,
    Item: {
      id: Date.now().toString(36),
      content: req.body["prompt"],
      username: req.body["userId"],
      favorite: false,
    },
  };
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `"This prompt may be written in mixed language, write me a step by step note labeled with number (example: 1. do this 2. do that) to do this very important task: "${req.body["prompt"]}", it's a note so keep it short and language friendly, the result should be in Vietnamese if the important task is in Vietnamese and in English if the task in English"`,
        },
      ],
      temperature: 0.8,
      max_tokens: 256,
    });
    // Split the string by the newline character ("\n") and remove any empty lines using filter()
    const filteredResponse = response.data.choices[0].message.content
      .split("\n")
      .filter((step) => step.trim() !== "");
    filteredResponse.shift();
    // Remove the numbers from each step using map() and substring()
    const finalResponse = filteredResponse.map((step) =>
      step.substring(step.indexOf(".") + 2)
    );
    putItemParams.Item.content = finalResponse.join("\n");
    let data = await ddbDocClient.send(new PutCommand(putItemParams));
    res.json({ data: finalResponse, info: putItemParams.Item});
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: err, url: req.url, body: req.body });
  }
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
