import { useForm } from "react-hook-form";
import axios from "../../../axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import "../Movie/MovieForm.css"

function MovieForm() {
  const generateError = (error) =>
    toast.error(error, {
      position: "top-right",
    });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },reset
  } = useForm();
  const onSubmit = async (data) => {
    console.log("aaaaaaaaaaaaaaaaaaa")
    const formData = new FormData();
 
    
    formData.append("image", data.file[0]);
    
    const datas = {
      title: data.title,
      description: data.description,
      genre: data.genre,
      director: data.director,
      duration: data.duration,
      releasedate: data.date
    };
    reset();
    axios.post("/api/admin/addmovies", datas).then(async (response) => {
      console.log(response.data);
      console.log(response.data.moviedata,"mooovie here")
      if (response.data.status) {
        
        let id = response.data.moviedata._id;
        await axios
          .post(
            `/api/admin/upload-moviePoster/${id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then(({ data }) => {
            toast.success(`Movie added Succsessfully`,{theme:"light"}, {
              position: "top-right",
            })
            navigate("/addmovies");
          });
      } else {
        generateError(response.error.message);
      }
    });
  };
 
  return (
    <main>
        <div className="wrapperMovie rounded">
        <div className="h3" style={{color:"black",}}>Add Movie</div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
          id="form"
        >
          <div className="form">
            <div className="row">
              <div className="col-md-6 mt-md-0 mt-3">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  {...register("title", {
                    required: true
                  })}
                />
                <span className="text-danger">
                  {errors.title?.type === "required" && (
                    <span>Title Name is required</span>
                  )}
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
                  {...register("discription", {
                    required: true
                  })}
                />
                <span className="text-danger">
                  {errors.discription?.type === "required" && (
                    <span>Discription is required</span>
                  )}
                </span>
              </div>
              <div className="col-md-6 mt-md-0 mt-3">
                <label>Genre</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Genre"
                  {...register("genre", {
                    required: true
                  })}
                />
                <span className="text-danger">
                  {errors.genre?.type === "required" && (
                    <span>Genre is required</span>
                  )}
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mt-md-0 mt-3">
                <label>Director</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Director"
                  {...register("director", {
                    required: true
                  })}
                />
                <p className="text-danger">
                  {errors.director?.type === "required" && (
                    <span>director name is required</span>
                  )}
                </p>
              </div>
              <div className="col-md-6 mt-md-0 mt-3">
                <label>Duration</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Duration"
                  {...register("duration", {
                    required: true
                    // valueAsNumber:[true,'helooooooo']
                  })}
                />
                <span className="text-danger">
                  {errors.duration?.type === "required" && (
                    <span>duration is required</span>
                  )}
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mt-md-0 mt-3">
                <label>Release Date</label>
                <input
                  type="Date"
                  className="form-control"
                  placeholder="Date"
                  {...register("date", {
                    required: true
                  })}
                />
                <span className="text-danger">
                  {errors.date?.type === "required" && (
                    <span>this feild is required</span>
                  )}
                </span>
              </div>
              <div className="col-md-6 mt-md-0 mt-3">
                <label>Movie poster</label>
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
      </div>
      <ToastContainer/>
     </main>
  );
}

export default MovieForm;