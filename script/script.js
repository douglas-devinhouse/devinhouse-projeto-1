const LISTA_TAREFAS = [];

const ELEMENTO_Ul = document.querySelector('#lista-tarefas');

let listaStorage = localStorage.getItem('storage-tarefas');

function adcionarTarefa(){
  let valorInputTarefa = document.querySelector("#inputTarefa").value;
  let ultimoId = undefined;
  if(LISTA_TAREFAS.length == 0){
    ultimoId = 0;
  } else {
    //pega o valor do id do ultimo elemento da lista
    ultimoId = LISTA_TAREFAS[LISTA_TAREFAS.length-1].id; 
  }
  
  if (valorInputTarefa == "") {
    alert("Informe a descrição da tarefa para incluir!");
  } else {
    const objetoTarefa = {
      id: ++ultimoId, //incrementa o ultimo id da lista
      textoTarefa: valorInputTarefa,
      concluido: false,        
    };
    
    LISTA_TAREFAS.push(objetoTarefa);

    //Adicionar o objetoTarefa na DOM
    const NOVO_ELEMENTO_LI = document.createElement("li");
    //Criar uma propriedade "id" para cada novo item da lista (será o index da LISTA_TAREFAS)
    NOVO_ELEMENTO_LI.id = `item-${objetoTarefa.id}`;
    //Adicionar os elementos html na DOM
    NOVO_ELEMENTO_LI.innerHTML = `<input type="checkbox" name="chk-${objetoTarefa.id}" id="chk-${objetoTarefa.id}" 
                                         onclick="alterarStatusTarefa(${objetoTarefa.id})"
                                         class="nao-concluida">
                                  <label for="chk-${objetoTarefa.id}">${objetoTarefa.textoTarefa}</label>
                                  <button onclick="excluirTarefa(${objetoTarefa.id})">&times;</button>`;      
    
    ELEMENTO_Ul.appendChild(NOVO_ELEMENTO_LI);
    gravarStorage();

    document.querySelector("#inputTarefa").value = "";
  }
}

function excluirTarefa(idTarefa) {
  if(window.confirm("Deseja realmente EXCLUIR esta tarefa da lista?")){
    //Praticando arrow function: encontre o item => se o id dele for igual ao parâmetro
    let indiceExcluir = LISTA_TAREFAS.findIndex((item) => item.id == idTarefa);
    LISTA_TAREFAS.splice(indiceExcluir,1);

    let elementoExcluir = document.querySelector(`#item-${idTarefa}`);
    ELEMENTO_Ul.removeChild(elementoExcluir);
        
    gravarStorage();    
  }  
}

function alterarStatusTarefa(idTarefa) {
  let indiceAlterarStatus = LISTA_TAREFAS.findIndex((item) => item.id == idTarefa);    
  LISTA_TAREFAS[indiceAlterarStatus].concluido = !(LISTA_TAREFAS[indiceAlterarStatus].concluido);        

  let elementoAlterarStatus = document.querySelector(`#chk-${idTarefa}`);
  elementoAlterarStatus.className = LISTA_TAREFAS[indiceAlterarStatus].concluido ? 'concluida' : 'nao-concluida';  
      
  gravarStorage();
}

function gravarStorage(){  
  const listaJSON = JSON.stringify(LISTA_TAREFAS);
  // armazena do localStorage
  localStorage.setItem('storage-tarefas', listaJSON);
  
  atualizarContador();
}

if (listaStorage) {  
  carregarListaStorage();
}

function carregarListaStorage(){
  let listaSalva = JSON.parse(listaStorage);
  for(let itemListaSalva in listaSalva){
    //Adiciona o elemento da listaSalva em LISTA_TAREFAS[] para que possam ser manipulados futuramente
    LISTA_TAREFAS.push(listaSalva[itemListaSalva]);

    //Adicionar o itemListaSalva na DOM
    const NOVO_ELEMENTO_LI = document.createElement("li");
    //Criar uma propriedade "id" para cada novo item da lista (será o index da LISTA_TAREFAS)
    NOVO_ELEMENTO_LI.id = `item-${listaSalva[itemListaSalva].id}`;
    //Definir o status do item na lista 
    let classeStatus = undefined;
    let checkboxMarcado = undefined;
    if(listaSalva[itemListaSalva].concluido){
      classeStatus = "concluida";
      checkboxMarcado = "checked";
    } else {
      classeStatus = "nao-concluida";
      checkboxMarcado = "";
    }
    
    //let classeStatus = listaSalva[itemListaSalva].concluido ? 'class="concluida"' : 'class="nao-concluida"';
    //Adicionar os elementos html na DOM    
    NOVO_ELEMENTO_LI.innerHTML = `<input type="checkbox" name="chk-${listaSalva[itemListaSalva].id}" id="chk-${listaSalva[itemListaSalva].id}"
                                         onclick="alterarStatusTarefa(${listaSalva[itemListaSalva].id})" class="${classeStatus}" ${checkboxMarcado}>
                                  <label for="chk-${listaSalva[itemListaSalva].id}">${listaSalva[itemListaSalva].textoTarefa}</label>
                                  <button onclick="excluirTarefa(${listaSalva[itemListaSalva].id})">&times;</button>`;      

    ELEMENTO_Ul.appendChild(NOVO_ELEMENTO_LI);
    atualizarContador();
  }
}

function atualizarContador(){
  let total = LISTA_TAREFAS.length;
  let contConcluidas = 0;
  for (let index = 0; index < LISTA_TAREFAS.length; index++) {
    if(LISTA_TAREFAS[index].concluido){
      contConcluidas++;
    }
  }

  elementoTotais = document.querySelector('#totais').firstElementChild;  
  elementoTotais.innerHTML = `Concluídas: ${contConcluidas}/${total}`;
}

document.querySelector("#btn-adicionar").addEventListener("click", adcionarTarefa);
document.querySelector("#inputTarefa").addEventListener("keydown", function(e) {
  if (e.keyCode == 13) {
    adcionarTarefa();
  }
});  

