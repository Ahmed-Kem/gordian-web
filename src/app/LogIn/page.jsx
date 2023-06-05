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

export default function LogIn() {
  const [formData, setFormData] = useState({ email: '', mdp: '' });

  const router = useRouter();

  const { signInWithPassword } = useAuth();

  function handleChange(event) {
    setFormData((prevFormData) => {
      return { ...prevFormData, [event.target.name]: event.target.value };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { data, error } = await signInWithPassword({
        email: formData.email,
        password: formData.mdp,
      });
      router.push('/Homepage');
    } catch (error) {
      alert(error);
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
          Se connecter à Gordian
        </h4>
        <form className={styles.styledform} onSubmit={handleSubmit}>
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
        <Link className={styles.styledlink} href="/SignUp">
          Inscrivez-vous
        </Link>
        <Link className={styles.styledlink} href="/ResetPswd">
          Vous n'arrivez pas à vous connecter ?
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