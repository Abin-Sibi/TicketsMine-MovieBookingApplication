import { useForm } from "react-hook-form";
import axios from "../../../axios";
import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import "../TheatreManage/TheatreManage.css"
import TheatreScreens from "./TheatreScreens/TheatreScreens";

function TheatreManage() {
  const generateError = (error) =>
    toast.error(error, {
      position: "top-right",
    });
  const [cookies] = useCookies([]);
  const navigate = useNavigate();
const [refresh, setRefresh] = useState()
const [screen,setScreen] = useState()
  const {
    register,
    handleSubmit,
    formState: { errors },reset
  } = useForm();


  useEffect(() => {
    const fetchData = async () => {
      const token = cookies.theatreToken;
      const decoded = await jwt_decode(token);
      console.log(decoded.id, "ksssssssssssssss");
      await axios
        .get(`/api/theatre/getscreens/${decoded.id}`)
        .then((response) => {
          console.log(response.data.screen, "screens are herep0000000000000");
          setScreen(response.data.screen);
        });
    };

    fetchData();
  }, [cookies.theatreToken]);
console.log(refresh,"yyy")
  const onSubmit = async (data) => {
    const formData = new FormData();
    // const token = cookies.theatreToken;
    // const decoded = await jwt_decode(token);
    //     console.log(decoded.id, "ksssssssssssssss")
    //     await axios.get(`/api/theatre/getscreens/${decoded.id}`).then((response) => {
    //         console.log(response.data.screen, "screens are herep0000000000000")
    //         setScreen(response.data.screen)
            
    //     })
        console.log(screen,"jjqqqqqqqqquuuu------")
        console.log(screen.map((x) => x.screenname.toLowerCase()),"ooooooooooo")
        if(screen.map(x => x.screenname.toLowerCase()).includes(data.screenname.toLowerCase())){
          toast.error(`This name already exists`,{theme:"light"}, {
            position: "top-right",
          })
        }else{
              const token = cookies.theatreToken;
    const decoded = await jwt_decode(token);
          let userId= decoded.id
    const datas = {
      screenname: data.screenname,
      rows: data.rows,
      column: data.column
     
    };
    setRefresh(data.screenname)
    reset();
    console.log(datas,'theee dataas')
    
    axios.post("/api/theatre/addscreens", {datas,userId}).then(async (response) => {
      console.log(response.data);
      console.log(response.data,"scren added")
      if (response.data.status) {
          
            toast.success(`Screen added Succsessfully`,{theme:"light"}, {
              position: "top-right",
            })
            navigate("/theatreManage");
          
      } else {
        generateError(response.error.message);
      }
    });
    }
    

  };
 
  return (
    <main>
        <div className="wrapperScreen rounded">
        <div className="h3" style={{color:"black",}}>Add Screen</div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          id="form"
        >
          <div className="form">
            <div className="row">
              <div className="col-md-6 mt-md-0 mt-3">
                <label>Screen Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Screen Name"
                  {...register("screenname", {
                    required: true,
                    maxLength: 20,
                    pattern: /^[^\s]+(?:$|.*[^\s]+$)/,
                  })}
                />
                <span className="text-danger">
                  {errors.name?.type === "required" && (
                    <span>Screen Name is required</span>
                  )}
                  {errors.name?.type === "maxLength" && (
                    <span>Screen Name must less than 20 Character</span>
                  )}
                  {errors.name?.type === "pattern" && (
                    <span>Should not have spaces</span>
                  )}
                </span>
              </div>
              
            </div>
            <div className="row">
              <div className="col-md-6 mt-md-0 mt-3">
                <label>Number of rows</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Rows"
                  {...register("rows", {
                    required: true
                  })}
                />
                <span className="text-danger">
                  {errors.rows?.type === "required" && (
                    <span>rows is required</span>
                  )}
                </span>
              </div>
              <div className="col-md-6 mt-md-0 mt-3">
                <label>Number of columns</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Column"
                  {...register("column", {
                    required: true
                  })}
                />
                <span className="text-danger">
                  {errors.column?.type === "required" && (
                    <span>state is required</span>
                  )}
                </span>
              </div>
            </div>
           <div className="d-flex justify-content-center pt-4">
              <button className="btn btn-success" style={{ width: "80px" }}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      <TheatreScreens refresh={refresh}/>
      <ToastContainer/>
     </main>
  );
}

export default TheatreManage;