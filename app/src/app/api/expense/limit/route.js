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
    const {token, limit} = await req.json(); // frontend se data le
    console.log(limit)
    const id = await (decodeToken(token))
    console.log(id)
    const user = await User.findById(id.id);
    console.log(user)
    user.monthly_spending_limit = limit;
    await user.save()
    return NextResponse.json(
        {
        status: "success",
        limit: limit,
        message: "Expense limit set successfully",
        },
        { status: 201 }
    );
}