const LISTA_TAREFAS = [];

const ELEMENTO_Ul = document.querySelector('#lista-tarefas');

let listaStorage = localStorage.getItem('storage-tarefas');
if (listaStorage) {  
  console.log(listaStorage)
}

function adcionarTarefa(){
  let valorInputTarefa = document.querySelector("#inputTarefa").value;
  if (valorInputTarefa == "") {
    alert("Informe a descrição da tarefa para incluir!");
  } else {
    const objetoTarefa = {
      id: LISTA_TAREFAS.length,
      textoTarefa: valorInputTarefa,
      concluido: false,        
    };
    
    LISTA_TAREFAS.push(objetoTarefa);

    //Adicionar o objetoTarefa na DOM
    const NOVO_ELEMENTO_LI = document.createElement("li");
    //Criar uma propriedade "id" para cada novo item da lista (será o index da LISTA_TAREFAS)
    NOVO_ELEMENTO_LI.id = `item-${objetoTarefa.id}`;
    //Adicionar os elementos html na DOM
    NOVO_ELEMENTO_LI.innerHTML = `<input type="checkbox" name="chk-${objetoTarefa.id}" id="chk-${objetoTarefa.id}" onclick="alterarStatusTarefa(${objetoTarefa.id})">
                                  <label for="chk-${objetoTarefa.id}">${objetoTarefa.textoTarefa}</label>
                                  <button onclick="excluirTarefa(${objetoTarefa.id})">&times;</button>`;      
    
    ELEMENTO_Ul.appendChild(NOVO_ELEMENTO_LI);
    gravarStorage();

    document.querySelector("#inputTarefa").value = "";
  }
}

function excluirTarefa(idTarefa) {
  //Praticando arrow function: encontre o item => se o id dele for igual ao parâmetro
  let indiceExcluir = LISTA_TAREFAS.findIndex((item) => item.id == idTarefa);
  LISTA_TAREFAS.splice(indiceExcluir,1);

  let elementoExcluir = document.querySelector(`#item-${idTarefa}`);
  ELEMENTO_Ul.removeChild(elementoExcluir);
      
  gravarStorage();    
}

function alterarStatusTarefa(idTarefa) {
  let indiceAlterarStatus = LISTA_TAREFAS.findIndex((item) => item.id == idTarefa);    
  LISTA_TAREFAS[indiceAlterarStatus].concluido = !(LISTA_TAREFAS[indiceAlterarStatus].concluido);        
      
  gravarStorage();
}

function gravarStorage(){
  const listaJSON = JSON.stringify(LISTA_TAREFAS);
  // armazena do localStorage
  localStorage.setItem('storage-tarefas', listaJSON);
}

document.querySelector("#btn-adicionar").addEventListener("click", adcionarTarefa);
document.querySelector("#inputTarefa").addEventListener("keydown", function(e) {
  if (e.keyCode == 13) {
    adcionarTarefa();
  }
});  

