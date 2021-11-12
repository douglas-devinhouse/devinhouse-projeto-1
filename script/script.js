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
    }
}

function excluirTarefa(idTarefa) {
    //Praticando arrow function: encontre o item => se o id dele for igual ao parâmetro
    let indiceExcluir = LISTA_TAREFAS.findIndex((item) => item.id == idTarefa);
    LISTA_TAREFAS.splice(indiceExcluir,1);
        
    console.log(LISTA_TAREFAS);
}

function concluirTarefa(idTarefa) {
    let indiceConcluir = LISTA_TAREFAS.findIndex((item) => item.id == idTarefa);
  
    LISTA_TAREFAS[indiceConcluir].concluido
        ? (LISTA_TAREFAS[indiceConcluir].concluido = false)
        : (LISTA_TAREFAS[indiceConcluir].concluido = true);
    
    console.log(LISTA_TAREFAS);
  }

// pretendo incluir uma escuta para incluir na lista ao pressionar enter tbm (pesquisar como fazer isso)
document.querySelector("#btn-adicionar").addEventListener("click", adcionarTarefa);