import React from "react";

export default function EditForm(props) {
  const { name, lastname, email, password } = props.user;
  return (
    <div>
      <h2>Editar un usuario</h2>
      <form onSubmit={props.updateUser} onChange={props.editinput}>
        <input name="name" type="text" placeholder="Nombre" value={name} />
        <input
          name="lastname"
          type="text"
          placeholder="Apellidos"
          value={lastname}
        />
        <input name="email" type="email" placeholder="Email" value={email} />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={password}
        />
        <input type="submit" value="Actualizar usuario" />
      </form>
    </div>
  );
}
