"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    getUsers() {
        return this.userModel.find().sort({ createdAt: -1 });
    }
    getUserById(id) {
        return this.userModel.findById(id);
    }
    getUserByEmail(email) {
        return this.userModel
            .findOne({ email })
            .select(['_id', 'firstName', 'lastName', 'email', 'role', 'password']);
    }
    async createUser(dto) {
        const existingUser = await this.getUserByEmail(dto.email);
        if (existingUser) {
            throw new common_1.BadRequestException('User with same email already exists');
        }
        dto.password = bcrypt.hashSync(dto.password, 10);
        return this.userModel.create(dto);
    }
    async updateUser(id, dto) {
        const existingUser = await this.userModel.findOne({
            _id: { $ne: new new mongoose_2.Mongoose().Types.ObjectId(id) },
            email: dto.email,
        });
        if (existingUser) {
            throw new common_1.BadRequestException('User with same email already exists');
        }
        if (dto.password) {
            dto.password = bcrypt.hashSync(dto.password, 10);
        }
        else {
            delete dto.password;
        }
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        await user.update(dto);
        return this.userModel.findById(id);
    }
    async deleteUser(id) {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        await user.delete();
        return true;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map