import { ApiProperty } from '@nestjs/swagger';

export class TodoDto {
  @ApiProperty({ description: 'Id' })
  _id: string;

  @ApiProperty({ description: 'Заголовок' })
  title: string;

  @ApiProperty({ description: 'Описание', required: false })
  description?: string;

  @ApiProperty({ description: 'Дата завершения', required: false })
  completedAt?: Date;

  @ApiProperty({ description: 'Дата создания' })
  createdAt: Date;

  constructor(partial: Partial<TodoDto>) {
    Object.assign(this, partial);
  }
}
