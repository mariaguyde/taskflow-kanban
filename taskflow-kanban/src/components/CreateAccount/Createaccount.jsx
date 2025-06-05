import React, { useState } from 'react';
import styles from './createaccount.module.css';
import { Link, useNavigate } from "react-router-dom";


function CreateAccount() {

    const navigate = useNavigate();
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
               // si format valide, insertion de l'user dans les tables
                if (checkAccountInfos()) { createUser(); }
                break;
            default:
                console.log("problème survenu au niveau des paramètres !");
                break;
        }
        //console.log(accountInfos);
    }

    const checkAccountInfos = () => { // vérification du format des identifiants (si vide ou pas)
        if (accountInfos.pseudo.length === 0  || accountInfos.password.length === 0) { // non valide
            // affichage de l'erreur
            document.getElementById('createAccountContainer__errorMsg').style.display = "block";
            return false;
        }
        else {
            document.getElementById('createAccountContainer__errorMsg').style.display = "none";
            return true;
        }
    }

    async function createUser () { // création d'un utilisateur
      
        try {
            const urlAPI = 'https://api-backend-taskflow.vercel.app/api/users/register';
            const response = await fetch(urlAPI, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json'},
              body: JSON.stringify(accountInfos)
            });
    
            const data = await response.json();
            if (response.ok) { // création de l'user valide
              document.getElementById('createAccountContainer__errorMsgAlreadyTaken').style.display = "none"; // cache les messages d'erreurs plus d'actualité
              navigate("/login"); // redirection vers la page de connexion
            } else {
              //console.log('Erreur : ' + data.message);
              if (data.message == "pseudo already taken") { // erreur survenue lors de la création de l'user
                document.getElementById('createAccountContainer__errorMsgAlreadyTaken').style.display = "block"; // affichage d'un message d'erreur si les identifiants sont déjà pris
              }
            }
          } catch (err) {
            console.error('Erreur réseau :', err);
          }
    }

    return (
      <div className={styles.createAccountContainer}>
          <div className={styles.createAccountContainer_form}>
              <h4>Créer mon compte</h4>
              <input type="text" id="pseudo"  className={styles.input} placeholder="Pseudo" onChange={handleChange}/>
              <input type="password" id="password"  className={styles.input} placeholder="Mot de passe" onChange={handleChange} />
              <div id='createAccountContainer__errorMsg' className={styles.createAccountContainer__errorMsg}>Veuillez renseigner correctement les champs.</div>
              <div id='createAccountContainer__errorMsgAlreadyTaken' className={styles.createAccountContainer__errorMsg}>Ces identifiants sont déjà utilisés par un autre utilisateur. Veuillez en choisir un autre pseudo et mot de passe.</div>
              <button id='submit' className={styles.btnSubmit} onClick={handleChange}>Valider</button>
              <div className={styles.createAccountContainer_loginLink}>Déja un compte créé ?<Link to="/login"> Connectez-vous !</Link></div>
          </div>
      </div>
    );
}

export default CreateAccount