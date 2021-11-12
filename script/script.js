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