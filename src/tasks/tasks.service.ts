

import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { PreventiveService } from 'src/preventive/preventive.service';


@Injectable()
export class TasksService {
    //private readonly logger = new Logger(TasksService.name);
    constructor(private readonly preventiveService: PreventiveService) {}
    
    @Cron('0 00 07 * * 0-6')
    async handleCron() {
        try{
            const data = await this.preventiveService.findAll('http://172.31.210.70:3008/pumps');
            console.log(data);
        }catch(error){
            console.log(error);
        }
    }
}