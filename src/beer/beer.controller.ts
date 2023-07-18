import { Controller, Post, Body, Param, Query, Get } from '@nestjs/common';
import { BeerDto } from './dtos/BeerDto';
import { BeerService } from './beer.service';

@Controller('beer')
export class BeerController {
  constructor(private readonly beerService: BeerService) {}

  @Get()
  findAll() {
    return this.beerService.findAll();
  }

  @Get('random')
  findRandom() {
    return this.beerService.findRandom();
    return 'hola';
  }

  @Get('search')
  search(@Query() query) {
    return this.beerService.search(query.q);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.beerService.findOne(id);
  }

  @Post()
  create(@Body() beerDto: BeerDto) {
    return this.beerService.create(beerDto);
  }
}
