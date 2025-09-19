'use client'
import Link from "next/link";
import './../../styles/util.css'
import './../../styles/analytics.css'
import './../../styles/landing.css'
import { useEffect, createRef } from "react";
import ExpStore from "./../../store/exp.store";
import { Line } from "react-chartjs-2";
import AnaStore from "@/store/analytics.store";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// register required elements

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);


export default function LineChart(props){

    const labels = props.LineChartData[0]
    const values = props.LineChartData[1];

    const data = {
        labels,
        datasets: [
        {
            label: "Monthly Spending (₹)",
            data: values,
            borderColor: "#3B82F6",
            backgroundColor: "#3B82F6",
            tension: 0.3, // smooth line (0 = straight)
        },
        ],
    };

    const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Spending Trend",
      },
    },
  };

    return(
        <div className="heigto" style={{ width: "100%", height: "100%" }}>
            <Line data={data} options={options} />
        </div>
    )
}