import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Todo } from 'src/schemas/todo.schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoDto } from './dto/todo.dto';
import { TodoService } from './todo.service';

@ApiTags('Todo')
@Controller({
  path: 'todo',
  version: ['1'],
})
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @HttpCode(200)
  @ApiResponse({ status: 200, type: TodoDto })
  @ApiOperation({ summary: 'Создание' })
  async create(@Body() dto: CreateTodoDto) {
    const item = await this.todoService.create(dto);
    return item;
  }

  @Get()
  @HttpCode(200)
  @ApiResponse({ status: 200, type: [TodoDto] })
  @ApiOperation({ summary: 'Получение всех записей' })
  async findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @ApiResponse({ status: 200, type: TodoDto })
  @ApiOperation({ summary: 'Получение по id' })
  async findOne(@Param('id') id: string): Promise<Todo> {
    if (!id) throw new BadRequestException('Передан пустой параметр: id');
    const item = await this.todoService.findOne(id);
    if (!item) throw new NotFoundException(`Не найдена запись с Id: ${id} `);
    return item;
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiResponse({ status: 200, type: TodoDto })
  @ApiOperation({ summary: 'Удаление по id' })
  async delete(@Param('id') id: string) {
    if (!id) throw new BadRequestException('Передан пустой параметр: id');
    const item = await this.todoService.delete(id);
    if (!item) throw new NotFoundException(`Не найдена запись с Id: ${id} `);
    return item;
  }
}
