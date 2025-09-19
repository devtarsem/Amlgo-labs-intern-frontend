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
                <a href='#' className="navLnk">Features</a>
                <a href='#' className="navLnk">Testimonies</a>
                <a href='#' className="navLnk">Try our dashbaord</a>
            </div>
            {/* <div className="auths flex flex- gap48">
                <Link href='/' className="authbtns" >Login</Link>
                <Link href='/' className="authbtns" >Sign Up</Link>

            </div> */}
        </div>
        <div className="content flex flex-2 flex-dir gap16">
            <h2 data-aos="zoom-in" className="contHead">Our expense dashboard will makes you save more</h2>
            <p data-aos="zoom-out" className="des">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque omnis officiis nemo minima quam magni ipsum praesentium esse reiciendis dolorum, impedit in quibusdam a amet blanditiis illo dolor maxime molestiae!. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur, recusandae fugit itaque dolorum totam, optio maxime eaque velit ea consectetur nam nemo, ab delectus beatae accusamus a laboriosam dicta aliquid.</p>
            <div data-aos="flip-down" className="btns flex flex-2 gap16">
                <Link href='/dashboard' className="btnsHead" >Try our dashboard!</Link>
                <Link href='/dashboard' className="btnsHead btnsHead__"  >Explore more</Link>
            </div>
        </div>
    </div>
  );
}
