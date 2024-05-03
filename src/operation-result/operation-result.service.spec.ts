import { Test, TestingModule } from '@nestjs/testing';
import { OperationResultService } from './operation-result.service';

describe('OperationResultService', () => {
  let service: OperationResultService<any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OperationResultService],
    }).compile();

    service = module.get<OperationResultService<any>>(OperationResultService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
