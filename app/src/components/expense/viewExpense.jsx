'use client'
import Link from "next/link";
import './../../styles/util.css'
import './../../styles/exp.css'
import './../../styles/landing.css'
import { useEffect, createRef, useState } from "react";
import ExpStore from "./../../store/exp.store";
import EditExp from "./editExpense";
export default function ExpView() {


    const {expenses, search,fetchingExpenses, fetchMonthlyReport,saveMonthlyReport,deleteExpense, editPanel , openEditPanel,resetFilters, filterationOfExpenses, isLoading,meta, nextPaginate, prevPaginate} = ExpStore()

    useEffect(el=>{
        fetchingExpenses()
    }, [])

    function Next(){
        nextPaginate()
    }

    function Prev(){
        prevPaginate()
    }

    const [catagory, setCatagory] = useState('')
    function chooseCatagory(el){
        setCatagory(el.target.value)
    }
    const [pays, setpays] = useState('')
    function chooseCatagoryPays(el){
        setpays(el.target.value)
    }

    function filterExps(){
        filterationOfExpenses(catagory, pays)
    }

    function reset(){
        resetFilters()
    }

    const [creds, setCreds] = useState({})
    function openEdits(event,el){
        openEditPanel()
        setCreds(creds=> el)
    }

    function deleteExp(event, id){
        deleteExpense(id)
    }

    function searching(el){
        search(el.target.value)
    }

    function saveMonthRepo(){
        saveMonthlyReport()
    }

    function monthfetch(){
        fetchMonthlyReport()
    }

    return(
        <div className="view flex flex-dir gap16 ">

            {editPanel &&
                <EditExp creds={creds} />
            }
            <div className="flex flex-1">
                <h2 className="addexphead">View Expenses</h2>
                <button onClick={saveMonthRepo} className="standardbtn">Save month history</button>
            </div>
            <div className="searchAndFilter flex flex-1 gap16">
                <input onChange={searching} className="inp inp__small" placeholder="search" type="text"/>
                <div className="filters flex flex-3 gap16">
                    <select onChange={chooseCatagory} className="inp inp__small">
                        <option className="opt" value=''>Choose catagory</option>
                        {["Bills","Education","Entertainment","Food","Groceries","Health","Shopping","Transport","Travel", "Other"].map(el=>
                            <option className="opt" value={el} key={el} >{el}</option>
                        )}
                    </select>
                    <select onChange={chooseCatagoryPays} className="inp inp__small">
                        <option className="opt" value=''>Choose payment</option>

                        {["Cash","Credit Card","Debit Card","Net Banking","UPI"].map(el=>
                            <option className="opt" value={el} key={el} >{el}</option>
                        )}
                    </select>
                    <button onClick={filterExps} className="filBtn standardbtn">Filter</button>
                    <button onClick={reset} className="filBtn standardbtn">Reset</button>
                    <button onClick={monthfetch}>click</button>
                </div>
            </div>
            <div className="tableView">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Sno.</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Payment method</th>
                            <th>Notes</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading &&
                            <div className="wait flex flex-2">
                                <p className="waiting">Please wait...</p>
                            </div>
                        }
                        {expenses?.map((el,index)=>
                            <tr key={el._id} >
                                <td>{index+meta.start}</td>
                                <td>{el.amount}</td>
                                <td>{el.category}</td>
                                <td>{el.Date}</td>
                                <td>{el.payment_method}</td>
                                <td>{el.notes}</td>
                                <td>
                                    <button onClick={(event)=>openEdits(event,el)} className="borderbtn borderbtn__">Edit</button>
                                </td>
                                <td>
                                    <button onClick={(event)=> deleteExp(event, el._id)} className="borderbtn borderbtn__">Delete</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="pagination flex flex-3 gap16">
                <button onClick={Prev} className="next standardbtn">Prev</button>
                <button onClick={Next} className="next standardbtn">Next</button>
                <p className="pages">Expenses &mdash; {meta.start} to {meta.end-1}</p>
            </div>
        </div>
    )
}
