const express = require('express');
const Property = require('../models/propertyDetail');
const router = express.Router();


//## admin

//get all property add
router.get('/get-all',async (req, res) => {

    try {
   
        const properties = await Property.find({})

        res.status(200).json({
            success: true,
            properties: properties
        })

        
    }

    catch (err) {
        
        res.status(500).json({
            success: false,
            msg:'Error in admin-property-get all x x x'
        });
        console.log('Error in admin-property-add x x x', err);
    }
})





//get all property add
router.get('/get/:id',async (req, res) => {

    try {
         
        slugId=req.params.id
        //console.log(slugId);

        const property = await Property.findOne({
            slug:slugId
        })
        
        if(property==null){
            res.status(400).json({
                success: false,
                msg:'No Property present'
            });
        }
        res.status(200).json({
            success: true,
            properties: property
        })
    }

    catch (err) {
      
        res.status(500).json({
            success: false,
            msg:'Error in admin-property-get slug x x x'
        });
        console.log('Error in admin-property-get-slug x x x', err);
    }
})

module.exports = router;


