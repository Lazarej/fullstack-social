import jwt from 'jsonwebtoken'

export const Auth = (req, res, next) => {
    const token = req.cookies.accessToken
    
    if (!token) {
        return res.status(401).json({message:'vous n \' etes pas identifier pour avoir ces données'})
    }
    const decodeToken = jwt.verify(token, process.env.CUSTOM_PRIVATE_KEY , (error, decodeToken) => {
        if (error) {
            return res.status(401).json({message:'Vous n\'etes pas autoriser  a accéder a ces ressources'})
        }

        const userId = decodeToken.userId
        if (req.body.userId && req.body.userId !== userId) {
            res.status(401).json({message:"Vous avez un accès qui ne vous est pas reservé"})
        } else {  
            next()
        }
    })
}