'use client'
import Link from "next/link";
import './../../styles/util.css'
import './../../styles/exp.css'
import './../../styles/landing.css'
import { useEffect, createRef, useState } from "react";
import ExpStore from "./../../store/exp.store";
import errorSender from "@/utility/utility";

export default function EditExp(props) {


    const [credentials, setCredentials] = useState(props.creds)
    const {closeEditPanel, editExpense, isLoading} = ExpStore()

    const amt = createRef()
    const category = createRef()
    const pay = createRef()
    const notes = createRef()

    function close(){
        closeEditPanel()
    }

    function edit(el){
        el.preventDefault()
        if(amt.current.value<=0){
            errorSender("error", "Amount cannot be 0 or -ve")
            return
        }
        editExpense(amt.current.value, category.current.value, pay.current.value, notes.current.value, credentials._id)
    }
    
    return(
        <div className="edit flex flex-2 flex-dir gap16">
            <form className="editform pad16 flex flex-dir gap16">
                <div className="flex flex-dir gap8">
                    <label className="label">Amount</label>
                    <input ref={amt} defaultValue={credentials.amount} className="inp" type="text" placeholder="500"/>
                </div>
                <div className="flex flex-dir gap8">
                    <label className="label">Category</label>
                    <select ref={category} defaultValue={credentials.category} className="inp">
                        {["Bills","Education","Entertainment","Food","Groceries","Health","Shopping","Transport","Travel", "Other"].map(el=>
                            <option className="opt" value={el} key={el} >{el}</option>
                        )}
                    </select>
                </div>
                
                <div className="flex flex-dir gap8">
                    <label className="label">payment method</label>
                    <select ref={pay} defaultValue={credentials.payment_method} className="inp">
                        {["Cash","Credit Card","Debit Card","Net Banking","UPI"].map(el=>
                            <option className="opt" value={el} key={el} >{el}</option>
                        )}
                    </select>
                </div>

                <div className="flex flex-dir gap8">
                    <label className="label">Notes</label>
                    <textarea ref={notes} defaultValue={credentials.notes} className="inp" type="text" placeholder="500"/>
                </div>
                <div className="flex flex-1">
                    {!isLoading && 
                        <>
                            <button onClick={edit} className="standardbtn">Edit expense</button>
                            <button onClick={close} className="standardbtn">Close</button>
                        </>
                    }
                    {isLoading &&
                        <p className="wait">Please wait</p>
                    }
                </div>

            </form>
        </div>
    )
}
