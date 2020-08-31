import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserTable from './tables/UserTable';
import AddUserForm from './forms/AddUserForm';
import EditUserForm from './forms/EditUserForm';
import useAsyncRequest from './hooks/useAsyncRequest';
import url from './api';

const App = () => {
  const [data, loading] = useAsyncRequest();
  const [users, setUsers] = useState(null);
  const [wasm, setWasm] = useState(null);

  useEffect(() => {
    if (data) {
      const formattedUsers = data.map((obj) => {
        return {
          _id: obj._id,
          email: obj.email,
          password: obj.password,
        };
      });
      setUsers(formattedUsers);
    }
  }, [data]);

  const addUser = (user) => {
    user._id = users.length + 1;
    setUsers([...users, user]);
  };

  const deleteUser = async (_id, email) => {
    setUsers(users.filter((user) => user._id !== _id));
    await axios.delete(url, {
      headers: {
        Authorization: '123',
      },
      data: {
        _id: _id,
      },
    });
    const wasm = await import('rust_module');
    setWasm(wasm);
    wasm.message("L'utilisateur " + email + " a été supprimé !");
  };

  const [editing, setEditing] = useState(false);

  const initialUser = { _id: null, email: '', password: '' };

  const [currentUser, setCurrentUser] = useState(initialUser);

  const editUser = (_id, user) => {
    setEditing(true);
    setCurrentUser(user);
  };

  const updateUser = (newUser) => {
    setUsers(
      users.map((user) => (user._id === currentUser._id ? newUser : user))
    );
    setCurrentUser(initialUser);
    setEditing(false);
  };

  return (
    <div className="container">
      <h1>Back Office</h1>
      <div className="row">
        <div className="five columns">
          {editing ? (
            <div>
              <h2>Modifier un utilisateur</h2>
              <EditUserForm
                currentUser={currentUser}
                setEditing={setEditing}
                updateUser={updateUser}
              />
            </div>
          ) : (
            <div>
              <h2>Ajouter un utilisateur</h2>
              <AddUserForm addUser={addUser} />
            </div>
          )}
        </div>
        {loading || !users ? (
          <p>Loading...</p>
        ) : (
          <div className="seven columns">
            <h2>Liste des utilisateur</h2>

            <UserTable
              users={users}
              deleteUser={deleteUser}
              editUser={editUser}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
