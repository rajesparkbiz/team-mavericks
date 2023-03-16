class UserAuth{
    static userLogin= async(req,res)=>{
        res.render('login');
    }
}

module.exports=UserAuth;