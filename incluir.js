//Variaveis

const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sLote = document.querySelector('#m-lote')
const sVariedade = document.querySelector('#m-variedade')
const sDia = document.querySelector('#m-dia')
const sBancada = document.querySelector('#m-bancada')
const sQuantidade = document.querySelector('#m-quantidade')
const btnSalvar = document.querySelector('#btnSalvar')

let itens 
let id


const getItens = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItens = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

function loadItens() {
    itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
        insertItem(item, index)
        
    })
}

loadItens()

function insertItem(item, index) {
    let tr = document.createElement('tr')

    tr.innerHTML = `
    <td>${item.lote}</td>
    <td>${item.variedade}</td>
    <td>${item.quantidade}</td>
    <td>${item.bancada}</td>
    <td>${item.dia}</td>
    <td class = "acao">
        <button onclick = "editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class = "acao">
        <button onclick = "deleteItem(${index})"><i class= 'bx bx-trash'></i></button>
    </td>
`
    
tbody.appendChild(tr)
}

function editItem(index){
    openModal(true, index)
}

function deleteItem(index){
    let res = confirm('Deseja continuar?')
    if(res === true){
        itens.splice(index, 1)
        setItensBD() 
        loadItens() 
    }
}



function openModal(edit = false, index = 0){
    modal.classList.add('active')

    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {
            modal.classList.remove('active')
        }
    }

    if (edit) {
        sLote.value = itens[index].lote
        sVariedade.value = itens [index].variedade
        sDia.value = itens[index].dia
        sQuantidade.value = itens[index].quantidade
        sBancada.value = itens[index].bancada
        id = index
    }else{
        sLote.value = ''
        sVariedade.value = ''
        sDia.value = ''
        sQuantidade.value = '' 
        sBancada.value = ''     
    }

}

btnSalvar.onclick = e => {
    if (sLote.value == '' || sVariedade.value == '' || sDia.value == '' || sQuantidade.value == '' || sBancada.value =='' )
    return

e.preventDefault();

if(id !== undefined) {
    itens[id].lote = sLote.value
    itens[id].variedade = sVariedade.value
    itens[id].dia = sDia.value
    itens[id].quantidade = sQuantidade.value
    itens[id].bancada = sBancada.value
}else{
    itens.push({'lote':sLote.value, 'variedade': sVariedade.value, 'dia': sDia.value, 'quantidade': sQuantidade.value, 'bancada': sBancada.value})
}

setItensBD()

modal.classList.remove('active')
loadItens()
id = undefined
}

function loadItens(){
    itens = getItens()
    tbody.innerHTML = ''
    itens.forEach((item, index)=> {
        insertItem(item, index)
    })
}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []

const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()