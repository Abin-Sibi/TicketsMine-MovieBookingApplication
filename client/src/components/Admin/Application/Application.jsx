
import { useEffect, useState, useCallback } from "react";
import axios from "../../../axios";
import Hr from "./Hr";
import Dropdown from "react-bootstrap/Dropdown";

function Applicaiton() {
 
  const [info, setInfo] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState({});
  useEffect(() => {
    heelo();
  }, [heelo]);

  var heelo = useCallback(
    () => {
    axios.get("/api/admin/getCompaniesInfo").then((response) => {
      console.log(response.data,"getCompaniesInfo Applocation");
      setInfo(response.data);
    });
  }
   );

  const approveApplication = (element) => {
    axios
      .get(`/api/admin/applicationApprove/${element._id}`)
      .then((response) => {
        heelo();
      });
  };

  const rejectApplication = (element) => {
    axios
      .get(`/api/admin/applicationReject/${element._id}`)
      .then((response) => {
        console.log('resposnse--------------------------',response);
        heelo();
      });
  };
 

  const openModel = (application) => {
    console.log(application);
    setSelectedApplication(application);
    console.log(selectedApplication);
  };

  console.log("jkdfhsjkfhlfhlfhbfkbfkbbbf",)

  return (
    <>
      <div className="row" style={{margin:"10vh" }}>
        
        <div className="col-md-10">
          <section className="admin">
            <div className="new-application">
              <h1 className="mx-2"> APPLICATIONS</h1>
              <table className="table align-middle mb-0 bg-white table-bordered">
                <thead className="bg-light text-center">
                  <tr>
                    <th>No</th>
                    <th>Owner name</th>
                    <th>Theatre name</th>
                    <th>View</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {info.map((datas, i) => {
                    console.log("ssssssssssssssss",datas)
                    return (
                      <tr key={i}>
                        <td >{i+1}</td>
                        <td >{datas?.name}</td>
                        <td >
                          {datas?.application?.name}
                        </td>
                        <td>
                          <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={() => openModel(datas?.application)}
                          >
                            Open
                          </button>

                          <div
                            class="modal fade"
                            id="exampleModal"
                            tabindex="-1"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                          >
                            <div class="modal-dialog">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5
                                    class="modal-title"
                                    id="exampleModalLabel"
                                  >
                                    DETAILED VIEW
                                  </h5>
                                  <button
                                    type="button"
                                    class="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div class="modal-body">
                                  <div id="hello">
                                    <h4
                                      className="mb-1"
                                      style={{ color: "#35558a" }}
                                    >
                                      {selectedApplication.name}
                                    </h4>
                                    <Hr />
                                    <div className="d-flex justify-content-between">
                                      <p className="small">Theatre Name</p>
                                      <p className="small">
                                        {selectedApplication.name}
                                      </p>
                                    </div>
                                    <Hr />
                                    <div className="d-flex justify-content-between">
                                      <p className="small">Phone</p>
                                      <p className="small">
                                        {selectedApplication.phone}
                                      </p>
                                    </div>
                                    <Hr />
                                    <div className="d-flex justify-content-between">
                                      <p className="small">Email</p>
                                      <p className="small">
                                        {selectedApplication.email}
                                      </p>
                                    </div>
                                    <Hr />
                                    <div className="d-flex justify-content-between">
                                      <p className="small">Address</p>
                                      <p className="small">
                                        {selectedApplication.address},
                                        {selectedApplication.city},
                                        {selectedApplication.state}
                                      </p>
                                    </div>
                                    <Hr />
                                   
                                    <div className="d-flex justify-content-between ">
                                      <p className="small">Theatre profile pic</p>
                                      {
                                        <img
                                          style={{ width: "50px" }}
                                          src={`../images/uploads/${selectedApplication._id}.jpg`}
                                          alt="logo"
                                        />
                                      }
                                    </div>
                                    
                                  </div>
                                </div>
                                <div class="modal-footer">
                                  <button
                                    type="button"
                                    class="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                    {!datas.isRejected  && !datas.isApproved ?
                      <>
                        <Dropdown>
                          <Dropdown.Toggle variant="danger" id="dropdown-basic">
                            Pending
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() => approveApplication(datas)}
                            >
                              Approve
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => rejectApplication(datas)}
                            >
                              Reject
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </>
                     : <>{datas.isApproved === true?<p>Approved</p>:<p>Rejected</p>}</>
                      
                    }
                  </td>
                        
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* <Pending application={heelo} /> */}
          </section>
        </div>
      </div>
    </>
  );
}

export default Applicaiton;