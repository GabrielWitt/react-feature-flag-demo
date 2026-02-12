<?php

declare(strict_types=1);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'error' => [
            'code' => 'method_not_allowed',
            'message' => 'Only POST is allowed for this endpoint.',
        ],
    ]);
    exit;
}

$rawBody = file_get_contents('php://input');
$payload = json_decode((string) $rawBody, true);

if (!is_array($payload)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => [
            'code' => 'invalid_json',
            'message' => 'Request body must be valid JSON.',
        ],
    ]);
    exit;
}

$email = isset($payload['email']) ? trim((string) $payload['email']) : '';
$password = isset($payload['password']) ? trim((string) $payload['password']) : '';

if ($email === '' || $password === '') {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'error' => [
            'code' => 'validation_error',
            'message' => 'Both email and password are required.',
        ],
    ]);
    exit;
}

$fakeUsers = [
    'admin@gabrodev.com' => [
        'id' => 1,
        'name' => 'Jane Doe',
        'role' => 'admin',
        'apartment' => null,
    ],
    'tenant@gabrodev.com' => [
        'id' => 2,
        'name' => 'John Smith',
        'role' => 'user',
        'apartment' => 'B402',
    ],
];

if (!array_key_exists($email, $fakeUsers)) {
    http_response_code(401);
    echo json_encode([
        'success' => false,
        'error' => [
            'code' => 'invalid_credentials',
            'message' => 'Invalid email or password.',
        ],
    ]);
    exit;
}

$user = $fakeUsers[$email];

$response = [
    'success' => true,
    'data' => [
        'token' => 'fake-jwt-token-' . sha1($email . '|' . gmdate('YmdHis')),
        'user' => [
            'id' => $user['id'],
            'name' => $user['name'],
            'email' => $email,
            'role' => $user['role'],
            'apartment' => $user['apartment'],
        ],
    ],
    'meta' => [
        'issuedAt' => gmdate('c'),
    ],
];

echo json_encode($response);
