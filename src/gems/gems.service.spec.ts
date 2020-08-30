import { Test } from '@nestjs/testing';
import { GemsService } from './gems.service';
import { GemRepository } from './gem.repository';
import { GemType } from './gem-type.enum';
import { GemsFilterDto } from './dto/get-gems-filter.dto';

const mockUser = { username: 'Test User' };
const mockGemRepository = () => ({
  getGems: jest.fn(),
});

describe('GemsService', () => {
  let gemsService;
  let gemRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [GemsService, { provide: GemRepository, useFactory: mockGemRepository }],
    }).compile();

    gemsService = module.get<GemsService>(GemsService);
    gemRepository = module.get<GemRepository>(GemRepository);
  });

  describe('getGems', () => {
    it('gets all gems from the repository', async () => {
      gemRepository.getGems.mockResolvedValue('test');
      expect(gemRepository.getGems).not.toHaveBeenCalled();
      const filterDto: GemsFilterDto = { name: 'Test', type: GemType.CINEMATIC };
      const result = await gemsService.getGems(filterDto, mockUser);
      expect(gemRepository.getGems).toHaveBeenCalled();
      expect(result).toEqual('test');
    });
  });
});
