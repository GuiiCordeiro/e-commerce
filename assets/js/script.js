const produtosPadrao = [
    { nome: 'Headset Gamer Pro 7.1 Surround', preco: 'R$ 299,90', imagem: 'imagens/headset-pro.png' },
    { nome: 'Teclado Mecânico RGB Switch Blue', preco: 'R$ 399,90', imagem: 'imagens/teclado-rgb.png' },
    { nome: 'Mouse Gamer RGB 16000 DPI', preco: 'R$ 199,90', imagem: 'imagens/mouse-rgb.png' },
    { nome: 'Cadeira Gamer Ergonômica', preco: 'R$ 1.499,90', imagem: 'imagens/cadeira.png' },
    { nome: 'Monitor Gamer 24\" 144Hz IPS', preco: 'R$ 999,90', imagem: 'imagens/monitor.png' },
    { nome: 'Microfone Condensador USB', preco: 'R$ 349,90', imagem: 'imagens/microfone.png' }
];

const moedaParaNumero = (preco) => Number(String(preco).replace('R$', '').replace(/\./g, '').replace(',', '.').trim()) || 0;
const formatarMoeda = (valor) => valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

function getFavoritos() {
    return JSON.parse(localStorage.getItem('favoritos')) || [];
}

function salvarFavoritos(lista) {
    localStorage.setItem('favoritos', JSON.stringify(lista));
    atualizarBadgeFavoritos();

}

function atualizarBadgeCarrinho() {
    const badge = document.querySelector('.badge-carrinho');
    if (!badge) return;

    const carrinho = getCarrinho();

    const quantidade = carrinho.reduce(
        (total, produto) => total + Number(produto.quantidade || 0),
        0
    );

    badge.textContent = quantidade;
}

function getCarrinho() {
    return JSON.parse(localStorage.getItem('carrinho')) || [];
}

function salvarCarrinho(lista) {
    localStorage.setItem('carrinho', JSON.stringify(lista));
    renderizarCarrinho();
    atualizarBadgeCarrinho();
}

function atualizarBadgeFavoritos() {
    const badge = document.querySelector('.badge-favoritos');
    if (!badge) return;
    const salvos = getFavoritos();
    badge.textContent = salvos.length;
}

function adicionarAoCarrinho(produto) {
    const carrinho = getCarrinho();
    const item = carrinho.find((p) => p.nome === produto.nome);

    if (item) item.quantidade += 1;
    else carrinho.push({ ...produto, quantidade: 1 });

    salvarCarrinho(carrinho);
}

