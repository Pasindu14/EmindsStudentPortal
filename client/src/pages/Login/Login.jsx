import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Illustration from "../../assets/auth/ils1.svg";
import EmindsLogo from "../../assets/auth/eminds_logo.png";
import CustomInput from "../../components/CustomInput";
import { Form, Formik } from "formik";
import { loginSchema } from "../../schemas/AuthSchema";
import { useDispatch, useSelector } from "react-redux";
import { signInAction, clearMessage } from "../../redux/actions/authActions";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="grid sm:grid-cols-2">
        <div className="w-full h-screen hidden md:block ">
          <img
            src={Illustration}
            alt=""
            className="h-full w-full object-contain"
          />
        </div>

        <div className="flex items-center justify-center min-h-screen px-10">
          <div className="w-full sm:max-w-md">
            <img
              src={EmindsLogo}
              alt=""
              className="h-56 w-full object-contain"
            />
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <Formik
              initialValues={{
                username: "",
                password: "",
              }}
              validationSchema={loginSchema}
              onSubmit={async (values, actions) => {
                const formData = new FormData();
                formData.append("username", values.username);
                formData.append("password", values.password);

                await dispatch(signInAction(formData, navigate));
              }}
            >
              {() => (
                <Form>
                  <CustomInput label="Username" name="username" type="text" />

                  <CustomInput
                    label="Password"
                    name="password"
                    type="password"
                  />
                  <button
                    className="btn btn-primary w-full rounded-none mt-4 text-white"
                    type="submit"
                  >
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
