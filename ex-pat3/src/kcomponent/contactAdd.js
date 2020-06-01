import React, { useState } from "react";

const AddContact = (props) => {
  const [member, addMember] = useState({
    date: "",
    fullName: "",
    email: "",
    info: "",
    image: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChanges = (event) => {
    addMember({ ...member, [event.target.name]: event.target.value });
    console.log(member);
  };

  const submitForm = (event) => {
    event.preventDefault();
    props.addNewComment(member);
    addMember({ fullName: "", email: "", info: "" });
  };
  const fileSelectedHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const fileUploadHandler = (event) => {
    console.log(event.target.files[0]);
  };

  return (
    <div className="form-wrapper">
      <h1>This section is for adding Comment</h1>;
      <form className="first" onSubmit={submitForm}>
        <label htmlFor="date">
          <strong>Date: </strong>
        </label>

        <label>Member Full Name:</label>
        <input
          className="firstI"
          onChange={handleChanges}
          type="text"
          id="fullname"
          name="fullName"
          value={member.fullName}
        />

        <label>Email ID:</label>
        <input
          className="firstI"
          onChange={handleChanges}
          type="text"
          id="email"
          name="email"
          value={member.email}
        />

        <label>Information</label>
        <textarea
          className="firstI"
          onChange={handleChanges}
          id="info"
          name="info"
          value={member.info}
        />
        <label>Image:</label>
        <input
          className="firstI"
          onChange={fileSelectedHandler}
          type="file"
          id="image"
          name="image"
          value={member.image}
        />
        <button onClick={fileUploadHandler}>Upload</button>
        <button type="submit">Add Note</button>
      </form>
    </div>
  );
};

export default AddContact;
