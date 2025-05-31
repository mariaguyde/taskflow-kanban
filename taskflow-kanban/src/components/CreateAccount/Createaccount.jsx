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
                if (checkAccountInfos()) { // si format valide, insertion de l'user dans les tables
                    console.log('création dun nouveau user dans mongodb');
                    createUser();
                }
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
            document.getElementById('createAccountContainer__errorMsg').style.display = "block";
            return false;
        }
        else {
            document.getElementById('createAccountContainer__errorMsg').style.display = "none";
            return true;
        }
    }

    async function createUser () {
        try {
            const urlAPI = 'https://api-backend-taskflow.vercel.app/api/users/register';
            const response = await fetch(urlAPI, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(accountInfos)
            });
    
            const data = await response.json();
            if (response.ok) {
              //console.log(('Utilisateur créé : ' + data.username);
              navigate("/tasks");
            } else {
              console.log('Erreur : ' + data.message);
              // TODO affichage d'un message d'erreur
            }
          } catch (err) {
            console.error('Erreur réseau :', err);
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