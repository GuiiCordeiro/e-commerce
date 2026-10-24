<?php 
require_once __DIR__ . "/../includes/header.php";
?>

<body class="pagina-favoritos">
   
    <?php require_once __DIR__ . "/../includes/topbar.php"; ?>

    <main class="favoritos-main">
        <section class="topo-favoritos">
            <div class="titulo-area">
                <h1>Seus favoritos</h1>
                <p>Aqui estão os produtos que você salvou.</p>
            </div>
        </section>

        <section class="linha-info">
            <p class="quantidade">6 produtos</p>
            <select class="ordenacao" id="ordenacao">
                <option value="recentes">Mais recentes</option>
                <option value="menor-preco">Menor preço</option>
                <option value="maior-preco">Maior preço</option>
                <option value="nome">Nome</option>
            </select>
        </section>

        <section class="produtos favoritos-grid" id="listaFavoritos"></section>

        <div class="acoes-baixo">
            <button class="limpar" id="limparFavoritos">
                <i class="fa-regular fa-trash-can"></i>
                Limpar todos os favoritos
            </button>
        </div>

    </main>
    <?php require_once __DIR__ . "/../includes/carrinho.php"; ?>
    <script src="../assets/js/script.js"></script>
    <script src="../assets/js/dropdown.js"></script>
</body>

</html>