import { IMenuItem } from "../interfaces/menu-item.interface";

export const MenuItems: IMenuItem[] = [
  { state: "/", name: "My Tasks", icon: "dashboard" },  
];

export const AdminMenuItems: IMenuItem[] = [
  { state: "admin/dashboard", name: "Dashboard", icon: "dashboard" },
  { state: "admin/users", name: "Users", icon: "group" },
  { state: "admin/tasks", name: "Tasks", icon: "assignment" }
];

export const MenuLayouts = {
  ADMIN: "admin",
  USER: "user"
};
