import React , { useState } from 'react';
import styles from './login.module.css'
import { Link } from "react-router-dom";

function Login() {
    const [accountInfos, setAccountInfos] = useState({mail:"", password:""});

    const handleChange = (event) => {
        switch(event.target.id) {
            case 'email':
                accountInfos.mail = event.target.value;
                setAccountInfos(accountInfos);
                break;
            case 'password':
                accountInfos.password = event.target.value;
                setAccountInfos(accountInfos);
                break;
            case 'submit':
                console.log(accountInfos);
                console.log('vérification du compte user si valide le rediriger vers le tableau');
                
                break;
            default:
                console.log("problème survenu au niveau des paramètres !");
                break;
        }
        console.log(accountInfos);
    }
  return (
    <div className={styles.loginContainer}>
         <div className={styles.container_formAddColumns}>
            <h4>Se connecter</h4>
            <input type="text" id="email"  className={styles.input} placeholder="Email" onChange={handleChange}/>
            <input type="password" id="password"  className={styles.input} placeholder="Mot de passe" onChange={handleChange} />
            <button id='submit' className={styles.btnSubmit} onClick={handleChange}>Valider</button>
            <div><Link to="/createaccount">Créer un compte</Link></div>
        </div>
    </div>
  )
}

export default Login