let res = document.getElementById('res')
let consultar = document.getElementById('consultar')

consultar.addEventListener('click', (e) => {
    e.preventDefault()

    let id = document.getElementById('id').value

    if (!id) {
        res.innerHTML = '<p style="color:red;">Informe um ID válido.</p>'
        return
    }

    fetch(`http://localhost:8081/saida/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Produto não encontrado')
            }
            return response.json()
        })
        .then(dados => {
            res.innerHTML = ''

            console.log('Produto consultado:', dados)

            let item = document.createElement('p')
            item.innerHTML = `
              <br>Data de Solicitação: ${dados.dataSolicitacao}<br>
                    <br>Hora da Saída: ${dados.horaSaida}<br>
                    <br>Hora do Retorno: ${dados.horaRetorno}<br>
                    <br>Motivo: ${dados.motivo}<br>
                    <br>Destino: ${dados.localDestino}<br>
                    <br>Status: ${dados.status}<br>
                    <br>Nome do Aluno: ${dados.nomeAluno}<br>
                    <br>Nome do Professor: ${dados.nomeProfessor}<br>
                    <br>Código de identificação do Aluno: ${dados.aluno?.cod ?? 'indefinido'}<br>
                    <br>Código de identificação do Professor: ${dados.professor?.cod ?? 'indefinido'}<br>
                    <br><span class="codigo-destaque">Código da saída: ${dados.codSaida}</span><br>
                    <br><hr>
            `

            res.appendChild(item)
        })

        .catch(erro => {
            res.innerHTML = `<p style="color:red;">Erro ao consultar Saída: ${erro.message}</p>`
            console.error('Erro na consulta:', erro)

        })

})