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
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode && tokenDecode.id) {
            req.body.userId = tokenDecode.id; // Store userId in req.body
            next(); // Proceed to next middleware
        } else {
            return res.json({ success: false, message: 'Not Authorized, Login Again' });
        }

    } catch (error) {
        console.error('JWT Error:', error); // Log the error for debugging
        return res.json({ success: false, message: error.message }); // Return error message to the client
    }
};

export default userAuth;
