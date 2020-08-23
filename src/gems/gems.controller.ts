import { Controller, Get, Post, Body, Param, Delete, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { GemsService } from './gems.service';
import { Gem } from './gem.model';
import { GemsFilterDto } from './dto/get-gems-filter.dto';
import { GemTypeValidationPipe } from './pipes/gem-type.validation.pipe';
@Controller('gems')
export class GemsController {
  constructor(private gemsService: GemsService) {}
  @Get()
  getGems(@Query() filterDto: GemsFilterDto): Gem[] {
    if (Object.keys(filterDto).length) {
      return this.gemsService.getGemsWithFilters(filterDto);
    } else {
      return this.gemsService.getAllGems();
    }
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UsePipes(GemTypeValidationPipe)
  createGem(@Body() gem: Gem): Gem {
    return this.gemsService.createGem(gem);
  }

  @Get(':id')
  getGemById(@Param('id') id: string): Gem {
    return this.gemsService.getGemById(id);
  }

  @Delete(':id')
  deleteGem(@Param('id') id: string): void {
    return this.gemsService.deleteGem(id);
  }
}
