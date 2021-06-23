const url_API="https://rickandmortyapi.com/api/"
const img = document.createElement("img"); 
const mostrador=document.getElementById("personajes")
const paginador=document.getElementById("paginador")

async function paginacion(pagina){
    let Npagina=pagina.innerHTML
    if (Npagina=="《" ) {
        Npagina=1         
    } else if(Npagina=="》"){
        Npagina=await RickAndMortyPage.charactersPagesNumber()    
    }else if(Npagina=="«"){
        (RickAndMortyPage.page>1)?Npagina=RickAndMortyPage.page-1:Npagina=RickAndMortyPage.page
    }else if(Npagina=="»"){
        (RickAndMortyPage.page<34)?Npagina=RickAndMortyPage.page+1:Npagina=RickAndMortyPage.page
    } 
    RickAndMortyPage.page=Npagina
    RickAndMortyPage.CharacterRegen()
}

class Page{
    constructor(){
    this.API=url_API
    this.url_API_Character=`${url_API}character/`
    this.page=1
    this.memoryCards="";
    }
    charactersPagesNumber(){

        return fetch(this.url_API_Character).then(response => response.json()).then(data=>data.info.pages)
    }
    charactersNumber(){

        return fetch(this.url_API_Character).then(response => response.json()).then(data=>data.info.count)
    }
    getData(page=this.page){
        return fetch(`${this.url_API_Character}/?page=${page}`)
        .then(response => response.json()).then(response=>response)
        
    }
    async CharacterRegen(){
        this.memoryCards=""
        let info=await this.getData(this.page)
        paginador.innerHTML=this.page
        let data=info.results
        console.log()
        for (let i = 0; i < Object.keys(data).length; i++) {
                let status=data[i].status
                let name=data[i].name
                let img=data[i].image
                let specie=data[i].species
                this.createCard(name,status,img,specie)
        }
    }
    createCard(name,status,img,specie){
        let htmlContent=`           
        <div class="card">
        <img src="${img}" alt="imagen de ${name}">
        <h2>${name}</h3>
        <h3>Species:${specie}</h3>
        <p class="${status}">${status}</p>
        </div>` 
        this.memoryCards+=htmlContent
        mostrador.innerHTML=this.memoryCards     
    }
}
const RickAndMortyPage =new Page()
RickAndMortyPage.CharacterRegen()
 
 