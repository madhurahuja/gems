import { Repository, EntityRepository } from 'typeorm';
import { Gem } from './gem.entity';
import { CreateGemDto } from './dto/create-gem.dto';
import { GemsFilterDto } from './dto/get-gems-filter.dto';
import { User } from 'src/auth/user.entity';

@EntityRepository(Gem)
export class GemRepository extends Repository<Gem> {
  async getGems(filterDto: GemsFilterDto, user: User): Promise<Gem[]> {
    const { name, type } = filterDto;
    const query = this.createQueryBuilder('gem');

    query.where('gem.userId = :userId', { userId: user.id });

    if (name) {
      query.andWhere('gem.name LIKE :name', { name: `%${name}%` });
    }

    if (type) {
      query.andWhere('gem.type=:type', { type });
    }

    const gems = await query.getMany();
    return gems;
  }
  async createGem(createGemDto: CreateGemDto, user: User): Promise<Gem> {
    console.log(user);
    const { name, type, description, imageUrl } = createGemDto;
    const gem = new Gem();
    gem.name = name;
    gem.type = type;
    gem.description = description;
    gem.imageUrl = imageUrl;
    gem.user = user;

    await gem.save();
    delete gem.user;

    return gem;
  }
}
