import { Module } from '@nestjs/common';
import { GemsController } from './gems.controller';
import { GemsService } from './gems.service';

@Module({
  controllers: [GemsController],
  providers: [GemsService]
})
export class GemsModule {}
