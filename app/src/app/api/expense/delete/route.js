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

    const {id} = body;
    const deleteExp = await Exp.findByIdAndDelete(id)
    return NextResponse.json(
        {
            status: "success",
            message: "Expense deleted successfully",
        },
        { status: 201 }
        );
}