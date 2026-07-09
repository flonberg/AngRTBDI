<?php
/**
 * hello.php
 *
 * Proof-of-concept: calls hello.py via shell_exec and returns its output.
 * Visit this file directly in a browser, or curl it, to confirm PHP can
 * successfully invoke Python and read the result back.
 *
 * GET /hello.php?name=Frank
 */

header('Content-Type: application/json');

// ---- Configuration -----------------------------------------------------
// Adjust these two paths for your environment.
if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
    $PYTHON_BIN = getenv('PYTHON_BIN') ?: 'C:\\Program Files\\Python312\\python.exe';
} else {
    $PYTHON_BIN = getenv('PYTHON_BIN') ?: '/usr/bin/python3';
}
$SCRIPT_PATH = __DIR__ . './hello.py';

// ---- Build and run the command -------------------------------------------
//$name = $_GET['name'] ?? 'world';
$name = 'world';

$cmd = sprintf(
    '%s %s %s 2>&1',
    escapeshellarg($PYTHON_BIN),
    escapeshellarg($SCRIPT_PATH),
    escapeshellarg($name)
);

$output = shell_exec($cmd);

// ---- Report what happened, verbosely, since this is just a diagnostic ----
if ($output === null) {
  //  http_response_code(500);
    $resp = Array(
        'success' => false,
        'error' => 'shell_exec returned null -- check that shell_exec is not disabled '
                  . 'in php.ini (disable_functions) and that PHP has permission to execute Python.',
        'commandTried' => $cmd,
    )   ;
    echo json_encode($resp);
    exit;
}
var_dump($output);
$decoded = json_decode(trim($output), true);

if ($decoded === null) {
    // Python ran but didn't return valid JSON -- show the raw output so
    // you can see the actual error (missing module, wrong path, etc).
 //   http_response_code(500);
   $resp2 = Array(
        'success' => false,
        'error' => 'Python script ran but did not return valid JSON.',
        'rawOutput' => $output,
        'commandTried' => $cmd,
    );
    echo json_encode($resp2);
    exit;
}

echo json_encode($decoded);
