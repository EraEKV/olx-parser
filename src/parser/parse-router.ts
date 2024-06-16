import { Router } from 'express';
import fetchData from './parser';
// import { authMiddleware } from '../middlewares/auth-middleware';
import AdsService from './parser-service';
import { CreateAdsDto } from './dtos/createAds.dto';
import { IAds } from './models/Ads';

const parseRouter = Router();


const adsService = new AdsService();

parseRouter.get('/parse', async (req, res) => {
    try {
        const { pages } = req.body;
        const ads = await fetchData(pages);
        res.status(200).json(ads);
    } catch (err: any) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: err.message });
    }
});


parseRouter.get('/ads/:id', async (req, res) => {
    try {
        const ad: any = await adsService.getAdsById(req.params.id);
        if (!ad) {
            return res.status(404).json({ message: 'Ad not found' });
        }
        res.status(200).json(ad);
    } catch (err: any) {
        console.error('Error fetching ad by ID:', err);
        res.status(500).json({ error: err.message });
    }
});

parseRouter.get('/ads', async (req, res) => {
    try {
        const ads = await adsService.getAds();
        res.status(200).json(ads);
    } catch (err: any) {
        console.error('Error fetching ads:', err);
        res.status(500).json({ error: err.message });
    }
});



parseRouter.get('/create', async (req, res) => {
    try {
        // const { pages } = req.body;
        const pages = 10
        const cards = await fetchData(pages);
        const createdAds: IAds[] = [];

        for (const card of cards) {
            const existingAd = await adsService.findAdByCardId(card.cardId);
            if (!existingAd) {
                const createAdsDto: CreateAdsDto = {
                    cardId: card.cardId,
                    title: card.title,
                    price: card.price,
                    href: card.href,
                    image: card.image!,
                    locationDate: card.locationDate
                };
                const newAd = await adsService.createAds(createAdsDto);
                createdAds.push(newAd);
            }
        }
        if(createdAds.length === 0) {
            return res.status(200).json({ message: 'No new playstations found' });
        }
        res.status(201).json(createdAds);
    } catch (err: any) {
        console.error('Error creating ads:', err);
        res.status(500).json({ error: err.message });
    }
});

export default parseRouter;
