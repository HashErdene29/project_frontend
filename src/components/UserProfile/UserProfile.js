import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './UserProfile.module.css';
import { getCount } from '../Product/Product';

const UserProfile = (props) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // put the name of the slice
  const productCount = getCount();
  const [c, setC] = useState(0);
  const [n, setN] = useState(0);


  useEffect(
    () => {
      const i = JSON.parse(localStorage.getItem('count'));
      if(i){
        setC(i);
      }
    }, []
  )

  useEffect(
    () => {
      const l = JSON.parse(localStorage.getItem('showProductCount'));
      if(l){
        setN(l);
      }
    }, []
  )

  return (
    <React.Fragment>
      <main className="profile">
        {isAuthenticated ? null : props.history.push("/login")}
        <div style={{textAlign:"center"}}>
          <h2>User Profile</h2>
        </div>

        <h4>Number of products: {c ? c : productCount} </h4>
        <h4>Number of shown products:{n}</h4>
      </main>

    </React.Fragment>

  );
};

export default UserProfile;
