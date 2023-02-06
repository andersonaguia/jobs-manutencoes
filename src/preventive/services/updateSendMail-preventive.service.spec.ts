import { Test, TestingModule } from '@nestjs/testing';
import { UpdateSendMailPreventiveService } from './updateSendMail-preventive.service';

describe('UpdateSendMailPreventiveService', () => {
  let service: UpdateSendMailPreventiveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateSendMailPreventiveService],
    }).compile();

    service = module.get<UpdateSendMailPreventiveService>(UpdateSendMailPreventiveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
