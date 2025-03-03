const jwt = require("jsonwebtoken")
const User = require("../models/user-model")

const authenticationUSer = async (req, resizeBy, next)=>{
    const authHeader = req.headers["authorization"]
    const token = req.headers.authorization?.replace("Bearer","")

    if(!token){
        return res.status(401).json({message : "Token missing"})
    }
    jwt.verify(token , process.env.WT_SECRET, async(err, decoded)=>{
        if(err){
            return res.status(403).json({message : "Invalid token"})
        }
        try {
            const user = await User.findById(decoded.userId)
            if(!user){
                return res.status(404).json({message : "User Not Found"})
            }
            req.user = user
            next ()
        } catch (error) {
            console.error("Error authenticating User :", error);
            res.status(500).json({success : false, message :error.message})
        }
    })
}
module.exports = authenticationUSer