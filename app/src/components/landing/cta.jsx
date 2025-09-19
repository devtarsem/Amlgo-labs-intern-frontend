'use client'
import './../../styles/util.css'
import './../../styles/landing.css'
import Image from "next/image";
import home from './../../../public/home2.png'
import Link from "next/link";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";


export default function CTA() {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);
    return(
        <div data-aos="flip-down" className="cta pad48 flex flex-dir gap16 flex-2">
            <h2 className="headcta">Get started with ExpenseNet</h2>
            <p className="desCta">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, corporis sint? Delectus, alias illum? Atque fugit assumenda recusandae dolore nihil tenetur dolores in minus cumque vel? Ratione totam soluta quos?</p>
            <Link href='/dashboard' className="standardbtn">Get started</Link>
        </div>
    )
}