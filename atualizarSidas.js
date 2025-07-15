let res = document.getElementById('res')
let atualizar = document.getElementById('atualizar')

id.addEventListener("change", (e) => {
    e.preventDefault()
    let id = document.getElementById('id')

    if (id.value !== "") {
        id.disabled = true

        fetch(`http://localhost:8081/saida/${id.value}`)
            .then((res) => {
                if (!res.ok) throw new Error('Saída não encontrada')
                return res.json()
            })
            .then((dados) => {
                document.getElementById('dataSolicitacao').value = dados.dataSolicitacao
                document.getElementById('horaSaida').value = dados.horaSaida
                document.getElementById('horaRetorno').value = dados.horaRetorno
                document.getElementById('motivo').value = dados.motivo
                document.getElementById('localDestino').value = dados.localDestino
                document.getElementById('status').value = dados.status
                document.getElementById('nomeAluno').value = dados.nomeAluno
                document.getElementById('nomeProfessor').value = dados.nomeProfessor
                document.getElementById('aluno_cod').value = dados.aluno_cod
                document.getElementById('professor_cod').value = dados.professor_cod
            })
            .catch((err) => {
                console.error(err);
                res.innerHTML = `<p style="color:red;">Erro ao buscar saída: ${err.message}</p>`;
            });
    }
});

atualizar.addEventListener('click', (e) => {
    e.preventDefault();
    let id = document.getElementById('id')
    if (!id.value) {
        res.innerHTML = '<p style="color:red;">Informe um ID válido.</p>';
        return;
    }

    let dataSolicitacao = document.getElementById('dataSolicitacao')
    let horaSaida = document.getElementById('horaSaida')
    let horaRetorno = document.getElementById('horaRetorno')
    let motivo = document.getElementById('motivo')
    let localDestino = document.getElementById('localDestino')
    let status = document.getElementById('status')
    let nomeAluno = document.getElementById('nomeAluno')
    let nomeProfessor = document.getElementById('nomeProfessor')
    let aluno_cod = document.getElementById('aluno_cod')
    let professor_cod = document.getElementById('professor_cod')

    const valores = {
        dataSolicitacao: dataSolicitacao.value,
        horaSaida: horaSaida.value,
        horaRetorno: horaRetorno.value,
        motivo: motivo.value,
        localDestino: localDestino.value,
        status: status.value,
        nomeAluno: nomeAluno.value,
        nomeProfessor: nomeProfessor.value,
        aluno_cod: Number(aluno_cod.value),
        professor_cod: Number(professor_cod.value)
    };

    console.log('Dados enviados para atualização:', valores);

    fetch(`http://localhost:8081/saida/${id.value}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(valores)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao atualizar entrega');
            }
            return response.json();
        })
        .then(dado => {
            res.innerHTML = `
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
            <br><hr>`
        })
        .catch(erro => {
            res.innerHTML = `<p style="color:red;">Erro ao atualizar entrega: ${erro.message}</p>`
            console.error('Erro na atualização:', erro)
        });
});
