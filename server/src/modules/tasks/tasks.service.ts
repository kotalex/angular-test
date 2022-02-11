import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose } from 'mongoose';
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
    return this.taskModel.find();
  }

  getUserTasks(userId: string) {
    return this.taskModel.find({
      userId: new new Mongoose().Types.ObjectId(userId),
    });
  }

  async createTask(dto: CreateUpdateTaskDto) {
    if (dto.userId) {
      const user = await this.usersService.getUserById(dto.userId);
      if (!user) {
        throw new NotFoundException('User does not exist');
      }
    }

    return this.taskModel.create(dto);
  }

  async updateTask(id: string, dto: CreateUpdateTaskDto) {
    const task = await this.taskModel.findById(id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (dto.userId) {
      const user = await this.usersService.getUserById(dto.userId);
      if (!user) {
        throw new NotFoundException('User does not exist');
      }
    }

    await task.update(dto);

    return this.taskModel.findById(id);
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
