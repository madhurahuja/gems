import { Module } from '@nestjs/common';
import { GemsController } from './gems.controller';
import { GemsService } from './gems.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GemRepository } from './gem.repository';

@Module({
  imports: [TypeOrmModule.forFeature([GemRepository])],
  controllers: [GemsController],
  providers: [GemsService],
})
export class GemsModule {}
