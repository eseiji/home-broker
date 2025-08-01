import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as crypto from 'crypto';
import { HydratedDocument } from 'mongoose';

export type AssetDocument = HydratedDocument<Asset>;

@Schema({
  timestamps: true,
  optimisticConcurrency: true,
  collectionOptions: {
    changeStreamPreAndPostImages: {
      enabled: true,
    },
  },
})
export class Asset {
  @Prop({ default: () => crypto.randomUUID() })
  _id: string;

  @Prop()
  name: string;

  @Prop({ unique: true, index: true })
  symbol: string;

  @Prop()
  image: string;

  @Prop()
  price: string;

  createdAt!: Date;
  updatedAt!: Date;
}

export const AssetSchema = SchemaFactory.createForClass(Asset);
