require("dotenv").config();

// Import required modules
const bcrypt = require("bcryptjs"); // Library for hashing passwords
const jwt = require("jsonwebtoken"); // Library for creating and verifying JSON Web Tokens

const { getUser, create } = require("../models/user/services");

//Function to create a structured response object and send it as JSON
const { createResponse } = require('../utils/response');

// Token expiration time constant
const EXPIRE_TIME = "1h";

// Function to generate a JSON Web Token
exports.getToken = (id, email) => {
    const token = jwt.sign({ userId: id, email: email }, process.env.SECRET_KEY, {
        expiresIn: EXPIRE_TIME,
    });
    return token;
};

exports.register = async (req, res, next) => {
    try {

        const user = await getUser({ email: req.body.email });
        // Check if the user already exists by email
        if (user) {
            return createResponse(res, 409, "fail", 'User already exists')
        } else {
            // Hash the user's password
            const encryPassword = await bcrypt.hash(req.body.password, 12);

            // Create a new user with the provided data
            const userData = await create({
                email: req.body.email,
                firstName: req.body.first_name,
                lastName: req.body.second_name,
                password: encryPassword,
            });

            const token = this.getToken(userData._id, userData.email);

            // Return a success response with the user's ID and token
            return createResponse(res, 201, "success", 'Signed in sucessfully', {
                userId: userData.id,
                token: token
            })
        }
    } catch (error) {
        return createResponse(res, 400, "fail", 'Signed up failed')
    }
};

exports.login = async (req, res, next) => {
    try {

        // Find the user by email
        const user = await getUser({ email: req.body.email });
        if (!user) {
            return createResponse(res, 401, "fail", 'User does not exist')
        }

        // Compare the provided password with the stored hashed password
        const isEqual = await bcrypt.compare(req.body.password, user.password);
        if (!isEqual) {
            return createResponse(res, 401, "fail", 'Password is incorrect!')
        }

        const token = this.getToken(user.id, user.email);

        return createResponse(res, 200, "success", 'Logged in successfully', {
            userId: user.id,
            token: token
        })


    } catch (error) {
        return createResponse(res, 400, "fail", 'Login failed')
    }
};

