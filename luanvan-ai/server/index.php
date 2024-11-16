<?php
header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');

header('Access-Control-Allow-Headers: X-Requested-With,Authorization,Content-Type');

header('Access-Control-Max-Age: 86400');

if (strtolower($_SERVER['REQUEST_METHOD']) == 'options') {
    exit();
}

$json = file_get_contents('php://input');


$data = json_decode($json);


$email = $data->email;
$password = $data->password;


$conn = mysqli_connect("localhost", "root", "", "ecommerceshop");


$sql = "select * from users where email = '$email' and password = '$password'";
$result = mysqli_query($conn, $sql);

$res = new stdClass();  
if (mysqli_num_rows($result) > 0){ 
    $res->status = "ok";
    $res->name = mysqli_fetch_assoc($result)['name'];
} else {
    $res->status = "failed";
    $res->message = "Đăng nhập thất bại";
}

echo json_encode($res);