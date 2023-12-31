import React from 'react';
import './Header.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/index';
import { Link, Redirect } from 'react-router-dom';
import 'react-router';

const Header = (props) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // put the name of the slice
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    <Redirect to='/login' />;
  }

  return (
    <header className="header">
      <h1>Final Exam</h1>
      {isAuthenticated && (<nav>
        <ul>
          <li>
            <Link to="/user"> Profile </Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/add-product">Add Product</Link>
          </li>
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
        </ul>
      </nav>)}

    </header>
  );
};

export default Header;
