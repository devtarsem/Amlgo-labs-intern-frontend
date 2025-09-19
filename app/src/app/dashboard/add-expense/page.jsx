'use client'
import Image from "next/image";
import { useEffect } from "react";
import authStore from "./../../../store/auth.store";
import Auth from "@/components/auth/auth";
import './../../../styles/add.css'
import ExpForm from "@/components/expense/expenseForm";

export default function AddExp() {

  const {AuthNeeded, checkingAuth} = authStore()

  useEffect(el=>{
    checkingAuth()
  }, [])

  return (
    <div className="expaddition ">
      {AuthNeeded &&
        <Auth/>
      }

      {!AuthNeeded &&
        <ExpForm/>
      }
    </div>
  );
}
