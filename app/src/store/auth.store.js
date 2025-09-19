import {create} from 'zustand'
import axios from 'axios'

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
            try {
                const res = await axios.post("/api/auth/signup", {
                username,
                email,
                password,
                });
                console.log(res.data);
                localStorage.setItem("AuthExpNet", JSON.stringify(res.data))
                set({AuthNeeded : false})
            } catch (err) {
                console.error("Signup error:", err.response?.data || err.message);
            } finally {
                set({ isLoading: false }); // ✅ always chalega
            }

        }

        ,

        MakinguserLogin : async(email,password)=>{
            set({isLoading : true})
            try {
                const res = await axios.post("/api/auth/login", {
                email,
                password,
                });
                console.log(res.data);
                localStorage.setItem("AuthExpNet", JSON.stringify(res.data))
                set({AuthNeeded : false})
            } catch (err) {
                console.log("Signup error:", err.response?.data || err.message);
            } finally {
                set({ isLoading: false }); // ✅ always chalega
            }
        }

    })
)

export default authStore