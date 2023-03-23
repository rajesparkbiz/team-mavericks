
class auth{
    static userAuth = async (req, res, next) => {
        let session=req.session;
        if (session.username) {
            next();
        }
        else{
            res.redirect('/auth/login');
        }    
    }
    static alreadyLogin = async (req, res, next) => {
        let session=req.session;
        if (session.username) {
            res.redirect('/dashboard');
        }
        else{
           next();
        } 
    }
}
module.exports=auth;