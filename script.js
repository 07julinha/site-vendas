// Carrinho
let carrinho = JSON.parse(localStorage.getItem('carrinhoSportStore')) || [];

// Produtos fixos (mesmos IDs do HTML)
const produtos = [
    { id: 1, nome: "Tênis Nike Air Zoom Pegasus 40", preco: 599.90 },
    { id: 2, nome: "Tênis Adidas Ultraboost 22", preco: 699.00 },
    { id: 3, nome: "Camiseta Esportiva Dry-Fit", preco: 89.90 }
];

// Seletores
const carrinhoLista = document.getElementById('lista-carrinho');
const totalElement = document.getElementById('total-carrinho');
const contadorCarrinho = document.getElementById('contador-carrinho');
const modalCarrinho = document.getElementById('modal-carrinho');
const btnAbrirCarrinho = document.getElementById('abrir-carrinho');
const btnFecharModal = document.querySelector('.fechar-modal');
const btnFinalizarCompra = document.getElementById('finalizar-compra');

// Adicionar ao carrinho
function adicionarAoCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    if (!produto) return;

    const item = carrinho.find(i => i.id === id);
    item ? item.quantidade++ : carrinho.push({ ...produto, quantidade: 1 });
    
    atualizarCarrinho();
    alert(`${produto.nome} adicionado ao carrinho!`);
}

// Remover item
function removerDoCarrinho(id) {
    const item = carrinho.find(i => i.id === id);
    if (!item) return;

    item.quantidade > 1 ? item.quantidade-- : carrinho = carrinho.filter(i => i.id !== id);
    atualizarCarrinho();
}

// Atualizar carrinho
function atualizarCarrinho() {
    carrinhoLista.innerHTML = '';
    let total = 0;
    let totalItens = 0;

    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;
        totalItens += item.quantidade;

        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.nome} (${item.quantidade}x)</span>
            <span>
                R$ ${subtotal.toFixed(2).replace('.', ',')}
                <button onclick="removerDoCarrinho(${item.id})">-</button>
            </span>
        `;
        carrinhoLista.appendChild(li);
    });

    totalElement.textContent = total.toFixed(2).replace('.', ',');
    contadorCarrinho.textContent = totalItens;
    btnFinalizarCompra.disabled = carrinho.length === 0;
    localStorage.setItem('carrinhoSportStore', JSON.stringify(carrinho));
}

// Modal
btnAbrirCarrinho.onclick = () => modalCarrinho.style.display = "flex";
btnFecharModal.onclick = () => modalCarrinho.style.display = "none";
window.onclick = e => { if (e.target === modalCarrinho) modalCarrinho.style.display = "none"; };

// Finalizar compra
btnFinalizarCompra.onclick = () => {
    alert(`Compra finalizada! Total de R$ ${totalElement.textContent}. Obrigado por comprar na Sport Store!`);
    carrinho = [];
    atualizarCarrinho();
    modalCarrinho.style.display = "none";
};

// Iniciar
document.addEventListener('DOMContentLoaded', atualizarCarrinho);
