import { Module } from '@nestjs/common';
import { GemsModule } from './gems/gems.module';

@Module({
  imports: [GemsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
