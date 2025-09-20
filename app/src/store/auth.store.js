import {create} from 'zustand'
import axios from 'axios'
import errorSender from '@/utility/utility'

const authStore = create(
    (set,get)=>({
        AuthNeeded : true,
        isLoading : false,
        signUpForm : true,
        Loginform : false,
        openSignupform : async()=>{
            set({signUpForm : true, Loginform : false})
        }
        ,
        openLoginform : async()=>{
            set({signUpForm : false, Loginform : true})
        }
        ,
        checkingAuth : async()=>{
            if(localStorage.getItem("AuthExpNet")){
                set({AuthNeeded : false})
            }else{
                set({AuthNeeded : true})

            }
        }
        ,
        MakingUserSignUp : async(username,email, password)=>{
            set({isLoading : true})
            
            axios({
                method : 'POST',
                url : "/api/auth/signup",
                data : {
                    username,
                    email,
                    password
                }
            }).then(res=>{
                if(res.data.status=='success'){
                    set({AuthNeeded : false, isLoading: false})
                    localStorage.setItem("AuthExpNet", JSON.stringify(res.data))
                }else{
                    set({isLoading: false})
                    errorSender("error", res.data.message)
                }
                console.log(res.data);
            
            })
            

        }

        ,

        MakinguserLogin : async(email,password)=>{
            set({isLoading : true})
                const res = await axios.post("/api/auth/login", {
                email,
                password,
                });
            
            axios({
                method : 'POST',
                url : '/api/auth/login',
                data : {
                    email,
                    password
                }
            }).then(res=>{
                if(res.data.status=='success'){
                    localStorage.setItem("AuthExpNet", JSON.stringify(res.data))
                    set({AuthNeeded : false})
                    set({ isLoading: false });
                }else{
                    set({ isLoading: false }); 
                    errorSender("error", res.data.message)

                }
            })
            
        }

    })
)

export default authStore