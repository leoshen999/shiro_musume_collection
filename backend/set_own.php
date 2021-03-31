<?php

include "util.php";

check_cors();

$config = get_config();

$lock = fopen($config["lock_path"], "r+");
if (!flock($lock, LOCK_EX)) {
  fclose($lock);
  http_response_code(400);
  exit(0);
}

if (!isset($_POST['id']) || !isset($_POST['own'])) {
  http_response_code(400);
  exit(0);
}
$id = intval($_POST['id']);
$own = !!intval($_POST['own']);

$new_owns = [];
$old_owns = json_decode(file_get_contents($config['db_path']), true);

foreach ($old_owns as $current_id) {
  if ($current_id != $id) {
    array_push($new_owns, $current_id);
    continue;
  }
}
if ($own)
  array_push($new_owns, $id);

file_put_contents($config['db_path'], json_encode($new_owns));

fclose($lock);
