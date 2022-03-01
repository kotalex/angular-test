import { RolesEnum } from "server/dist/enums/roles.enum";
import User from "src/app/core/models/user.model";

export const userMock: User = {
    _id: 'id',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@user.com',
    role: RolesEnum.User
};