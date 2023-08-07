"use client";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsconfig from "../src/aws-exports";
import HomePage from "@/components/Home/HomePage";
import SideBar from "@/components/Home/SideBar";

Amplify.configure(awsconfig);

const components = {
  Header() {
    return (
      <div className="text-center my-10">
        <h1 className="text-[4rem] font-mono">InstaNote</h1>
        <p className="text-[2rem]">Generate notes for your task</p>
      </div>
    );
  },
};

export default function App() {
  return (
    <Authenticator components={components}>
      <section className="flex">
        <HomePage />
        <SideBar />
      </section>
    </Authenticator>
  );
}
