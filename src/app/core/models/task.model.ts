import User from "./user.model";

export default class Task {
    _id!: string;
    name!: string;
    description!: string;
    userId!: string;
    user!: User
    userName!: string;
}