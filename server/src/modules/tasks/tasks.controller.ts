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
} from '@nestjs/common';
import { CreateUpdateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  list() {
    return this.tasksService.getTasks();
  }

  @Post()
  create(@Body() dto: CreateUpdateTaskDto) {
    return this.tasksService.createTask(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreateUpdateTaskDto) {
    return this.tasksService.updateTask(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.tasksService.deleteTask(id);
  }
}
