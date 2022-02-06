import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({ description: 'Заголовок' })
  @IsString()
  @Expose()
  title: string;

  @ApiProperty({ description: 'Описание', required: false })
  @IsOptional()
  @Expose()
  description?: string;

  @ApiProperty({ description: 'Дата завершения', required: false })
  @IsOptional()
  @Expose()
  completedAt?: Date;

  @ApiProperty({ description: 'Дата создания' })
  createdAt: Date;
}
