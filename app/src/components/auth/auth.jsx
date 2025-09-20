'use client'
import Image from "next/image";
import { useEffect , createRef} from "react";
import './../../styles/auth.css'
import './../../styles/util.css'
import './../../styles/auth.css'
import axios from "axios";
import authStore from "@/store/auth.store";
import errorSender from "@/utility/utility";

export default function Auth(){


  const username = createRef()
  const email = createRef()
  const password = createRef()
  const emailLogin = createRef()
  const passwordLogin = createRef()

  const {MakingUserSignUp, MakinguserLogin, isLoading, signUpForm, Loginform, openSignupform, openLoginform} = authStore()

  console.log(isLoading)

  function SignUpToAcc(el){ 
    el.preventDefault()
    if(username.current.value.trim()==''){
        errorSender('error', 'Please provide valid username')
        return 
    }
    if(email.current.value.trim()==''){
        errorSender('error', 'Please provide valid email address')
        return 
    }
    if(password.current.value.trim()==''){
        errorSender('error', 'Please provide valid password')
        return 
    }
    if(password.current.value.length<8){
        errorSender('error', 'Password must be atleast 8 character long')
        return 
    }
    MakingUserSignUp(username.current.value, email.current.value, password.current.value)
  }

  
  function SignUpAcc(){
    openSignupform()
  }

  function LoginAcc(){
    openLoginform()
  }

  function LoginToAcc(el){
    el.preventDefault()
    if(emailLogin.current.value.trim()==''){
        errorSender('error', 'Please provide valid email address')
        return 
    }
    if(passwordLogin.current.value.trim()==''){
        errorSender('error', 'Please provide valid password')
        return 
    }
    MakinguserLogin(emailLogin.current.value, passwordLogin.current.value)
  }

  return (
    <div className="auth">
        <div className="flex flex-dir gap16">
            <div className="flex flex-2 gap48">
                <button onClick={SignUpAcc} className={signUpForm ? "standardbtn" : "borderbtn"}>Sign Up</button>
                <button onClick={LoginAcc} className={Loginform ? "standardbtn" : "borderbtn"}>Login</button>
            </div>
            {signUpForm &&
            <form className="formAuth flex flex-dir gap16">
                <h2 className="headform">Just open step to go!</h2>
                <div className="flex flex-dir gap8">
                    <label className="label">Username</label>
                    <input ref={username} className="inp" placeholder="Username" type="text"/>
                </div>
                <div className="flex flex-dir gap8">
                    <label className="label">Email</label>
                    <input ref={email} className="inp" placeholder="email" type="text"/>
                </div>
                <div className="flex flex-dir gap8">
                    <label className="label">Password </label>
                    <input ref={password} className="inp" placeholder="password" type="password"/>
                </div>
                <button onClick={LoginAcc} className="alreadyLink">Already have an account?</button>
                {isLoading ?
                <div className="wait flex flex-2">
                    <p className="waiting">Please wait...</p>
                </div>
                :
                <button onClick={SignUpToAcc} className="standardbtn">Open your account</button>
                }
            </form>
            }

            {Loginform &&
                <form className="formAuth flex flex-dir gap16">
                    <h2 className="headform">Login your account!</h2>
                    
                    <div className="flex flex-dir gap8">
                        <label className="label">Email</label>
                        <input ref={emailLogin} className="inp" placeholder="email" type="text"/>
                    </div>
                    <div className="flex flex-dir gap8">
                        <label className="label">Password </label>
                        <input ref={passwordLogin} className="inp" placeholder="password" type="password"/>
                    </div>
                    <button onClick={SignUpAcc} className="alreadyLink">Open new account?</button>
                    {isLoading ?
                    <div className="wait flex flex-2">
                        <p className="waiting">Please wait...</p>
                    </div>
                    :
                    <button onClick={LoginToAcc} className="standardbtn">Login account</button>
                    }
                </form>
            }

        </div>
    </div>
  );
}
