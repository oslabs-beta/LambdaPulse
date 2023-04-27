const jwt = require("jsonwebtoken");


const jwtController = {
    createJwt: (req,res,next) => {
        console.log("increate jwt")
        try {
            const token = jwt.sign({id:res.locals.userId}, process.env.JWT_KEY, {expiresIn:"1h"});
            res.cookie("token", token, {
                httpOnly:true,
                // secure: true,
                // maxAge: 100000,
                // signed: true,
            })
            return next();
        } catch(err) {
            console.log('Error', err);
            let error = {
            log: 'Express error handler caught jwtController.createJwt',
            message: { err: err },
            };
            return next(error);
        }
    },
    verifyJwt: (req,res,next) => {
        console.log('in verifyjwt')
        console.log('this is req.cookies',req.cookies);
        const token = req.cookies.token;
        console.log(token);
        // console.log("this is req", req);
        try {
            const user = jwt.verify(token,process.env.JWT_KEY);
            const userId = user.id;
            res.locals.userId = userId;
            return next();
        } catch(err) {
            res.clearCookie("token");
            res.sendStatus(419);
        }
    },
}
module.exports = jwtController;