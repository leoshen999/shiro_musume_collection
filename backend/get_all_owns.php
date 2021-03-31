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

echo file_get_contents($config['db_path']);

fclose($lock);
