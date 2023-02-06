import { Module } from '@nestjs/common';
import { PreventiveService } from './preventive.service';
import { PreventiveController } from './preventive.controller';
import { HttpModule } from '@nestjs/axios';
import { UpdateSendMailPreventiveService } from './services/updateSendMail-preventive.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    })
  ],
  controllers: [PreventiveController],
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
