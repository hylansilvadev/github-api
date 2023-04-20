// CRIADO POR : @lanosilvadev | hylansilva
// Importações
import seachIcon from '/search-icon.svg';
import logoimg from '/logo.svg';
import '../styles/style.css'

import { getUserProps } from '../hooks/useFeth';

// criando a página 1
// criando o wrapper principal
const searchWrapper = document.createElement("div");
searchWrapper.className = "search-wrapper";
document.body.appendChild(searchWrapper); // adicionando o wrapper ao div


// criando o elemento da logo
const logo = document.createElement('img');
logo.setAttribute("alt","logo do do github + js");
logo.setAttribute("src",logoimg);
logo.setAttribute("class","logo-img");
searchWrapper.appendChild(logo); // adicionando a logo ao wrapper

// criando a div da barra de pesquisar
const search = document.createElement('div');
search.className = "search-div";
searchWrapper.appendChild(search); // adicionando a div do input ao wrapper

// criando o input
const searchInput = document.createElement('input');
searchInput.type = "text";
searchInput.placeholder = "Ex: lanosilva...";
searchInput.className = "search-input";
searchInput.focus();
search.appendChild(searchInput); // adicionando a div do input ao wrapper

// criando o botao de pesquisar
const hndSearchButton = document.createElement('button');
hndSearchButton.className = "search-btn"
hndSearchButton.disabled = true;
search.appendChild(hndSearchButton); // adicionando a div do input ao wrapper

//criando o icon de pesquisar
const searchicon = document.createElement('img');
searchicon.src = seachIcon;
hndSearchButton.appendChild(searchicon) // adicionando a div do input ao wrapper


const enableButton = () => {
    hndSearchButton.disabled = searchInput.value === '';
  }
  searchInput.addEventListener('input', enableButton);
