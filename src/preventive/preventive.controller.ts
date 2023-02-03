import { Controller, Get } from '@nestjs/common';
import { PreventiveService } from './preventive.service';

@Controller('preventive')
export class PreventiveController {
  constructor(private readonly preventiveService: PreventiveService) {}
  
  @Get()
  async test(){
    try{
      return await this.preventiveService.findAll('http://172.31.210.70:3008/pumps')
    }catch(error){
      return error;
    }
  }  
}
