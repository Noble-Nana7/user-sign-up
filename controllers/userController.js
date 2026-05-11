const userModel = require('../model/user');
const bcyrpt = require('bcrypt');

exports.createUser = async (req, res, next) => {
    try {
        const { fullName, email, password, confirmPassword} = req.body;

        const hashedPassword = await bcyrpt.hash(password, 10)

        const user = await new userModel({
            fullName,
            email,
            password: hashedPassword
        });

        console.log(user);
        await user.save();

        res.status(201).json({
            message: `Sign up Sucessful`,
            data: user
        })

    } catch (error) {
        next(error);
    }
}