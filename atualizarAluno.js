let res = document.getElementById('res')
let atualizar = document.getElementById('atualizar')


id.addEventListener("change", (e) => {
    e.preventDefault()
    let id = document.getElementById('id')

    if (id.value !== "") {
        id.disabled = true

        fetch(`http://localhost:8081/aluno/${id.value}`)
            .then((res) => {
                if (!res.ok) throw new Error('Aluno não encontrada')
                return res.json()
            })
            .then((dados) => {
                document.getElementById('nome').value = dados.nome
                document.getElementById('sobrenome').value = dados.sobrenome
                document.getElementById('matricula').value = dados.matricula
                document.getElementById('telefone').value = dados.telefone
                document.getElementById('email').value = dados.email

            })
            .catch((err) => {
                console.error(err)
                res.innerHTML = `<p style="color:red;">Erro ao buscar aluno
                : ${err.message}</p>`
            });
    }
});


atualizar.addEventListener('click', (e) => {
    e.preventDefault()
    let id = document.getElementById('id')
    if (!id.value) {
        res.innerHTML = '<p style="color:red;">Informe um ID válido.</p>'
        return
    }

    let nome = document.getElementById('nome').value
    let sobrenome = document.getElementById('sobrenome').value
    let matricula = Number(document.getElementById('matricula').value)
    let telefone = document.getElementById('telefone').value
    let email = document.getElementById('email').value

    const valores = {
        nome: nome,
        sobrenome: sobrenome,
        matricula: matricula,
        telefone: telefone,
        email: email,
    };

    console.log('Dados enviados para atualização:', valores)

    fetch(`http://localhost:8081/aluno/${id.value}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(valores)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao atualizar entrega')
            }
            return response.json()
        })
        .then(dados => {
            res.innerHTML = `
            Nome: ${dados.nome} 
            <br> Sobrenome: ${dados.sobrenome} 
            <br> Matrícula: ${dados.matricula} 
            <br> Telefone: ${dados.telefone} 
            <br> Email: ${dados.email}
            <br> Código do Aluno: ${dados.codAluno}`
        })
        .catch(erro => {
            res.innerHTML = `<p style="color:red;">Erro ao atualizar entrega: ${erro.message}</p>`
            console.error('Erro na atualização:', erro)
        })
})