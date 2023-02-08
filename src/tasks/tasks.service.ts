import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PreventiveService } from 'src/preventive/services/preventive.service';
import { UpdateSendMailPreventiveService } from 'src/preventive/services/updateSendMail-preventive.service';
import { urls } from 'src/utils/urls';
import { MailTasksDto } from './dto/mail-tasks.dto';

@Injectable()
export class TasksService {
    constructor(
        private readonly preventiveService: PreventiveService,
        private readonly updateSendMailPreventiveService: UpdateSendMailPreventiveService
    ) { }
    
    @Cron('0 00 07 * * 0-6')
    async checkMaintenance() {
        await this.job();  
        return      
    }

    @Cron('0 08 14 * * 0-6')
    async tryCheckMaintenanceAgain() {
        await this.job();  
        return      
    }

    async job(){
        let dataArray: MailTasksDto[] = [];
        let idsToUpdate: number[] = [];

        try {           
            const allMailAddresses = await this.preventiveService.findAll(urls.findAllMailAddresses);
            if (allMailAddresses.length < 1) {
                return
            }                     

            const mailAddresses = allMailAddresses.map((address) => {
                return address.address
            })
           
            const response = await this.preventiveService.findAll(urls.findAllPreventives);
            const { body } = response;   
                 
            if (body.length > 0) {
                body.map((el) => {
                    const lastDate = new Date(el.last);
                    const nextDate = new Date(el.next);

                    const data = new MailTasksDto();
                    data.addresses = mailAddresses;
                    data.subject = "Aviso de Manutenção Próxima (não responder)";
                    data.text = `<strong>Sistema: </strong>${el.category}<br>
                <strong>Atividade: </strong>${el.activity}<br>
                <strong>Periodicidade: </strong>${el.frequency}<br>
                <strong>Responsável: </strong>${el.responsible}<br>
                <strong>Última Realizada: </strong>${(this.addZeroToDate(lastDate.getDate().toString()) + "/" + (this.addZeroToDate(lastDate.getMonth()+1).toString()) + "/" + lastDate.getFullYear())}<br>
                <strong>Data prevista para execução: </strong>${(this.addZeroToDate(nextDate.getDate().toString()) + "/" + (this.addZeroToDate(nextDate.getMonth()+1).toString()) + "/" + nextDate.getFullYear())}<br>`;

                    dataArray.push(data);
                    idsToUpdate.push(el.id);
                })

                const data = await this.preventiveService.sendMail(dataArray);
               
                if (+data.body.statusCode === 201) {
                    const result = await this.updateSendMailPreventiveService.updateSendMail(urls.updateSendMailDatabase, idsToUpdate);
                    if (+result.status === 200) {
                        console.log("Deu tudo certo");
                        return
                    }
                    const data = new MailTasksDto();
                    data.addresses = ["andersonlaguiar@gmail.com"];
                    data.subject = "Alerta de falha no sistema (não responder)";
                    data.text = `Os emails foram enviados mas não foi possível atualizar as seguintes manutenções no banco de dados: ${idsToUpdate}`;

                    const statusCode = await this.preventiveService.sendMail([data]);
                    if (+statusCode === 201) {
                        console.log("Concluído!");
                        return
                    }
                    return
                }
                console.log("Falha ao enviar")
                return
            }
            //console.log("Nenhuma preventiva encontrada!");
            return
        } catch (error) {
            console.log("Erro no sistema: ", error);
            return
        }
    }

    addZeroToDate(number: any){
        if (number <= 9) 
            return "0" + number;
        else
            return number; 
    }
}
