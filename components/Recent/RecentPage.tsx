"use client";
import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Loading } from "../Loader/Loader";
import Task from "../Task/Task";

interface RecentTasksInterface {
  content: string;
  favorite: boolean;
}

const RecentPage = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    async function fetchNotes(username: string) {
      const apiName = "apia67ae079";
      const path = `/tasks/${username}`;
      try {
        const data = await API.get(apiName, path);
        let tasks = data.Items.map(
          (task: RecentTasksInterface) => task.content
        );
        let splitTasks = tasks.map((task: string) => task.split("\n"));
        setNotes(splitTasks);
      } catch (err) {
        throw new Error(err);
      }
    }
    fetchNotes(user.username);
  }, []);
  return (
    <section className="flex items-center flex-col gap-10 mt-10 text-lg">
      <h1>Recent Notes</h1>
      {console.log(notes)}
      {notes?.map((note: string[], idx: number) => {
        return (
          <>
            <p>Note #{idx + 1}</p>
            <div className="grid md:grid-cols-3 gap-4 rounded-md border border-gray-100 p-4">
              {note.map((n) => {
                return <Task task={n} />;
              })}
            </div>
          </>
        );
      })}
    </section>
  );
};

export default RecentPage;
