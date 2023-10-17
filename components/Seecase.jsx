import React, { useState, useContext, useEffect, useRef } from "react";
import { cartcontext } from "../cartproviders/cartprovider";
import Caseadding from "./Caseadding";
import Loadingskeleton from './Loadingskeleton'

export default function Seecase() {
  const [cases, setcases] = useState([]);
  const nextdate = useRef();
  const [clickadd, setclickadd] = useState(false);
  const [left, setleft] = useState(0);
  const [id, setid] = useState("");
  const {
    user,
    setuser,
    judge,
    setcaseinfo,
    setjudge,
    modal,
    admin,
    client,
    casedetails,
    setcasedetails,
    advocate,
    ismodalopen,
  } = useContext(cartcontext);
  async function handleaddcase() {
    setclickadd(true);
  }
  function handleclosemodal() {
    modal ? ismodalopen(false) : ismodalopen(true);
  }
  async function handleeditchange() {
    console.log(nextdate.current.value);
  }
  useEffect(() => {
    const screenWidth = window.innerWidth;
    console.log(screenWidth);
    var leftPosition = (screenWidth - 500) / 2 + "px";
    setleft(leftPosition);
  }, []);
  useEffect(() => {
    fetchs().then((res) => {
      res.json().then((r) => {
        setcases(r);
      });
    });
  }, []);
  async function fetchs() {
    const data = await fetch("http://localhost:3000/api/casesee", {
      method: "POST",
      body: JSON.stringify({
        _id: user.mainuser._id,
        admin: admin,
        judge: judge,
        client: client,
        advocate: advocate,
      }),
    });

    return data;
  }
  let user1 = "";
  if (client) {
    user1 = "client";
  } else if (advocate) {
    user1 = "advocate";
  } else if (judge) {
    user1 = "judge";
  } else {
    user1 = "admin";
  }
  function showmodal() {
    modal ? ismodalopen(false) : ismodalopen(true);
  }
  function handleedit(index) {
    const element = window.document.getElementById(index);
    element.style = "display:'block'";
  }
  async function handlechangedate(e) {
    console.log(id);
    let nextdatea = "";
    await fetch("http://localhost:3000/api/addhearingdate", {
      method: "POST",
      body: JSON.stringify({
        _id: id,
        nexthearingdate: nextdate.current.value,
        hearingdates: "",
      }),
    });
  }
  async function handleshowinfo() {
    setcasedetails(true);
  }
  return (
    <>
      {modal && (
        <>
          <div
            className="judgemodalanimate container z-[99] grid   p-10"
            style={{
              position: "fixed",
              width: `500px`,
              left: `${left}`,
              top: "15px",
            }}
          >
            <label htmlFor="nexthearingdate" className="h-[25px]">
              {" "}
              Next Hearing Date
            </label>
            <input
              id="nexthearingdate"
              onChange={handleeditchange}
              className="input h-[15px] "
              type="date"
              ref={nextdate}
            ></input>
            <span className="outline1 "></span>
            <button className="absolute right-5" onClick={handleclosemodal}>
              X
            </button>
            <button
              className="self-center container buttonborder p-1 pl-2 pr-2 text-xl font-semibold"
              onClick={handlechangedate}
            >
              Submit
            </button>
          </div>
        </>
      )}
      {!clickadd && (
        <div className={`h-[93vh] ${modal ? "change" : ""}`}>
          <div className=" w-auto">
            {user1 == "admin" && (
              <div>
                <button
                  onClick={handleaddcase}
                  className="container buttonborder p-2 pl-4 pr-4 text-xl font-semibold "
                >
                  Add Case
                </button>
                <hr
                  className={`ml-[30px] mr-[30px] ${modal ? "hidden" : ""}`}
                ></hr>
              </div>
            )}
            <div
              className={`container grid  z-[98]  ${modal ? "loweranimate" : ""
                }`}
              style={{ overflowY: "auto", maxHeight: "500px", paddingBottom: "20px" }}
            >
              <h1 className="tableh1 text-2xl font-bold">Cases Assgined</h1>
              <div className="table justify-self-center">
                <table style={{ overflowY: "auto", maxHeight: "300px" }}>
                  <thead className="tableheader ">
                    <tr className="tablerow ">
                      <th style={{ borderTopLeftRadius: "20px" }}>S.No</th>
                      <th>Case Type</th>
                      <th>Court</th>
                      <th>Court Number</th>
                      <th>Status</th>

                      {judge && <th style={{ borderTopRightRadius: "20px" }}></th>}
                    </tr>
                  </thead>

                  <tbody className="tablebody">
                    { ( cases.length==0 && <><Loadingskeleton number={6}/></>) ||
                       
                    cases.map((data, index) => {
                      return (
                        <tr
                          onClick={function () {
                            setcasedetails(true);
                            setcaseinfo(data);
                          }}
                          height={"10"}
                        >
                          <td
                            className={`showinfos ${index + 1 == cases.length ? "td1radius" : ""
                              }`}
                          >
                            {index + 1}
                          </td>
                          <td>{data.casetype}</td>
                          <td>{data.court}</td>
                          <td>{data.courtnumber}</td>
                          <td
                            className={`${index + 1 == cases.length ?!judge? "tdlastradius":"" : ""
                              }`}
                          >
                            {data.act}
                          </td>
                          {judge && (
                            <td
                              className={`${index+1==cases.length ?"tdlastradius":""} text-3xl font-bold `}
                              onClick={() => {
                                const element =
                                  window.document.getElementById(index);
                                setid(data._id);
                                element.style.display == "none"
                                  ? (element.style.display = "block")
                                  : (element.style.display = "none");
                                for (let i = 0; i < cases.length; i++) {
                                  if (i !== index) {
                                    const el = window.document.getElementById(
                                      `${i}`
                                    );
                                    el.style.display = "none";
                                  }
                                }
                              }}
                            >
                              <sup>...</sup>
                              <div
                                className="z-[99] container h-24 w-32    "
                                id={index}
                                style={{
                                  display: "none",
                                  position: "absolute",
                                  margin: "0px",
                                  height: "96px",
                                  width: "128px",
                                }}
                              >
                                <p onClick={showmodal}>NExt date</p>
                              </div>
                            </td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                  <tbody></tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      {clickadd && <Caseadding />}
    </>
  );
}
