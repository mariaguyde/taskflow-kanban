import React , { useState } from 'react';
import styles from './login.module.css'
import { Link, useNavigate} from "react-router-dom";


function Login() {
    const navigate = useNavigate();
    const [accountInfos, setAccountInfos] = useState({pseudo:'', password:''});

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
                if (checkAccountInfos()) {
                    //console.log('vérification du compte user si valide le rediriger vers le tableau');
                    checkLogin();
                }
                break;
            default:
                console.log("problème survenu au niveau des paramètres !");
                break;
        }
        console.log(accountInfos);
    }

    const checkAccountInfos = () => {
        if (accountInfos.pseudo.length === 0  || accountInfos.password.length === 0) { // identifiants non valides
            // affichage de l'erreur
            document.getElementById('loginContainer__errorMsg').style.display = "block";
            return false;
        }
        else {
            document.getElementById('loginContainer__errorMsg').style.display = "none";
            return true;
        }
    }

    async function checkLogin () {
        try {
            const urlAPI = 'https://api-backend-taskflow.vercel.app/api/users/login';
            const response = await fetch(urlAPI, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(accountInfos)
            });
    
            const data = await response.json();
            if (response.ok) {
              localStorage.setItem("connexion", true);
              localStorage.setItem("user", data.idUser);
              //console.log(data);
              //console.log(localStorage);
              navigate("/tasks"); // redirection vers le tableau des tâches
            } else {
              alert('Erreur : ' + data.message);
            }
          } catch (err) {
            console.error('Erreur réseau :', err);
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