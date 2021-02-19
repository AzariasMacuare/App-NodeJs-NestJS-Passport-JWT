import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   providers: [TaskService],
    // }).compile();

    // service = module.get<TaskService>(TaskService);
    service = new TaskService(Model);
  });

  it('should return an array of Tasks', async () => {
    
    // const alltasks = ['test'];
    // jest.spyOn(service, 'findAll').mockImplementation(async () => await alltasks);

    // expect(await service.findAll(Number)).toBe(alltasks);
  });
});
