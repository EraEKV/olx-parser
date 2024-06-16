const axios = require('axios');
const cheerio = require('cheerio');

interface Card {
    cardId: string
    title: string;
    price: string;
    href: string;
    image: string | undefined;
    locationDate: string;
}

const fetchData = async (pageProps: number): Promise<Card[]> => {
    const cards: Card[] = [];
    try {
        for (let i = 1; i <= pageProps; i++) {
            const res = await axios.get(`https://www.olx.kz/elektronika/igry-i-igrovye-pristavki/pristavki/alma-ata/q-playstation-5/?page=${i}&search%5Border%5D=created_at:desc&search%5Bfilter_enum_console_manufacturers%5D%5B0%5D=2272`);
            // const res = await axios.get(`https://www.olx.kz/elektronika/igry-i-igrovye-pristavki/pristavki/q-playstation-5/?page=${i}&search%5Bfilter_enum_console_manufacturers%5D%5B0%5D=2272`);
            const $ = cheerio.load(res.data);
            $('.css-1sw7q4x').each((index, element) => {
                const cardId = $(element).attr('id');
                const title = $(element).find('.css-u2ayx9 > a > h6').text();
                const price = $(element).find('.css-u2ayx9 > p').text();
                const href = `https://www.olx.kz${$(element).find('.css-u2ayx9 > a').attr('href')}`;
                const image = $(element).find('.css-gl6djm > img').attr('src');
                const locationDate = $(element).find('.css-odp1qd > p').text();

                if (price && cardId && image) {
                    cards.push({ cardId, title, price, href, image, locationDate });
                }
            });
        }
        return cards;
    } catch (err) {
        console.error('Error on fetching data:', err);
        throw new Error('Failed to fetch data');
    }
}

export default fetchData;