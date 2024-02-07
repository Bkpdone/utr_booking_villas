const express = require('express');
const Property = require('../models/propertyDetail');
const router = express.Router();


//## admin
//property add + Login
router.post('/property/add', async (req, res) => {

    try {

        const propertyData = req.body;
        //console.log(propertyData)

        const newProperty = await Property.create(propertyData);

        newProperty.loctionField = + propertyData.location.country + " " + propertyData.location.state + " " + propertyData.location.city + " " + propertyData.location.taluka + " " + propertyData.propertyTitle;

        await newProperty.save();


        console.log('add property SuccessFully ....')

        res.status(200).json({
            success: true,
            propert: newProperty
        })
    }
    catch (err) {
        console.log('Error in admin-property-add x x x', err);
    }
})



module.exports = router;


