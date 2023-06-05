'use client';

import { useAuth } from '@/context/AuthSupabaseContexte';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import appleLogo from '../utils/images/apple-logo.svg';
import googleLogo from '../utils/images/google-logo.svg';
import gordianLogo from '../utils/images/gordian-logo.svg';
import styles from './page.module.css';

export default function SignUp() {
  const [formData, setFormData] = useState({ nom: '', email: '', mdp: '' });

  const router = useRouter();

  const { signUp } = useAuth();

  function handleChange(event) {
    setFormData((prevFormData) => {
      return { ...prevFormData, [event.target.name]: event.target.value };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { user, data, error } = await signUp({
        email: formData.email,
        password: formData.mdp,
        options: {
          data: {
            name: formData.nom,
          },
        },
      });
      alert('Check your email');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.title}>
        <Image src={gordianLogo} alt="gordian-logo" height={65} width={65} />
        <h1>Gordian</h1>
      </div>

      <div className={styles.formcontainer}>
        <h4
          style={{ fontWeight: 600, fontSize: 16, margin: '0px 0px 20px 0px' }}
        >
          Créez votre compte
        </h4>
        <form className={styles.styledform} onSubmit={handleSubmit}>
          <input
            className={styles.styledinput}
            type="text"
            placeholder="Saisissez votre nom"
            name="nom"
            onChange={handleChange}
          />
          <input
            className={styles.styledinput}
            type="text"
            placeholder="Saisissez une adresse e-mail"
            name="email"
            onChange={handleChange}
          />
          <input
            className={styles.styledinput}
            type="password"
            placeholder="Saisir le mot de passe"
            name="mdp"
            onChange={handleChange}
          />
          <span
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: '10px',
              marginBottom: '20px',
            }}
          >
            En m'inscrivant, j'accepte les{' '}
            <Link className={styles.warninglink} href="/Legal">
              conditions d'utilisation
            </Link>{' '}
            et je confirme avoir pris connaissance de sa{' '}
            <Link className={styles.warninglink} href="/Privacy">
              politique de confidentialité
            </Link>
            .
          </span>{' '}
          <input
            className={styles.submitbutton}
            type="submit"
            value={'Continuer'}
          />
        </form>
        OU
        <div className={styles.otherloginmodes}>
          <button className={styles.otherloginbuttons}>
            <Image
              className={styles.loginlogos}
              src={googleLogo}
              alt="google-logo"
              height={30}
              width={30}
            />
            Continuer avec Google
          </button>
          <button className={styles.otherloginbuttons}>
            <Image
              className={styles.loginlogos}
              src={appleLogo}
              alt="apple-logo"
              height={30}
              width={30}
            />
            Continuer avec Apple
          </button>
        </div>
        <Link className={styles.styledlink} href="/LogIn">
          Vous avez déjà un compte ?
        </Link>
      </div>

      <div className={styles.bottom}>
        <Link className={styles.bottomlinks} href="/Privacy" target="_blank">
          Politique de confidentialité
        </Link>
        .
        <Link className={styles.bottomlinks} href="/Legal" target="_blank">
          Conditions de service
        </Link>
      </div>
    </div>
  );
}
