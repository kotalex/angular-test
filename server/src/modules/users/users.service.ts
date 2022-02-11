import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  getUsers() {
    return this.userModel.find().sort({ createdAt: -1 });
  }

  getUserById(id: string) {
    return this.userModel.findById(id);
  }

  getUserByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async createUser(dto: CreateUserDto) {
    const existingUser: User = await this.getUserByEmail(dto.email);
    if (existingUser) {
      throw new BadRequestException('User with same email already exists');
    }

    dto.password = bcrypt.hashSync(dto.password, 10);
    return this.userModel.create(dto);
  }

  async updateUser(id: string, dto: UpdateUserDto) {
    const existingUser: User = await this.userModel.findOne({
      _id: { $ne: new new Mongoose().Types.ObjectId(id) },
      email: dto.email,
    });

    if (existingUser) {
      throw new BadRequestException('User with same email already exists');
    }

    if (dto.password) {
      dto.password = bcrypt.hashSync(dto.password, 10);
    }

    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await user.update(dto);

    return this.userModel.findById(id);
  }

  async deleteUser(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await user.delete();

    return true;
  }
}
