import React , { useState } from 'react';
import styles from './login.module.css'
import { Link } from "react-router-dom";

function Login() {
    const [accountInfos, setAccountInfos] = useState({pseudo:'', password:''});

    const handleChange = (event) => {
        //document.getElementById('loginContainer__errorMsg').style.display = "none";
        switch(event.target.id) {
            case 'pseudo':
                accountInfos.pseudo = event.target.value;
                setAccountInfos(accountInfos);
                break;
            case 'password':
                accountInfos.password = event.target.value;
                setAccountInfos(accountInfos);
                break;
            case 'submit':
                console.log(accountInfos);
                console.log('vérification du compte user si valide le rediriger vers le tableau');
                checkAccountInfos();
                break;
            default:
                console.log("problème survenu au niveau des paramètres !");
                break;
        }
        console.log(accountInfos);
    }

    const checkAccountInfos = () => {
        if (accountInfos.pseudo.length === 0  || accountInfos.password.length === 0) { // non valide
            // affichage de l'erreur
            document.getElementById('loginContainer__errorMsg').style.display = "block";
        }
        else {
            document.getElementById('loginContainer__errorMsg').style.display = "none";
        }
    }
    
  return (
    <div className={styles.loginContainer}>
         <div className={styles.container_formAddColumns}>
            <h4>Se connecter</h4>
            <input type="text" id="pseudo"  className={styles.input} placeholder="Pseudo" onChange={handleChange}/>
            <input type="password" id="password"  className={styles.input} placeholder="Mot de passe" onChange={handleChange} />
            <button id='submit' className={styles.btnSubmit} onClick={handleChange}>Valider</button>
            <div id='loginContainer__errorMsg' className={styles.loginContainer__errorMsg}>Veuillez renseigner correctement les champs.</div>
            <div><Link to="/createaccount">Créer un compte</Link></div>
        </div>
    </div>
  )
}

export default Login