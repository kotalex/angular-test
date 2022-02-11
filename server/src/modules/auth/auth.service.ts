import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async authenticateUser(dto: LoginDto) {
    const user: User = await this.usersService.getUserByEmail(dto.email);

    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }

    if (bcrypt.compareSync(dto.password, user.password)) {
      const { firstName, lastName, email, role } = user;

      return {
        token: this.jwtService.sign({ firstName, lastName, email, role }),
      };
    } else {
      throw new NotFoundException('Invalid credentials');
    }
  }
}
