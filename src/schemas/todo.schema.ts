import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema({ versionKey: false })
export class Todo {
  @ApiProperty({ description: 'Заголовок' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ description: 'Описание' })
  @Prop()
  description?: string;

  @ApiProperty({ description: 'Дата завершения' })
  @Prop()
  completedAt?: Date;

  @ApiProperty({ description: 'Дата создания' })
  @Prop({ required: true, default: Date.now })
  createdAt: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
