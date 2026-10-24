-- PIMSTORE: estrutura inicial para MySQL/MariaDB.
-- Importe uma unica vez em uma instalacao nova, sem tabelas existentes.
-- Apenas produtos ficticios; nenhuma conta ou credencial e inserida.
-- As imagens sao nomes de arquivos existentes em uploads/.

SET NAMES utf8mb4;

CREATE DATABASE IF NOT EXISTS `pimstore_ecommerce`
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE `pimstore_ecommerce`;

CREATE TABLE `usuarios` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `senha` VARCHAR(255) NOT NULL COMMENT 'Hash gerado por password_hash no PHP',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uq_usuarios_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `administradores` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `senha` VARCHAR(255) NOT NULL COMMENT 'Hash gerado por password_hash no PHP',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uq_administradores_nome` (`nome`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `produtos` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `produto` VARCHAR(100) NOT NULL,
    `preco` DECIMAL(10,2) UNSIGNED NOT NULL,
    `imagem` VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Nomes e precos abaixo sao apenas exemplos ficticios para demonstracao.
-- O frontend acrescenta ../uploads/ ao nome armazenado em imagem.
INSERT INTO `produtos` (`produto`, `preco`, `imagem`) VALUES
    ('Headset Gamer Aurora 7.1', 299.90, 'headset-pro.png'),
    ('Teclado Mecânico Nebula RGB', 399.90, 'teclado-rgb.png'),
    ('Mouse Gamer Eclipse RGB', 199.90, 'mouse-rgb.png'),
    ('Cadeira Gamer Orbital', 1499.90, 'cadeira.png'),
    ('Monitor Gamer Horizonte 24', 999.90, 'monitor.png'),
    ('Microfone USB Estelar', 349.90, 'microfone.png'),
    ('Headset Gamer Cometa', 179.90, 'headset12.jpg'),
    ('Teclado Gamer Pulsar', 249.90, 'teclado12.webp'),
    ('Mouse Gamer Meteoro', 129.90, 'mouse12.avif');
