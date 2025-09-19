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
    const body = await req.json(); // frontend se data le

    const {amount, category, date,pay, notes, token } = body;
    const decodedToken = await decodeToken(token)
    
    const createExp = await Exp.create({amount, category, payment_method : pay,notes, user : decodedToken.id})
    return NextResponse.json(
      {
        status: "success",
        message: "Expense added successfully",
      },
      { status: 201 }
    );
}