import React, { useState } from 'react';
import styles from './createaccount.module.css';
import { Link } from "react-router-dom";


function CreateAccount() {

    const [accountInfos, setAccountInfos] = useState({pseudo:"", password:""});

    const handleChange = (event) => {
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
                console.log('création dun nouveau user dans mongodb');
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
            console.log(document.getElementById('createAccountContainer__errorMsg'));
            document.getElementById('createAccountContainer__errorMsg').style.display = "block";
        }
        else {
            document.getElementById('createAccountContainer__errorMsg').style.display = "none";
        }
    }


  return (
    <div className={styles.createAccountContainer}>
         <div className={styles.container_formAddColumns}>
            <h4>Créer mon compte</h4>
            <input type="text" id="pseudo"  className={styles.input} placeholder="Pseudo" onChange={handleChange}/>
            <input type="password" id="password"  className={styles.input} placeholder="Mot de passe" onChange={handleChange} />
            <button id='submit' className={styles.btnSubmit} onClick={handleChange}>Valider</button>
            <div id='createAccountContainer__errorMsg' className={styles.createAccountContainer__errorMsg}>Veuillez renseigner correctement les champs.</div>
            <div><Link to="/login">Se connecter</Link></div>
        </div>
    </div>
  )
}

export default CreateAccount