import { useState, useEffect } from "react";
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";

import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from "../src/lib/AlurakutCommons";


function ProfileSidebar(props) {

  return (
    <Box as="aside">
      <img 
        src={`https://github.com/${props.githubUser}.png`}
        alt="Foto de perfil"
        style={{ borderRadius: "8px"}}
      />

      <hr/>
      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr/>

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

function ProfileRelationsBox({items, title}) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {title} ({items.length})
      </h2>
    
      <ul>
        {items.map((follow) => {
          return (
            <li key={follow.id}>
              <a href={`/users/${follow.title}`} >
                <img src={follow.image} alt=""/>
                <span>{follow.title}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  );
}

export default function Home() {
  const githubUser = "joaovitorJS";
  const favoritePerson = [
    "juunegreiros", 
    "omariosouto", 
    "peas", 
    "rafaballerini", 
    "marcobrunodev",
    "felipefialho"
  ];

  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    fetch('https://api.github.com/users/joaovitorJS/followers')
      .then((data) => {
        return data.json();
      })
      .then((followersData) => {
        setFollowers(followersData);
      });

  }, []);

  const [relations, setRelations] = useState([{
    id: new Date().toISOString(),
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const relation = {
      id: '14141414141413412312',
      title: formData.get('title'),
      image: formData.get('image')  
    } 
    setRelations([...relations, relation]);
  }

  return (
    <>
      <AlurakutMenu githubUser={githubUser}/>
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSidebar githubUser={githubUser}/>
        </div>

        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <input 
                  type="text"
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                />
              </div>
              <div>
                <input 
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea: "profileRelationsArea" }}>

          <ProfileRelationsBox 
            items={followers} 
            title="Seguidores"
          />

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({relations.length})</h2>
          
            <ul>
              {relations.map((relation) => {
                return (
                  <li key={relation.id}>
                    <a href={`/users/${relation.title}`} >
                      <img src={relation.image} alt=""/>
                      <span>{relation.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Pessoas da comunidade ({favoritePerson.length})</h2>

            <ul>
              {favoritePerson.map((person) => {
                return (
                  <li key={person}>
                    <a href={`/users/${person}`} >
                      <img src={`https://github.com/${person}.png`} alt={`Foto do(a) ${person}`}/>
                      <span>{person}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
