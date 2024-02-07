const express = require('express');
const Property = require('../models/propertyDetail');
const router = express.Router();


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


