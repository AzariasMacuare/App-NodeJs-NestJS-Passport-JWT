import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, ObjectId } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop()
  @ApiProperty()
  name: string;
  @Prop()
  
  @ApiProperty()
  description: string;
  
  @Prop()
  @ApiProperty()
  belong: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
