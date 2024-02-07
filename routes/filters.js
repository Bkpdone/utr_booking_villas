const express = require('express');
const Property = require('../models/propertyDetail');
const router = express.Router();


router.get('/home/:location', async(req, res) => {
    try {
     //   const locationStr = req.params.location.trim().toLowerCase();

        const locationStr = req.params.location
     

        const parts = locationStr.split('-');
        const locationCity = parts[2];

     
        const filterparamters = req.query
        const { adult, child, type, is_pax_selected, city, state,pets } = filterparamters;
       

         
        const query = {
            'location.city': locationCity,
            'numberofguest.numberofadults.max': { $gte: adult },
            'numberofguest.numberofchilders.max':{$gte:child}
        }
     
        if(pets==1){
            query.pets=true
        }
        console.log('Balji aap hi sab kuch ho\n',query);
        

        const propertiesCity = await Property.find(query);
         
        const FilterCity = propertiesCity.map((curr) => ({
            title:curr.propertyTitle,
            price:curr.numberofguest.price,
            photos:curr.images.gallery,
            locationField: curr.loctionField,
            state: curr.location.state,
            country: curr.location.country,
            city: curr.location.city,
            pets:curr.pets
        }));



          
        const queryState = {
            'location.city': { $ne: locationCity },
            'location.state':state,
            'numberofguest.numberofchilders.max':{$gte:child},
            'numberofguest.numberofadults.max': { $gte: adult }
        };
     
        if(pets==1){
            queryState.pets=true
        }
    

        const propertiesState = await Property.find(queryState);
         

        const FilterState = propertiesState.map((curr) => ({
            title:curr.propertyTitle,
            price:curr.numberofguest.price,
            photos:curr.images.gallery,
            locationField: curr.loctionField,
            state: curr.location.state,
            country: curr.location.country,
            city: curr.location.city,
            pets:curr.pets
        }));

        console.log('Balaji Dekh lo ',propertiesState);
        let finalData = [...FilterCity,...FilterState];
       

        return res.status(200).json({
            success: true,
            properties: finalData
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error loction Filter  x x x'
        });
        console.log('Error loction Filter x x x', err);
    }

})


router.get('/loction-filter', (req, res) => {
    try {

    } catch (error) {
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



        function correctSpelling(userInput) {
            userInput = userInput.toLowerCase();
            const inputWords = userInput.split(' ');

            // Correct each word in the input
            const correctedWords = inputWords.map(word => {
                const isCorrect = dictionary.check(word);
                return isCorrect ? word : dictionary.suggest(word)[0];
            });

            return correctedWords.join(' ');
        }

        // Example usage
        const userInput = "favouriite colur";
        const correctedInput = 'ok'//correctSpelling(userInput);
        console.log(correctedInput);


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


