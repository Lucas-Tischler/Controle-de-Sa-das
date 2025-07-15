let cadastrar = document.getElementById('cadastrar')
let res = document.getElementById('res')


let dataSolicitacao = document.getElementById('dataSolicitacao')
let horaSaida = document.getElementById('horaSaida')
let horaRetorno = document.getElementById('horaRetorno')
let motivo = document.getElementById('motivo')
let localDestino = document.getElementById('localDestino')
let statusInput = document.getElementById('status')
let nomeAluno = document.getElementById('nomeAluno')
let nomeProfessor = document.getElementById('nomeProfessor')
let aluno_cod = document.getElementById('aluno_cod')
let professor_cod = document.getElementById('professor_cod')

cadastrar.addEventListener('click', (e) => {
  e.preventDefault();

  const valores = {
    dataSolicitacao: dataSolicitacao.value,
    horaSaida: horaSaida.value,
    horaRetorno: horaRetorno.value,
    motivo: motivo.value,
    localDestino: localDestino.value,
    status: statusInput.value,
    nomeAluno: nomeAluno.value,
    nomeProfessor: nomeProfessor.value,
    aluno_cod: Number(aluno_cod.value),
    professor_cod: Number(professor_cod.value)
  };

  console.log(valores)

  res.innerHTML = ' '

  fetch(`http://localhost:8081/saida`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(valores)
  })
    .then(resp => {
      if (!resp.ok) {
        throw new Error(`Erro ${resp.status}: ${resp.statusText}`)
      }
      return resp.json()
    })
    .then(dadosGrav => {
      console.log(dadosGrav)


      res.innerHTML = `


        
          <strong>Data de Solicitação:</strong> ${dadosGrav.dataSolicitacao} <br>
          <strong>Hora da Saída:</strong> ${dadosGrav.horaSaida} <br>
          <strong>Hora do Retorno:</strong> ${dadosGrav.horaRetorno} <br>
          <strong>Motivo:</strong> ${dadosGrav.motivo} <br>
          <strong>Destino:</strong> ${dadosGrav.localDestino} <br>
          <strong>Status:</strong> ${dadosGrav.status} <br>
          <strong>Nome do Aluno:</strong> ${dadosGrav.nomeAluno} <br>
          <strong>Nome do Professor:</strong> ${dadosGrav.nomeProfessor} <br>
          <strong>Código de identificação do Aluno:</strong> ${valores.aluno_cod} <br>
          <strong>Código de identificação do Professor:</strong> ${valores.professor_cod} <br>
        </p>
      `
    })
    .catch((err) => {
      console.error('Erro ao gravar os dados no banco de dados!', err);
      res.innerHTML = `<p style="color:red;">Erro ao gravar os dados. Verifique o console.</p>`
    });
});
