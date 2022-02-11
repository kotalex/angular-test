import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { User } from 'src/modules/users/schemas/user.schema';

export type TaskDocument = Task & Document;

@Schema({
  collection: 'tasks',
})
export class Task {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: new Mongoose().Types.ObjectId,
    required: false,
  })
  userId?: string;

  @Prop({
    type: {
      type: new Mongoose().Types.ObjectId,
      ref: () => User,
    },
  })
  user?: User;

  @Prop({
    type: Date,
    default: Date.now(),
  })
  createdAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
