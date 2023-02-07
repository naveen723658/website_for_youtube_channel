import React, { useEffect, useState } from "react";
import { FaAngleDoubleRight, FaHome, FaBook } from "react-icons/fa";
import axios from "axios";
const Stotra = () => {
  const [cetegory, setcetegory] = useState([]);
  const [cetegoryitem, setcetegoryitem] = useState([]);
//   const [itemcount, setitemcount] = useState([])
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/home/StotraAndStutiCategory/")
      .then((res) => {
        // console.log(res.data);
        setcetegory(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://127.0.0.1:8000/home/StotraAndStuti/")
      .then((res) => {
        console.log(res.data);
        // console.log(res.data.length)
        setcetegoryitem(res.data);
        
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



  return (
    <>
      <section>
        <div class="page-nav no-margin row">
          <div class="container">
            <div class="row">
              <h2>Stotra & Stuti</h2>
              <ul>
                <li>
                  {" "}
                  <a href="#">
                    <FaHome /> Home
                  </a>
                </li>
                <li>
                  <FaAngleDoubleRight /> Stotra & Stuti
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              {cetegory.map((data, index) => (
                <>
                  <div className="my-4 text-center" key={index}>
                    <p>{data.title}</p>
                    <p>{data.desc}</p>
                    <div className="column col_stotra">
                      {cetegoryitem.filter(item => data.id === item.category.id).map((item, index) => (
                          <>
                          <img
                            className='col-12 col-md-6'
                            src={item.img}
                            alt=""
                            key={index}
                          />
                        </>
                      ))}
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Stotra;
