import { Controller, Get } from '@nestjs/common';
import { PreventiveService } from './preventive.service';

const url = 'http://localhost:3001/preventive/expire';

@Controller('preventive')
export class PreventiveController {
  constructor(private readonly preventiveService: PreventiveService) {}
  
  @Get()
  async test(){
    try{
      return await this.preventiveService.findAll(url)
    }catch(error){
      return error;
    }
  }  
}
