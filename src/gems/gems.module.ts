import { Module } from '@nestjs/common';
import { GemsController } from './gems.controller';
import { GemsService } from './gems.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GemRepository } from './gem.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([GemRepository]), PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [GemsController],
  providers: [GemsService],
})
export class GemsModule {}
