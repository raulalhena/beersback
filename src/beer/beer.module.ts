import { Module } from '@nestjs/common';
import { BeerController } from './beer.controller';
import { BeerService } from './beer.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Beer, BeerSchema } from './schema/beer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Beer.name,
        schema: BeerSchema,
      },
    ]),
  ],
  controllers: [BeerController],
  providers: [BeerService],
})
export class BeerModule {}
