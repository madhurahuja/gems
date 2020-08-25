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
  UseGuards,
  Logger,
} from '@nestjs/common';
import { GemsService } from './gems.service';
import { CreateGemDto } from './dto/create-gem.dto';
import { GemsFilterDto } from './dto/get-gems-filter.dto';
import { GemTypeValidationPipe } from './pipes/gem-type.validation.pipe';
import { Gem } from './gem.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
@Controller('gems')
@UseGuards(AuthGuard())
export class GemsController {
  private logger = new Logger('GemsController');
  constructor(private gemsService: GemsService) {}
  @Get()
  getGems(@Query() filterDto: GemsFilterDto, @GetUser() user: User): Promise<Gem[]> {
    this.logger.verbose(`User ${user.username} retreving all gems. Filters: ${JSON.stringify(filterDto)}`);
    return this.gemsService.getGems(filterDto, user);
  }
  @Post()
  @UsePipes(ValidationPipe)
  @UsePipes(GemTypeValidationPipe)
  createGem(@Body() gem: CreateGemDto, @GetUser() user: User): Promise<Gem> {
    return this.gemsService.createGem(gem, user);
  }
  @Get('/:id')
  getGemById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<Gem> {
    return this.gemsService.getGemById(id, user);
  }
  @Delete(':id')
  deleteGem(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<void> {
    return this.gemsService.deleteGem(id, user);
  }
}
