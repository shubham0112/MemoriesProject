import jwt from 'jsonwebtoken';

// suppose user wants to like the post
// click the like button => auth middleware (confirms or denies the user) => passes to next => like controller...

const auth = async (req,res,next) => {
    try {
        // validating token to know whether this user is authorized or not
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length<500; // checking whether it is our own token (the jwt one) or google o-auth token

        let decodedData;

        if(token && isCustomAuth){
            decodedData = jwt.verify(token,'test');

            req.userId = decodedData?.id ;
        }else{
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
        }

        next();

    } catch (error) {
        console.log(error);
    }
}

export default auth;