import { useEffect, useState, useCallback } from "react";
import axios from "../../../axios";

function UsersList() {
 
  const [info, setInfo] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState({});
  useEffect(() => {
    heelo();
  }, [heelo]);

  var heelo = useCallback(
    () => {
    axios.get("/api/admin/getAllUsers").then((response) => {
      console.log(response.data,"getCompaniesInfo Applocation");
      setInfo(response.data);
    });
  }
   );

 

  const blockUser = (element) => {
    axios
      .get(`/api/admin/blockUser/${element}`)
      .then((response) => {
        heelo();
      });
  };
 
  const unblockUser = (element) => {
    axios
      .get(`/api/admin/unblockUser/${element}`)
      .then((response) => {
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
              <h1 className="mx-2"> USERS LIST</h1>
              <table className="table align-middle mb-0 bg-white table-bordered">
                <thead className="bg-light text-center">
                  <tr>
                    <th>No</th>
                    <th>User name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Block User</th>
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
                          {datas.email}
                        </td>
                        <td >
                          {datas.phone}
                        </td>
                  <td >{datas.isBlocked == true?<button onClick={()=>{unblockUser(datas._id)}} style={{borderRadius:'4px' ,backgroundColor:'blue',color:'white','height':'30px',width:"60px"}}>unBlock</button>:<button style={{borderRadius:'4px' ,backgroundColor:'red',color:'white','height':'30px',width:"50px"}} onClick={()=>{blockUser(datas._id)}}>Block</button>}</td>
                        
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

export default UsersList;