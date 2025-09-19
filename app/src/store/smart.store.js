import {create} from 'zustand'
import axios from 'axios'

const smartStore = create(
    (set,get)=>({
        last10Days : [],
        suggestions : [],
        isLoading : false,
        suggestion_panel : false,
        openSuggestionPanel : async()=>{
            set({suggestion_panel : true})
        }
        ,
        closeSuggestionPanel : async()=>{
            set({suggestion_panel : false})
        }
        ,
        fetchLastTenDays : async()=>{
            axios({
                method : "POST",
                url : "/api/smart/lastTen",
                data : {
                    token : JSON.parse(localStorage.getItem('AuthExpNet')).user.token
                }
            }).then(res=>{
                if(res.data.status=='success'){
                    set({last10Days : res.data.last10Data})
                    console.log(res.data.last10Data)
                }
            })
        }
        ,

        getSmartSuggestion : async()=>{
            set({isLoading : true})
            axios({
                method : 'POST',
                url : "https://amlgo-labs-flask-api.onrender.com/suggestions",
                data : get().last10Days
                
            }).then(res=>{
                console.log()
                set({suggestions : res.data.your_data, isLoading: false, suggestion_panel: true})
            })
        }
    })
)

export default smartStore