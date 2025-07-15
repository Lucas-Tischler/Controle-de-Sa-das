
let res = document.getElementById('res')
let list = document.getElementById('list')


list.addEventListener('click', (e) => {
    e.preventDefault()


    fetch('http://localhost:8081/professor',)
        .then(response => {
            if (!response.ok) throw new Error('Erro na resposta do servidor')
            return response.json()
        })
        .then(dados => {
            console.log('Dados recebidos:', dados)


            res.innerHTML = ''

            dados.forEach(dados => {
                let item = document.createElement('p')


                item.innerHTML = `Nome: ${dados.nome} 
            <br> Sobrenome: ${dados.sobrenome} 
            <br> matricula: ${dados.matricula} 
            <br> Telefone: ${dados.telefone} 
            <br> Email:${dados.email}
            <br> <span class="codigo-destaque">Código do Professor: ${dados.codProfessor}</span> 
            <br>
            <br>
            <hr>`


                res.appendChild(item)
            })
        })
})        
