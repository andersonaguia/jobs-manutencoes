import { Module } from '@nestjs/common';
import { EmailModule } from 'src/email/email.module';
import { PreventiveModule } from 'src/preventive/preventive.module';
import { TasksService } from './tasks.service';

@Module({
    imports: [
        PreventiveModule,
        EmailModule
    ],
    providers: [TasksService]
})
export class TasksModule { }