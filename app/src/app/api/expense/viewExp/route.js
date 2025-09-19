import dbConnect from "@/lib/dbConnect";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from "@/model/user";
import Exp from "@/model/expense";
import { promisify } from "util";
import { NextResponse } from "next/server";


const decodeToken = (token)=>{
    return promisify(jwt.verify)(token, process.env.SECRET)
}

export async function POST(req){
    await dbConnect(); // 🔑 DB connect
    const {token} = await req.json()
    const id = (await decodeToken(token)).id
    
    const expenses = await Exp.find({user : id})

    return NextResponse.json(
        {
        status: "success",
        message: "Expenses fetched successfully",
        expenses
        },
        { status: 201 }
    );
    
}