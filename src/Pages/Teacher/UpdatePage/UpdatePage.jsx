import React, { useContext } from 'react';
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FaBook } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const UpdatePage = ({}) => {
    const {user} = useContext(AuthContext);
    const[axiosSecure] = useAxiosSecure();
    const location = useLocation();
    const{course} = location?.state;
    const {
        image,
        name,
        enrollment,
        instructor,
        available_seats,
        price,
        total_seats,
        status,
        _id,
        email,
        feedback,
      } = course;
      const image_token = import.meta.env.VITE_Image_Upload_Key;
      const image_url = `https://api.imgbb.com/1/upload?key=${image_token}`

      const {
        register,
        handleSubmit,
        reset,
      } = useForm();

      const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('image',data.image[0]);
   
        fetch(image_url,{
           method:"POST",
           body:formData,
        })
        .then(res => res.json())
        .then(images => {
           
           if(images.success){
               const image = images.data.display_url;
               const {name,instructor,email,price,available_seats,status} = data;
               const newClass = {name,
                   image:image,
                   instructor,
                   email,
                   price:parseFloat(price),
                   available_seats:parseInt(available_seats),
                   status,
                   total_seats:parseInt(available_seats),
                   }
               axiosSecure.put(`/classes/update/${_id}`,newClass)
               .then(data => {
                  if(data.data.modifiedCount > 0){
                   Swal.fire("Success", "Your class is updated successfully.", "success");
                   reset();
                  }
               })
           }
        })
     };
    
    return (
        <div>
      <Helmet>
        <title>Update Class</title>
      </Helmet>
      <div className="flex">
        <h1 className="text-xl md:text-3xl font-bold  flex-grow">
          Update A Class
        </h1>
        <h1 className="text-xl md:text-3xl font-bold">
          Welcome {user.displayName}
        </h1>
      </div>
      <div className="divider"></div>
      <div className="w-full bg-gray-300 shadow-xl py-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-3/4 mx-auto space-y-5"
        >
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">Class Name*</span>
            </label>
            <input
              type="text"
              defaultValue={name}
              className="input input-bordered w-full"

              {...register("name", { required: true, maxLength: 80 })}
            />
          </div>
          <div className="flex gap-3">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text font-bold">Instructor Name*</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-md"
                defaultValue={user.displayName}
                readOnly
                {...register("instructor", { required: true, maxLength: 80 })}
              />
            </div>
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text font-bold">Instructor Email*</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-md"
                defaultValue={user.email}
                readOnly
                {...register("email", { required: true, maxLength: 80 })}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text font-bold">Price*</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full max-w-md"
                defaultValue={price}
                {...register("price", { required: true })}
              />
            </div>
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text font-bold">Status*</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-md"
                defaultValue={status}
                readOnly
                {...register("status", { required: true })}
              />
            </div>
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text font-bold">Available Seats*</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full max-w-md"
                defaultValue={available_seats}
                {...register("available_seats", { required: true })}
              />
            </div>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">Upload Image*</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              {...register("image", { required: true })}
            />
          </div>
          <button className="btn btn-outline btn-primary" type="submit">
            <FaBook></FaBook> Update Class
          </button>
        </form>
      </div>
    </div>
    );
};

export default UpdatePage;