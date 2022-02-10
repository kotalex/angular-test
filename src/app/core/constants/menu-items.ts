import { IMenuItem } from "../interfaces/menu-item.interface";

export const MenuItems: IMenuItem[] = [
  { state: "/", name: "My Tasks", icon: "av_timer" },
  { state: "auth/login", name: "Login", icon: "av_timer" },
  { state: "admin/dashboard", name: "Dashboard", icon: "av_timer" },
  { state: "admin/users", name: "Users", icon: "crop_7_5" },
  { state: "admin/tasks", name: "Tasks", icon: "view_comfy" }
];

export const AdminMenuItems: IMenuItem[] = [
  { state: "admin", name: "Dashboard", icon: "av_timer" },
  { state: "admin/users", name: "Users", icon: "crop_7_5" },
  { state: "admin/tasks", name: "Tasks", icon: "view_comfy" }
];

export const MenuLayouts = {
  ADMIN: "admin",
  USER: "user"
};
