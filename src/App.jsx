import React from "react";
import EditForm from "./components/EditForm";
import "./styles.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      Usuarios: [],
      formUser: [],
      userEdited: []
    };
  }
  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    fetch("https://academlo-api-users.herokuapp.com/users")
      .then(response => {
        return response.json();
      })
      .then(users => {
        this.setState({ Usuarios: users.data });
      })
      .catch(error => console.log(error));
  };
  //addUser agrega usuarios nuevos la servidor y con el metodo getUser se actualiza la lista con el nuevo usuario agregado
  addUser = event => {
    event.preventDefault();
    fetch("https://academlo-api-users.herokuapp.com/users", {
      method: "POST",
      headers: { "content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(this.state.formUser)
    })
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        this.getUser();
        // this.setState({ Usuarios: myJson });
      })
      .catch(error => console.log(error));
  };
  //saveUser almacena los datos en un estado para despues ser enviado al servidor y se agreguen los usuarios nuevos
  saveUser = event => {
    this.setState({
      formUser: {
        ...this.state.formUser,
        [event.target.name]: event.target.value
      }
    });
  };
  //metodo Delete para eliminar usuarios ingresados al servidor identificandolos por medio de su id
  delteUser = (event, id) => {
    // this.setState({ id: event.target.value });
    let url = " https://academlo-api-users.herokuapp.com/user/" + id;
    fetch(url, {
      method: "DELETE"
    }).then(response => {
      this.getUser();
    });
  };
  //metodo PUT para actualizar los usuarios del formulario
  updateUser = event => {
    event.preventDefault();
    let url =
      " https://academlo-api-users.herokuapp.com/user/" +
      this.state.userEdited.id;
    fetch(url, {
      method: "PUT",
      headers: { "content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(this.state.userEdited)
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        this.getUser();
        console.log(response);
      })
      .catch(error => console.log(error));
  };
  //metodo editUser coloca los usuarios dentro del estado userEdited
  editUser = user => {
    this.setState({
      userEdited:
        // this.state.user,[user.target.name]: user.target.value
        {
          id: user.id,
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          password: user.password
        }
    });
  };
  //El metodo handleInputEdit  sirve para modificar el state editUser
  handleInputEdit = event => {
    this.setState({
      userEdited: {
        ...this.state.userEdited,
        [event.target.name]: event.target.value
      }
    });
  };

  render() {
    return (
      <div className="App">
        <form className="Form" onSubmit={this.addUser}>
          <input
            onChange={this.saveUser}
            type="text"
            name="name"
            placeholder="Name"
          />
          <input
            onChange={this.saveUser}
            type="text"
            name="lastname"
            placeholder="Last Name"
          />
          <input
            onChange={this.saveUser}
            type="email"
            name="email"
            placeholder="e-mail"
          />
          <input
            onChange={this.saveUser}
            type="password"
            name="password"
            placeholder="password"
          />
          <br />
          <button className="button" type="submit">
            Enviar
          </button>
        </form>
        <br />
        <EditForm
          user={this.state.userEdited}
          updateUser={this.updateUser}
          editinput={this.handleInputEdit}
        />
        <div>
          {this.state.Usuarios.map((user, index) => {
            return (
              <div key={index} className="Container">
                <div className="Card">
                  <h4>Name: {user.name}</h4>
                  <h4> Last Name: {user.lastname}</h4>
                  <h5> E-mail: {user.email}</h5>
                  <h5> Pass: {user.password}</h5>
                  <button onClick={event => this.delteUser(event, user.id)}>
                    Eliminar Usuario
                  </button>
                  <button onClick={event => this.editUser(user)}>
                    Editar Usuario
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
