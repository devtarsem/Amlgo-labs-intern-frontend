import dbConnect from "@/lib/dbConnect";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from "@/model/user";

import { NextResponse } from "next/server";

async function encryption(password){
    return await bcrypt.hash(password, 12)
}

function tokenGeneration(id){
    return jwt.sign({id : id}, process.env.SECRET)
}

async function passwordCompare(newPassword, oldPassword){
    return await bcrypt.compare(newPassword, oldPassword)
}

export async function POST(req){
    await dbConnect(); // 🔑 DB connect
    const body = await req.json(); // frontend se data le

    const { username, email, password } = body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { status: "fail", message: "User already exists with this email" },
        { status: 400 }
      );
    }
    // crypting user password
    const new_password = await encryption(password)
    // create user
    const user = await User.create({ username, email, password:new_password });

    // creating token 
    const token = tokenGeneration(user._id)


    return NextResponse.json(
      {
        status: "success",
        message: "User registered successfully",
        user: {
          name: user.name,
          email: user.email,
          token
        },
      },
      { status: 201 }
    );
}