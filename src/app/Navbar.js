'use client';
// components/Navbar.js
import Link from 'next/link';
import '../css/navbar.css'
import { signOut, useSession } from 'next-auth/react';
import logo1 from '../images/logo1.jpg'

const Navbar = () => {
  const { data: session } = useSession();
  console.log(logo1);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link href="/">
            <img src={logo1['src']} className='logo1'></img>
        </Link>
      </div>
      <div className="navbar-right">
        <Link href="/todo">
          <button className="nav-link">Todo</button>
        </Link>
        <Link href="/shared-todo">
          <button className="nav-link">SharedTodo</button>
        </Link>
        <Link href="/finance">
          <button className="nav-link">Finance</button>
        </Link>
        <button className="nav-link" onClick={() => signOut()}>
            Signout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
