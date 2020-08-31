import React from "react";

const UserTable = (props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>Password</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.users.length > 0 ? (
          props.users.map((user) => {
            const { _id, email, password } = user;
            return (
              <tr key={_id}>
                <td>{_id}</td>
                <td>{email}</td>
                <td>{password}</td>
                <td>
                  <button onClick={() => props.deleteUser(_id, email)}>
                    Supprimer
                  </button>
                  <button onClick={() => props.editUser(_id, user)}>
                    Modifier
                  </button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={4}>Aucun utilisateur trouvé</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UserTable;
