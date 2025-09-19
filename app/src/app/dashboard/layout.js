import Image from "next/image";
import Link from "next/link";
import Navbar from './../../components/navbar'
import './../../styles/util.css'
import './../../styles/dashboard.css'


export default function DashboardLayout({children}) {
  return (
    <div className="grid grid-12-col">
      <div className="sidenav pad16">
        <Navbar/>
      </div>
      <div className="childcompoents">
        <div className="topFixNav pad16 flex flex-1">
          <p className="date">Its &mdash; {new Date().toLocaleDateString()}</p>
        </div>
        <div className="innerComps pad16">
          <div className="innerCompArea pad16">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
