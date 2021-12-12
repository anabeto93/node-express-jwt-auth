const User = require('../models/User');

// handle errors
const handleErrors = (err) => {
    const error = { email: '', password: '' };

    //console.debug({ error: err }, "Handle_Error");
    // duplicate error code
    if (err.code === 11000) {
        error.email = "Email address already taken.";
    }

    // validation errors
    if (err.message.includes("user validation failed")) {
        error.email = err.message;

        Object.values(err.errors).forEach(({ properties }) => {
            error[properties.path] = properties.message;
        });

        console.log(error, "Final_Error")
    }

    return error;
};

module.exports.get_signup = (req, res) => {
    res.render('signup');
};

module.exports.get_login = (req, res) => {
    res.render('login');
};

module.exports.signup = async (req, res) => {
    const { email, password } = req.body;
    let user;
    try {
        user = await User.create({ email, password }).then(res => {
            return { ...res._doc, _id: undefined, __v: undefined };
        });
    } catch(err) {

        const errors = handleErrors(err);
        return res.status(400).send({ message: 'User not created', errors });
    }
    res.status(201).send({ message: 'User created', data: user })
};

module.exports.login = (req, res) => {
    const { email, password } = req.body;
    console.log({ email, password}, "Login_Details");
    res.send('new login');
};