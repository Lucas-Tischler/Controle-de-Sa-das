function atualizarFila() {
  const filaDiv = document.getElementById('fila')
  const fila = JSON.parse(localStorage.getItem('fila')) || []

  filaDiv.innerHTML = fila.map((item, i) => `
      <div class="fila-item">
        <strong>${i + 1}. ${item.nome}</strong> - ${item.motivo}
        <p>Status: ${item.status}</p>
        ${item.status === 'Aguardando aprovação' ? `
          <div class="fila-buttons">
            <button onclick="autorizar(${i})">Autorizar</button>
            <button onclick="recusar(${i})">Recusar</button>
          </div>
        ` : ''}
      </div>
    `).join('')
}


function alterarStatus(index, status) {
  const fila = JSON.parse(localStorage.getItem('fila')) || []
  fila[index].status = status
  localStorage.setItem('fila', JSON.stringify(fila))
  atualizarFila()
  alert(`Saída de ${fila[index].nome} ${status.toLowerCase()}.`)
}

const autorizar = i => alterarStatus(i, 'Autorizado ✅')
const recusar = i => alterarStatus(i, 'Recusado ❌')

function limparFinalizados() {
  let fila = JSON.parse(localStorage.getItem('fila')) || []
  fila = fila.filter(item => item.status === 'Aguardando aprovação')
  localStorage.setItem('fila', JSON.stringify(fila))
  atualizarFila()
  alert('Lista limpa.')
}

document.addEventListener('DOMContentLoaded', atualizarFila)