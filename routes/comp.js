const express = require('express');
const Property = require('../models/propertyDetail');
const router = express.Router();
const FindPropetiesFun = async (id) => {

    const slugData = await Property.findById(id);
    return slugData;

}
router.post('/property', async (req, res) => {

    try {

        const slugs = req.body.proerties;

        //refine no properties
        const slugIds = slugs
        const compData = [];
        let ct = 0;
        for (let currId of slugIds) {

            const findSlug = await FindPropetiesFun(currId);
            compData.push(findSlug);
            ct++;
            if (ct == 3) {
                break;
            }
        }

        const FunCount =(curr)=>{
            console.log(curr)
            return 5;
        }
 
        let finalData = compData.map((curr) => ({
            title: curr.propertyTitle,
            price: curr.numberofguest.price,
            bedRoomcount: FunCount(curr.propertyAttributes.rooms.bedRoomTypes),
            bathroomcount: curr.propertyAttributes.bathRooms || 0,
            state: curr.location ? curr.location.state : "",
            country: curr.location ? curr.location.country : "",
            city: curr.location ? curr.location.city : "",
            pets: curr.pets,
            nonVeg: curr.nonveg,
            vegan: curr.purvegfood ? curr.purvegfood.vegan : false,
            jain: curr.purvegfood ? curr.purvegfood.jain : false,
            wifiSpeed: true, // Assuming it's always true
            pool: curr.propertyAttributes.pools || false
        }));
        

        return res.status(200).json({
            success: true,
            compareData:finalData
        })


    }
    catch (err) {

        res.status(500).json({
            success: false,
            msg: 'Error loction Filter  x x x'
        });
        console.log('Error loction Comp x x x', err);
    }

})

module.exports = router;


