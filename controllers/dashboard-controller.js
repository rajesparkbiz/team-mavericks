class StdentQuestion{
    static UserQuestion= async(req,res)=>{
        let session=req.session;
        if (session.username) {
            res.render('questions');
        }
        else{
            res.redirect('/auth/login');
        }
    }
}

module.exports=StdentQuestion;