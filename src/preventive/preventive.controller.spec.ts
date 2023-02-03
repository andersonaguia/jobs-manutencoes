import { Test, TestingModule } from '@nestjs/testing';
import { PreventiveController } from './preventive.controller';
import { PreventiveService } from './preventive.service';

describe('PreventiveController', () => {
  let controller: PreventiveController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PreventiveController],
      providers: [PreventiveService],
    }).compile();

    controller = module.get<PreventiveController>(PreventiveController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
