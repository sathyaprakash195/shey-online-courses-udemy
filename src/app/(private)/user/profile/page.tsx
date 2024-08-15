"use client";
import dayjs from "dayjs";
import { useState } from "react";
import { Button, Input } from "antd";
import PageTitle from "@/components/page-title";
import usersStore, { IUsersGlobalStore } from "@/store/users-store";

function ProfilePage() {
  const { currentUserData } = usersStore() as IUsersGlobalStore;
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const getUserProperty = (key: string, value: string) => {
    return (
      <div className="flex flex-col">
        <span className="text-sm text-gray-500">{key}</span>
        <span className="font-semibold text-sm">{value}</span>
      </div>
    );
  };
  return (
    <div>
      <PageTitle title="Profile" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-7">
        {getUserProperty("ID", currentUserData?._id || "")}
        {getUserProperty("Name", currentUserData?.name || "")}
        {getUserProperty("Email", currentUserData?.email || "")}
        {getUserProperty("Role", currentUserData?.isAdmin ? "Admin" : "User")}
        {getUserProperty(
          "Created At",
          dayjs(currentUserData?.createdAt).format("MMM DD YYYY , hh:mm A") ||
            ""
        )}
        {getUserProperty(
          "Updated At",
          dayjs(currentUserData?.updatedAt).format("MMM DD YYYY , hh:mm A") ||
            ""
        )}
      </div>

      <div className="mt-7 border border-primary p-5">
        <h1 className="text-lg font-bold text-primary">Change Password</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-end gap-5">
          <div className="flex flex-col mt-5">
            <label htmlFor="Old Password"></label>
            <Input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col mt-5">
            <label htmlFor="New Password"></label>
            <Input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <Button type="default">Cancel</Button>
            <Button type="primary">Update Password</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
