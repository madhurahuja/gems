import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGemDto } from './dto/create-gem.dto';
import { v4 as uuidv4 } from 'uuid';
import { GemsFilterDto } from './dto/get-gems-filter.dto';
import { GemRepository } from './gem.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Gem } from './gem.entity';

@Injectable()
export class GemsService {
  constructor(
    @InjectRepository(GemRepository)
    private gemRepository: GemRepository
  ) {}

  async getGems(filterDto: GemsFilterDto): Promise<Gem[]> {
    return this.gemRepository.getGems(filterDto);
  }

  async createGem(createGemDto: CreateGemDto): Promise<Gem> {
    return this.gemRepository.createGem(createGemDto);
  }

  async getGemById(id: number): Promise<Gem> {
    const found = await this.gemRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Gem with ID ${id} not found!`);
    }
    return found;
  }
  async deleteGem(id: number): Promise<void> {
    const result = await this.gemRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Gem with ID ${id} not found!`);
    }
  }
}
