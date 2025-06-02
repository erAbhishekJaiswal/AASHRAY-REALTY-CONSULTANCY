// import React from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   return (
//     <>
//     <div className='navbar'>
//         <div className="navbar-innerbox">
//             <div className="log-box">
//                 <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
//                     ARC
//                 </Link>
//             </div>
//             <div className="log-box"> 
//                 <ul>
//                     <li>
//                         <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
//                             Home
//                         </Link>
//                     </li>
//                     <li>
//                         <Link to='/properties' style={{ textDecoration: 'none', color: 'inherit' }}>
//                         Property List
//                         </Link>
//                     </li>
//                     <li>
//                         <Link to="/properties/new" style={{ textDecoration: 'none', color: 'inherit' }}>
//                             Add Property
//                         </Link>
//                     </li>
//                 </ul>
//             </div>
//         </div>
//     </div>
//     </>

//   );
// };

// export default Navbar;









import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../cssFiles/Navbar.css";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='navbar'>
      <div className="navbar-innerbox">
        <div className="log-box">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Gyaat
          </Link>
          <div className="menu-toggle" onClick={toggleMenu}>
            {isMenuOpen ? '✕' : '☰'}
          </div>
        </div>
        <div className="log-box">
          <ul className={isMenuOpen ? 'active' : ''}>
            <li>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/oldpage" onClick={() => setIsMenuOpen(false)}>
                Old Page
              </Link>
            </li>
            <li>
              <Link to='/properties' onClick={() => setIsMenuOpen(false)}>
                Property List
              </Link>
            </li>
            <li>
              <Link to="/properties/new" onClick={() => setIsMenuOpen(false)}>
                Add Property
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;