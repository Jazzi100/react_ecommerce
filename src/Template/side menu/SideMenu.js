import React, { useState } from "react";
import './sideMenuStyle.css';
import './sideMenuScript.js';
import CategoryList from "../../Components/CategoryList.js";

function SideMenu() {
  const [isBtnClicked, setBtnClicked] = useState(false);
  const [isFeatBtnClicked, setFeatBtnClicked] = useState(false);
  const [isServBtnClicked, setServBtnClicked] = useState(false);

  const handleBtnClick = () => {
    setBtnClicked(isBtnClicked);
    document.querySelector('.sidebar').classList.add("show");
  };

  const handleFeatBtnClick = () => {
    setFeatBtnClicked(!isFeatBtnClicked);
    document.querySelector('nav ul .feat-show').classList.toggle("show");
    document.querySelector('nav ul .first').classList.toggle("rotate");
  };

  const handleServBtnClick = () => {
    setServBtnClicked(!isServBtnClicked);
    document.querySelector('nav ul .serv-show').classList.toggle("show1");
    document.querySelector('nav ul .second').classList.toggle("rotate");
  };

  const handleNavItemClick = (event) => {
    const clickedItem = event.target;
    clickedItem.classList.add("active");
    const siblings = [...clickedItem.parentElement.children].filter(child => child !== clickedItem);
    siblings.forEach(sibling => sibling.classList.remove("active"));
  };

  return (
    <>
      {/* <div className={`btn ${isBtnClicked ? 'click' : ''}`} onClick={handleBtnClick}>
        <span className="fas fa-bars"></span>
      </div>
      <nav className="sidebar">
        <div className="text">
          Side Menu
        </div>
        <ul>
          <li className="active"><a href="#" onClick={handleNavItemClick}>Dashboard</a></li>
          <li>
            <a href="#" className={`feat-btn ${isFeatBtnClicked ? 'rotate' : ''}`} onClick={handleFeatBtnClick}>
              Features
              <span className="fas fa-caret-down first"></span>
            </a>
            <ul className={`feat-show ${isFeatBtnClicked ? 'show' : ''}`}>
              <li><a href="#" onClick={handleNavItemClick}>Pages</a></li>
              <li><a href="#" onClick={handleNavItemClick}>Elements</a></li>
            </ul>
          </li>
          <li>
            <a href="#" className={`serv-btn ${isServBtnClicked ? 'rotate' : ''}`} onClick={handleServBtnClick}>
              Services
              <span className="fas fa-caret-down second"></span>
            </a>
            <ul className={`serv-show ${isServBtnClicked ? 'show1' : ''}`}>
              <li><a href="#" onClick={handleNavItemClick}>App Design</a></li>
              <li><a href="#" onClick={handleNavItemClick}>Web Design</a></li>
            </ul>
          </li>
          <li><a href="#" onClick={handleNavItemClick}>Portfolio</a></li>
          <li><a href="#" onClick={handleNavItemClick}>Overview</a></li>
          <li><a href="#" onClick={handleNavItemClick}>Shortcuts</a></li>
          <li><a href="#" onClick={handleNavItemClick}>Feedback</a></li>
        </ul>
      </nav>
      <div className="content">
        <div className="header">
          Sidebar Menu with sub-menu
        </div>
        <p>
          HTML CSS & Javascript (Full Tutorial)
        </p>
      </div> */}
      <CategoryList />
    </>
  );
}

export default SideMenu;
