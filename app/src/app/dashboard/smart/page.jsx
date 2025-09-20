'use client'
import Link from "next/link";
import './../../../styles/util.css'
import './../../../styles/smart.css'
import './../../../styles/exp.css'

import { useEffect } from "react";
import smartStore from "@/store/smart.store";
import Auth from "@/components/auth/auth";
import authStore from "./../../../store/auth.store";


export default function Navbar() {

    const {AuthNeeded, checkingAuth} = authStore()

    useEffect(el=>{
        checkingAuth()
    }, [])

    const {fetchLastTenDays, last10Days,suggestions, isLoading,closeSuggestionPanel, openSuggestionPanel, suggestion_panel,getSmartSuggestion} = smartStore()
    useEffect(el=>{
        fetchLastTenDays()
    }, [])

    function smartSugg(){
        getSmartSuggestion()
    }

    function close(){
        closeSuggestionPanel()
    }


    return(
        <div className="smart flex flex-dir gap16">
            {AuthNeeded &&
                <Auth/>
            }
            {suggestion_panel &&
                <div className="suggestions flex flex-2">
                    <div className="sugg pad16 flex flex-dir gap16">
                        <h2 className="sugghead">Some suggestions</h2>
                        <div className="suggest flex flex-dir gap16">
                            {suggestions?.map((el,index)=>
                                <p className="desist">{index+1}.) {el}</p>
                            )}
                        </div>
                        <button onClick={close} className="close standardbtn">close</button>
                    </div>
                </div>
            }
            {!AuthNeeded &&
            <div className=" flex flex-dir gap16">
                <h2 className="smartHead">Smart suggestions</h2>
                <div className="smarttable">
                    <table className="table">
                        {isLoading &&
                            <div className="wait flex flex-2">
                                <p className="waiting">Please wait...</p>
                            </div>
                        }
                        <thead>
                            <tr>
                                <th>Sno.</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Category</th>
                                <th>Payment method</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {last10Days?.map((el,index)=>
                                <tr key={el._id} >
                                    <td>{index+1}</td>
                                    <td>{el.Date}</td>
                                    <td>{el.amount}</td>
                                    <td>{el.category}</td>
                                    <td>{el.payment_method}</td>
                                    <td>{el.notes}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {!isLoading &&
                    <button onClick={smartSugg} className="standardbtn">Get smart suggestion</button>
                }
                {isLoading &&
                    <p className="wait">please wait...</p>
                }
            </div>
            }
        </div>
    )
}