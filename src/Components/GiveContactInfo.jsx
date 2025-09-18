import React from "react";

const GiveContactInfo = () => {
  return (
    <div>
      <label htmlFor="name">Name</label>
      <input id="name" type="text" placeholder="enter name" required />
      <br />
      <label htmlFor="email">Email</label>
      <input id="email" type="email" placeholder="enter email" required />
      <br />
      <label htmlFor="phone">Phone</label>
      <input id="phone" type="tel" placeholder="enter phone" required />
    </div>
  );
};

export default GiveContactInfo;
