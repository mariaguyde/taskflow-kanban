import React, { useState } from 'react';
import styles from './createaccount.module.css';
import { Link } from "react-router-dom";


function CreateAccount() {

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
                console.log('création dun nouveau user dans mongodb');
                break;
            default:
                console.log("problème survenu au niveau des paramètres !");
                break;
        }
        console.log(accountInfos);
    }

  return (
    <div className={styles.createAccountContainer}>
         <div className={styles.container_formAddColumns}>
            <h4>Créer mon compte</h4>
            <input type="text" id="email"  className={styles.input} placeholder="Email" onChange={handleChange}/>
            <input type="password" id="password"  className={styles.input} placeholder="Mot de passe" onChange={handleChange} />
            <button id='submit' className={styles.btnSubmit} onClick={handleChange}>Valider</button>
            <div><Link to="/login">Se connecter</Link></div>
        </div>
    </div>
  )
}

export default CreateAccount