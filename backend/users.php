<?php

declare(strict_types=1);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$users = [
    [
        'id' => 1,
        'name' => 'Jane Doe',
        'email' => 'admin@gabrodev.com',
        'role' => 'admin',
        'apartment' => null,
        'status' => 'active',
        'tenantDashboard' => null,
    ],
    [
        'id' => 2,
        'name' => 'John Smith',
        'email' => 'tenant@gabrodev.com',
        'role' => 'user',
        'apartment' => 'B402',
        'status' => 'active',
        'tenantDashboard' => [
            'building' => 'Gabrodev Tower',
            'monthlyRent' => '$1,200',
            'nextPaymentDue' => 'Oct 20, 2025',
            'recentPayments' => [
                ['id' => 1, 'date' => 'Sep 05, 2025', 'description' => 'Monthly Lease - September', 'unit' => 'B402', 'amount' => '$1,200.00'],
                ['id' => 2, 'date' => 'Oct 01, 2025', 'description' => 'Parking Spot', 'unit' => 'B402', 'amount' => '$80.00'],
                ['id' => 3, 'date' => 'Oct 10, 2025', 'description' => 'Gym Reservation', 'unit' => 'B402', 'amount' => '$25.00'],
                ['id' => 4, 'date' => 'Oct 18, 2025', 'description' => 'Maintenance Fee', 'unit' => 'B402', 'amount' => '$45.00'],
            ],
            'upcomingReservations' => [
                ['id' => 1, 'label' => 'Gym - Oct 20, 2025'],
                ['id' => 2, 'label' => 'Pool - Oct 22, 2025'],
                ['id' => 3, 'label' => 'Meeting Room - Oct 25, 2025'],
            ],
            'paymentSummary' => [
                'totalPaidThisYear' => '$14,400',
                'pendingAmount' => '$1,200',
                'nextDueDate' => 'Oct 01, 2025',
            ],
            'paymentHistory' => [
                ['id' => 'PAY-2025-001', 'type' => 'Monthly Lease', 'description' => 'January', 'date' => 'Jan 01, 2025', 'amount' => '$1,200', 'status' => 'Paid'],
                ['id' => 'PAY-2025-002', 'type' => 'Reservation', 'description' => 'Pool Reservation', 'date' => 'Jun 15, 2025', 'amount' => '$120', 'status' => 'Paid'],
                ['id' => 'PAY-2025-009', 'type' => 'Reservation', 'description' => 'BBQ Area Reservation', 'date' => 'Jun 15, 2025', 'amount' => '$120', 'status' => 'Paid'],
                ['id' => 'PAY-2025-010', 'type' => 'Monthly Lease', 'description' => 'October', 'date' => 'Oct 01, 2025', 'amount' => '$1,200', 'status' => 'Pending'],
            ],
        ],
    ],
    [
        'id' => 3,
        'name' => 'Emily White',
        'email' => 'emily.white@gabrodev.com',
        'role' => 'user',
        'apartment' => 'C305',
        'status' => 'inactive',
        'tenantDashboard' => [
            'building' => 'Gabrodev Tower',
            'monthlyRent' => '$980',
            'nextPaymentDue' => 'Nov 01, 2025',
            'recentPayments' => [
                ['id' => 5, 'date' => 'Sep 02, 2025', 'description' => 'Monthly Lease - September', 'unit' => 'C305', 'amount' => '$980.00'],
                ['id' => 6, 'date' => 'Oct 03, 2025', 'description' => 'Monthly Lease - October', 'unit' => 'C305', 'amount' => '$980.00'],
            ],
            'upcomingReservations' => [
                ['id' => 4, 'label' => 'BBQ Area - Nov 03, 2025'],
            ],
            'paymentSummary' => [
                'totalPaidThisYear' => '$9,800',
                'pendingAmount' => '$980',
                'nextDueDate' => 'Nov 01, 2025',
            ],
            'paymentHistory' => [
                ['id' => 'PAY-2025-021', 'type' => 'Monthly Lease', 'description' => 'September', 'date' => 'Sep 02, 2025', 'amount' => '$980', 'status' => 'Paid'],
                ['id' => 'PAY-2025-022', 'type' => 'Monthly Lease', 'description' => 'October', 'date' => 'Oct 03, 2025', 'amount' => '$980', 'status' => 'Paid'],
                ['id' => 'PAY-2025-023', 'type' => 'Monthly Lease', 'description' => 'November', 'date' => 'Nov 01, 2025', 'amount' => '$980', 'status' => 'Pending'],
            ],
        ],
    ],
];

echo json_encode([
    'success' => true,
    'data' => $users,
    'meta' => [
        'count' => count($users),
        'generatedAt' => gmdate('c'),
    ],
]);
