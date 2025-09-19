import {create} from 'zustand'
import axios from 'axios'
import Swal from 'sweetalert2'

const AnaStore = create(
    (set,get)=>({
        currentMonthSpending : '',
        isLoading : false,
        top3catagories :[],
        top3pays : [],
        pieChartData : [],
        LineChartData : [],

        currspending : async()=>{
            set({isLoading : true})
            axios({
                method : 'POST',
                url : '/api/analytics/spendings',
                data : {
                    token : JSON.parse(localStorage.getItem('AuthExpNet')).user.token
                
                }
            }).then(res=>{
                if(res.data.status=='success'){
                    console.log()
                    set({currentMonthSpending : res.data.expense, isLoading:false})
                }
            })
        }
        ,

        topSpendingCatagories : async()=>{
            set({isLoading : true})
            axios({
                method : 'POST',
                url : "/api/analytics/topSpend",
                data : {
                    token : JSON.parse(localStorage.getItem('AuthExpNet')).user.token

                }
            }).then(res=>{
                if(res.data.status=='success'){
                    set({isLoading : false, top3catagories : res.data.categories_cata, top3pays: res.data.categories_pay})
                    // pie chart data
                    let labelArr = []
                    let valueArr = []
                    let comboArr = res.data.categories_cata
                    comboArr.forEach(el=>{
                        labelArr.push(el.category)
                        valueArr.push(el.spend)
                    })
                    set({pieChartData : [labelArr, valueArr]})
                    console.log(labelArr, valueArr)
                    // line chart data
                    let labelarr1 = []
                    let valuearr1 = []
                    let comboArr1 = res.data.categories_date
                    comboArr1.forEach(el=>{
                        labelarr1.push(el.Date)
                        valuearr1.push(el.spend)
                    })
                    set({LineChartData : [labelarr1, valuearr1]})

                    console.log(res.data.categories_date)
                }
            })
        }
    })
)

export default AnaStore