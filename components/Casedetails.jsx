import React, { useContext, useEffect, useRef, useState } from "react";
import { cartcontext } from "../cartproviders/cartprovider";
import Loadingskeleton from './Loadingskeleton'

export default function Casedetails() {
  const { caseinfo, modal, ismodalopen, judge,setloading } = useContext(cartcontext);
  const [respondentdetails, setrespondentdetails] = useState(false);
  const [clientdetails, setclientdetails] = useState(true);
  const [casedetails, setcasedetails] = useState(false);
  const [history, sethistory] = useState(false);
  const [pastdates, setpastdates] = useState([]);
  const conclusion=useRef()
  const [index1,setindex]=useState(0)
  const [left, setleft] = useState(0);
  async function handleeditchange() {}
  async function handleaddconclusion(index){
    console.log(index)
    setloading(true)
      await fetch('http://localhost:3000/api/addconclusion',{
        method:"POST",
    body:JSON.stringify({
      index:Number(index),
      _id:caseinfo._id,
      hearingdates:caseinfo.hearingdates,
      conclusion:conclusion.current.value
    })
      })
      setloading(false)
  }
  useEffect(() => {
    const screenWidth = window.innerWidth;
    console.log(screenWidth);
    var leftPosition = (screenWidth - 500) / 2 + "px";
    setleft(leftPosition);
  }, []);
  console.log(caseinfo);
  function handleclosemodal() {
    modal ? ismodalopen(false) : ismodalopen(true);
  }
  function showmodal() {
    modal ? ismodalopen(false) : ismodalopen(true);
  }
  useEffect(() => {
    setpastdates([]);
    if (caseinfo.hearingdates) {
      caseinfo.hearingdates.map((data) => {
        let date = new Date();
        if (data.date) {
          setpastdates((prev) => [...prev, data.date]);
        }
      });
    }
  }, []);
  const [b2, setb2] = useState(false);
  const [b3, setb3] = useState(false);
  const [b4, setb4] = useState(false);

  const [b1, setb1] = useState(false);
  function handleclick(e) {
    e.target.innerText == "Client Details" &&
      (setclientdetails(true) ||
        setrespondentdetails(false) ||
        setcasedetails(false) ||
        sethistory(false) ||
        setb2(false) ||
        setb3(false) ||
        setb1(true) ||
        setb4(false));
    e.target.innerText == "Respondent Details" &&
      (setclientdetails(false) ||
        setrespondentdetails(true) ||
        setcasedetails(false) ||
        sethistory(false) ||
        setb2(true) ||
        setb3(false) ||
        setb1(false) ||
        setb4(false));
    e.target.innerText == "Case Details" &&
      (setclientdetails(false) ||
        setrespondentdetails(false) ||
        setcasedetails(true) ||
        sethistory(false) ||
        setb2(false) ||
        setb3(true) ||
        setb1(false) ||
        setb4(false));
    e.target.innerText == "History" &&
      (setclientdetails(false) ||
        setrespondentdetails(false) ||
        setcasedetails(false) ||
        sethistory(true) ||
        setb2(false) ||
        setb3(false) ||
        setb1(false) ||
        setb4(true));
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
Conclusion            </label>
            <input
              id="nexthearingdate"
              onChange={handleeditchange}
              className="input h-[15px] "
              type="text"
              ref={conclusion}
            ></input>
            <span className="outline1 "></span>
            <button className="absolute right-5" onClick={handleclosemodal}>
              X
            </button>
            <button
              className="self-center container buttonborder p-1 pl-2 pr-2 text-xl font-semibold"
              onClick={()=>{
                handleaddconclusion(index1)
              }}
            >
              Submit
            </button>
          </div>
        </>
      )}
      <div className="h-[93vh] flex gap-0 flex-col">
        <div className="flex flex-row items-center justify-center mb-0 gap-1">
          <button
            className={`container ${b1 ? "buttonanimate" : ""}`}
            onClick={handleclick}
            style={{ height: "7vh", width: "10vw" }}
          >
            Client Details
          </button>
          <button
            className={`container ${b2 ? "buttonanimate" : ""}`}
            style={{ height: "7vh", width: "10vw" }}
            onClick={handleclick}
          >
            Respondent Details
          </button>
          <button
            className={`container ${b3 ? "buttonanimate" : ""}`}
            onClick={handleclick}
            style={{ height: "7vh", width: "10vw" }}
          >
            Case Details
          </button>
          <button
            className={`container ${b4 ? "buttonanimate" : ""}`}
            onClick={handleclick}
            style={{ height: "7vh", width: "10vw" }}
          >
            History
          </button>
        </div>

        {clientdetails && (
          <>
            {" "}
            <div
              className="grid grid-cols-2 p-4 mt-0 h-[50vh] container  w-[30vw]"
              style={{ height: "50vh", width: "70vw" }}
            >
              {" "}
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Petitioner Name</h4>
                <p className="relative bottom-[2px] spanlabel1">
                  {caseinfo.clientname}
                </p>
              </p>
              <p className="flex flex-row gap-5 justify-center ">
                <h4 className="spanlabel"> Petitioner Number</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.clientnumber}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Petitioner Address</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.clientaddress}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Petitioner Email</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.clientemail}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Petitioner State</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.clientname}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Petitioner Advocate</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.clientadvocate}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Petitioner Advocate Number</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.clientnameadvocatenumber}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Petitioner Advocate Email</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.clientadvocateemail}
                </span>
              </p>
            </div>
          </>
        )}
        {respondentdetails && (
          <>
            {" "}
            <div
              className="grid grid-cols-2 p-4 mt-0 h-[50vh] container  w-[30vw]"
              style={{ height: "50vh", width: "70vw" }}
            >
              {" "}
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Name</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.respondentname}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Address</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.clientname}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Email</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.clientname}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">State</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.clientname}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">City</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.clientname}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Advocate Name</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.clientname}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Advocate Email</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.clientname}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Advocate Number</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.clientname}
                </span>
              </p>
            </div>
          </>
        )}
        {casedetails && (
          <>
            {" "}
            <div
              className="grid grid-cols-2 p-4 mt-0 h-[50vh] container  w-[30vw]"
              style={{ height: "50vh", width: "70vw" }}
            >
              {" "}
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Case Type</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.casetype}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Case Stage</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.casestage}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Case Number</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.casenumber}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Registration Data</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.registrationdate}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Registration Number</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.registrationnumber}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Filing Number</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.filingnumber}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Filing Hearing Date</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.filinghearingdate}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Court Number</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.courtnumber}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Court Type</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.courttype}
                </span>
              </p>
              <p className="flex flex-row gap-5 justify-center">
                <h4 className="spanlabel">Court Number</h4>
                <span className="relative bottom-[2px]">
                  {caseinfo.courtnumber}
                </span>
              </p>
            </div>
          </>
        )}
        {history && (
          <div
            className={`container grid  z-[98]  ${modal ? "loweranimate" : ""}`}
            style={{ overflowY: "auto", maxHeight: "500px", marginTop: "0px" }}
          >
            <h1 className="tableh1 text-2xl font-bold">Customers table</h1>
            <div className="table justify-self-center">
              <table style={{ overflowY: "auto", maxHeight: "300px" }}>
                <thead className="tableheader ">
                  <tr className="tablerow ">
                    <th style={{ borderTopLeftRadius: "20px" }}>qqq</th>
                    <th>0qqq</th>
                    <th>aaa</th>
                    <th>aa</th>
                    <th style={{ borderTopRightRadius: "20px" }}>aaa</th>
                    {judge && <th></th>}
                  </tr>
                </thead>

                <tbody className="tablebody">
                  { ( pastdates.length==0 && <><Loadingskeleton number={6}/></>) ||
                  pastdates.map((data, index) => {
                    return (
                      <tr height={"10"} 
                      onClick={()=>{
                        setindex(index)
                      }}>
                        <td
                          className={`showinfos ${
                            index + 1 == pastdates.length ? "td1radius" : ""
                          }`}
                        >
                          {data}
                        </td>

                        <td
                          className={`${
                            index + 1 == pastdates.length ? "tdlastradius" : ""
                          }`}
                        >
                          {data}
                        </td>
                        {judge && (
                          <td
                            className="text-3xl font-bold"
                            onClick={() => {
                              const element =
                                window.document.getElementById(index);
                              element.style.display == "none"
                                ? (element.style.display = "block")
                                : (element.style.display = "none");
                              for (let i = 0; i < pastdates.length; i++) {
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
        )}
      </div>
    </>
  );
}
