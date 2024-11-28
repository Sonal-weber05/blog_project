import { useEffect, useState } from 'react'
import './sidebar.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    const [cats,setCats]=useState([]);

    useEffect(()=>{
        const getCats = async ()=>{
            const res = await axios.get("/categories")
            setCats(res.data);
        }
        getCats();
    },[])
  return (
    <div className='sidebar'>
        <div className="sidebarItem">
            <span className="sidebarTitle">ABOUT ME</span>
            <img src='https://img.freepik.com/premium-photo/beautician-doctor-successful-entrepreneur-woman-smiling-aesthetic-professional-businesswoman-typing-notebook-looking-camera_579344-1066.jpg' alt=''/>
            <p>Welcome to Blogify, your go-to platform for seamless blogging experiences! Whether you're an aspiring writer or a seasoned content creator, Blogify makes it easy to start your blogging journey. Our intuitive interface and powerful features allow you to focus on what matters most—creating and sharing your ideas with the world.

At Blogify, we believe that everyone has a story to tell, and we're here to provide the tools to help you bring that story to life. From user-friendly post management to customizable profiles, we ensure that your experience is both smooth and enjoyable.</p>
        </div>
        <div className='sidebarItem'>
            <span className='sidebarTitle'>CATEGORIES</span>
            <ul className="sidebarList">
                {cats.map((c)=>(
                    <Link className='link' to={`/?cat=${c.name}`}>
                <li className="sidebarListItem">{c.name}</li>

                    </Link>

                ))}
                
            </ul>
        </div>
        <div className="sidebarItem">
            <span className="sidebarTitle">FOLLOW US</span>
            <div className="sidebarSocial">
                <i className="sidebarIcon fa-brands fa-square-facebook"></i>
        <i className="sidebarIcon fa-brands fa-square-twitter"></i>
        <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
        <i className="sidebarIcon fa-brands fa-square-instagram"></i>
            </div>
        </div>
    </div>
  )
}
