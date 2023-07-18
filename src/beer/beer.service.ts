import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BeerDto } from './dtos/BeerDto';
import { data } from './model/beer';
import { Beer } from './schema/beer.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BeerService {
  constructor(@InjectModel(Beer.name) private beerModel: Model<Beer>) {}

  _generateId() {
    const newChar = Math.floor(Math.random() * (122 - 48) + 48);
    const lastBeer = data.at(-1);
    const lastId = Array.from(lastBeer._id);
    lastId.splice(lastId.length - 1, 1, String.fromCharCode(newChar));
    const id = lastId.join('');
    return id;
  }

  async create(beerDto: BeerDto) {
    try {
      const id = this._generateId();

      if (typeof beerDto.attenuation_level !== 'number')
        throw new InternalServerErrorException();

      const newBeer: Beer = {
        _id: id,
        image_url: '',
        ...beerDto,
        expireAt: '',
        __v: 0,
      };
      this.beerModel.create(newBeer);

      return await data.find((beer) => beer._id === id);
    } catch (e) {
      throw new Error('Some error ocurred creating new beer');
    }
  }

  async findAll() {
    try {
      return this.beerModel.find();
    } catch (e) {
      throw new Error('Some error ocrrued');
    }
  }

  async findOne(id: string) {
    try {
      return await this.beerModel.findOne({ _id: id });
    } catch (e) {
      throw new Error('Beer not found');
    }
  }

  _random(arr) {
    return Math.floor(Math.random() * arr.length);
  }

  async findRandom() {
    try {
      const allBeers = await this.beerModel.find().exec();
      return allBeers[this._random(allBeers)];
    } catch (e) {
      throw new Error('Some error ocurred');
    }
  }

  async search(keyword: string) {
    try {
      const regex = RegExp(keyword, 'i');
      const filteredBeers = data.filter((beer) => beer.name.match(regex));
      return filteredBeers;
    } catch (e) {
      throw new Error('Beer not found');
    }
  }
}
