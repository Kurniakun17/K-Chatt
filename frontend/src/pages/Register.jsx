import axios from "axios";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputForm } from "../components/InputForm";
import { useCookies } from "react-cookie";
import { verifyToken } from "../utils";
import { toast } from "react-toastify";

export const Register = () => {
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookies] = useCookies();

  useEffect(() => {
    const verify = async () => {
      const data = await verifyToken(cookies, removeCookies, navigate);
      if (data) {
        navigate("/home");
      }
    };
    verify();
  }, []);

  const FormArr = [
    {
      name: "Username",
      type: "text",
      minLength: 4,
    },
    {
      name: "Email",
      type: "text",
      minLength: 10,
    },
    {
      name: "Password",
      type: "password",
      minLength: 6,
    },
  ];

  const LoginPhrase = (
    <p className="text-[16px] mt-5 text-center">
      Already have an account?{" "}
      <Link to={"/login"} className="text-[#00ADB5]">
        Login
      </Link>
    </p>
  );

  const onRegisterSubmit = (data) => {
    axios
      .post("http://localhost:3000/auth/register", {
        username: data.Username,
        email: data.Email,
        password: data.Password,
      })
      .then((res) => {
        if (res.data.status) {
          toast.success(`${res.data.message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          navigate("/login");
        }
      }).catch(err=> {
        toast.error(`${err.response.data.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      })
  };

  return (
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] mt-[-25px] ml-[-25px] w-[440px] border border-slate-300 rounded-xl text-[#222831] bg-white text-lg">
      <InputForm
        FormArr={FormArr}
        title="Register"
        phrase={LoginPhrase}
        onSubmit={onRegisterSubmit}
      ></InputForm>
    </div>
  );
};
