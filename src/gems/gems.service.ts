import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGemDto } from './dto/create-gem.dto';
import { v4 as uuidv4 } from 'uuid';
import { GemsFilterDto } from './dto/get-gems-filter.dto';
import { GemRepository } from './gem.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Gem } from './gem.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class GemsService {
  constructor(
    @InjectRepository(GemRepository)
    private gemRepository: GemRepository
  ) {}

  async getGems(filterDto: GemsFilterDto, user: User): Promise<Gem[]> {
    return this.gemRepository.getGems(filterDto, user);
  }

  async createGem(createGemDto: CreateGemDto, user: User): Promise<Gem> {
    return this.gemRepository.createGem(createGemDto, user);
  }

  async getGemById(id: number, user: User): Promise<Gem> {
    const found = await this.gemRepository.findOne({ where: { id, userId: user.id } });
    if (!found) {
      throw new NotFoundException(`Gem with ID ${id} not found!`);
    }
    return found;
  }
  async deleteGem(id: number, user: User): Promise<void> {
    const result = await this.gemRepository.delete({ id, userId: user.id });
    if (result.affected === 0) {
      throw new NotFoundException(`Gem with ID ${id} not found!`);
    }
  }
}