function renderizarCarrinho() {
    const painel = document.getElementById('painelCarrinho');
    const itens = document.querySelector('.itens');
    const vazio = document.querySelector('.carrinho-vazio');
    const total = document.querySelector('.valor-total');
    if (!painel || !itens || !vazio || !total) return;

    const carrinho = getCarrinho();
    itens.innerHTML = '';
    vazio.style.display = carrinho.length ? 'none' : 'block';

    let soma = 0;
    carrinho.forEach((produto, index) => {
        soma += moedaParaNumero(produto.preco) * produto.quantidade;
        const div = document.createElement('div');
        div.className = 'item-carrinho';
        div.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <div class="info-item">
                <p class="produto-carrinho">${produto.nome}</p>
                <span class="preco-item">${produto.preco}</span>
                <span>Quantidade: ${produto.quantidade}</span>
            </div>
            <button class="remover" title="Remover">×</button>
        `;
        div.querySelector('.remover').addEventListener('click', () => {
            const novoCarrinho = getCarrinho();
            novoCarrinho.splice(index, 1);
            salvarCarrinho(novoCarrinho);
        });
        itens.appendChild(div);
    });

    total.textContent = formatarMoeda(soma);
}

function iniciarHome() {
    const listaProdutos = document.getElementById('listaProdutos');
    if (!listaProdutos) return;

    const barra = document.getElementById('barra');
    const nenhum = document.getElementById('nenhum-resultado');
    const btnBusca = document.getElementById('btn-busca');
    const painel = document.getElementById('painelCarrinho');
    const btnCarrinho = document.getElementById('btn-carrinho');
    const fechar = document.querySelector('.fechar');

    const cards = [...document.querySelectorAll('.produto[data-nome]')];

    function filtrar() {
        const termo = barra ? barra.value.toLowerCase().trim() : '';
        let encontrados = 0;
        cards.forEach((card) => {
            const nome = card.dataset.nome.toLowerCase();
            const visivel = nome.includes(termo);
            card.style.display = visivel ? '' : 'none';
            if (visivel) encontrados++;
        });
        nenhum.style.display = encontrados ? 'none' : 'block';
    }

    cards.forEach((card) => {
        const produto = { nome: card.dataset.nome, preco: card.dataset.preco, imagem: card.dataset.imagem };
        const btnFavorito = card.querySelector('.favorito');
        const icon = btnFavorito.querySelector('i');

        const favoritos = getFavoritos();
        if (favoritos.some((item) => item.nome === produto.nome)) {
            btnFavorito.classList.add('ativo');
            icon.className = 'fa-solid fa-heart';
        }

        btnFavorito.addEventListener('click', () => {
            let favoritosAtuais = getFavoritos();
            const existe = favoritosAtuais.some((item) => item.nome === produto.nome);

            if (existe) {
                favoritosAtuais = favoritosAtuais.filter((item) => item.nome !== produto.nome);
                btnFavorito.classList.remove('ativo');
                icon.className = 'fa-regular fa-heart';
            } else {
                favoritosAtuais.push(produto);
                btnFavorito.classList.add('ativo');
                icon.className = 'fa-solid fa-heart';
            }
            salvarFavoritos(favoritosAtuais);
        });

        card.querySelector('.Adicionar').addEventListener('click', () => adicionarAoCarrinho(produto));
    });

    barra.addEventListener('input', filtrar);
    btnBusca.addEventListener('click', filtrar);
    btnCarrinho.addEventListener('click', (e) => {
        e.preventDefault();
        painel.classList.add('ativo');
    });
    fechar.addEventListener('click', () => painel.classList.remove('ativo'));

    renderizarCarrinho();
}

function iniciarFavoritos() {
    const lista = document.getElementById('listaFavoritos');
    if (!lista) return;

    const quantidade = document.querySelector('.quantidade');
    const limpar = document.getElementById('limparFavoritos');
    const ordenacao = document.getElementById('ordenacao');
    const barra = document.getElementById('barra');
    const btnBusca = document.getElementById('btn-busca');
    const painel = document.getElementById('painelCarrinho');
    const btnCarrinho = document.getElementById('btn-carrinho');
    const fechar = document.querySelector('.fechar');

    btnCarrinho.addEventListener('click', (e) => {
        e.preventDefault();
        painel.classList.add('ativo');
    });

    fechar.addEventListener('click', () => {
        painel.classList.remove('ativo');
    });

    renderizarCarrinho();

    function filtrarOrdenar(favoritos) {
        let resultado = [...favoritos];
        const termo = barra ? barra.value.toLowerCase().trim() : '';
        if (termo) resultado = resultado.filter((p) => p.nome.toLowerCase().includes(termo));
        if (ordenacao.value === 'menor-preco') resultado.sort((a, b) => moedaParaNumero(a.preco) - moedaParaNumero(b.preco));
        if (ordenacao.value === 'maior-preco') resultado.sort((a, b) => moedaParaNumero(b.preco) - moedaParaNumero(a.preco));
        if (ordenacao.value === 'nome') resultado.sort((a, b) => a.nome.localeCompare(b.nome));
        return resultado;
    }

    function renderizar() {
        const originais = getFavoritos();
        const favoritos = filtrarOrdenar(originais);
        lista.innerHTML = '';
        quantidade.textContent = `${favoritos.length} ${favoritos.length === 1 ? 'produto' : 'produtos'}`;
        limpar.style.display = originais.length ? 'inline-flex' : 'none';
        atualizarBadgeFavoritos();

        if (!favoritos.length) {
            lista.innerHTML = `
                <div class="vazio">
                    <div>
                        <i class="fa-solid fa-heart-crack"></i>
                        <h2>Nenhum favorito encontrado</h2>
                        <p>Salve produtos para eles aparecerem aqui.</p>
                    </div>
                </div>`;
            return;
        }

        favoritos.forEach((produto) => {
            const indexOriginal = originais.findIndex((item) => item.nome === produto.nome && item.preco === produto.preco);
            const card = document.createElement('article');
            card.className = 'produto';
            card.innerHTML = `
                <button class="remover-favorito" title="Remover dos favoritos"><i class="fa-solid fa-xmark"></i></button>
                <div>
                    <div class="img-box"><img src="${produto.imagem}" alt="${produto.nome}"></div>
                    <div class="info">
                        <p class="nome-produto">${produto.nome}</p>
                        <p class="preco">${produto.preco}</p>
                    </div>
                </div>
                <button class="Adicionar"><i class="fa-solid fa-cart-shopping"></i>Adicionar ao carrinho</button>
            `;
            card.querySelector('.Adicionar').addEventListener('click', () => adicionarAoCarrinho(produto));
            card.querySelector('.remover-favorito').addEventListener('click', () => {
                const novaLista = getFavoritos();
                novaLista.splice(indexOriginal, 1);
                salvarFavoritos(novaLista);
                renderizar();
            });
            lista.appendChild(card);
        });
    }

    limpar.addEventListener('click', () => {
        if (confirm('Deseja remover todos os favoritos?')) {
            salvarFavoritos([]);
            renderizar();
        }
    });
    ordenacao.addEventListener('change', renderizar);
    barra.addEventListener('input', renderizar);
    btnBusca.addEventListener('click', renderizar);
    renderizar();
}

atualizarBadgeFavoritos();
iniciarHome();
iniciarFavoritos();
atualizarBadgeCarrinho();