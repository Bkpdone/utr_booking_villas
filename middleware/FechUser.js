const jwt= require('jsonwebtoken')
const sqhash = 'BhaveshPharate@good$boy';

const fetchUser = async(req,res,next) =>{
    
    try{
         
        const token = req.header('authToken');
  
        if(!token){
            return res.status(400).json({
                Error:"token is Not Valid"
            })
        }
        
        const comp = jwt.verify(token,sqhash);
        req.user=comp.user

        
        next();
    }
    catch(err){
        console.log('Error In Server in Middleware Xx x=> ',err);
    }

}
module.exports = fetchUser;