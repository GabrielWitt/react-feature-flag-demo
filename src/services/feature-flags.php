<?php
declare(strict_types=1);

// Backend-driven flags enable runtime configuration: product/ops can toggle
// features on the server without redeploying the frontend bundle.
header('Content-Type: application/json; charset=utf-8');

$featureFlags = [
    ['name' => 'admin_panel', 'enabled' => true],
    ['name' => 'beta_dashboard', 'enabled' => false],
];

try {
    echo json_encode($featureFlags, JSON_THROW_ON_ERROR);
} catch (JsonException $exception) {
    http_response_code(500);
    echo json_encode(
        ['error' => 'Unable to encode feature flags response.'],
        JSON_UNESCAPED_UNICODE
    );
}
