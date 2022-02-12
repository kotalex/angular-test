import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose, Types } from 'mongoose';
import { UsersService } from '../users/users.service';
import { CreateUpdateTaskDto } from './dto/create-task.dto';
import { Task, TaskDocument } from './schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    private readonly usersService: UsersService,
  ) {}

  getTasks() {
    return this.taskModel.find().populate('user');
  }

  getUserTasks(userId: string) {
    return this.taskModel
      .find({
        user: new new Mongoose().Types.ObjectId(userId),
      })
      .populate('user');
  }

  async createTask(dto: CreateUpdateTaskDto) {
    const task = new this.taskModel(dto);

    if (dto.userId) {
      const user = await this.usersService.getUserById(dto.userId);
      if (!user) {
        throw new NotFoundException('User does not exist');
      }

      task.user = user;
    }

    return task.save();
  }

  async updateTask(id: string, dto: CreateUpdateTaskDto) {
    const task = await this.taskModel.findById(id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    task.name = dto.name;
    task.description = dto.description;

    if (dto.userId) {
      const user = await this.usersService.getUserById(dto.userId);
      if (!user) {
        throw new NotFoundException('User does not exist');
      }

      task.user = user;
    }

    return task.save();
  }

  async deleteTask(id) {
    const task = await this.taskModel.findById(id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    await task.delete();

    return true;
  }
}
