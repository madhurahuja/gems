import { BadRequestException, PipeTransform } from '@nestjs/common';
import { GemType } from '../gem-type.enum';
import { CreateGemDto } from '../dto/create-gem.dto';

export class GemTypeValidationPipe implements PipeTransform {
  readonly allowedGemTypes = [GemType.CINEMATIC.toString()];
  transform(value: CreateGemDto): any {
    if (value && value.type) {
      if (this.allowedGemTypes.indexOf(value.type) === -1) {
        throw new BadRequestException(`${value.type} is invalid Gem Type!`);
      }
    }
    return value;
  }
}
