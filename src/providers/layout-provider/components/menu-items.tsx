import usersGlobalStore, { IUsersGlobalStore } from "@/store/users-store";
import {
  Banknote,
  BookOpenText,
  GalleryHorizontal,
  Home,
  List,
  LogOut,
  User2,
} from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import { useRouter } from "next/navigation";
import { Button, message } from "antd";
import { useAuth } from "@clerk/nextjs";

function MenuItems({
  setShowSidebar,
}: {
  setShowSidebar: (value: boolean) => void;
}) {
  const [loading, setLoading] = React.useState(false);
  const { signOut } = useAuth();
  const pathname = usePathname();
  const { currentUserData } = usersGlobalStore() as IUsersGlobalStore;
  const router = useRouter();
  const userMenuItems = [
    {
      name: "Home",
      icon: <Home size={14} />,
      isActive: pathname === "/",
      path: "/",
    },
    {
      name: "Enrolled Courses",
      icon: <BookOpenText size={14} />,
      isActive: pathname === "/user/enrolled-courses",
      path: "/user/enrolled-courses",
    },
    {
      name: "Reports",
      icon: <Banknote size={14} />,
      isActive: pathname === "/user/reports",
      path: "/user/reports",
    },
    {
      name: "Profile",
      icon: <User2 size={14} />,
      isActive: pathname === "/user/profile",
      path: "/user/profile",
    },
  ];
  const adminMenuItems = [
    {
      name: "Home",
      icon: <Home size={14} />,
      isActive: pathname === "/",
      path: "/",
    },
    {
      name: "Courses",
      icon: <BookOpenText size={14} />,
      isActive: pathname === "/admin/courses",
      path: "/admin/courses",
    },
    {
      name: "Students",
      icon: <List size={14} />,
      isActive: pathname === "/admin/students",
      path: "/admin/students",
    },
    {
      name: "Media Library",
      icon: <GalleryHorizontal size={14} />,
      isActive: pathname === "/admin/media-library",
      path: "/admin/media-library",
    },
    {
      name: "Enrollments",
      icon: <User2 size={14} />,
      isActive: pathname === "/admin/enrollments",
      path: "/admin/enrollments",
    },
    {
      name: "Reports",
      icon: <Banknote size={14} />,
      isActive: pathname === "/admin/reports",
      path: "/admin/reports",
    },
  ];

  let menuItemsToRender = currentUserData?.isAdmin
    ? adminMenuItems
    : userMenuItems;

  const onLogout = async () => {
    try {
      setLoading(true);
      await signOut();
      message.success("Logged out successfully");
      router.push("/sign-in");
    } catch (error) {
      message.error("Failed to logout");
    } finally {
      setShowSidebar(false);
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-7">
      {menuItemsToRender.map((menuItem: any, index) => (
        <div
          className={`flex gap-3 items-center p-3 cursor-pointer
         ${menuItem.isActive ? "bg-gray-200 rounded" : ""}
        `}
          key={index}
          onClick={() => {
            router.push(menuItem.path);
            setShowSidebar(false);
          }}
        >
          {menuItem.icon}
          <span className="text-sm">{menuItem.name}</span>
        </div>
      ))}

      <Button onClick={onLogout} icon={<LogOut size={14} />} loading={loading}>
        Logout
      </Button>
    </div>
  );
}

export default MenuItems;
