import React from "react";

const Contact = (props) => {
  return (
    <div className="team-info">
      {props.comment.map((a) => (
        <div className="tm" key={a.id}>
          <h2>Name: {a.fullName}</h2>
          <p>Email: {a.email}</p>
          <p>AboutMe: {a.info}</p>
        </div>
      ))}
    </div>
  );
};

export default Contact;
