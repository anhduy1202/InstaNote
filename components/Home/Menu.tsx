import React from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Link from "@/node_modules/next/link";
import { Menu, MenuItem } from "@aws-amplify/ui-react";

const MenuNav = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  return (
    <nav className="mt-10 mr-4 flex flex-col items-end text-lg gap-10">
      <Menu>
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
          <button onClick={signOut}> Sign out</button>
        </MenuItem>
      </Menu>
    </nav>
  );
};

export default MenuNav;
