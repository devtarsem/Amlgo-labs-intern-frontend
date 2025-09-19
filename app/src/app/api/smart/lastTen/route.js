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
    let exp = await Exp.find({ user: id })
    let datesArr = []
    let count = 0;
    for(let i = 0; i<exp.length; i++){
        if(!(datesArr.includes(exp[i].Date))){
            datesArr.push(exp[i].Date)
            count++;
        }

        if(count==10) break;
    }

    let last10Data = []

    datesArr.forEach(date=>{
        exp.forEach(item=>{
            if(item.Date==date){
                last10Data.push(item)
            }
        })
    })

     return NextResponse.json(
        {
            status: "success",
            datesArr,
            last10Data
        }, 
        { status: 201 }
    );
}