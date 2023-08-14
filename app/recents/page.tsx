import MenuNav from "@/components/Home/Menu";
import React from "react";
import { RequireAuth } from "@/components/RequireAuth/RequireAuth";
import RecentPage from "@/components/Recent/RecentPage";

const Recents = () => {
  return (
    <RequireAuth>
      <MenuNav />
      <RecentPage/>
    </RequireAuth>
  );
};

export default Recents;
