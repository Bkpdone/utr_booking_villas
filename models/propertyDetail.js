const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    loctionField:String,
    slug:String,
    propertyAggregator: {
        lonoId: Number,
        stayvistaId: Number,
        ownId: Number,
    },
    propertyTitle: {
        type: String,
        required: true,
    },
    location: {
        country: String,
        state: String,
        city: String,
        taluka: String,
        googleLocation: String,
    },
    description: [String],
    images: {
        backgroundImg: String,
        gallery: [String],
    },
    videos: {
        video: [String],
    },
    propertyAttributes: {
        rooms: {
            bedRoomTypes: [
                {
                    singleBed: Number,
                    pic: String,
                    dsc: [String],
                },
                {
                    doubleBed: Number,
                    pic: String,
                    dsc: [String],
                },
                {
                    largeBed: Number,
                    pic: String,
                    dsc: [String],
                }
            ],
        },
        totalCount:Number,
        bathRooms: Number,
        pools: Number,
    },
    houseRules: [String],
    faqs: [
        {
            qus: String,
            ans: String,
        },
    ],
    amenities: [
        {
            pic: String,
            dsc: String,
        },
    ],
    reviews: {
        googlereviews: [Number], //  numerical ratings
        airnbRev: [
            {
                pic: String,
                content: String,
                rated: Number,
            },
        ],
        stayvista: [Number], // numerical ratings
    },
    pets: Boolean,
    nonveg: Boolean,
    purvegfood: {
        jain: Boolean,
        vegan: Boolean,
    },
    numberofguest: {
        numberofadults: {
            min: Number,
            max: Number,
        },
        numberofchilders: {
            min: Number,
            max: Number,
        },
        petsCount: Number,
        petsize: {
            Big: Boolean,
            Small: Boolean,
            All: Boolean,
            Medium: Boolean,
        },
        price: Number,
    },
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
