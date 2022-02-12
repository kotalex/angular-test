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
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_service_1 = require("../users/users.service");
const task_schema_1 = require("./schemas/task.schema");
let TasksService = class TasksService {
    constructor(taskModel, usersService) {
        this.taskModel = taskModel;
        this.usersService = usersService;
    }
    getTasks() {
        return this.taskModel.find().populate('user');
    }
    getUserTasks(userId) {
        return this.taskModel
            .find({
            user: new new mongoose_2.Mongoose().Types.ObjectId(userId),
        })
            .populate('user');
    }
    async createTask(dto) {
        const task = new this.taskModel(dto);
        if (dto.userId) {
            const user = await this.usersService.getUserById(dto.userId);
            if (!user) {
                throw new common_1.NotFoundException('User does not exist');
            }
            task.user = user;
        }
        return task.save();
    }
    async updateTask(id, dto) {
        const task = await this.taskModel.findById(id);
        if (!task) {
            throw new common_1.NotFoundException('Task not found');
        }
        task.name = dto.name;
        task.description = dto.description;
        if (dto.userId) {
            const user = await this.usersService.getUserById(dto.userId);
            if (!user) {
                throw new common_1.NotFoundException('User does not exist');
            }
            task.user = user;
        }
        return task.save();
    }
    async deleteTask(id) {
        const task = await this.taskModel.findById(id);
        if (!task) {
            throw new common_1.NotFoundException('Task not found');
        }
        await task.delete();
        return true;
    }
};
TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(task_schema_1.Task.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        users_service_1.UsersService])
], TasksService);
exports.TasksService = TasksService;
//# sourceMappingURL=tasks.service.js.map