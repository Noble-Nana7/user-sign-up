const joi = require('joi');

exports.validateUser = (req, res, next) => {
   const schema = joi.object({
        fullName: joi.string().trim().pattern(/^[A-Za-z\s]{4,}$/).required().messages({
            'any.required': 'Full Name is required',
            'string.empty':'Fullname cannot be Empty',
            'string.pattern.base': 'Fullname cannot contain numbers and must be atleast 4 characters'
        }),
        email: joi.string().email().required().messages({
            'any required':'Email is required',
            'string.empty':'Email cannot be Empty',
            'string.email':'Email must be a valid email',
        }),
        password: joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/).required().messages({
            'any required':'Password is required',
            'string.empty':'Password cannot be Empty',
            'string.pattern.base':'Password must be 8 chracters must include upper and lower case'
        }),
        confirmPassword: joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/).required().messages({
            'any required':'Please confirm password',
            'string.empty':'Please confirm password',
            'string.pattern.base':'Password must be 8 chracters must include upper and lower case',
            'any.only':'Password does not match'
        })
    })

    const { error }= schema.validate(req.body)
    if(error) {
        return res.status(400).json({
            message:error.details[0].message
        })
    }
    next()
}