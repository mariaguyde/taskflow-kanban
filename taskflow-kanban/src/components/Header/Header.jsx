import React , { useState } from 'react';
import styles from './header.module.css';
import {  useNavigate } from "react-router-dom";

function Header() {

  const [connexionInfos, setConnexionInfos] = useState(localStorage.getItem('connexion'));
  const navigate = useNavigate();

  setTimeout(() => {
    // rafraichir le header affichage une fois arrive sur le tableau 
    setConnexionInfos(localStorage.getItem('connexion'));
  }, 1000);


  const deconnect = () => {
    localStorage.setItem("connexion", false);
    localStorage.removeItem("user");
    setConnexionInfos(false);
    navigate("/login");
  }

  const goToLoginPage = () => {
    navigate("/login");
  }

  return (
    <div className={styles.headerContainer}>
      <p className={styles.headerContainer__nom}>Taskflow</p>

      {connexionInfos === "true" ? 
        (<p className={styles.headerContainer_txtConnexion} onClick={deconnect}>Se déconnecter</p>)
      :
        (<p className={styles.headerContainer_txtConnexion} onClick={goToLoginPage}>Se connecter</p>)
      }
    </div>
  );
}

export default Header