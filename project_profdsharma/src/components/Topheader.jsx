import React from 'react'
import { FaAngleDoubleRight, FaHome, FaBook } from "react-icons/fa";
const Topheader = ({title, address, subtitle}) =>{
    return(
        <>
        <div className="page-nav no-margin row">
          <div className="container">
            <div className="row">
              <h2>{title && title}</h2>
              <ul>
                <li>
                  {" "}
                  <a href="#">
                    <FaHome /> Home
                  </a>
                </li>
                <li>
                  <FaAngleDoubleRight /> {subtitle && subtitle}
                </li>
              </ul>
            </div>
          </div>
        </div>
        </>
    )
}
export default Topheader;