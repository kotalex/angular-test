import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RolesEnum } from 'src/enums/roles.enum';
import { JwtGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/guards/roles.decorator';
import { CreateUpdateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(JwtGuard, RolesGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @Roles(RolesEnum.Admin, RolesEnum.User)
  list() {
    return this.tasksService.getTasks();
  }

  @Post()
  @Roles(RolesEnum.Admin)
  create(@Body() dto: CreateUpdateTaskDto) {
    return this.tasksService.createTask(dto);
  }

  @Put(':id')
  @Roles(RolesEnum.Admin)
  update(@Param('id') id: string, @Body() dto: CreateUpdateTaskDto) {
    return this.tasksService.updateTask(id, dto);
  }

  @Delete(':id')
  @Roles(RolesEnum.Admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.tasksService.deleteTask(id);
  }
}
