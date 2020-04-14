import React from "react";
import Link from "next/link";
import CurpelaWordLogo from "../Sharable/CurpelaWordLogo";
import "./Nav.scss";



const Nav: React.FC = () => {
  return (
    <div className="nav">
      <div className="left-nav">
          <a href="/">
            <CurpelaWordLogo fill="white" width="110" style={{marginTop: "10px"}}/>
          </a>
      </div>

      <div className="right-nav">
        <Link href="/login" >
          <button>Log In</button>
        </Link>
        <Link href="/signup" >
          <button className="signup">Sign Up</button>
        </Link>
      </div>
    </div>
  );
};
export default Nav;
