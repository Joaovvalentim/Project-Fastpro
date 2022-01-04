import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import Axios from "axios";

function App() {

  const handleClickLogin = (values) => {
    Axios.post("http://localhost:3001/login", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      if (response.status === 200) {
        history.push("/home"); 
      } 
       else {
        console.log("oi")
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
    <div className="bg">
      <h1 className="title">STAR WARS</h1>
      <div className="row-form">
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
                <Field name="password" type="password" className="form-field" placeHolder="Senha" />
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
      </div>
    </div>
  );
}

export default App;
