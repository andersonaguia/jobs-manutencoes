import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PreventiveModule } from './preventive/preventive.module';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    PreventiveModule,
    TasksModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
