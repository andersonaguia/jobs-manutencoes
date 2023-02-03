import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class PreventiveService {
    private readonly logger = new Logger(PreventiveService.name);
  constructor(private readonly httpService: HttpService) {}

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
}

