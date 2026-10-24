<?php

require_once __DIR__ . "/../includes/header.php";
require_once __DIR__ . "/../includes/init.php";

// BUSCAR PRODUTOS DO BANCO
$stmt = $pdo->prepare("
    SELECT
        id,
        produto,
        preco,
        imagem
    FROM produtos
");

$stmt->execute();

$produtos = $stmt->fetchAll();
$produtosDestaque = array_slice($produtos, 0, 3);
$produtosCatalogo = array_slice($produtos, 3);

?>

<body>

    <?php require_once __DIR__ . "/../includes/topbar.php"; ?>

    <main class="home-main">

        <section class="hero">
            <h1>Produtos em destaque</h1>

            <p class="subtitulo">
                Os melhores produtos para elevar seu setup ao próximo nível
            </p>

            <div class="linha-destaque"></div>
        </section>

        <section class="produtos produtos-home" id="listaProdutos">

            <?php foreach ($produtosDestaque as $produto): ?>

                <article
                    class="produto"
                    data-nome="<?= htmlspecialchars($produto["produto"]) ?>"
                    data-preco="R$ <?= number_format($produto["preco"], 2, ",", ".") ?>"
                    data-imagem="<?= !empty($produto['imagem'])
                                        ? '../uploads/' . htmlspecialchars($produto['imagem'])
                                        : '../uploads/sem_imagem.png'
                                    ?>">

                    <button class="favorito" aria-label="Adicionar aos favoritos">
                        <i class="fa-regular fa-heart"></i>
                    </button>

                    <img
                        src="<?= !empty($produto['imagem'])
                                    ? '../uploads/' . htmlspecialchars($produto['imagem'])
                                    : '../uploads/sem_imagem.png'
                                ?>""
                        alt=" <?= htmlspecialchars($produto["produto"]) ?>">

                    <div class="info">

                        <p class="nome-produto">
                            <?= htmlspecialchars($produto["produto"]) ?>
                        </p>

                        <p class="preco">
                            R$ <?= number_format($produto["preco"], 2, ",", ".") ?>
                        </p>

                        <button class="Adicionar">
                            <i class="fa-solid fa-cart-shopping"></i>
                            Adicionar ao carrinho
                        </button>

                    </div>

                </article>

            <?php endforeach; ?>

        </section>

        <section class="secao-catalogo">

    <div class="titulo-catalogo">
        <span class="tag-catalogo">CATÁLOGO GAMER</span>

        <h2>Mais produtos para seu setup</h2>

        <p>
            Continue descendo e encontre acessórios,
            periféricos e itens.
        </p>
    </div>

    <div class="produtos-catalogo">

        <?php foreach ($produtosCatalogo as $produto): ?>

            <article
                class="produto"
                data-nome="<?= htmlspecialchars($produto['produto']) ?>"
                data-preco="R$ <?= number_format($produto['preco'], 2, ',', '.') ?>"
                data-imagem="../uploads/<?= htmlspecialchars($produto['imagem'] ?: 'sem_imagem.png') ?>">

                <button class="favorito" aria-label="Adicionar aos favoritos">
                    <i class="fa-regular fa-heart"></i>
                </button>

                <div class="img-catalogo">
                    <img
                        src="../uploads/<?= htmlspecialchars($produto['imagem'] ?: 'sem_imagem.png') ?>"
                        alt="<?= htmlspecialchars($produto['produto']) ?>">
                </div>

                <div class="info">

                    <p class="nome-produto">
                        <?= htmlspecialchars($produto['produto']) ?>
                    </p>

                    <p class="preco">
                        R$ <?= number_format($produto['preco'], 2, ',', '.') ?>
                    </p>

                    <button class="Adicionar">
                        <i class="fa-solid fa-cart-shopping"></i>
                        Adicionar ao carrinho
                    </button>

                </div>

            </article>

        <?php endforeach; ?>

    </div>

</section>

        <?php if (empty($produtos)): ?>

            <section class="sem-produtos">

                <div class="sem-produtos-icon">
                    <i class="fa-solid fa-box-open"></i>
                </div>

                <h2>Nenhum produto cadastrado</h2>

                <p>
                    Ainda não existem produtos disponíveis no catálogo.
                </p>

                <?php if (isset($_SESSION["admin"])): ?>

                    <a href="../frontend/adicionar_produto.php" class="btn-cadastrar">
                        <i class="fa-solid fa-plus"></i>
                        Cadastrar primeiro produto
                    </a>

                <?php endif; ?>

            </section>

        <?php endif; ?>

    </main>

    <?php require_once __DIR__ . "/../includes/carrinho.php"; ?>

</body>

<?php require_once __DIR__ . "/../includes/footer.php"; ?>

</html>