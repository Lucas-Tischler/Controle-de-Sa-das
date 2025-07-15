let res = document.getElementById('res')
let consultar = document.getElementById('consultar')

consultar.addEventListener('click', (e) => {
    e.preventDefault()

    let id = document.getElementById('id').value

    if (!id) {
        res.innerHTML = '<p style="color:red;">Informe um ID válido.</p>'
        return
    }

    fetch(`http://localhost:8081/aluno/${id}`)
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
              Nome: ${dados.nome}
              <br> Sobrenome: ${dados.sobrenome}
              <br> Matrícula: ${dados.matricula}
              <br> Telefone: ${dados.telefone}
              <br> Email: ${dados.email}
              <br> Código do Aluno: ${dados.codAluno}
            `

            res.appendChild(item)
        })

        .catch(erro => {
            res.innerHTML = `<p style="color:red;">Erro ao consultar aluno: ${erro.message}</p>`
            console.error('Erro na consulta:', erro)

        })

})

