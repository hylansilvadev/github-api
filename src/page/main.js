// CRIADO POR : @lanosilvadev | hylansilva
// Importações

import axios from 'axios';

import '../styles/userPropsStyle.css';
import arrowLeft from '/arrow-left.svg';

import seachIcon from '/search-icon.svg';
import logoimg from '/logo.svg';
import '../styles/mainStyle.css';

let userArr = [];

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


const toast = (title, message) =>{
  const toastDiv = document.createElement('div');
  const toastBody = document.createElement('div');
  const titleP = document.createElement('p');
  titleP.innerText = title;
  toastBody.appendChild(titleP);
  const messageP = document.createElement('p');
  messageP.innerText = message;
  toastBody.appendChild(messageP);

  toastDiv.appendChild(toastBody);
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

const groupTwo = () =>{
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

perfilImage.src = '';
perfilImage.alt = "foto do perfil"
perfilWrapper.appendChild(perfilImage);

// criando o div que vai mostrar o nome

nameWrapper.className = "name-wrapper";
asside.appendChild(nameWrapper);

// criando o p que vai exibir o nome

name.className = "user-name";
name.innerText = "nome do usuário";
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


const backPageOne = () =>{
  
  document.body.removeChild(wrapper);
  searchInput.value = '';
  groupOne();
  searchInput.focus();
  userArr = [];
}

hndBackButton.onclick = backPageOne;

}
export const getUserProps = (user) =>{
    axios.get(`https://api.github.com/users/${user}/repos`)
    .then(res=>{
        const userProps = res.data;
        document.body.removeChild(searchWrapper);
        groupTwo();
        console.log(userProps);
    })
    .catch(err => {
      if (err.response && err.response.status === 404){
        error404();
      }
    });
};

const error404 = () =>{
  alert('Error 404, usuário não encontrado!')
  searchInput.value = '';
  searchInput.focus();


  
}

groupOne();