let res = document.getElementById('res')
let apagar = document.getElementById('apagar')

apagar.addEventListener('click', () => {
    let id = document.getElementById('id').value.trim()

    if (!id) {
        alert('Informe um ID válido para remover')
        return;
    }

    fetch(`http://localhost:8081/aluno/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                res.innerHTML = `<h1>aluno com ID ${id} apagado com sucesso!</h1>`
            } else {
                return response.text().then(msg => {
                    throw new Error(msg || `Erro ${response.status}`)
                })
            }
        })
        .catch(err => {
            console.error('Erro ao apagar Aluno:', err)
            res.innerHTML = `<h1>Falha ao apagar o Aluno: ${err.message}</h1>`
        })
})
