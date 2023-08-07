import React, { useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import axios from "axios";
import Task from "../Task/Task";

const HomePage = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const [input, setInput] = useState<string>("");
  const [taskList, setTaskList] = useState<string[]>([
    "Heat a pan or wok over medium-high heat. Add cooking oil.",
    "Saute minced garlic and ginger until fragrant.",
    "Add your choice of protein (chicken, shrimp, tofu, or beaten eggs). Cook until fully done.",
    "Add chopped vegetables (carrots, peas, bell peppers, onions). Stir-fry until they are tender-crisp.",
  ]);
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.post("/", input);
  };
  return (
    <section className="basis-[80%] flex items-center flex-col gap-10 mt-10 text-lg">
      <h1>Give me your task, I'll create notes</h1>
      <form action="" onSubmit={submitForm}>
        <input
          onChange={(e) => setInput(e.target.value)}
          className="p-1 text-black"
          type="text"
          placeholder="Ex: Make egg fried rice"
        />
        <button type="submit" className="p-1 bg-blue-400">
          Create
        </button>
      </form>
      <div className="grid grid-cols-3 gap-4">
        {taskList.map((task, id) => {
          return <Task key={id} task={task} id={id} />;
        })}
      </div>
    </section>
  );
};

export default HomePage;
