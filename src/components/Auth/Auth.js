import React, { useRef } from 'react';
import './Auth.module.css';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/index';

const Auth = (props) => {
  
  const dispatch = useDispatch();
  const formData = useRef();

  const loginHandler = () => {
    const form = formData.current
    const userCredentials = { email: form['email'].value, password: form['password'].value };
        
    dispatch(authActions.login(userCredentials));
    props.history.push("/user");
  }

  return (
    <main className="auth">
      <section>
        <form ref={formData} onSubmit={loginHandler}>
          <div >
            <label htmlFor='email'>User</label>
            <input type='text' id='email' />
          </div>
          <div >
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' />
          </div>
          <button>Login</button>
        </form>
      </section>
    </main>
  );
};

export default Auth;
