"use client";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsconfig from "../src/aws-exports";

Amplify.configure(awsconfig);

const components = {
  Header() {
    return (
      <div className="text-center my-10">
        <h1 className="text-[4rem] font-mono">InstaNote</h1>
        <p className="text-[2rem]">Post it out loud</p>
      </div>
    );
  },
};

export default function App() {
  return (
    <Authenticator components={components}>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}
