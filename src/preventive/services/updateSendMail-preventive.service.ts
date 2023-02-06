import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class UpdateSendMailPreventiveService {
  private readonly logger = new Logger(UpdateSendMailPreventiveService.name);
  constructor(private readonly httpService: HttpService) { }

  async updateSendMail(address: string, ids: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await firstValueFrom(
          this.httpService.patch<any>(address, ids).pipe(
            catchError((error: any) => {
              this.logger.error(error);
              throw 'An error happened!';
            }),
          ),
        );
        resolve(data);
      } catch (error) {
        reject(error);
      }
    })
  }
}

