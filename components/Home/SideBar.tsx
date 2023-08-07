import React from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Link from "@/node_modules/next/link";

const SideBar = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  return (
    <nav className="basis-[20%] mt-10 mr-4 flex flex-col items-end text-lg gap-10">
      <Link href="/"> Home </Link>
      <Link href="/recents"> Recents </Link>
      <Link href="/favorites"> Favorites </Link>
      <button onClick={signOut}> Sign out</button>
    </nav>
  );
};

export default SideBar;
