import React from 'react';
import './style.css';
import Img1 from '../assets/nav1.png';
import Img2 from '../assets/nav2.png';
import Img3 from '../assets/nav3.png';
import Img4 from '../assets/nav4.png';
import Img5 from '../assets/discount.png';
import Img6 from '../assets/nav5.png';

import Icon from '../assets/icon.png';

import { NavLink } from 'react-router-dom';

const data=[
    {image:Img1,text:"Stats",route:'/dashboard'},
    {image:Img2,text:"All Orders",route:'/orders'},
    {image:Img3,text:"All Users",route:'/users'},
    {image:Img6,text:"Manage Banner",route:'/banner'},
    {image:Img4,text:"Manage Items",route:'/products'},
    {image:Img5,text:"Manage Coupon",route:'/coupon'},
]

function SideNav() {
    return (
        <div className='sidenav-container'>
            <div className='div-center my-4'>
                <img src={Icon}></img>
            </div>
            <div className='side-nav'>
           {
               data.map((row)=>(
                   <NavLink to={`${row.route}`}style={{textDecoration:'none'}}>
                        <div className='sideNav-Item px-3'>
                            <img src={row.image} style={{height:'30px',width:'30px'}}></img>
                            <p className='text-white my-2 mx-2' style={{whiteSpace:'nowrap'}}>{row.text}</p>
                        </div>
                   </NavLink>
               ))
            }
            </div>
        </div>
    )
}

export default SideNav
