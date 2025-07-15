let res = document.getElementById('res')

let cadastrar = document.getElementById('cadastrar')



cadastrar.addEventListener('click', (e) => {
    e.preventDefault()

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
    }

    console.log('Dados enviados:', valores)

    fetch('http://localhost:8081/professor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(valores)
    })
        .then(response => response.json())
        .then(dados => {
            res.innerHTML = ''

            let item = document.createElement('p')


            item.innerHTML = `Nome: ${dados.nome} 
        <br> Sobrenome: ${dados.sobrenome} 
        <br> matricula: ${dados.matricula} 
        <br> Telefone: ${dados.telefone} 
        <br> Email:${dados.email}`

            res.appendChild(item)
        })
})

