import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { MailTasksDto } from 'src/tasks/dto/mail-tasks.dto';
import { urls } from 'src/utils/urls';

@Injectable()
export class PreventiveService {
  private readonly logger = new Logger(PreventiveService.name);
  constructor(private readonly httpService: HttpService) { }

  async findAll(httpAddress: string): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService.get<any>(httpAddress).pipe(
        catchError((error: any) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  async sendMail(mailData: MailTasksDto[]): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService.post<any>(urls.sendMail, mailData).pipe(
        catchError((error: any) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );   
    return data;
  }
}

