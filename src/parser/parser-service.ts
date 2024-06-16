import { CreateAdsDto } from './dtos/createAds.dto';
import { IAds } from './models/Ads';
import AdsModel from './models/Ads';

class AdsService {
    async getAdsById(id: string): Promise<IAds | null> {
        return await AdsModel.findById(id).exec();
    }

    async getAds(): Promise<IAds[]> {
        return await AdsModel.find().exec();
    }

    async createAds(createAdsDto: CreateAdsDto): Promise<IAds> {
        const { cardId, title, price, href, image, locationDate } = createAdsDto;
        const newAds = new AdsModel({
            cardId, 
            title,
            price,
            href,
            image,
            locationDate
        });

        await newAds.save();
        return newAds;
    }

    async findAdByCardId(cardId: string): Promise<IAds | null> {
        return await AdsModel.findOne({ cardId }).exec();
    }
}

export default AdsService;