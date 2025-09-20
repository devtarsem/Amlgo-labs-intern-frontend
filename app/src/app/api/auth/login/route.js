import dbConnect from "@/lib/dbConnect";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from "@/model/user";

import { NextResponse } from "next/server";
async function passwordCompare(newPassword, oldPassword){
    return await bcrypt.compare(newPassword, oldPassword)
}

function tokenGeneration(id){
    return jwt.sign({id : id}, process.env.SECRET)
}


export async function POST(req){
    await dbConnect(); // 🔑 DB connect
    const body = await req.json(); // frontend se data le

    const {email, password } = body;
    // checking email
    const Acc = await User.find({email : email})
    if(Acc.length==0){
        
        return NextResponse.json(
        { status: "fail", message: "Invalid email or password" },
        { status: 200 }
        );
      
    }else{

        // password check
        if(await passwordCompare(password,Acc[0].password)){

            const token =tokenGeneration(Acc[0]._id)

            return NextResponse.json(
                { status: "success", message: "Account founded successfully", user : {

                    token,
                    username : Acc[0].username,
                    email

                    } 
                },
                { status: 200 }
            );
        }else{
            return NextResponse.json(
            { status: "fail", message: "Invalid email or password" },
            { status: 200 }
            ); 
        }

    }
}
