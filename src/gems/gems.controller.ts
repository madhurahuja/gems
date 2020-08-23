import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { GemsService } from './gems.service';
import { CreateGemDto } from './dto/create-gem.dto';
import { GemsFilterDto } from './dto/get-gems-filter.dto';
import { GemTypeValidationPipe } from './pipes/gem-type.validation.pipe';
import { Gem } from './gem.entity';
@Controller('gems')
export class GemsController {
  constructor(private gemsService: GemsService) {}
  @Get()
  getGems(@Query() filterDto: GemsFilterDto): Promise<Gem[]> {
    return this.gemsService.getGems(filterDto);
  }
  @Post()
  @UsePipes(ValidationPipe)
  @UsePipes(GemTypeValidationPipe)
  createGem(@Body() gem: CreateGemDto): Promise<Gem> {
    return this.gemsService.createGem(gem);
  }
  @Get('/:id')
  getGemById(@Param('id', ParseIntPipe) id: number): Promise<Gem> {
    console.log(id);
    return this.gemsService.getGemById(id);
  }
  @Delete(':id')
  deleteGem(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.gemsService.deleteGem(id);
  }
}
