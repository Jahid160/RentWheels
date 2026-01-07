import React from "react";
import { Link, NavLink } from "react-router";

import { BsFacebook, BsLinkedin, BsTwitterX } from "react-icons/bs";
import { ImGithub } from "react-icons/im";

const Footer = ({scrollToContact}) => {
  return (
 <footer className="footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10 mt-5">
  <nav className="grid grid-flow-col gap-4">
    <Link className="link link-hover">About us</Link>
    <Link onClick={scrollToContact} className="link link-hover">Contact</Link>
    
    
  </nav>
  <nav>
    <div className="grid grid-flow-col gap-4">
      <Link to={'https://www.facebook.com'}>
        <BsFacebook size={24}/>
      </Link>
      <Link to={'https://www.x.com'}>
        <BsTwitterX size={24}/>
      </Link>
      <Link to={'https://www.linkedin.com/in/md-zahid-hasan12/'}>
        <BsLinkedin size={24}/>
      </Link>
      <Link to={'https://github.com/Jahid160'}>
        <ImGithub size={24}/>
      </Link>

    </div>
  </nav>
  <aside>
    <p>Copyright © {new Date().getFullYear()} - All right reserved by Md Zahid Hasan</p>
  </aside>
</footer>
  );
};

export default Footer;
