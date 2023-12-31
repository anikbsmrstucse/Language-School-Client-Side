import React from "react";

const SIngleInstructors = ({instructor}) => {
    const {name,image,language,email} = instructor
  return (
    <>
      <div className="card w-full bg-base-100 shadow-xl">
        <figure>
          <img className="h-[250px] w-full" src={image} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>
            <strong>Language:</strong> {language}
          </p>
          <p>Email: {email}</p>
        </div>
      </div>
    </>
  );
};

export default SIngleInstructors;
