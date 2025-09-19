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
    const {amount, category, pays, notes, id} = await req.json(); // frontend se data le

    const expense = await Exp.findById(id);

    expense.amount = amount
    expense.category = category
    expense.payment_method = pays
    expense.notes = notes
    await expense.save()

     return NextResponse.json(
      {
        status: "success",
        message: "Expense edited successfully",
      },
      { status: 201 }
    );
}