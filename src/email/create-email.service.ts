import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { SendEmailService } from './send-email.service';

@Injectable()
export class CreateEmailService {

    constructor(
        private sendEmailService: SendEmailService,
    ) { }

    create(data: CreateEmailDto[]): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                data.map(async (data) => {
                    const body = {
                        body: {
                            //addresses: [
                            //  "manutencao@condominiosolartambau.com.br", "sindico@condominiosolartambau.com.br", "atendimento@condominiosolartambau.com.br", "manutencao2@condominiosolartambau.com.br", "supervisaosolartambaujp@gmail.com"
                            //],
                            addresses: [
                                "manutencao@condominiosolartambau.com.br"
                            ],
                            subject: "Aviso de Manutenção Próxima (não responder)",
                            text: `
                            <strong>Sistema: </strong>${data.category}<br>
                            <strong>Atividade: </strong>${data.activity}<br>
                            <strong>Periodicidade: </strong>${data.frequency}<br>
                            <strong>Responsável: </strong>${data.responsible}<br>
                            <strong>Última Realizada: </strong>${new Date(data.last).toLocaleDateString()}<br>
                            <strong>Data prevista para execução: </strong>${new Date(data.next).toLocaleDateString()}<br>
                            `
                        }
                    }
                    await this.sendEmailService.sendEmail(body);

                    return
                })
                resolve("Email(s) enviados com sucesso!");
            } catch (error: any) {
                reject(error)
            }
        })
    }
}