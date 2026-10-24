<?php

require_once __DIR__ . "/../includes/init.php";

$id = $_POST["id"] ?? null;

if ($id) {

    $stmt = $pdo->prepare("
        DELETE FROM produtos
        WHERE id = :id
    ");

    $stmt->bindValue(":id", $id);

    $stmt->execute();
}
header("Location: ../frontend/index.php");
exit;