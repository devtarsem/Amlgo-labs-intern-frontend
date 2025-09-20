'use client'
import Link from "next/link";
import './../../styles/util.css'
import './../../styles/landing.css'
import './../../styles/media.css'

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

export default function Header() {


    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);


  return (
    <div className="header">
        <div data-aos="slide-down" className="topNav pad16 flex flex-1 gap16">
            <div className="logo">
                <h1 className="head1">ExpenseNet</h1>
            </div>
            <div className="navigations flex flex- gap48">
                {/* <a href='#features' className="navLnk">Features</a> */}
                {/* <a href='#easy' className="navLnk">How easy it is</a> */}
                <Link href='/dashboard/add-expense' className="navLnk">Try it now</Link>

            </div>
            {/* <div className="auths flex flex- gap48">
                <Link href='/' className="authbtns" >Login</Link>
                <Link href='/' className="authbtns" >Sign Up</Link>

            </div> */}
        </div>
        <div className="content flex flex-2 flex-dir gap16">
            <h2 data-aos="zoom-in" className="contHead">Our expense dashboard will makes you save more</h2>
            <p data-aos="zoom-out" className="des">We will manage your expenses much better than you and gives a oppertunity to save lot more in you pocket, welcome to ExpenseNet, where you can manage your expenses like a hero, we have expense tracking ,smart suggestions and great analytics for you.</p>
            <div data-aos="flip-down" className="btns flex flex-2 gap16">
                <Link href='/dashboard/add-expense' className="btnsHead" >Try our dashboard!</Link>
                <Link href='/dashboard' className="btnsHead btnsHead__"  >Explore more</Link>
            </div>
        </div>
    </div>
  );
}
