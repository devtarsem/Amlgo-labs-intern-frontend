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


async function generalCreds(token, property) {
    const id = (await decodeToken(token)).id
    let exp = await Exp.find({ user: id })
    let categories = []
    let count = 0

    exp.forEach(el => {
        if (!(categories.some(cat => cat[property] == el[property]))) {
            count++
            categories.push({ [property]: el[property], spend: 0 }) // FIXED
        }
    })

    console.log(count)


    exp.forEach(el => {
        categories.forEach(item => {
            if (el[property] == item[property]) {
                item.spend += el.amount
            }
        })
    })
    
    categories = categories.sort((a, b) => b.spend - a.spend)
    console.log(categories)
    return categories
}

export async function POST(req){
    await dbConnect(); // 🔑 DB connect
    const {token} = await req.json(); // frontend se data le
    let categories_cata=await generalCreds(token, 'category')
    let categories_pay=await generalCreds(token, 'payment_method')
    let categories_date=await generalCreds(token, 'Date')

    return NextResponse.json(
        {
            status: "success",
            categories_cata,
            categories_pay,
            categories_date
        }, 
        { status: 201 }
    );
}