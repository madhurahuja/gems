import { Injectable, NotFoundException } from '@nestjs/common';
import { Gem } from './gem.model';
import { v4 as uuidv4 } from 'uuid';
import { GemsFilterDto } from './dto/get-gems-filter.dto';

@Injectable()
export class GemsService {
  private gems: Gem[] = [];
  getAllGems(): Gem[] {
    return this.gems;
  }

  getGemsWithFilters(filterDto: GemsFilterDto): Gem[] {
    const gems = this.getAllGems();
    const { name, type } = filterDto;
    if (name) {
      return gems.filter((gem) => gem.name.includes(name));
    }

    if (type) {
      console.log(type);
      return gems.filter((gem) => gem.type === type);
    }
    return this.gems;
  }

  createGem(gem: Gem): Gem {
    gem.id = uuidv4();
    this.gems.push(gem);
    return gem;
  }

  getGemById(id: string): Gem {
    const found = this.gems.find((gem) => gem.id === id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  deleteGem(id: string): void {
    const found = this.getGemById(id);
    if (found) {
      this.gems = this.gems.filter((gem) => gem.id !== id);
    }
  }
}
