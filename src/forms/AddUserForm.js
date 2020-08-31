import React, { useState } from 'react';
import axios from 'axios';
import url from '../api';

const AddUserForm = (props) => {
  const initUser = { _id: null, email: '', password: '' };

  const [user, setUser] = useState(initUser);
  const [wasm, setWasm] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.email && user.password) {
      handleChange(e, props.addUser(user));
      await axios.post(url, {
        _id: user._id,
        email: user.email,
        password: user.password,
      });
      const wasm = await import('rust_module');
      setWasm(wasm);
      wasm.message("Un utilisateur a été créé !");
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
        Ajouter un utilisateur
      </button>
    </form>
  );
};

export default AddUserForm;
