const mongoose = require('mongoose'); 

const rentingListIds = [];

for (let i = 0; i < 16; i++){
    rentingListIds.push(new mongoose.Types.ObjectId());
}

const rentingLists = [
    {
        _id: rentingListIds[0],
        host: new mongoose.Types.ObjectId("652614ae5fcac9b1d95c0ee7"),
        title: "Beautiful Cottage",
        startDate: new Date('2023-10-01'),
        endDate: new Date('2023-10-10'),
        numGuests: 4,
        numBeds: 2,
        numBedrooms: 2,
        numBaths: 1,
        reviews: ['Great place!', 'Amazing view'],
        country: 'United States',
        photos: ['https://kelbyamandyairbnb.s3.amazonaws.com/photo1.jpg', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo2.webp', 'https://kelbyamandyairbnb.s3.amazonaws.com/photo3.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo47.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo47.webp'],
        priceBeforeTax: 37,
        priceAfterTax: 53,
        stars: 4.5,
        renter: null,
        description: 'A cozy cottage with a stunning view.',
        homeType: 'Amazing Pools'

    },
    {
        _id: rentingListIds[1],
        host: new mongoose.Types.ObjectId("652614ae5fcac9b1d95c0ee7"),
        title: "Crazy Cottage",
        startDate: new Date('2023-10-03'),
        endDate: new Date('2023-10-10'),
        numGuests: 4,
        numBeds: 2,
        numBedrooms: 2,
        numBaths: 1,
        reviews: ['Great place!', 'Amazing view'],
        country: 'United States',
        photos: ['https://kelbyamandyairbnb.s3.amazonaws.com/photo4.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo5.webp', 'https://kelbyamandyairbnb.s3.amazonaws.com/photo6.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo47.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo47.webp'],
        priceBeforeTax: 59,
        priceAfterTax: 75,
        stars: 4.5,
        renter: null,
        description: 'A cozy cottage with a stunning view.',
        homeType: 'Amazing Pools'

    },
    {
        _id: rentingListIds[2],
        host: new mongoose.Types.ObjectId("652614ae5fcac9b1d95c0ee7"),
        title: "Cool farm",
        startDate: new Date('2023-10-04'),
        endDate: new Date('2023-10-10'),
        numGuests: 4,
        numBeds: 2,
        numBedrooms: 2,
        numBaths: 1,
        reviews: ['Great place!', 'Amazing view'],
        country: 'Europe',
        photos: ['https://kelbyamandyairbnb.s3.amazonaws.com/photo7.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo8.webp', 'https://kelbyamandyairbnb.s3.amazonaws.com/photo9.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo47.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo47.webp'],
        priceBeforeTax: 568,
        priceAfterTax: 791,
        stars: 4.5,
        renter: null,
        description: 'A cozy cottage with a stunning view.',
        homeType: 'Amazing Pools'

    },
    {
        _id: rentingListIds[3],
        host: new mongoose.Types.ObjectId("652614ae5fcac9b1d95c0ee7"),
        title: "Stellar Apartment",
        startDate: new Date('2023-10-01'),
        endDate: new Date('2023-10-7'),
        numGuests: 4,
        numBeds: 2,
        numBedrooms: 2,
        numBaths: 1,
        reviews: ['Great place!', 'Amazing view'],
        country: 'Italy',
        photos: ['https://kelbyamandyairbnb.s3.amazonaws.com/photo10.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo11.webp', 'https://kelbyamandyairbnb.s3.amazonaws.com/photo12.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo47.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo47.webp'],
        priceBeforeTax: 1000,
        priceAfterTax: 1146,
        stars: 4.5,
        renter: null,
        description: 'A cozy cottage with a stunning view.',
        homeType: 'Amazing Pools'

    },
    {
        _id: rentingListIds[4],
        host: new mongoose.Types.ObjectId("652614ae5fcac9b1d95c0ee7"),
        title: "Oaktown Classic",
        startDate: new Date('2023-10-01'),
        endDate: new Date('2023-10-5'),
        numGuests: 4,
        numBeds: 2,
        numBedrooms: 2,
        numBaths: 1,
        reviews: ['Great place!', 'Amazing view'],
        country: 'United States',
        photos: ['https://kelbyamandyairbnb.s3.amazonaws.com/photo13.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo14.webp', 'https://kelbyamandyairbnb.s3.amazonaws.com/photo15.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo47.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo47.webp'],
        priceBeforeTax: 1200,
        priceAfterTax: 1320,
        stars: 4.5,
        renter: null,
        description: 'A cozy cottage with a stunning view.',
        homeType: 'Amazing Pools'

    },
    {
        _id: rentingListIds[5],
        host: new mongoose.Types.ObjectId("652614ae5fcac9b1d95c0ee7"),
        title: "Ye Old Village",
        startDate: new Date('2023-10-02'),
        endDate: new Date('2023-10-10'),
        numGuests: 4,
        numBeds: 2,
        numBedrooms: 2,
        numBaths: 1,
        reviews: ['Great place!', 'Amazing view'],
        country: 'Mexico',
        photos: ['https://kelbyamandyairbnb.s3.amazonaws.com/photo16.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo17.webp', 'https://kelbyamandyairbnb.s3.amazonaws.com/photo18.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo47.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo47.webp'],
        priceBeforeTax: 1000,
        priceAfterTax: 1081,
        stars: 4.5,
        renter: null,
        description: 'A cozy cottage with a stunning view.',
        homeType: 'Amazing Pools'

    },
    {
        _id: rentingListIds[6],
        host: new mongoose.Types.ObjectId("652614ae5fcac9b1d95c0ee7"),
        title: "Natoma St.",
        startDate: new Date('2023-10-08'),
        endDate: new Date('2023-10-10'),
        numGuests: 4,
        numBeds: 2,
        numBedrooms: 2,
        numBaths: 1,
        reviews: ['Great place!', 'Amazing view'],
        country: 'Canada',
        photos: ['https://kelbyamandyairbnb.s3.amazonaws.com/photo19.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo20.webp', 'https://kelbyamandyairbnb.s3.amazonaws.com/photo21.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo47.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo47.webp'],
        priceBeforeTax: 65,
        priceAfterTax: 76,
        stars: 4.5,
        renter: null,
        description: 'A cozy cottage with a stunning view.',
        homeType: 'Amazing Pools'

    },
    {
        _id: rentingListIds[7],
        host: new mongoose.Types.ObjectId("652614ae5fcac9b1d95c0ee7"),
        title: "Farmland",
        startDate: new Date('2023-10-06'),
        endDate: new Date('2023-10-15'),
        numGuests: 4,
        numBeds: 2,
        numBedrooms: 2,
        numBaths: 1,
        reviews: ['Great place!', 'Amazing view'],
        country: 'Caribbean',
        photos: ['https://kelbyamandyairbnb.s3.amazonaws.com/photo22.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo23.webp', 'https://kelbyamandyairbnb.s3.amazonaws.com/photo24.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo47.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo47.webp'],
        priceBeforeTax: 198,
        priceAfterTax: 214,
        stars: 4.5,
        renter: null,
        description: 'A cozy cottage with a stunning view.',
        homeType: 'Lakefront'

    },
    {
        _id: rentingListIds[8],
        host: new mongoose.Types.ObjectId("652614ae5fcac9b1d95c0ee7"),
        title: "Temu University",
        startDate: new Date('2023-10-12'),
        endDate: new Date('2023-10-14'),
        numGuests: 4,
        numBeds: 2,
        numBedrooms: 2,
        numBaths: 1,
        reviews: ['Great place!', 'Amazing view'],
        country: 'United Kingdom',
        photos: ['https://kelbyamandyairbnb.s3.amazonaws.com/photo25.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo26.webp', 'https://kelbyamandyairbnb.s3.amazonaws.com/photo27.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo47.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo47.webp'],
        priceBeforeTax: 222,
        priceAfterTax: 245,
        stars: 4.5,
        renter: null,
        description: 'A cozy cottage with a stunning view.',
        homeType: 'Luxe'

    },
    {
        _id: rentingListIds[9],
        host: new mongoose.Types.ObjectId("652614ae5fcac9b1d95c0ee7"),
        title: "Facebook High School",
        startDate: new Date('2023-10-03'),
        endDate: new Date('2023-10-10'),
        numGuests: 4,
        numBeds: 2,
        numBedrooms: 2,
        numBaths: 1,
        reviews: ['Great place!', 'Amazing view'],
        country: 'United States',
        photos: ['https://kelbyamandyairbnb.s3.amazonaws.com/photo28.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo29.webp', 'https://kelbyamandyairbnb.s3.amazonaws.com/photo30.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo47.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo47.webp'],
        priceBeforeTax: 768,
        priceAfterTax: 892,
        stars: 4.5,
        renter: null,
        description: 'A cozy cottage with a stunning view.',
        homeType: 'Amazing Pools'

    },
    {
        _id: rentingListIds[10],
        host: new mongoose.Types.ObjectId("652614ae5fcac9b1d95c0ee7"),
        title: "Magnificent Farm",
        startDate: new Date('2023-10-02'),
        endDate: new Date('2023-10-10'),
        numGuests: 4,
        numBeds: 2,
        numBedrooms: 2,
        numBaths: 1,
        reviews: ['Great place!', 'Amazing view'],
        country: 'United States',
        photos: ['https://kelbyamandyairbnb.s3.amazonaws.com/photo31.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo32.webp', 'https://kelbyamandyairbnb.s3.amazonaws.com/photo33.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo47.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo47.webp'],
        priceBeforeTax: 450,
        priceAfterTax: 479,
        stars: 4.5,
        renter: null,
        description: 'A cozy cottage with a stunning view.',
        homeType: 'Amazing Pools'

    },
    {
        _id: rentingListIds[11],
        host: new mongoose.Types.ObjectId("652614ae5fcac9b1d95c0ee7"),
        title: "I love farms",
        startDate: new Date('2023-10-08'),
        endDate: new Date('2023-10-10'),
        numGuests: 4,
        numBeds: 2,
        numBedrooms: 2,
        numBaths: 1,
        reviews: ['Great place!', 'Amazing view'],
        country: 'United States',
        photos: ['https://kelbyamandyairbnb.s3.amazonaws.com/photo34.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo35.webp', 'https://kelbyamandyairbnb.s3.amazonaws.com/photo36.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo47.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo47.webp'],
        priceBeforeTax: 432,
        priceAfterTax: 456,
        stars: 4.5,
        renter: null,
        description: 'A cozy cottage with a stunning view.',
        homeType: 'Amazing Pools'

    },
    {
        _id: rentingListIds[12],
        host: new mongoose.Types.ObjectId("652614ae5fcac9b1d95c0ee7"),
        title: "We are farmers",
        startDate: new Date('2023-10-01'),
        endDate: new Date('2023-10-15'),
        numGuests: 4,
        numBeds: 2,
        numBedrooms: 2,
        numBaths: 1,
        reviews: ['Great place!', 'Amazing view'],
        country: 'United States',
        photos: ['https://kelbyamandyairbnb.s3.amazonaws.com/photo37.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo38.webp', 'https://kelbyamandyairbnb.s3.amazonaws.com/photo39.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo47.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo47.webp'],
        priceBeforeTax: 800,
        priceAfterTax: 834,
        stars: 4.5,
        renter: null,
        description: 'A cozy cottage with a stunning view.',
        homeType: 'Amazing Pools'

    },
    {
        _id: rentingListIds[13],
        host: new mongoose.Types.ObjectId("652614ae5fcac9b1d95c0ee7"),
        title: "State Farm",
        startDate: new Date('2023-10-18'),
        endDate: new Date('2023-10-21'),
        numGuests: 4,
        numBeds: 2,
        numBedrooms: 2,
        numBaths: 1,
        reviews: ['Great place!', 'Amazing view'],
        country: 'United States',
        photos: ['https://kelbyamandyairbnb.s3.amazonaws.com/photo40.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo41.webp', 'https://kelbyamandyairbnb.s3.amazonaws.com/photo42.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo47.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo47.webp'],
        priceBeforeTax: 542,
        priceAfterTax: 575,
        stars: 4.5,
        renter: null,
        description: 'A cozy cottage with a stunning view.',
        homeType: 'Amazing Pools'

    },
    {
        _id: rentingListIds[14],
        host: new mongoose.Types.ObjectId("652614ae5fcac9b1d95c0ee7"),
        title: "United Farmers Association House",
        startDate: new Date('2023-10-20'),
        endDate: new Date('2023-10-25'),
        numGuests: 4,
        numBeds: 2,
        numBedrooms: 2,
        numBaths: 1,
        reviews: ['Great place!', 'Amazing view'],
        country: 'United States',
        photos: ['https://kelbyamandyairbnb.s3.amazonaws.com/photo43.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo44.webp', 'https://kelbyamandyairbnb.s3.amazonaws.com/photo45.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo47.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo47.webp'],
        priceBeforeTax: 455,
        priceAfterTax: 489,
        stars: 4.5,
        renter: null,
        description: 'A cozy cottage with a stunning view.',
        homeType: 'Treehouses'

    },
    {
        _id: rentingListIds[15],
        host: new mongoose.Types.ObjectId("652614ae5fcac9b1d95c0ee7"),
        title: "Associated Farmers",
        startDate: new Date('2023-10-25'),
        endDate: new Date('2023-10-29'),
        numGuests: 4,
        numBeds: 2,
        numBedrooms: 2,
        numBaths: 1,
        reviews: ['Great place!', 'Amazing view'],
        country: 'United States',
        photos: ['https://kelbyamandyairbnb.s3.amazonaws.com/photo46.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo47.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo47.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo47.webp', 
        'https://kelbyamandyairbnb.s3.amazonaws.com/photo47.webp'],
        priceBeforeTax: 566,
        priceAfterTax: 590,
        stars: 4.5,
        renter: null,
        description: 'A cozy cottage with a stunning view.',
        homeType: 'Off-the-grid'
    },
];

module.exports = rentingLists;
