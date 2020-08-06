import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../api";

const EditUserForm = (props) => {
  useEffect(() => {
    setUser(props.currentUser);
  }, [props]);

  const [user, setUser] = useState(props.currentUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.email && user.password) {
      props.updateUser(user);
      await axios.put(url, {
        _id: user._id,
        email: user.email,
        password: user.password,
      });
    }
  };

  return (
    <form>
      <label>Email</label>
      <input
        className="u-full-width"
        type="text"
        value={user.email}
        name="email"
        onChange={handleChange}
      />
      <label>Password</label>
      <input
        className="u-full-width"
        type="text"
        value={user.password}
        name="password"
        onChange={handleChange}
      />
      <button className="button-primary" type="submit" onClick={handleSubmit}>
        Modifier un uttilisateur
      </button>
      <button type="submit" onClick={() => props.setEditing(false)}>
        Annuler
      </button>
    </form>
  );
};

export default EditUserForm;
