"use client";
import React, { useEffect, useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Auth, API } from "aws-amplify";
import Task from "../Task/Task";
import { Loading } from "../Loader/Loader";

interface TaskInfo {
  id?: Date;
  content?: string;
  username?: string;
  favorite?: boolean;
}

const HomePage = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [taskList, setTaskList] = useState<string[]>([]);
  const [taskInfo, setTaskInfo] = useState<TaskInfo>({});
  const apiName = "apia67ae079";
  const path = "/tasks";
  async function updateNote() {
    const myInit = {
      body: {
        id: taskInfo.id,
        favorite: taskInfo.favorite,
      },
    };
    return await API.put(apiName, path, myInit);
  }
  async function postData() {
    setLoading(true);
    const myInit = {
      body: {
        prompt: input,
        userId: user.username,
      },
    };
    return await API.post(apiName, path, myInit);
  }
  const addToFav = async () => {
    const data = await updateNote();
    console.log(data);
  };
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await postData();
    setTaskList(response.data);
    setTaskInfo(response.info);
    setLoading(false);
    setInput("");
  };
  return (
    <section className="flex items-center flex-col gap-10 mt-10 text-lg">
      <h1>Give me your task, I'll create notes</h1>
      <form action="" onSubmit={submitForm}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="p-1 text-black"
          type="text"
          placeholder="Ex: Make egg fried rice"
        />
        <button type="submit" className="p-1 bg-blue-500">
          Create
        </button>
      </form>
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {taskList?.map((task, id) => {
            return <Task key={id} task={task} id={id} />;
          })}
        </div>
      )}
      {taskList.length > 0 && (
        <button onClick={addToFav} className="bg-blue-500 p-1 rounded-md">
          Add to Favorite
        </button>
      )}
      <p>Made by Daniel Truong</p>
    </section>
  );
};

export default HomePage;
