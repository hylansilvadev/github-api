// CRIADO POR : @lanosilvadev | hylansilva
// Importações

import axios from 'axios';

import '../styles/userPropsStyle.css';
import arrowLeft from '/arrow-left.svg';

import seachIcon from '/search-icon.svg';
import logoimg from '/logo.svg';
import '../styles/mainStyle.css';

let repositories = [];

let slicedRepos;

const searchInput = document.createElement('input');
const searchWrapper = document.createElement("div");
const wrapper = document.createElement('div');
const logo = document.createElement('img');
const search = document.createElement('div');
const hndSearchButton = document.createElement('button');
const searchicon = document.createElement('img');
const asside = document.createElement('aside');
const perfilWrapper = document.createElement('div');
const perfilImage = document.createElement('img');
const nameWrapper = document.createElement('div');
const name = document.createElement('p');
const hndBackButton = document.createElement('button');
const arrowLeftImg = document.createElement('img');
const main = document.createElement('main');
const toastDiv = document.createElement('div');
toastDiv.className = "toast";
const toastHeader = document.createElement('div');
const toastBody = document.createElement('div');
const titleP = document.createElement('strong');
const messageP = document.createElement('p');
const hndCloseToastButton = document.createElement('button');
const spanCluseToastButton = document.createElement('span');
const mainWrapperHeader = document.createElement('header');
const mainWrapperContainer = document.createElement('main');
const repoWrapper = document.createElement('div');
const repoList = document.createElement('ul');


const toast = (title, message) =>{
  spanCluseToastButton.innerText = "x"
  hndCloseToastButton.appendChild(spanCluseToastButton);
  hndCloseToastButton.onclick = ()=>{
    document.body.removeChild(toastDiv)
    searchInput.value = '';
    searchInput.focus();
    };
  hndCloseToastButton.className = 'close-btn';
  titleP.className = "toast-title";
  titleP.innerText = title;
  toastHeader.className = "header-toast-div"
  toastHeader.appendChild(titleP);
  toastHeader.appendChild(hndCloseToastButton);
  messageP.className = "toast-message";
  messageP.innerText = message;
  toastBody.className = "body-toast-div"
  toastBody.appendChild(messageP);
  toastDiv.appendChild(toastHeader);
  toastDiv.appendChild(toastBody);
  document.body.appendChild(toastDiv);
  setTimeout(()=>
    {
      document.body.removeChild(toastDiv)
      searchInput.value = '';
      searchInput.focus();
      repositories = [];
    }
    ,2 * 1000);
}

const groupOne = () =>{
searchWrapper.className = "search-wrapper";
document.body.appendChild(searchWrapper); // adicionando o wrapper ao div


// criando o elemento da logo
logo.setAttribute("alt","logo do do github + js");
logo.setAttribute("src",logoimg);
logo.setAttribute("class","logo-img");
searchWrapper.appendChild(logo); // adicionando a logo ao wrapper

// criando a div da barra de pesquisar
search.className = "search-div";
searchWrapper.appendChild(search); // adicionando a div do input ao wrapper

// setando atributos ao input
searchInput.type = "text";
searchInput.placeholder = "Ex: lanosilva...";
searchInput.className = "search-input";
searchInput.focus();
search.appendChild(searchInput); // adicionando a div do input ao wrapper

// criando o botao de pesquisar
hndSearchButton.className = "search-btn"
hndSearchButton.disabled = true;
search.appendChild(hndSearchButton); // adicionando a div do input ao wrapper

//criando o icon de pesquisar
searchicon.src = seachIcon;
hndSearchButton.appendChild(searchicon) // adicionando a div do input ao wrapper


const enableButton = () => {
    hndSearchButton.disabled = searchInput.value === '';
  }
  searchInput.addEventListener('input', enableButton);

const searchUser = () =>{
  getUserProps(searchInput.value);
}

hndSearchButton.onclick = searchUser
}

const groupTwo = (avatar_url, user_name) =>{
  // criando a estrutura
// wrapper principal
wrapper.className = "wrapper";
document.body.appendChild(wrapper);

// criando as div's filhas
//criando o asside do perfil
asside.className ="asside-wrapper";
wrapper.appendChild(asside);

// criando a div da foto de perfil

perfilWrapper.className = "perfil-wrapper";
asside.appendChild(perfilWrapper);

// criando a img para salvar a foto de perfil

perfilImage.src = `${avatar_url}`;
perfilImage.alt = "foto do perfil";
perfilImage.className = 'perfil-image';
perfilWrapper.appendChild(perfilImage);

// criando o div que vai mostrar o nome

nameWrapper.className = "name-wrapper";
asside.appendChild(nameWrapper);

// criando o p que vai exibir o nome

name.className = "user-name";
name.innerText = user_name;
nameWrapper.appendChild(name);

// criando o botão de voltar

hndBackButton.className = "btn-back";
asside.appendChild(hndBackButton);

// criando a img de voltar

arrowLeftImg.src = arrowLeft;
hndBackButton.appendChild(arrowLeftImg);
hndBackButton.innerText = "voltar";

// criando o main

main.className ="main-wrapper";
wrapper.appendChild(main);

mainWrapperHeader.className = "main-wrapper-header";
main.appendChild(mainWrapperHeader);

mainWrapperContainer.className = "main-wrapper-container";
main.appendChild(mainWrapperContainer);

repoWrapper.className = "repo-wrapper";
mainWrapperContainer.appendChild(repoWrapper);

repoList.className = "repo-list";
repoWrapper.appendChild(repoList);

}

const listRepos = (repos) => {
  repos.forEach((repo)=>{
    const repoListItem = document.createElement('li');
    const repoName = document.createElement('h2');
    const repoResume = document.createElement('p');
    const hndGoToTheRepo = document.createElement('button');

    repoName.innerText = repo.name;
    repoResume.innerText = repo.description || 'Sem descrição';
    hndGoToTheRepo.innerText = 'Repositório';
    hndGoToTheRepo.addEventListener('click', () =>{
      window.open(repo.html_url, '_blank');
    });
    repoListItem.appendChild(repoName);
    repoListItem.appendChild(repoResume);
    repoListItem.appendChild(hndGoToTheRepo);
    repoList.appendChild(repoListItem);
  });
  mainWrapperContainer.appendChild(repoList);
};

const getUserRepoProps = (user) =>{
  axios.get(`https://api.github.com/users/${user}/repos`)
    .then(res=>{
        const userReposProps = res.data;
        let sortedRepos = userReposProps.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        slicedRepos = sortedRepos.slice(0, 5);
        listRepos(slicedRepos);
    }).catch((err) => {
      toast("400", "usuário não possui repositórios!");
    })
}

const getUserProps = (user) =>{
  axios.get(`https://api.github.com/users/${user}`)
      .then(res=>{
        const userProps = res.data;
        if(userProps.message === "Not Found"){
          toast("404", "usuário não encontrado!");
        }else{
          getUserRepoProps(user);
          const avatar_url = userProps.avatar_url;
          const name = userProps.name || userProps.login;
          document.body.removeChild(searchWrapper);
          groupTwo(avatar_url, name);
        }
    }).catch((err) => {
      toast("404", "usuário não encontrado!");
    })
};

const backPageOne = () =>{
    document.body.removeChild(wrapper);
    searchInput.value = '';
    groupOne();
    searchInput.focus();
    sortedRepos = [];
    mainWrapperContainer.removeChild(repoList);
  };

hndBackButton.onclick = backPageOne;

groupOne();