'use client'
import Link from "next/link";
import './../../styles/util.css'
import './../../styles/analytics.css'
import './../../styles/landing.css'
import { useEffect, createRef } from "react";
import ExpStore from "./../../store/exp.store";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import AnaStore from "@/store/analytics.store";
import ChartDataLabels from "chartjs-plugin-datalabels";


// register required elements
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function PieChart(props){

     const data = {
        labels: props.pieChartData ? props.pieChartData[0] : [],
        datasets: [{
            label: 'Spending',
            data: props.pieChartData ? props.pieChartData[1] : [],
            backgroundColor: [
            "#3B82F6", "#F59E0B", "#10B981", "#EF4444", "#8B5CF6", "#06B6D4", "#F472B6", "#84CC16", "#FB923C", "#14B8A6"
            ],
            hoverOffset: 4
        }]
        };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
        legend: {
            position: "bottom",
            labels: { boxWidth: 12, padding: 12 },
        },
        tooltip: { enabled: true },
        datalabels : {
            color : "#fff",
            font : {
                weight : 'bold',
                size : 12
            }
        }
        
        // title: title ? { display: true, text: title } : undefined,
        },
    };


    return(
        <div style={{ height: `80%`, width: "100%" }}>
            <Pie data={data} options={options} />
        </div>
    )
}