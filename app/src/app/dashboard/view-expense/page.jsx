'use client'
import Image from "next/image";
import { useEffect } from "react";
import authStore from "./../../../store/auth.store";
import Auth from "@/components/auth/auth";
import './../../../styles/add.css'
import ExpForm from "@/components/expense/expenseForm";
import ExpView from "@/components/expense/viewExpense";
export default function ViewExp() {

  const {AuthNeeded, checkingAuth} = authStore()

  useEffect(el=>{
    checkingAuth()
  }, [])

  return (
    <div className="expView ">
      {AuthNeeded &&
        <Auth/>
      }

      {!AuthNeeded &&
        <ExpView/>
      }
    </div>
  );
}
