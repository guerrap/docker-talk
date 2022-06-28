<?php

echo "Mi connetto a db<br>";

$pdo = new PDO('pgsql:host='.$_ENV['POSTGRES_HOST'].';dbname='.$_ENV['POSTGRES_DB'], $_ENV['POSTGRES_USER'], $_ENV['POSTGRES_PASSWORD']);

echo "Creo tabella a db<br>";

$stmt = $pdo->prepare("CREATE TABLE IF NOT EXISTS prova (nome text not null);");
$result = $stmt->execute();

echo "Risultato: " . $result . "<br>";

echo "Inserisco dei dati<br>";

$stmt = $pdo->prepare("INSERT INTO prova (nome) values (?);");
$result = $stmt->execute([uniqid("prova")]);

echo "Risultato: " . $result . "<br>";

echo "recupero i dati da db<br>";
$stmt = $pdo->prepare("select * from prova;");
$result = $stmt->execute();
echo "Risultato: " . $result . "<br>";
foreach ($stmt->fetchAll() as $row) {
    print_r($row);
    echo "<br>";
}