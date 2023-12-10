import React, { useEffect, useState } from "react";
import styles from "../styles/Auth.module.scss";
import clsx from "clsx";
import { signUpService, logInService } from "../services/account";
import { setAuthToken } from "@/utils/cookies";
import useAuth from "@/hooks/auth";
import { useRouter } from "next/router";

import {useForm} from 'react-hook-form'

type Props = {};

const Auth = (props: Props) => {
 const [error, setError] = useState<string>("");
  const [authStatus, setAuthStatus] = useState<any>({
    success: false,
    message: "",
  });
  const router = useRouter();
  const [action, setAction] = useState<"register" | "login">("register");

  const auth = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (auth.isLoggedIn()) {
      router.push("/");
    }
  }, [auth.isLoggedIn()]);

  const changeActionHandle = (arg: "register" | "login") => {
    setAction(arg);
  };

  const newSubmit = async (formData:any, e:any) => {
    e.preventDefault();

    const form = new FormData(e.target)

    const email:string = form.get('email') !== null ? form.get('email')!.toString() : ""
    const pwd:string = form.get('password') !== null ? form.get('password')!.toString() : ""
    const name:string = form.get('user') !== null ? form.get('user')!.toString() : ""

    if(action === "login"){
      await auth.logIn(email, pwd)
    } else {

      if (!name.length || !email.length || !pwd.length) {
        setAuthStatus({
          success: false,
          message: "Fill all needed inputs",
        });

        return;
      }

      const registration = await signUpService(name, email, pwd);

      if (registration.error && registration.message) {
        setAuthStatus({
          success: false,
          message: "Something went wrong",
        });
        return
      }

      if(registration.response.hasOwnProperty('user_email')) {
        let registered_user = registration.response
        const data = await logInService(registered_user['user_email'], pwd);

        if(!data.error && data.response.length) {
          setAuthToken(data.response)

          auth.updateProfile()
        }
      }
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        <div className={styles.actionHandle}>
          <button
            onClick={() => {
              changeActionHandle("login");
            }}
            className={clsx(action === "login" && styles.active)}
          >
            login
          </button>

          <button
            onClick={() => {
              changeActionHandle("register");
            }}
            className={clsx(action === "register" && styles.active)}
          >
            register
          </button>
        </div>

        <form
          className={styles.form}
          // onSubmit={(e:any) => {
          //   e.preventDefault()
          //   if (action === "register") {
          //     handleSubmit(submitForm)
          //   } else if (action === "login") {
          //     handleSubmit(logIn)
          //   }
          // }}
          onSubmit={handleSubmit(newSubmit)}
          action="auth"
        >
          {action === "register" && (
            <div className={styles.form__inputContainer}>
              <label htmlFor="user">Username</label>
              <input
                autoComplete="off"
                className={clsx(styles.form__input, styles.inputEmail)}
                type="text"
                name="user"
                placeholder="your username"
              />
            </div>
          )}

          <div className={styles.form__inputContainer}>
            <label htmlFor="email">Email</label>
            <input
              autoComplete="off"
              className={clsx(styles.form__input, styles.inputEmail)}
              type="email"
              name="email"
              placeholder="your email"

            />
          </div>

          <div className={styles.form__inputContainer}>
            <label htmlFor="password">Password</label>
            <input
              autoComplete="off"
              className={clsx(styles.form__input, styles.inputPass)}
              type="password"
              name="password"
              placeholder="your password"

            />
          </div>

          {authStatus.message.length ? (
            <span
              className={clsx(
                styles.form__statusMsg,
                authStatus.success ? styles.successTrue : styles.successFalse
              )}
            >
              {authStatus.message}
            </span>
          ) : null}

          <button
            type="submit"
            className={clsx(styles.form__button, styles.inputEmail)}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
