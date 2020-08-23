import { GemType } from './gem-type.enum';
import { IsNotEmpty } from 'class-validator';
export class Gem {
  id?: string;
  @IsNotEmpty()
  name: string;
  type: GemType = GemType.CINEMATIC;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  imageUrl: string;
  referenceUrls: string[];
}
