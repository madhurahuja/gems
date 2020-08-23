import { Repository, EntityRepository } from 'typeorm';
import { Gem } from './gem.entity';
import { CreateGemDto } from './dto/create-gem.dto';
import { GemsFilterDto } from './dto/get-gems-filter.dto';

@EntityRepository(Gem)
export class GemRepository extends Repository<Gem> {
  async getGems(filterDto: GemsFilterDto): Promise<Gem[]> {
    const { name, type } = filterDto;
    const query = this.createQueryBuilder('gem');
    if (name) {
      query.andWhere('gem.name LIKE :name', { name: `%${name}%` });
    }

    if (type) {
      query.andWhere('gem.type=:type', { type });
    }

    const gems = await query.getMany();
    return gems;
  }
  async createGem(createGemDto: CreateGemDto): Promise<Gem> {
    const { name, type, description, imageUrl } = createGemDto;
    const gem = new Gem();
    gem.name = name;
    gem.type = type;
    gem.description = description;
    gem.imageUrl = imageUrl;

    await gem.save();

    return gem;
  }
}
