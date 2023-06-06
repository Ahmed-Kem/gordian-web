'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import gordianLogo from '../utils/logos/gordian-logo.svg';
import styles from './page.module.css';

export default function LogIn() {
  const [formData, setFormData] = useState({ email: '', mdp: '' });

  const router = useRouter();

  function handleChange(event) {}

  async function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.formcontainer}>
        <div className={styles.logo}>
          <Image src={gordianLogo} alt="gordian-logo" height={42} width={42} />
          <h1>Gordian</h1>
        </div>
        <h4 className={styles.title}>Vous ne pouvez pas vous connecter ?</h4>
        <span className={styles.span}>
          Nous vous enverrons un lien de récupération à
        </span>
        <form className={styles.styledform} onSubmit={handleSubmit}>
          <input
            className={styles.styledinput}
            type="text"
            placeholder="Saisissez une adresse e-mail"
            name="email"
            onChange={handleChange}
          />
          <input
            className={styles.submitbutton}
            type="submit"
            value={'Envoyer le lien de récupération'}
          />
        </form>
        <Link href="/LogIn" className={styles.backlink}>
          Retour à la connexion
        </Link>
      </div>
    </div>
  );
}
