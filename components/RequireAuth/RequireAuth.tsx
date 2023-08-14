"use client";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function RequireAuth({ children }) {
  const router = useRouter();
  const { route } = useAuthenticator((context) => [context.route]);
  useEffect(() => {
    if (route !== "authenticated") {
      router.push("/login");
    }
  }, [route]);
  return children;
}
