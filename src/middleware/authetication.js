import jwt from 'jsonwebtoken'

const isAutheticated = async(req,res,next)=>{
    let authHeader = req.headers.authorization
    if(authHeader == null || authHeader == undefined){
        res.status(400).json({error:"Please Login"});
    }else{
        let [header,token] = authHeader.split(" ")
        if(!(header && token)){
            res.status(401).json({error:"Unauthorized Access Please Login"});
        }else{
            try {
                let user = jwt.verify(token,process.env.jwt_secret);
                if(user == null){
                    res.status(400).json({error:"Invalid Credentials"});
                }else{
                    req.user = user;
                    next()
                }        
            } catch (error) {
                res.status(400).json({error:error.message})
            }    
        }
    }


}
export default isAutheticated;