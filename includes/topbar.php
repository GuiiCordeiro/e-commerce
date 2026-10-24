<header>
    <a class="nome" href="index.php"><span>PIM</span>STORE</a>

    <div class="pesquisar">
        <input type="search" id="barra" placeholder="Busca de produtos">
        <button id="btn-busca" aria-label="Buscar"><i class="fa-solid fa-magnifying-glass"></i></button>
    </div>

    <div class="icones">

        <?php if (!isset($_SESSION["usuario"]) && !isset($_SESSION["admin"])): ?>

            <a href="../frontend/login.php" aria-label="Login">
                <i class="fa-solid fa-user"></i>
            </a>

        <?php else: ?>

            <div class="usuario-dropdown">

                <button class="usuario-btn" id="btnUsuario">
                    <i class="fa-solid fa-user"></i>
                </button>

                <div class="dropdown-menu" id="dropdownUsuario">

                    <div class="dropdown-topo <?= isset($_SESSION["admin"]) ? 'admin-topo' : '' ?>">

                        <p class="usuario-nome">

                            <?php
                            if (isset($_SESSION["admin"])) {
                                echo $_SESSION["admin"]["nome"];
                            } else {
                                echo $_SESSION["usuario"]["nome"];
                            }
                            ?>

                        </p>

                        <?php if (isset($_SESSION["usuario"])): ?>

                            <span class="usuario-email">
                                <?= $_SESSION["usuario"]["email"] ?>
                            </span>

                        <?php endif; ?>

                    </div>

                    <?php if (isset($_SESSION["usuario"])): ?>
                        <div class="linha-dropdown"></div>
                    <?php endif; ?>

                    <?php if (isset($_SESSION["admin"])): ?>

                        <a href="../frontend/profile_adm.php">
                            <i class="fa-solid fa-shield-halved"></i>
                            Painel Admin
                        </a>

                    <?php else: ?>

                        <a href="profile.php">
                            <i class="fa-solid fa-user"></i>
                            Meu perfil
                        </a>

                        <a href="pedidos.php">
                            <i class="fa-solid fa-box"></i>
                            Meus pedidos
                        </a>

                        <a href="favoritos.php">
                            <i class="fa-solid fa-heart"></i>
                            Favoritos
                        </a>

                    <?php endif; ?>

                    <div class="linha-dropdown"></div>

                    <a href="../backend/logout.php" class="logout">
                        <i class="fa-solid fa-right-from-bracket"></i>
                        Sair
                    </a>

                </div>

            </div>

        <?php endif; ?>

        <?php if (isset($_SESSION["admin"])): ?>

            <div class="produto-dropdown">

                <button class="produto-btn" id="btnProduto">
                    <i class="bi bi-tag-fill"></i>
                </button>

                <div class="produto-menu" id="dropdownProduto">

                    <a href="adicionar_produto.php">
                        <i class="fa-solid fa-plus"></i>
                        Adicionar Produto
                    </a>

                    <a href="gerenciar_produtos.php">
                        <i class="fa-solid fa-box"></i>
                        Gerenciar Produtos
                    </a>

                </div>

            </div>

        <?php endif; ?>

        <a href="#" id="btn-carrinho" aria-label="Carrinho">
            <i class="fa-solid fa-cart-shopping"></i>
            <span class="badge-carrinho">0</span>
        </a>

        <a href="favoritos.php" class="icone-favoritos" aria-label="Favoritos">
            <i class="fa-solid fa-heart"></i>
            <span class="badge-favoritos">0</span>
        </a>

    </div>
</header>