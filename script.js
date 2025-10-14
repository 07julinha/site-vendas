const produtosContainer = document.getElementById('produtos');
const carrinhoLista = document.getElementById('lista-carrinho');
const totalElement = document.getElementById('total-carrinho');
const contadorCarrinho = document.getElementById('contador-carrinho');
const modalCarrinho = document.getElementById('modal-carrinho');
const btnAbrirCarrinho = document.getElementById('abrir-carrinho');
const btnFecharModal = document.querySelector('.fechar-modal');
const btnFinalizarCompra = document.getElementById('finalizar-compra');

// Array de produtos (simulação de um "banco de dados" de produtos)
// ⚠️ ATENÇÃO: Substitua as URLs das imagens pelos caminhos reais das suas imagens!
const produtos = [
    { 
        id: 1, 
        nome: "Bola de Futebol adidas", 
        preco: 129.90, 
        imagem: "images.jpeg"// Substitua este caminho
    },
    { 
        id: 2, 
        nome: "Tênis de Corrida Adidas Ultraboost", 
        preco: 699.00, 
        imagem: "https://via.placeholder.com/250x200/28a745/FFFFFF?text=Tenis+Corrida" // Substitua este caminho
    },
    { 
        id: 3, 
        nome: "Camisa NBA Los Angeles Lakers", 
        preco: 349.99, 
        imagem: "camisa nba.jpeg" // Substitua este caminho
    },
    { 
        id: 4, 
        nome: "Halteres de 5kg (Par)", 
        preco: 89.50, 
        imagem: "https://via.placeholder.com/250x200/dc3545/FFFFFF?text=Halteres+5kg" // Substitua este caminho
    }
];

// Carrega o carrinho do Local Storage (se houver) ou inicia como vazio
let carrinho = JSON.parse(localStorage.getItem('carrinhoSportStore')) || [];

// 1. Renderiza os produtos na página (cria o HTML dos produtos)
function renderizarProdutos() {
    produtos.forEach(produto => {
        const divProduto = document.createElement('div');
        divProduto.classList.add('produto');
        divProduto.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <p>R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>
            <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao Carrinho</button>
        `;
        produtosContainer.appendChild(divProduto);
    });
}

// 2. Adiciona um produto ao carrinho ou aumenta sua quantidade
function adicionarAoCarrinho(produtoId) {
    const produto = produtos.find(p => p.id === produtoId);
    if (produto) {
        const itemExistente = carrinho.find(item => item.id === produtoId);
        
        if (itemExistente) {
            itemExistente.quantidade++;
        } else {
            // Cria uma cópia do produto e adiciona a propriedade 'quantidade'
            carrinho.push({ ...produto, quantidade: 1 });
        }
        
        atualizarCarrinho();
        alert(`${produto.nome} adicionado ao carrinho!`);
    }
}

// 3. Remove um item do carrinho (diminui a quantidade ou remove totalmente)
function removerDoCarrinho(produtoId) {
    const index = carrinho.findIndex(item => item.id === produtoId);

    if (index !== -1) {
        if (carrinho[index].quantidade > 1) {
            carrinho[index].quantidade--;
        } else {
            // Remove o item se a quantidade for 1
            carrinho.splice(index, 1);
        }
    }
    atualizarCarrinho();
}

// 4. Atualiza a interface do carrinho, contador e Local Storage
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
            <span>R$ ${subtotal.toFixed(2).replace('.', ',')}
            <button onclick="removerDoCarrinho(${item.id})" style="margin-left: 10px; background: #dc3545; color: white; border: none; padding: 5px; border-radius: 3px; cursor: pointer;">-</button>
            </span>
        `;
        carrinhoLista.appendChild(li);
    });

    totalElement.textContent = total.toFixed(2).replace('.', ',');
    contadorCarrinho.textContent = totalItens;
    
    // Habilita/Desabilita o botão Finalizar Compra
    btnFinalizarCompra.disabled = carrinho.length === 0;

    // Salva o estado atual do carrinho no Local Storage
    localStorage.setItem('carrinhoSportStore', JSON.stringify(carrinho));
}

// 5. Eventos de controle do Modal (abre e fecha o pop-up)
btnAbrirCarrinho.onclick = function() {
    modalCarrinho.style.display = "block";
}

btnFecharModal.onclick = function() {
    modalCarrinho.style.display = "none";
}

// Fecha o modal se o usuário clicar fora dele
window.onclick = function(event) {
    if (event.target === modalCarrinho) {
        modalCarrinho.style.display = "none";
    }
}

// 6. Finalizar Compra (Ação de exemplo, sem processamento de pagamento real)
btnFinalizarCompra.onclick = function() {
    // Ação simplificada: exibir um alerta, limpar o carrinho e fechar o modal
    alert(`Compra finalizada! Total de R$ ${totalElement.textContent}. Obrigado por comprar na Sport Store!`);
    carrinho = []; 
    modalCarrinho.style.display = "none"; 
    atualizarCarrinho(); 
}

// Inicializa a loja ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    renderizarProdutos();
    atualizarCarrinho(); // Garante que o carrinho salvo seja carregado
});