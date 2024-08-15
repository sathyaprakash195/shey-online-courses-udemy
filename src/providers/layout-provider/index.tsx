"use client";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import Header from "./components/header";
import { getCurrentUserFromMongoDB } from "@/server-actions/users";
import { message } from "antd";
import Spinner from "@/components/spinner";
import usersGlobalStore, { IUsersGlobalStore } from "@/store/users-store";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = React.useState(true);
  const { setCurrentUserData , currentUserData}: IUsersGlobalStore =
    usersGlobalStore() as IUsersGlobalStore;
  const pathname = usePathname();
  const isAuthRoute = pathname.includes("/sign");

  const getCurrentUser = async () => {
    try {
      setLoading(true);
      const { success, data } = await getCurrentUserFromMongoDB();
      if (success) {
        setCurrentUserData(data);
      } else {
        throw new Error("An error occurred while fetching user data");
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthRoute && !currentUserData) {
      getCurrentUser();
    }
  }, [pathname]);

  if (isAuthRoute) {
    return children;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />;
      </div>
    );
  }
  return (
    <div>
      <Header />
      <div className="p-5">{children}</div>
    </div>
  );
}

export default LayoutProvider;
