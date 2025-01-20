import express,{Request,Response} from 'express';
import { getUserByEmail, createUser } from '../db/users';
import { authentication, random } from '../helpers';

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required." });
        }

        // Fetch user with authentication fields
        const user = await getUserByEmail(email).select('authentication.salt authentication.password');

        if (!user) {
            return res.status(400).json({ error: "User not found." });
        }

        // Validate password
        const expectedHash = authentication(user.authentication.salt, password);

        if (user.authentication.password !== expectedHash) {
            return res.status(403).json({ error: "Invalid credentials." });
        }

        // Generate session token and save it
        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        // Set session token as a cookie
        res.cookie('VIDASH-AUTH', user.authentication.sessionToken, {
            domain: 'localhost',
            path: '/',
            httpOnly: true,
            secure: false, 
        });

        // Respond with user details
        return res.status(200).json({
            id: user._id,
            email: user.email,
            username: user.username,
            sessionToken: user.authentication.sessionToken,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};


export const register = async (req:Request,res:Response) :  Promise<any> => {
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Check if user already exists
        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({ error: "Email is already registered." });
        }

        // Create new user
        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });

        // Respond with user details
        return res.status(200).json(user).end();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};
