'use client'
import Link from "next/link";
import './../../../styles/util.css'
import './../../../styles/dashboard.css'
import './../../../styles/landing.css'
import './../../../styles/media.css'
import { useEffect, useState } from "react";
import ExpStore from "@/store/exp.store";

export default function MonthlyExp() {

    const {fetchMonthlyReport} = ExpStore()

    useEffect(el=>{
        fetchMonthlyReport()
    }, [])

    return(
        <div className="month">month</div>
    )
}

