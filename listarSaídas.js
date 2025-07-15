let res = document.getElementById('res')
let list = document.getElementById('list')

list.addEventListener('click', (e) => {
    e.preventDefault();

    fetch('http://localhost:8081/saida')
        .then(response => {
            if (!response.ok) throw new Error('Erro na resposta do servidor')
            return response.json()
        })
        .then(dados => {
            console.log('Dados recebidos:', dados)

            res.innerHTML = ''

            dados.forEach(dado => {
                let item = document.createElement('p')

                item.innerHTML = `
                    <br>Data de Solicitação: ${dado.dataSolicitacao}<br>
                    <br>Hora da Saída: ${dado.horaSaida}<br>
                    <br>Hora do Retorno: ${dado.horaRetorno}<br>
                    <br>Motivo: ${dado.motivo}<br>
                    <br>Destino: ${dado.localDestino}<br>
                    <br>Status: ${dado.status}<br>
                    <br>Nome do Aluno: ${dado.nomeAluno}<br>
                    <br>Nome do Professor: ${dado.nomeProfessor}<br>
                    <br>Código de identificação do Aluno: ${dado.aluno?.cod ?? 'indefinido'}<br>
                    <br>Código de identificação do Professor: ${dado.professor?.cod ?? 'indefinido'}<br>
                    <br><span class="codigo-destaque">Código da saída: ${dado.codSaida}</span><br>
                    <br><hr>
                `

                res.appendChild(item)
            })
        })
        .catch(error => {
            res.innerHTML = `<p style="color: red;">Erro: ${error.message}</p>`
        })
})