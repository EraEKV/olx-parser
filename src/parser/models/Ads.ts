import mongoose, { Document, Schema } from 'mongoose';

export interface IAds extends Document {
    cardId: string;
    title: string;
    price: string;
    image: string;
    href: string;
    locationDate: string;
}

const AdsSchema: Schema = new Schema({
    cardId: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    href: { type: String, required: true },
    locationDate: { type: String, required: true },
});

const Ads = mongoose.model<IAds>('Ads', AdsSchema);

export default Ads;