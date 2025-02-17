// import jwt from 'jsonwebtoken';

// const userAuth = async (req, res, next) =>{
//     const {token} = req.cookies;

//     if (!token){
//         return res.json({success: false, message: 'Not Authorized, Login Again'});
//     }
//     try{

//         const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

//         if(tokenDecode.id){
//             req.body.userId = tokenDecode.id
//         } else{
//             return res.json({success: false, message: 'Not Authorized, Login Again'});
//         }

//         next();

//     }  catch(error) {
//         res.json({success: false, message: error.message});
//     }
// }

// export default userAuth;


import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized, Login Again' });
    }

    try {
        // Verify the token using the JWT_SECRET from environment variables
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the decoded token contains the user ID
        if (tokenDecode && tokenDecode.id) {
            req.body.userId = tokenDecode.id;  // Assign the user ID to the request object
            return next();  // Continue to the next middleware or route handler
        } else {
            return res.json({ success: false, message: 'Not Authorized, Login Again' });
        }
    } catch (error) {
        console.error('JWT Error:', error);  // Log the error for debugging
        
        // Handle specific JWT errors
        if (error.name === 'TokenExpiredError') {
            return res.json({ success: false, message: 'Token expired, please log in again' });
        }
        return res.json({ success: false, message: 'Authentication failed' });
    }
};

export default userAuth;
