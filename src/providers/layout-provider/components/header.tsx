import usersGlobalStore, { IUsersGlobalStore } from "@/store/users-store";
import { Button, Drawer } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import MenuItems from "./menu-items";

function Header() {
  const router = useRouter();
  const codeSymbol = "</>";
  const { currentUserData } = usersGlobalStore() as IUsersGlobalStore;
  const [showSidebar, setShowSidebar] = React.useState(false);
  return (
    <div className="bg-primary p-5 flex justify-between items-center">
      <div
        className="flex gap-1 text-xl font-bold cursor-pointer"
        onClick={() => router.push("/")}
      >
        <h1 className="text-blue-500 text-xl font-bold ">SHEY</h1>
        <h1 className="text-orange-500 text-xl font-bold ">{codeSymbol}</h1>
        <h1 className="text-green-500 text-xl font-bold ">COURSES</h1>
      </div>

      <div className="flex items-center gap-3">
        <h1 className="text-white  text-sm">{currentUserData?.name}</h1>
        <Button
          icon={
            <img
              className="w-8 h-8 rounded-full"
              src={currentUserData?.profilePic}
              onClick={() => setShowSidebar(true)}
            />
          }
          ghost
          className="border-none"
        ></Button>
      </div>

      {showSidebar && (
        <Drawer
          open={showSidebar}
          onClose={() => setShowSidebar(false)}
          title={currentUserData?.name}
        >
          <MenuItems setShowSidebar={setShowSidebar} />
        </Drawer>
      )}
    </div>
  );
}

export default Header;
