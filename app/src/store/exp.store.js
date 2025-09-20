import {create} from 'zustand'
import axios from 'axios'
import Swal from 'sweetalert2'
import errorSender from '@/utility/utility'

const ExpStore = create(
    (set,get)=>({
        isLoading : false,
        isLoadingLimit : false,
        showLimitPanel : false,
        openLimitPanel: async()=>{
            set({showLimitPanel : true})
        }
        ,
        closeLimitPanel: async()=>{
            set({showLimitPanel : false})
        }
        ,
        referenceExpenses : [],
        expenses : [],
        spendLimit : 0,
        meta : {
            start : 1,
            end : 6
        }
        ,
        editPanel : false,
        openEditPanel : async()=>{
            set({editPanel : true})
        }
        ,
        closeEditPanel : async()=>{
            set({editPanel : false})
        }
        ,
        addExpense : async(amount, category,pay,notes)=>{
            set({isLoading : true})
            axios({
                method : 'POST',
                url : '/api/expense/add_expense',
                data : {
                    amount,
                    category,
                    
                    pay,
                    notes,
                    token : JSON.parse(localStorage.getItem('AuthExpNet')).user.token
                }
            }).then(res=>{
                if(res.data.status=='success'){
                    set({isLoading : false,expenses : []})
                    get().fetchingExpenses()
                    Swal.fire({
                        title: 'Great',
                        text: 'Expense added!',
                        icon: 'success',
                        confirmButtonText: 'close'
                    })

                }else{
                    set({isLoading : false})
                    Swal.fire({
                        title: 'Ohhh!',
                        text: 'Expense not added!',
                        icon: 'error',
                        confirmButtonText: 'close'
                    })
                }

            })
        }

        ,

        fetchingExpenses : async()=>{
            set({isLoading : true})
            if(get().expenses.length == 0){
                axios({
                    method : 'POST',
                    url : "/api/expense/viewExp",
                    data : {
                        token : JSON.parse(localStorage.getItem('AuthExpNet')).user.token
                    }
                }).then(res=>{
                    if(res.data.status=='success'){
                        set({isLoading : false, referenceExpenses: res.data.expenses,expenses : res.data.expenses.slice(get().meta.start, get().meta.end)})
                    }
                })
            }else{
                set({isLoading : false, expenses : get().expenses.slice(get().meta.start, get().meta.end)})

            }
        }

        ,

        nextPaginate: async()=>{
            const obj = {
                start :  get().meta.start + 5,
                end : get().meta.end + 5

            }
            set({meta : obj})

            const expenses = get().referenceExpenses.slice(obj.start, obj.end)
            set({expenses : expenses})
        }

        ,

        prevPaginate: async()=>{
            const obj = {
                start :  get().meta.start>1 ? get().meta.start - 5 : 1,
                end : get().meta.end >6 ? get().meta.end - 5 : 6

            }
            set({meta : obj})

            const expenses = get().referenceExpenses.slice(obj.start, obj.end)
            set({expenses : expenses})
        }

        ,

        filterationOfExpenses : async(cate,pays)=>{
            console.log(cate, pays)
            if(cate==''){
                cate = 'all'
            }
            if(pays==''){
                pays = 'all'
            }

            console.log(pays)
            let exp = get().referenceExpenses.slice(get().meta.start, get().meta.end);
            exp = exp.filter(el=>{
                if(el.category.trim() == cate.trim() && el.payment_method.trim()==pays.trim()){
                    return el;
                }else if(cate.trim()=='all' &&  el.payment_method.trim()==pays.trim()){
                    return el;
                }else if(pays.trim()=='all' && el.category.trim() == cate.trim() ){
                    console.log("passed")
                    return el
                }
            })
            set({expenses : exp})


        }
        ,

        resetFilters : async()=>{
            set({expenses : get().referenceExpenses.slice(get().meta.start, get().meta.end)})
        }

        ,

        editExpense : async(amount, category, pays, notes,id)=>{
            set({isLoading:true})
            axios({
                method : 'POST',
                url : "/api/expense/edit_expenses",
                data : {
                    amount,
                    category,
                    pays,
                    notes,
                    id
                }
            }).then(res=>{
                if(res.data.status == 'success'){
                    set({isLoading:false, expenses : [], editPanel: false})
                    get().fetchingExpenses()
                }
            })

            
        }

        ,

        deleteExpense : async(id)=>{
            set({isLoading : true})
            axios({
                method : "POST",
                url : "/api/expense/delete",
                data : {
                    id
                }
            }).then(res=>{
                if(res.data.status=='success'){
                    set({isLoading : false, expenses : []})
                    get().fetchingExpenses()
                }
            })
        }

        ,

        search : async(str)=>{
            let exp = get().referenceExpenses.slice(get().meta.start, get().meta.end)
            let searchArr = []
            
            console.log(searchArr)
            exp = exp.filter(el=>{
                if(el.category.toLowerCase().includes(str.toLowerCase())){
                    return el
                }
            })

            console.log(exp)

            set({expenses : exp})
        }

        ,

        saveMonthlyReport : async()=>{
            let exp = get().referenceExpenses
            let month = new Date().getMonth()+1
            console.log(month)
            let spending = 0
            exp = exp.filter(el=>{
                console.log(el.Date.split('/')[1])
                if(Number(el.Date.split('/')[1])==Number(month)){
                    spending += el.amount
                    return el
                }
            })
            const obj = {
                user_id : exp[0].user,
                month : `${month}-${new Date().getFullYear()}`,
                total_spend : spending
            }
            set({isLoading : true})
            axios({
                method : "POST",
                url : "https://amlgo-labs-flask-api.onrender.com/monthly-report",
                data : obj
            }).then(res=>{
                console.log(res)
                set({isLoading : false})
                errorSender("success", "Month report till now saved")

            })
        }
        ,

        fetchMonthlyReport : async()=>{
            axios({
                method : 'POST',
                url : "http://127.0.0.1:5000/history",
                data : '68ccee39cf3d8bd5d272a46f'
            }).then(res=>{
                console.log(res)
            })
        }

        ,

        monthlySpendLimit: async(limit)=>{
            set({isLoadingLimit : true})
            axios({
                method : 'POST',
                url : "/api/expense/limit",
                data : {
                    token : JSON.parse(localStorage.getItem('AuthExpNet')).user.token,
                    limit : limit
                }
            }).then(res=>{
                if(res.data.status=='success'){
                    console.log(res)
                    localStorage.setItem("SpendLimit", res.data.limit)
                    set({spendLimit : res.data.limit, isLoadingLimit : false, showLimitPanel: false})
                    // errorSender('success', "Spending limit added")
                }
            })
        }

    })
)

export default ExpStore