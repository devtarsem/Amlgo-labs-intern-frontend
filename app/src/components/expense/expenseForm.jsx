'use client'
import Link from "next/link";
import './../../styles/util.css'
import './../../styles/exp.css'
import './../../styles/landing.css'
import { useEffect, createRef } from "react";
import ExpStore from "./../../store/exp.store";
import errorSender from "@/utility/utility";


export default function ExpForm() {

    const amount = createRef()
    const Category = createRef()
    const date = createRef()
    const pay = createRef()
    const notes = createRef()
    const {addExpense, isLoading} = ExpStore()

    function addExp(el){
        el.preventDefault()

        if(amount.current.value<=0){
            errorSender("error", "Amount can not be 0 or -ve")
            return
        }

        if(Category.current.value==''){
            errorSender("error", "Invalid category")
            return
        }

        if(pay.current.value==''){
            errorSender("error", "Invalid payment method")
            return
        }


        addExpense(amount.current.value, Category.current.value, pay.current.value, notes.current.value)
        amount.current.value = ''
        Category.current.value = 'Bills'
        pay.current.value = 'Cash'
        notes.current.value = ''

    }   

    return (
        <form className="formNewExp  grid grid-3-col gap16">
            <h2 className="addexphead">Add your expenses</h2>
            <div className="flex flex-dir gap8">
                <label className="label">Amount</label>
                <input ref={amount} className="inp" placeholder="500" type="number"/>
            </div>
            <div className="flex flex-dir gap8">
                <label className="label">Category</label>
                <select ref={Category} className="inp">
                    <option className="opt" value={''} key={''} >choose category</option>

                    {["Bills","Education","Entertainment","Food","Groceries","Health","Shopping","Transport","Travel", "Other"].map(el=>
                        <option className="opt" value={el} key={el} >{el}</option>
                    )}
                </select>
            </div>
            {/* <div className="flex flex-dir gap8">
                <label className="label">Date</label>
                <input ref={date} className="inp" placeholder="500" type="date"/>
            </div> */}
            <div className="flex flex-dir gap8">
                <label className="label">Payment method</label>
                <select ref={pay} className="inp">
                    <option className="opt" value={''} key={''} >choose payment</option>

                    {["Cash","Credit Card","Debit Card","Net Banking","UPI"].map(el=>
                        <option className="opt" value={el} key={el} >{el}</option>
                    )}
                </select>
            </div>
            <div className="notesbox flex flex-dir gap8">
                <label className="label">Notes</label>
                <textarea ref={notes} className="inp" placeholder="500" type="date"/>
            </div>
            {isLoading
            ?
                <div className="wait flex flex-2">
                    <p className="waiting">Please wait...</p>
                </div>
            :
                <button onClick={addExp} className="addExpBtn standardbtn">Add expense</button>
            }
        </form>
    )
}