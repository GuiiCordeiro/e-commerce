# PIMSTORE

Loja de demonstração desenvolvida em PHP, MySQL/MariaDB, HTML, CSS e JavaScript. O projeto possui catálogo de produtos, busca, favoritos, carrinho, cadastro e login de clientes e administradores, além de telas para cadastro e gerenciamento de produtos.

## Requisitos

- XAMPP com Apache, PHP 8 e MySQL/MariaDB.
- Extensão PHP `pdo_mysql` habilitada.
- Navegador atualizado, com suporte a imagens AVIF e WebP e a `localStorage`.
- Acesso à internet para carregar as fontes, os ícones e os estilos externos utilizados nas páginas.

## Executar no XAMPP

1. Coloque a pasta do projeto em `C:\xampp\htdocs\e-commerce-main`.
2. Abra o **XAMPP Control Panel** e inicie os módulos **Apache** e **MySQL**.
3. Importe o arquivo `database.sql` conforme as instruções abaixo.
4. Confira a configuração em `db/conexao.php`. O nome do banco esperado é `pimstore_ecommerce` e o servidor é `localhost`. Se sua instalação usar outro usuário, senha ou porta, ajuste esses valores apenas no ambiente local. Para uma porta MySQL diferente, inclua `port=SUA_PORTA` no DSN do PDO.
5. Acesse [a página inicial](http://localhost/e-commerce-main/frontend/index.php). O ponto de entrada é `frontend/index.php`; não há um `index.php` na raiz.

Se o Apache utilizar outra porta, acrescente-a ao endereço, por exemplo `http://localhost:8080/e-commerce-main/frontend/index.php`. Se renomear a pasta do projeto, ajuste também esse trecho da URL. Execute pelo Apache, em vez de abrir os arquivos PHP diretamente no navegador.

## Importar o banco pelo phpMyAdmin

O `database.sql` é um script de instalação inicial, destinado a um banco novo e vazio. Ele cria o banco `pimstore_ecommerce`, as três tabelas e exatamente 9 produtos fictícios. Não contém dados de usuários, contas administrativas, senhas ou hashes de exemplo.

1. Com Apache e MySQL iniciados, abra [o phpMyAdmin](http://localhost/phpmyadmin/).
2. Verifique se `pimstore_ecommerce` ainda não existe ou está vazio. Se já houver tabelas ou dados, não importe por cima: o script não é uma migração nem foi feito para reimportação. Preserve a instalação existente; para usar outro banco vazio, ajuste o nome nas instruções `CREATE DATABASE` e `USE` do SQL e em `db/conexao.php`.
3. Na página inicial do phpMyAdmin, abra a aba **Importar**.
4. Em **Escolher arquivo**, selecione o `database.sql` da raiz do projeto.
5. Mantenha o formato **SQL** e a codificação **utf-8**. Clique em **Importar** ou **Executar**, conforme a versão do phpMyAdmin.
6. Selecione `pimstore_ecommerce` na barra lateral e confira as tabelas `usuarios`, `administradores` e `produtos`. Em **Visualizar** na tabela `produtos`, devem aparecer 9 registros; as outras duas tabelas devem estar vazias.

O script não possui comandos `DROP`, `TRUNCATE`, `DELETE` ou de criação de usuários do MySQL. As tabelas são criadas sem `IF NOT EXISTS` para sinalizar conflitos com uma estrutura existente. Não repita a importação: a carga de produtos não remove nem deduplica registros anteriores.

## Estrutura do banco

| Tabela | Colunas | Uso no código |
| --- | --- | --- |
| `usuarios` | `id`, `nome`, `email`, `senha` | Cadastro e login de clientes; e-mail único. |
| `administradores` | `id`, `nome`, `senha` | Cadastro e login administrativo; nome único. |
| `produtos` | `id`, `produto`, `preco`, `imagem` | Catálogo e gerenciamento de produtos. |

Os IDs são incrementais, os preços usam `DECIMAL(10,2)` e as tabelas usam InnoDB e `utf8mb4_unicode_ci`. As colunas `senha` comportam os hashes gerados por `password_hash()`; a aplicação os verifica com `password_verify()`.

Carrinho e favoritos são mantidos pelo JavaScript no `localStorage` do navegador e não precisam de tabelas adicionais. O código atual não persiste pedidos ou pagamentos no banco.

## Produtos fictícios incluídos

| Produto | Preço de exemplo | Arquivo em `uploads/` |
| --- | --- | --- |
| Headset Gamer Aurora 7.1 | R$ 299,90 | `headset-pro.png` |
| Teclado Mecânico Nebula RGB | R$ 399,90 | `teclado-rgb.png` |
| Mouse Gamer Eclipse RGB | R$ 199,90 | `mouse-rgb.png` |
| Cadeira Gamer Orbital | R$ 1.499,90 | `cadeira.png` |
| Monitor Gamer Horizonte 24 | R$ 999,90 | `monitor.png` |
| Microfone USB Estelar | R$ 349,90 | `microfone.png` |
| Headset Gamer Cometa | R$ 179,90 | `headset12.jpg` |
| Teclado Gamer Pulsar | R$ 249,90 | `teclado12.webp` |
| Mouse Gamer Meteoro | R$ 129,90 | `mouse12.avif` |

O banco armazena somente o nome do arquivo; o PHP acrescenta `../uploads/` para exibir a imagem. Mantenha os arquivos originais nessa pasta. A página inicial separa os três primeiros produtos retornados para os destaques e os seis restantes para o catálogo; a consulta atual não define uma ordem explícita.

## Acessar as contas e o painel

Não existe uma conta padrão. Para testar os fluxos, crie suas próprias contas locais pelas telas:

- Cliente: [cadastro](http://localhost/e-commerce-main/frontend/cadastro.php) e [login](http://localhost/e-commerce-main/frontend/login.php).
- Administrador: [cadastro administrativo](http://localhost/e-commerce-main/frontend/cadastro_adm.php) e [login administrativo](http://localhost/e-commerce-main/frontend/login_adm.php).
- Após o login administrativo, use o menu para acessar o cadastro e o gerenciamento de produtos.

Para novos uploads pelo formulário, a pasta `uploads/` precisa permitir escrita pelo Apache. O backend atual aceita JPG, JPEG, PNG e WebP, até 5 MB; a imagem AVIF já existente é usada diretamente pela carga SQL.

## Verificação e limitação existente

Após a importação manual, confira os 9 produtos e suas imagens na página inicial. Teste a busca, os favoritos, o carrinho e os fluxos de cadastro e login usando apenas dados de teste.

## Tela inicial:
<img width="1883" height="812" alt="image" src="https://github.com/user-attachments/assets/56174b3b-3156-40ab-b974-74877682fcf7" />
