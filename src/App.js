import { useEffect, useState } from "react";
import "./App.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function App() {
  const schema = yup.object().shape({
    name: yup.string().required("name is a required field"),
    email: yup.string().email().required("invalid email"),
    password: yup
      .string()
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      )
      .required(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [data, setData] = useState({
    name: "",
    email: "",
  });

  console.log(errors, "<<<<<-ERRORS");

  const onSubmit = (data) => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      })
    );
    setData({
      ...data,
    });

    reset();
  };

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("user"));
    if (localData) {
      setData({
        name: localData.name,
        email: localData.email,
      });
    }
  }, []);

  return (
    <div className="center">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} />
        <p>{errors.name?.message}</p>

        <input {...register("email")} />
        <p>{errors.email?.message}</p>

        <input type="password" {...register("password")} />
        <p>{errors.password?.message}</p>

        <input type="submit" />
      </form>

      <div>
        <h2>Saved Form Data:</h2>
        <p>Name: {data.name}</p>
        <p>Email: {data.email}</p>
      </div>
    </div>
  );
}

export default App;
