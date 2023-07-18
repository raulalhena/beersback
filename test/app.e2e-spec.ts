import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { data } from './../src/beer/model/beer';
import { BeerService } from '../src/beer/beer.service';
import { Beer } from 'src/beer/schema/beer.schema';
import { BeerDto } from 'src/beer/dtos/BeerDto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let beerService: BeerService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    beerService = moduleFixture.get(BeerService);
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
  it('/beers (GET) should return all beers', async () => {
    const response = await request(app.getHttpServer()).get('/beer');

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(data);
  });

  it('/beers/:id (GET) should return the beer with id', async () => {
    const response = await request(app.getHttpServer()).get(
      '/beer/64acfe1efebd5d00024c3365',
    );

    const beer: Beer = {
      image_url: 'https://images.punkapi.com/v2/2.png',
      _id: '64acfe1efebd5d00024c3365',
      name: 'Trashy Blonde',
      tagline: "You Know You Shouldn't",
      first_brewed: '04/2008',
      description:
        'A titillating, neurotic, peroxide punk of a Pale Ale. Combining attitude, style, substance, and a little bit of low self esteem for good measure; what would your mother say? The seductive lure of the sassy passion fruit hop proves too much to resist. All that is even before we get onto the fact that there are no additives, preservatives, pasteurization or strings attached. All wrapped up with the customary BrewDog bite and imaginative twist.',
      attenuation_level: 76,
      brewers_tips:
        'Be careful not to collect too much wort from the mash. Once the sugars are all washed out there are some very unpleasant grainy tasting compounds that can be extracted into the wort.',
      contributed_by: 'Sam Mason <samjbmason>',
      expireAt: '2023-07-11T07:00:46.768Z',
      __v: 0,
    };

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(beer);
  });

  it('/random (GET) should return a random beer from the list', async () => {
    const beer: Beer = {
      image_url: 'https://images.punkapi.com/v2/2.png',
      _id: '64acfe1efebd5d00024c3365',
      name: 'Trashy Blonde',
      tagline: "You Know You Shouldn't",
      first_brewed: '04/2008',
      description:
        'A titillating, neurotic, peroxide punk of a Pale Ale. Combining attitude, style, substance, and a little bit of low self esteem for good measure; what would your mother say? The seductive lure of the sassy passion fruit hop proves too much to resist. All that is even before we get onto the fact that there are no additives, preservatives, pasteurization or strings attached. All wrapped up with the customary BrewDog bite and imaginative twist.',
      attenuation_level: 76,
      brewers_tips:
        'Be careful not to collect too much wort from the mash. Once the sugars are all washed out there are some very unpleasant grainy tasting compounds that can be extracted into the wort.',
      contributed_by: 'Sam Mason <samjbmason>',
      expireAt: '2023-07-11T07:00:46.768Z',
      __v: 0,
    };

    const spy = jest.spyOn(beerService, '_random');
    spy.mockReturnValue(1);
    const response = await request(app.getHttpServer()).get('/beer/random');

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(beer);
  });

  it('/search?q=[KEYWORD] (GET) should return beers with KEYWORD in "name"', async () => {
    const response = await request(app.getHttpServer()).get(
      '/beer/search?q=blonde',
    );

    expect(response.statusCode).toBe(200);
  });

  it('/beer (POST) should return Beer object created', async () => {
    const newBeer: BeerDto = {
      name: 'otra otra otra',
      tagline: "You Know You Shouldn't",
      first_brewed: '04/2008',
      description:
        'A titillating, neurotic, peroxide punk of a Pale Ale. Combining attitude, style, substance, and a little bit of low self esteem for good measure; what would your mother say? The seductive lure of the sassy passion fruit hop proves too much to resist. All that is even before we get onto the fact that there are no additives, preservatives, pasteurization or strings attached. All wrapped up with the customary BrewDog bite and imaginative twist.',
      attenuation_level: 80,
      brewers_tips:
        'Be careful not to collect too much wort from the mash. Once the sugars are all washed out there are some very unpleasant grainy tasting compounds that can be extracted into the wort.',
      contributed_by: 'Sam Mason <samjbmason>',
    };

    const spy = jest.spyOn(beerService, '_generateId');
    spy.mockReturnValue('23408945734058lsadfs');
    const response = await request(app.getHttpServer())
      .post('/beer')
      .send(newBeer);

    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject({
      _id: '23408945734058lsadfs',
      image_url: expect.any(String),
      expireAt: expect.any(String),
      __v: 0,
      ...newBeer,
    });
  });
});
