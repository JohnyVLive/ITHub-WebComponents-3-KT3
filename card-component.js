const divContainer = document.getElementById('container')

const userHeader = document.getElementById('user-header')
const userContent = document.getElementById('user-content')
const userImg = document.getElementById('user-img')
const userImgAlt = document.getElementById('user-img-alt')
const userSend = document.getElementById('user-send')


userSend.addEventListener('click', (e) => {
    console.log('Нажали кнопочку добавления контента')
    if (checkContent()){
        // console.log(userHeader.value, userContent.value, userImg.value)
        addContent()
        clearContent()
    } else {
        alert('Нужно ввести заголовок и контент')
    }
})


customElements.define("card-component", class extends HTMLElement {
    constructor(){
        super()
        console.log('Добавляем контент')


        let tmpl = document.getElementById('tmpl-card')
        let tmplContent = tmpl.content

        const shadowRoot = this.attachShadow({mode: 'open'});

        this.shadowRoot.innerHTML = `
                <h2><slot name="header"></slot></h2>
                <p><slot name="content"></slot></p>
                <img><slot name="pic"></slot>`
        shadowRoot.appendChild(tmplContent.cloneNode(true))

    }
})

function addContent(){

    let cardComponent = document.createElement('card-component')
    cardComponent.className = 'card-component'
    cardComponent.innerHTML = `
        <h2 slot="header">${userHeader.value}</h2>
        <p slot="content">${userContent.value}</p>`
    if (userImg) cardComponent.innerHTML += `
        <img class="pic" slot="pic" src="${'images/' + userImg.value}" alt="${userImgAlt.value}"/>`

    // console.log(cardComponent.innerHTML)
    divContainer.append(cardComponent)
    // console.log(divContainer.innerHTML)

}

function checkContent(){
    if (userHeader.value && userContent.value){
        return true
    } else {
        return false
    }
}

function clearContent(){
    userHeader.value = null
    userContent.value = null
    userImg.value = null
    userImgAlt.value = null
}