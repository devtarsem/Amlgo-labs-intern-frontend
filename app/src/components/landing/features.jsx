'use client'
import Link from "next/link";
import './../../styles/util.css'
import './../../styles/media.css'

import './../../styles/landing.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import plus from './../../../public/plus.png'
import pen from './../../../public/pen.png'
import expense from './../../../public/expenses.png'
import piec from './../../../public/pie-chart1.png'
import idea from './../../../public/idea.png'

import money from './../../../public/money.png'
import Image from "next/image";

export default function Feature() {

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const feat = [
        ["Expense addition", "User could very easily add their expenses by providing the necessary credentials, the expense addition is very simple wih pre builded categories and payment methods", plus],
        ['Expense editing', "User could very easily update their expenses on day to day basic and delete the unnecessary expenses or fault expenses and this all happen with just one single click", pen],
        ['Month budget', "User could set their monthy budget and the system automatically rack the expenses and oncethe limit ofbudget hitted that particular signal is visible in the analytics", money],
        ['Month expense saving', 'User can easily save their total montly expenses as a backup in our secure database and get access later when ever is needed', expense],
        ['Analytics', 'We have great analytics for you to track your expenses we will give you current month tracking, top categories tracking where you spend the most and much more on dashboard.', piec],
        ['Smart suggestions', 'Based on your last 10 days of expenses we have smart suggestion feature for you, that help you to analyze and save more by giving great insights',idea]
    ]

    return(
        <div id="feature" className="feature pad96 flex flex-dir  gap48">
            <h1 data-aos="fade-down" className="featurehead">What we offer</h1>
            <div data-aos="slide-up" className="feaList grid grid-3-col ">
                {feat.map(el=>
                    <div key={el[0]} className="fea flex flex-2 flex-dir gap16 pad32">
                        <Image src={el[2]} className='imageFEa' alt='feature logos'/>
                        <h2 className="feahead">{el[0]}</h2>
                        <p className="feades">{el[1]}</p>
                    </div>
                )}
            </div>
        </div>
    )
}