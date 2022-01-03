import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { Link, useHistory } from "react-router-dom";
import Styles from './App.css';
import Axios from "axios";

function App() {

  const handleClickLogin = (values) => {
    Axios.post("http://localhost:3001/login", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      console.log(response)
      if (response.status === 200) {
        history.push("/home");
      } else {
        history.push("/");
      }
    });
  };
  const validationLogin = yup.object().shape({
    email: yup
      .string()
      .email()
      .required("Este campo é obrigatório"),
    password: yup
      .string()
      .min(8, "A senha deve conter 8 caracteres")
      .required("Este campo é obrigatório"),
  });

  const history = useHistory();
  const renderScreenRegister = () => {
    history.push("/cadastro");
  };
  return (
    <div className="container">
      <h1>Login</h1>
      <Formik initialValues={{}} onSubmit={handleClickLogin} validationSchema={validationLogin}>
        <Form className="login-form">
          <div className="login-form-group">
            <Field name="email" className="form-field" placeHolder="Email" />
            <ErrorMessage
              component="span"
              name="email"
              className="form-error"
            />
          </div>

          <div className="login-form-group">
            <Field name="password"  type="password" className="form-field" placeHolder="Senha" />
            <ErrorMessage
              component="span"
              name="password"
              className="form-error"
            />
          </div>
          <div className="buttons">
            <button className="button" type="submit">Login</button>
            <button className="button" type="submit" onClick={() => renderScreenRegister()}>Cadastro</button>
          </div>
        </Form>
      </Formik>
    </div >
  );
}

export default App;
