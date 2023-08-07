import React, { useEffect, useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { API } from "aws-amplify";
import Task from "../Task/Task";
import { Loading } from "../Loader/Loader";

const HomePage = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [taskList, setTaskList] = useState<string[]>([]);
  async function postData() {
    setLoading(true);
    const apiName = "apia67ae079";
    const path = "/tasks";
    const myInit = {
      body: {
        prompt: input,
      },
    };
    return await API.post(apiName, path, myInit);
  }
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await postData();
    setTaskList(response.data);
    setLoading(false);
  };
  return (
    <section className="flex items-center flex-col gap-10 mt-10 text-lg">
      <h1>Give me your task, I'll create notes</h1>
      <form action="" onSubmit={submitForm}>
        <input
          onChange={(e) => setInput(e.target.value)}
          className="p-1 text-black"
          type="text"
          placeholder="Ex: Make egg fried rice"
        />
        <button
          type='submit'
          className="p-1 bg-blue-400"
        >
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
    </section>
  );
};

export default HomePage;
