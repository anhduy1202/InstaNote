"use client";
import { useRouter } from "next/navigation";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useEffect } from "react";

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

export default function Login() {
  const router = useRouter();
  const { authStatus } = useAuthenticator((context: any) => [
    context.authStatus,
  ]);

  useEffect(() => {
    authStatus !== "authenticated" ? router.push("/login") : router.push("/");
  }, [authStatus]);
  return <Authenticator components={components}></Authenticator>;
}
