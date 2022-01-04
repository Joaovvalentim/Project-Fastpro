import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { Link, useHistory } from "react-router-dom";
import styles from './App.css';
import Axios from "axios";


function Cadastro() {

    const handleClickCadastro = (values) => {
        Axios.post("http://localhost:3001/cadastro", {
            nome: values.nome,
            email: values.email,
            telefone: values.telefone,
            password: values.password,
        }).then((response) => {
            alert(response.data.msg);
        });
    };


    const validationCadastro = yup.object().shape({
        email: yup
            .string()
            .email()
            .required("Este campo é obrigatório"),
        password: yup
            .string()
            .min(8, "A senha deve conter 8 caracteres")
            .required("Este campo é obrigatório"),
        telefone: yup
            .string()
            .required("Este campo é obrigatório"),
        nome: yup
            .string()
            .required("Este campo é obrigatório"),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password"), null], "As senhas não são iguais")
    });

    const history = useHistory();
    const renderScreenRegister = () => {
        history.push("/cadastro");
    };
    const renderScreenVoltar = () => {
        history.push("/");
    };
    return (
        <div className="bg">
            <div className="row-form">
                <div className="container">
                    <h1>Cadastro</h1>
                    <Formik initialValues={{}} onSubmit={handleClickCadastro} validationSchema={validationCadastro}>
                        <Form className="login-form">

                            <div className="login-form-group">
                                <Field name="nome" className="form-field" placeHolder="Nome" />
                                <ErrorMessage
                                    component="span"
                                    name="nome"
                                    className="form-error"
                                />
                            </div>

                            <div className="login-form-group">
                                <Field name="email" className="form-field" placeHolder="Email" />
                                <ErrorMessage
                                    component="span"
                                    name="email"
                                    className="form-error"
                                />
                            </div>

                            <div className="login-form-group">
                                <Field name="telefone" className="form-field" placeHolder="Telefone" />
                                <ErrorMessage
                                    component="span"
                                    name="telefone"
                                    className="form-error"
                                />
                            </div>

                            <div className="login-form-group">
                                <Field name="password" className="form-field" type="password" placeHolder="Senha" />
                                <ErrorMessage
                                    component="span"
                                    name="password"
                                    className="form-error"
                                />
                            </div>

                            <div className="login-form-group">
                                <Field name="confirmPassword" className="form-field" type="password" placeHolder="Repetir Senha" />
                                <ErrorMessage
                                    component="span"
                                    name="confirmPassword"
                                    className="form-error"
                                />
                            </div>
                            <div className="buttons">
                                <button className="button" type="submit">Cadastrar</button>
                                <button className="button" onClick={() => renderScreenVoltar()}>Voltar</button>
                            </div>

                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
};

export default Cadastro;