import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UpdateSendMailPreventiveService } from './services/updateSendMail-preventive.service';
import { PreventiveService } from './services/preventive.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 20000,
        maxRedirects: 5,
      }),
    })
  ],
  controllers: [],
  providers: [
    PreventiveService,
    UpdateSendMailPreventiveService
  ],
  exports: [
    PreventiveService,
    UpdateSendMailPreventiveService
  ]
})
export class PreventiveModule { }
