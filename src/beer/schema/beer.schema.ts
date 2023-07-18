import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BeerDocument = HydratedDocument<Beer>;

@Schema()
export class Beer {
  @Prop()
  _id: string;
  @Prop()
  image_url: string;
  @Prop()
  name: string;
  @Prop()
  tagline: string;
  @Prop()
  first_brewed: string;
  @Prop()
  description: string;
  @Prop()
  attenuation_level: number;
  @Prop()
  brewers_tips: string;
  @Prop()
  contributed_by: string;
  @Prop()
  expireAt: string;
  @Prop()
  __v: number;
}

export const BeerSchema = SchemaFactory.createForClass(Beer);
