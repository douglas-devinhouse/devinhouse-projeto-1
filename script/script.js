const LISTA_TAREFAS = [];

function adcionarTarefa(){
    if (document.querySelector("#inputTarefa").value == "") {
      alert("Informe a descrição da tarefa para incluir!");
    } else {
      const objetoTarefa = {
        id: LISTA_TAREFAS.length,
        textoTarefa: document.querySelector("#inputTarefa").value,
        concluido: false,        
      };
      
      LISTA_TAREFAS.push(objetoTarefa);
      console.log(LISTA_TAREFAS);
    }
}

// pretendo incluir uma escuta para incluir na lista ao pressionar enter tbm (pesquisar como fazer isso)
document.querySelector("#btn-adicionar").addEventListener("click", adcionarTarefa);