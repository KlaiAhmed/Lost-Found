import mongoose, { Schema } from 'mongoose';

const ClientSchema = new Schema(
  {
    type: String,
    name: String,
    version: String,
    engine: String,
    engineVersion: String,
  },{ _id: false }
);

const OsSchema = new Schema(
  {
    name: String,
    version: String,
    platform: String,
  },{ _id: false }
);

const DeviceSchema = new Schema(
  {
    type: String,
    brand: String,
    model: String,
  },{ _id: false }
);

const BotProducerSchema = new Schema(
  {
    name: String,
    url: String,
  },{ _id: false }
);

const BotSchema = new Schema(
  {
    name: String,
    category: String,
    url: String,
    producer: BotProducerSchema,
  },{ _id: false }
);

const DeviceInfoSchema = new Schema(
  {
    client: { type: ClientSchema, default: {} },
    os: { type: OsSchema, default: {} },
    device: { type: DeviceSchema, default: {} },
    bot: { type: BotSchema, default: null },
  },{timestamps: true,}
);


export default DeviceInfoSchema;
