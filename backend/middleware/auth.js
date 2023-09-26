import jwt from "jsonwebtoken";

//for example a user
//he wants to like a post  ===> he has to do this:
//click the like button ==> first we dont emidiately like it (because we are not sure he has the permission to like it) ==> first we go to the auth middleware ==> auth middleware confirms or denys that request we call the next ==> next() ==> auth middleware(next) ==> like controller...

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        const isCustomAuth = token.length < 500;

        /* if we have GoogleAuth our token is bigger than 500 */

        let decodedData;

        if (token && isCustomAuth) {

            decodedData = jwt.verify(token, 'somethingSecret');
            req.userId = decodedData?._id;

        } else {
            /* get user info from Google Auth */
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
            /* sub is googles name or specific Id that differentiate every single user google */
        }

        next();

    } catch (error) {
        console.log(error)
    }
}

export default auth;