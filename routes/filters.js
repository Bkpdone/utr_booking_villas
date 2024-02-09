const express = require('express');
const Property = require('../models/propertyDetail');
const router = express.Router();
const Typo = require('typo-js');

// Load English (US) dictionary
const dictionary = new Typo('en_US');
//const spellchecker = require('spellchecker');

router.get('/home/:location', async (req, res) => {
    try {
        //   const locationStr = req.params.location.trim().toLowerCase();

        const locationStr = req.params.location


        const parts = locationStr.split('-');
        const locationCity = parts[2];


        const filterparamters = req.query
        const { adult, child, type, is_pax_selected, city, state, pets } = filterparamters;



        const query = {
            'location.city': locationCity,
            'numberofguest.numberofadults.max': { $gte: adult },
            'numberofguest.numberofchilders.max': { $gte: child }
        }

        if (pets == 1) {
            query.pets = true
        }
        console.log('Balji aap hi sab kuch ho\n', query);


        const propertiesCity = await Property.find(query);

        const FilterCity = propertiesCity.map((curr) => ({
            title: curr.propertyTitle,
            price: curr.numberofguest.price,
           // photos: curr.images.gallery,
            locationField: curr.loctionField,
            state: curr.location.state,
            country: curr.location.country,
            city: curr.location.city,
            pets: curr.pets
        }));




        const queryState = {
            'location.city': { $ne: locationCity },
            'location.state': state,
            'numberofguest.numberofchilders.max': { $gte: child },
            'numberofguest.numberofadults.max': { $gte: adult }
        };

        if (pets == 1) {
            queryState.pets = true
        }


        const propertiesState = await Property.find(queryState);



        const FilterState = propertiesState.map((curr) => ({
            title: curr.propertyTitle,
            price: curr.numberofguest.price,
         //   photos: curr.images.gallery,
            locationField: curr.loctionField,
            state: curr.location.state,
            country: curr.location.country,
            city: curr.location.city,
            pets: curr.pets
        }));

        console.log('Balaji Dekh lo ', propertiesState);
        let finalData = [...FilterCity, ...FilterState];


        return res.status(200).json({
            success: true,
            properties: finalData,

        })

    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error loction Filter  x x x'
        });
        console.log('Error loction Filter x x x', err);
    }

})


