const User = require("../models/user");

// Render the signup form
module.exports.renderSignupForm = (req , res) =>{
    res.render("users/signup.ejs")
}

// Handle user signup
module.exports.signUp = async(req , res, next) => {
 try {
    let {username, email , password} = req.body;
const newUser = new User({email, username});
const registeredUser = await User.register(newUser, password);
// console.log(registeredUser);
req.login(registeredUser, (err) => {
    if(err) {
        return next(err);
    }
    req.flash("success", "Welcome to Wanderlust");
res.redirect("/listings")
})

}catch (e) {
req.flash("error" , e.message);
res.redirect("/signup");
}
}

// Render the login form
module.exports.renderLoginForm =  (req, res) => {
    res.render("users/login.ejs");
}

// Handle user login
module.exports.login = async(req, res) =>{
    req.flash("success","Welcome back to Wanderlust! ");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

// Handle user logout
module.exports.logOut = (req, res, next) => {
    req.logout((err) =>{
        if(err){
            return next(err);
        }
        req.flash("success", "you are logged out");
        res.redirect("/listings");
    })
}