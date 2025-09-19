'use client'
import Link from "next/link";
import './../../styles/util.css'
import './../../styles/landing.css'
import Image from "next/image";
import home from './../../../public/home2.png'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";


export default function Add() {

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);


    return(
        <div className="add flex flex-dir gap96 pad96">
            <h2 data-aos="slide-down" className="addHead">Easy to use interface</h2>
            <div className="grid grid-2-col gap48">
                <Image data-aos="slide-right" src={home} className="uiimg" alt="dashboard image"/>
                <div data-aos="slide-left" className="cont pad16 flex flex-dir gap16 flex-2">
                    <h2 className="addHead">How easy to use it</h2>
                    <ul className="list__ flex flex-dir gap16">
                        {[1,2,3,4].map((el,index)=>
                            <li><span>{index+1}.)</span> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate repellendus officiis non accusamus possimus voluptatum distinctio architecto corporis, natus dicta facilis inventore, reprehenderit a ullam soluta, consequuntur ad velit numquam!</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}