router.get('/loction-filter', async (req, res) => {
    try {


        const filterObj = req.body;
        // console.log(obj);
        const query = {
            'location.city': filterObj.location.city
        }

        const properties = await Property.find(query);

        const FilterCity = properties.map((curr) => ({
            id:curr._id,
            title: curr.propertyTitle,
            price: curr.numberofguest.price,


            photos: curr.images.gallery,

           locationField: curr.loctionField,

            
            state: curr.location.state,
            country: curr.location.country,
            city: curr.location.city,
            pets: curr.pets,
            nonVeg: curr.nonveg,
            vegan:curr.purvegfood.vegan,
            jain:curr.purvegfood.jain,
            wifiSpeed: true,
            pool: curr.propertyAttributes.pools
        }));


        let finalFilterData = FilterCity

        //Filter For Sort Price
        if (filterObj.sortPrice.value) {

            //sort low to Hi
            if (filterObj.sortPrice.min_max) {
                finalFilterData = finalFilterData.sort((a, b) => a.price - b.price);
                console.log('Hi Data is sorted min--max... SuccessFully...');
            }
            else {
                finalFilterData = finalFilterData.sort((a, b) => b.price - a.price);;
                console.log('Hi Data is sorted max--min... SuccessFully...');
            }

            //sort High to low
        }


        //Filter For Range Price
        if (filterObj.priceRange.value) {

            let rangeFilterData = []
            for (let curr of finalFilterData) {
                console.log(curr.price);
                if (curr.price >= filterObj.priceRange.minRangeValue && curr.price <= filterObj.priceRange.maxRangeValue) {
                    rangeFilterData.push(curr);
                }
            }

            console.log('Hi your range data :', rangeFilterData);
            finalFilterData = rangeFilterData;

            console.log("Range Data is Sorted SuccessFully...");
            
        }


        //filter pure veg
        if (filterObj.pureVeg.value) {

            let vegData = [];
            for (let curr of finalFilterData) {
                if (curr.nonVeg === false) {
                    vegData.push(curr);
                }
            }

            finalFilterData = vegData;
            console.log('filter pure-veg Food SuccessFully...');

            if (filterObj.pureVeg.vegan) {


                let veganData = [];

                for (let curr of finalFilterData) {
                    if (curr.vegan === true) {
                        console.log('Ramji bhala kare bhavesh ka!!');
                        veganData.push(curr);
                    }
                }
                

                finalFilterData=veganData;
                console.log('Hi vegan Are Food Filter SuccessFully...');

            }

            
            if (filterObj.pureVeg.jain) {


                
                let jainData = [];

                for (let curr of finalFilterData) {
                    if (curr.jain === true) {
                        jainData.push(curr);
                    }
                }

                finalFilterData=jainData;
                console.log('Hi jain Food Are Filter SuccessFully...');

            }


        }

        //filter pool
        if (filterObj.pool) {

            let poolData = [];
            for (let curr of finalFilterData) {
                if (curr.pool > 0) {
                    poolData.push(curr);
                }
            }

            finalFilterData = poolData;
            console.log('filter pool data');
        }


        //fiter petsFriend
        if (filterObj.petsFriendly) {

            let petsFriend = [];
            for (let curr of finalFilterData) {
                if (curr.pets > 0) {
                    petsFriend.push(curr);
                }
            }

            finalFilterData = petsFriend;

            console.log('filter petsFriendly data');
        }



        return res.status(200).json({
            success: true,
            // filter: filterObj,
            data: finalFilterData
        })


    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error loction Filter  x x x'
        });
        console.log('Error loction Filter x x x', err);
    }

})


router.get('/auto-filter/:substr', async (req, res) => {
    try {

        const substrData = req.params.substr;
        console.log(substrData);

        //const wordRegex = new RegExp(`\\b${substrData}\\b`, 'i');
        //console.log(wordRegex);
        // const suggestions = await Property.find({ locationField: wordRegex }).limit(10);
        //const suggestions = await Property.find({ loctionField: { $regex: substrData, $options: 'i' } }).limit(10);



        // function correctSpelling(userInput) {
        //     userInput = userInput.toLowerCase();
        //     const inputWords = userInput.split(' ');

        //     // Correct each word in the input
        //     const correctedWords = inputWords.map(word => {
        //         const isCorrect = dictionary.check(word);
        //         return isCorrect ? word : dictionary.suggest(word)[0];
        //     });

        //     return correctedWords.join(' ');
        // }

        // // Example usage
        // const userInput = "favouriite colur";
        // const correctedInput = 'ok'//correctSpelling(userInput);
        // console.log(correctedInput);
        // const correctedWord = spellchecker.correct(substrData);

        // // Output the corrected word
        // console.log("Balaji sab shi karate hai: ",correctedWord)




        const word = 'gao';
        const correctedWord = dictionary.suggest(word)[0]; // Assuming you want the first suggestion

        // Output the corrected word
        console.log("Balaji Sab shi krane ge hai :", correctedWord);





        const suggestions = await Property.find({ loctionField: { $regex: new RegExp(`\\b${substrData}`, 'i') } }).limit(10);
        // const locationValues = suggestions.map((property) => property.loctionField);


        const locationValues = suggestions.map((property) => ({
            locationField: property.loctionField,
            state: property.location.state,
            country: property.location.country,
            city: property.location.city
        }))



        // console.log('Balaji Bala kare mera', suggestions);
        res.status(200).json({
            success: true,
            data: locationValues
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error auto Filter  x x x'
        });
        console.log('Error auto Filter x x x', err);
    }

})


router.get('/filter-1', async (req, res) => {

    try {
        const res = await Property.find()

    }
    catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error auto Filter 1  x x x'
        });
        console.log('Error auto Filter 1 x x x', err);
    }
})

module.exports = router;


