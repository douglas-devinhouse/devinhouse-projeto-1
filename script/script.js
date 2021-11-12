const LISTA_TAREFAS = [];

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
      NOVO_ELEMENTO_LI.innerHTML = `<input type="checkbox" name="chk-${objetoTarefa.id}" onclick="marcaFeito(${objetoTarefa.id})">
                                    <label for="chk-${objetoTarefa.id}">${objetoTarefa.textoTarefa}</label>
                                    <button onclick="removeItem(${objetoTarefa.id})">&times;</button>`;
      let elementoUl = document.querySelector('#lista-tarefas');
      elementoUl.appendChild(NOVO_ELEMENTO_LI);

      console.log(LISTA_TAREFAS);

      document.querySelector("#inputTarefa").value = "";
    }
}

function excluirTarefa(idTarefa) {
    //Praticando arrow function: encontre o item => se o id dele for igual ao parâmetro
    let indiceExcluir = LISTA_TAREFAS.findIndex((item) => item.id == idTarefa);
    LISTA_TAREFAS.splice(indiceExcluir,1);
        
    console.log(LISTA_TAREFAS);
}

function alterarStatusTarefa(idTarefa) {
    let indiceAlterarStatus = LISTA_TAREFAS.findIndex((item) => item.id == idTarefa);    
    LISTA_TAREFAS[indiceAlterarStatus].concluido = !(LISTA_TAREFAS[indiceAlterarStatus].concluido);    
    
    console.log(LISTA_TAREFAS);
  }

document.querySelector("#btn-adicionar").addEventListener("click", adcionarTarefa);
document.querySelector("#inputTarefa").addEventListener("keydown", function(e) {
    if (e.keyCode == 13) {
      adcionarTarefa();
    }
  });