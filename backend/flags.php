<?php

declare(strict_types=1);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$flags = [
    ['name' => 'dashboard', 'enabled' => true],
    ['name' => 'admin_panel', 'enabled' => false],
    ['name' => 'beta_dashboard', 'enabled' => false],
    ['name' => 'payments', 'enabled' => true],
];

echo json_encode([
    'success' => true,
    'data' => $flags,
    'meta' => [
        'count' => count($flags),
        'generatedAt' => gmdate('c'),
    ],
]);
