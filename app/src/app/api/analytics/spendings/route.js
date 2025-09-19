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
    const {token} = await req.json(); // frontend se data le

    const id = (await decodeToken(token)).id
    const currentMonth = new Date().getMonth() + 1

    let exp = await Exp.find({user:id})
    exp = exp.filter(el=>{
        if(Number(el.Date.split("/")[1]) == Number(currentMonth)){
            return el
        }
    })
    const expense = exp.reduce((sum, expense)=> sum+expense.amount, 0).toFixed(2)
     return NextResponse.json(
        {
            status: "success",
            expense
        },
        { status: 201 }
    );
}