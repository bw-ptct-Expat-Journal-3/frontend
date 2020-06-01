import React, { useState } from "react";
import Contact from "./contact";
import ContactAdd from "./contactAdd";
const Comment = () => {
  const [comment, setComment] = useState([
    {
      id: "",
      date: "",
      fullName: "",
      email: "",
      info: " ",
    },
  ]);

  const addNewComment = (comment1) => {
    const newComment = {
      id: comment.length + 1,
      date: comment1.date,
      fullName: comment1.fullName,
      email: comment1.email,
      info: comment1.info,
    };
    setComment([...comment, newComment]);
  };

  return (
    <div className="App">
      <h1>Comments and Feedback </h1>
      <ContactAdd addNewComment={addNewComment} />
      <Contact comment={comment} />
    </div>
  );
};

export default Comment;
