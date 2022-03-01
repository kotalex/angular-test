import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { RolesEnum } from 'src/enums/roles.enum';
import { Transform } from 'class-transformer';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop({ select: false })
  password: string;

  @Prop({
    type: String,
    required: true,
    enum: [RolesEnum.Admin, RolesEnum.User],
  })
  role: string;

  @Prop({ default: Date.now() })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
