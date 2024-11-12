const User = require("../models/user.js");

module.exports.renderSignUp = (req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signUp = async(req,res)=>{
    try{
        let {username,email,password} = req.body;
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser,password);
        req.login(registeredUser,(err)=>{
            if(err){
            return next(err);
            }
            req.flash("success", "Welcome to MountainNest");
        })
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login = async(req,res)=>{
    req.flash("success","Welcome back to MountainNest");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success", "You successfully logout!!");
        res.redirect("/listings");
    })
};