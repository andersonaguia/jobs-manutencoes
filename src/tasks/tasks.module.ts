import { Module } from '@nestjs/common';
import { PreventiveModule } from 'src/preventive/preventive.module';
import { TasksService } from './tasks.service';

@Module({
    imports: [
        PreventiveModule,
    ],
    providers: [TasksService]
})
export class TasksModule { }