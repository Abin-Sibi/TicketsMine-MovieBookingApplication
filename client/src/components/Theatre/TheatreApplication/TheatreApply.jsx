import { useForm } from "react-hook-form";
import axios from "../../../axios";
import React, { useState ,useEffect} from "react";
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../TheatreApplication/TheatreApplication.css"

function TheatreApply() {
  const generateError = (error) =>
    toast.error(error, {
      position: "top-right",
    });
  const [cookies] = useCookies([]);
  const navigate = useNavigate();
  const [status,setStatus]=useState();
  const [userData,setUserData]=useState({});
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const formData = new FormData();
    
    formData.append("image", data.file[0]);
    const token = cookies.theatreToken;
    const decoded = await jwt_decode(token);
    let userId= decoded.id
    const datas = {
      
      name: data.name,
      phone: data.phone,
      address: data.address,
      city: data.city,
      state: data.state,
      email: data.email,
      Discribe_Your_Company_And_Products: data.company_and_products,
      company_name: data.company_name
    };

    axios.post("/api/theatre/application",{datas,userId} ).then(async (response) => {
      console.log(response.data);
      if (response.data.status) {
        setStatus(true);
        
        let id = response.data.id;
        await axios
          .post(
            `/api/theatre/upload-file/${id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then(({ data }) => {
            alert(data);
            navigate("/theatreapplication");
          });
      } else {
        setStatus(true);
        generateError(response.error.message);
      }
    });
  };

  const application = async () => {
    const token = cookies.theatreToken;
    const decoded = await jwt_decode(token);
    let id = decoded.id;
    console.log(id);
    axios.get(`/api/theatre/didApply/${id}`).then((response) => {
      if (response.data.status === false) {
        console.log("im here errro status falsse");
        setStatus(false);
        // generateError(error);
      } else {
        console.log(response.data)
        setUserData(response.data)
        setStatus(true);
      }
    });
  };

  const openModel = () => {};

  useEffect(() => {
    application();
  },[]);
 
  return (
    <main>
        {status==true?(<>
          <div className="centerDiv">
            <h4>Applicaiton Submitted</h4>
           <h5>Your application to the admin for approving as theatre has submitted Successfully</h5>
            <h6>You will get the theatres functionalities after approved by admin</h6>
            <div className="statusTheatre">
            {  
              userData.isApproved && !userData.isRejected?
               <><p>Status: <span style={{color:'green'}}><b>Approved</b></span></p></>:
               <>{!userData.isApproved && userData.isRejected ? (<p>Status: <span style={{color:'red'}}><b>Rejected</b></span></p>):
               (<p>Status: <span style={{color:'blue'}}><b>Requested</b></span></p>)}</>
            }
             </div>
          </div>
        </>):(<div className="wrapper rounded bg-white">
        <div className="h3">Theatre Registration Form</div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
          id="form"
        >
          <div className="form">
            <div className="row">
              <div className="col-md-6 mt-md-0 mt-3">
                <label>Theatre Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Theatre Name"
                  {...register("name", {
                    required: true,
                    minLength: 4,
                    maxLength: 20,
                    pattern: /^[^\s]+(?:$|.*[^\s]+$)/,
                  })}
                />
                <span className="text-danger">
                  {errors.name?.type === "required" && (
                    <span>Theatre Name is required</span>
                  )}
                  {errors.name?.type === "minLength" && (
                    <span>Theatre Name must morethan or equal to 4 Character</span>
                  )}
                  {errors.name?.type === "maxLength" && (
                    <span>Theatre Name must less than 20 Character</span>
                  )}
                  {errors.name?.type === "pattern" && (
                    <span>Should not have spaces</span>
                  )}
                </span>
              </div>
              
            </div>
            <div className="row">
              <div className="col-md-6 mt-md-0 mt-3">
                <label>City</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="City"
                  {...register("city", {
                    required: true,
                    minLength: 4,
                    maxLength: 20,
                    pattern: /^[^\s]+(?:$|.*[^\s]+$)/,
                  })}
                />
                <span className="text-danger">
                  {errors.city?.type === "required" && (
                    <span>city is required</span>
                  )}
                  {errors.city?.type === "minLength" && (
                    <span>city must morethan or equal to 4 Character</span>
                  )}
                  {errors.city?.type === "maxLength" && (
                    <span>city must less than 20 Character</span>
                  )}
                  {errors.city?.type === "pattern" && (
                    <span>Should not have spaces</span>
                  )}
                </span>
              </div>
              <div className="col-md-6 mt-md-0 mt-3">
                <label>State</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="State"
                  {...register("state", {
                    required: true,
                    minLength: 4,
                    maxLength: 20,
                    pattern: /^[^\s]+(?:$|.*[^\s]+$)/,
                  })}
                />
                <span className="text-danger">
                  {errors.state?.type === "required" && (
                    <span>state is required</span>
                  )}
                  {errors.state?.type === "minLength" && (
                    <span>state must morethan or equal to 4 Character</span>
                  )}
                  {errors.state?.type === "maxLength" && (
                    <span>state must less than 20 Character</span>
                  )}
                  {errors.state?.type === "pattern" && (
                    <span>Should not have spaces</span>
                  )}
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mt-md-0 mt-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  {...register("email", {
                    required: true,
                    pattern:
                      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                  })}
                />
                <p className="text-danger">
                  {errors.email?.type === "required" && (
                    <span>Email is required</span>
                  )}
                  {errors.email?.type === "pattern" && (
                    <span>Enter valied Email</span>
                  )}
                </p>
              </div>
              <div className="col-md-6 mt-md-0 mt-3">
                <label>Phone No</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Phone No"
                  {...register("phone", {
                    required: true,
                    minLength: 10,
                    maxLength: 10,
                    // valueAsNumber:[true,'helooooooo']
                  })}
                />
                <span className="text-danger">
                  {errors.phone?.type === "required" && (
                    <span>Phone Number is required</span>
                  )}
                  {errors.phone?.type === "minLength" && (
                    <span>Phone Number must have 10 digits</span>
                  )}
                  {errors.phone?.type === "maxLength" && (
                    <span>Phone Number must have 10 digits</span>
                  )}
                  {/* {errors.name?.type === 'pattern' && (
                    <span>Should not have spaces</span>
                  )} */}
                  {/* {errors.phone?.type === "valueAsNumber" && (
                        <span>Enter Only Number</span>
                      )} */}
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mt-md-0 mt-3">
                <label>Discription</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Discription"
                  {...register("company_name", {
                    required: true,
                    minLength: 4,
                    maxLength: 20,
                    pattern: /^[^\s]+(?:$|.*[^\s]+$)/,
                  })}
                />
                <span className="text-danger">
                  {errors.company_name?.type === "required" && (
                    <span>this feild is required</span>
                  )}
                  {errors.company_name?.type === "minLength" && (
                    <span>
                      this feild must morethan or equal to 4 Character
                    </span>
                  )}
                  {errors.company_name?.type === "maxLength" && (
                    <span>this feild must less than 20 Character</span>
                  )}
                  {errors.company_name?.type === "pattern" && (
                    <span>Should not have spaces</span>
                  )}
                </span>
              </div>
              <div className="col-md-6 mt-md-0 mt-3">
                <label>Theatre Profile Pic</label>
                <img src="" />
                <input
                  type="file"
                  className="form-control"
                  {...register("file")}
                />
                <span className="text-danger"></span>
              </div>
            </div>
           
           
            <div className="d-flex justify-content-center pt-4">
              <button className="btn btn-success" style={{ width: "80px" }}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>)}
      
      
    </main>
  );
}

export default TheatreApply;
