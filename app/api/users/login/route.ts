import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bycrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'



connect() 

export async function POST(request:any) {
    try {
        const reqBody = await request.json()

    const { email, password } = reqBody
    
    // Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
        return NextResponse.json({error: "user does not exists"}, {status: 400})
    }

    //Check if password is correct
    const validPassword = await bycrypt.compare(password, user.password)
    if (!validPassword) {
        return NextResponse.json({error: "Invalid password"}, {status: 400})
    }

    //Create TokenData
    const TokenData = {
        id: user._id,
        email: user.email,
        username: user.username
    }

    //Create token
        const token = await jwt.sign(TokenData, process.env.TOKEN_SECRET!, { expiresIn: "1h" })
        
        
        const response = NextResponse.json({
            message: "user login successfully",
            success: true,
            user
        })

        response.cookies.set("token", token, {
            httpOnly: true,
            path:"/"
        })

        return response
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status:500})
    }
}  