const User = require('../models/user');
const {v4 : uuidv4} =  require('uuid');
const { setUser } = require('../service/auth');

async function handleUserSignUp(req,res) {
    const { name, email,password} = req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect('/');
}
async function handleUserLogIn(req,res) {
    const {  email,password} = req.body;
    const user = await User.findOne({email,password});
    if(!user)
        return res.render("login",{
    error:"Invailed User",
});
    const token = setUser(user);
    res.cookie("token",token);
    return res.redirect("/");
}

module.exports ={
    handleUserSignUp,
    handleUserLogIn,
    handleUserLogOut,
};

async function handleUserLogOut(req, res) {
    res.clearCookie("token");
    return res.redirect("/login");
}