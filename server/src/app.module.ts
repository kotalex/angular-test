import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://kotalex2014:XWfs1DbEVaR0s3aB@cluster0.h61f0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    ),
    UsersModule,
    TasksModule,
    AuthModule,
  ],
})
export class AppModule {}
