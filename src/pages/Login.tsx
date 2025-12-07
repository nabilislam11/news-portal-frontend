import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { userSchema, type UserInput } from "../validators/user";
import { useForm } from "react-hook-form";

const Login = () => {
  const form = useForm<UserInput>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });


  return <div>Login</div>;
};

export default Login;
