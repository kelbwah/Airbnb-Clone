const mongoose = require("mongoose");

const RentingListSchema = mongoose.Schema({
    host: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    title: String,
    startDate: Date,
    endDate: Date,
    numGuests: Number,
    numBeds: Number,
    numBedrooms: Number,
    numBaths: Number,
    reviews: [String],
    country: String,
    photos: [String],
    priceAfterTax: Number,
    priceBeforeTax: Number,
    stars: Number,
    renter: {},
    description: String,
    homeType: String,
}, {timestamps: true});

const RentingListModel = mongoose.model('RentingList', RentingListSchema);

module.exports = RentingListModel;
