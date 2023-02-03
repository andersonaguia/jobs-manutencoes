import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PreventiveModule } from './preventive/preventive.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [    
    ScheduleModule.forRoot(),
    PreventiveModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
