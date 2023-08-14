"use client";
import React from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Link from "@/node_modules/next/link";
import { Menu, MenuItem } from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";

const MenuNav = () => {
  const router = useRouter();
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const logOut = () => {
    signOut();
  };
  return (
    <nav className="mt-10 mr-4 flex flex-col items-end text-lg gap-10">
      <Menu className="flex-col">
        <MenuItem>
          <Link href="/"> Home </Link>
        </MenuItem>
        <MenuItem>
          <Link href="/recents"> Recents </Link>
        </MenuItem>
        <MenuItem>
          <Link href="/favorites"> Favorites </Link>
        </MenuItem>
        <MenuItem>
          <p onClick={logOut}> Sign out</p>
        </MenuItem>
      </Menu>
    </nav>
  );
};

export default MenuNav;
