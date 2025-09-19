'use client'
import Link from "next/link";
import './../../styles/util.css'
import './../../styles/analytics.css'
import './../../styles/landing.css'
import './../../styles/media.css'

import { useEffect, createRef } from "react";
import ExpStore from "./../../store/exp.store";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import AnaStore from "@/store/analytics.store";
import ChartDataLabels from "chartjs-plugin-datalabels";
import PieChart from "./pie";
import { Pie } from "react-chartjs-2";
import LineChart from "./line";

// register required elements
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function AnalyticsComp() {

    const {currentMonthSpending,pieChartData, currspending,isLoading, LineChartData,topSpendingCatagories, top3catagories, top3pays} = AnaStore()
    useEffect(el=>{
        currspending()
    }, [])

    useEffect(el=>{
        topSpendingCatagories()
    },[])

   

    return(
        <div className="analytics_grid grid grid-7-col gap16">
            <div className="monthlySpebnd flex flex-2 flex-dir gap16">
                <p className="currExp">Expense in <br/> September</p>
                <p className="amt">₹{currentMonthSpending=='' ? 'Wait...' : currentMonthSpending}/-</p>
            </div>
            <div className="TopCategory flex flex-dir gap16 pad16">
                <h2 className="anaHead">Top spending categories</h2>
                <div className="catalog grid grid-3-col gap16">
                    {isLoading &&
                        <div className="holdon">
                            <p className="wait">Please wait...</p>
                        </div>
                    }
                    {top3catagories.slice(0,3)?.map(el=>
                        <div className="cata flex flex-dir gap4 flex-2 pad8">
                            <p className="cataname">{el.category}</p>
                            <p className="cataname">₹{el.spend.toFixed(1)}/-</p>

                        </div>
                    )}
                </div>
            </div>
            <div className="topPays flex flex-dir gap16 pad16">
                <h2 className="anaHead">Top Payment method used</h2>
                <div className="grid grid-3-col gap16">
                    {isLoading &&
                        <div className="holdon">
                            <p className="wait">Please wait...</p>
                        </div>
                    }
                    {top3pays?.slice(0,3)?.map(el=>
                        <div className="cata flex flex-dir gap4 flex-2 pad8">
                            <p className="cataname">{el.payment_method}</p>
                            <p className="cataname">₹{el.spend.toFixed(1)}/-</p>

                        </div>
                    )}
                </div>
            </div>
            <div className="Pie flex flex-2">
                {isLoading &&
                    <div className="holdon">
                        <p className="wait">Please wait...</p>
                    </div>
                }
                <PieChart pieChartData={pieChartData} />
            </div>
            <div className="line pad16">
                {isLoading &&
                    <div className="holdon">
                        <p className="wait">Please wait...</p>
                    </div>
                }
                <LineChart LineChartData={LineChartData} />
            </div>

        </div>
    )
}