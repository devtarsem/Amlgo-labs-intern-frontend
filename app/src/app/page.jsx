import Image from "next/image";
import './../styles/util.css'
import Feature from "@/components/landing/features";
import Header from "@/components/landing/header";
import Add from "@/components/landing/add";
import CTA from "@/components/landing/cta";
import Footer from "@/components/landing/footer";
// import './../styles/media.css'

export default function Home() {
  return (
    <div className="main flex flex-dir">
      <Header/>
      <Feature/>
      <Add/>
      <CTA/>
      <Footer/>
    </div>
  );
}
