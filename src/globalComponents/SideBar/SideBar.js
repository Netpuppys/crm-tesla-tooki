import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import tookiLogo from "../../assets/Logos/tookiLogo.png"
import { MdAnalytics } from "react-icons/md";
import "../../styles/globalComponents/SideBar.css"

const sideBarItems = [
    {
        label: "menu",
        items: [
            { icon: <MdAnalytics />, label: "Analytics", link: "/analytics" },
            // { icon: <MdAnalytics />, label: "Admin management", link: "/admin-management" },
            { icon: <MdAnalytics />, label: "Franchise List", link: "/franchise-list" },
            { icon: <MdAnalytics />, label: "Driver List", link: "/driver-list" },
            { icon: <MdAnalytics />, label: "User List", link: "/user-list" },
            { icon: <MdAnalytics />, label: "communities", link: "/communities" },
            // { icon: <MdAnalytics />, label: "Customer Requests", link: "/" },
            { icon: <MdAnalytics />, label: "Franchise Addition", link: "/franchise-addition" },
            { icon: <MdAnalytics />, label: "Drivers Addition", link: "/driver-addition" },
        ]
    },
    // {
    //     label: "others",
    //     items: [
    //         { icon: <MdAnalytics />, label: "feedback", link: "/feedback" },
    //         { icon: <MdAnalytics />, label: "contact us", link: "/contact-us" },
    //         // { icon: <MdAnalytics />, label: "help", link: "/" },
    //     ]
    // },
]

const SideBar = () => {
    const location = useLocation();
    const [ currentEndPath, setCurrentEndPath ] = useState()

    // useEffect(() => {
    //     console.log(currentEndPath)
    // }, [currentEndPath])

    useEffect(() => {
        const paths = location.pathname.slice(1).split("/");
        setCurrentEndPath("/" +paths[0])
    }, [location.pathname])
        
  return (
    <div className='sidebar-main-div relative pb-20'>
        <div className='sidebar-logo-container'>
            <img 
                src={tookiLogo} 
                className='main-logo-sidebar' 
                alt="tooki" 
            />
        </div>
        <div className='main-content-sidebar'>
            {sideBarItems.map((menu, index) => (
                <div className='main-menu-div' key={index}>
                    {/* <p className='menu-title'>
                        {menu.label}
                    </p> */}
                    <div className='menu-items-div'>
                        {menu.items.map((item, id) => (
                            <Link 
                                key={id} 
                                to={item.link}
                                className={currentEndPath === item.link? 'sidebar-item-div active-link' : 'sidebar-item-div'}
                            >   
                                <div className='item-icon'>
                                    {item.icon}
                                </div>
                                <p className='sidebar-item-text'>
                                    {item.label}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default SideBar