import styles from './home.module.scss';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';
import { Octokit } from "@octokit/core";

export default function Home() {
  const { data } = useSession();

  const [color, setColor] = useState("");

  const {data: session} = useSession();
  
  const [following, setFollowing] = useState("");
  const [followers, setFollowers] = useState("");
  const [publicRepos, setPublicRepos] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");

  if(data){
    getUser(data.accessToken).then(user => {
      setFollowing(user.following);
      setFollowers(user.followers);
      setPublicRepos(user.public_repos);
      if(user.company == null){
        setCompany("Sem organização");
      }else{
        setCompany(user.company);
      }
      
      if(user.location != null){
        setLocation(user.location);
      }else{
        setLocation("Sem localização");
      }
    });
  }


  async function getUser(accessToken: any){
    const octokit = new Octokit({ auth: accessToken });
    const { data } = await octokit.request('/user');
    return data;
  }
  
   //Informações previas


  function randomColor(){
    setColor(Math.floor(Math.random()*16777215).toString(16));
  }

  return (
    <main className={styles.mainContainer}>
        <div className={styles.container}>
            <div className={styles.mainCard}>
              <h3>Compartilhe seu #rocketcard</h3>
                <div className={styles.card} style={{backgroundColor: `#${color}`}}>
                    <div className={styles.cardContent}>
                        <header className={styles.cardHeader}>
                          <img src="/logo.svg" alt="logo" />
                          <h4>{session ? session?.user.name : "Aguardando dados"}</h4>
                        </header>
                        <div className={session ? styles.imgUser : styles.emptyimg} />
                        <div className={styles.infoUser}>
                           <div className={styles.infoContent}>
                              <img src="/followers.svg" alt="Seguidores" />
                              <span>{session ? following + " Seguindo" : "Aguardando dados"}</span>
                           </div>
                           <div className={styles.infoContent}>
                              <img src="/following.svg" alt="Seguidores" />
                              <span>{session ? followers + " Seguidores" : "Aguardando dados"}</span>
                           </div>
                           <div className={styles.infoContent}>
                              <img src="/repository.svg" alt="Seguidores" />
                              <span>{session ? publicRepos + " Repositórios" : "Aguardando dados"}</span>
                           </div>
                           <div className={styles.infoContent}>
                              <img src="/company.svg" alt="Seguidores" />
                              <span>{session ? company : "Aguardando dados"}</span>
                           </div>
                           <div className={styles.infoContent}>
                              <img src="/location.svg" alt="Seguidores" />
                              <span>{session ? location : "Aguardando dados"}</span>
                           </div>
                        </div>
                        <footer className={styles.footerCard}>
                            <img src="/logo.svg" alt="Logo" />
                            <h3>ROCKETCARD</h3>
                        </footer>
                    </div>
                </div>
            </div>
            <div className={styles.buttonContainer}>
                {!session ? <h3>Criar Rocketcard</h3> :<h3>Customizar Rocketcard</h3>}
                {session &&  <button onClick={() => randomColor()}>Mudar background</button>}
                {!session &&  <button onClick={() => signIn('github')}>Gerar dados</button>}
                {session && <button>Baixar rocketcard</button>}
                {session && <button onClick={() => signOut()}>Reiniciar Auth</button>}
            </div>
        </div>
    </main>
  )
}
