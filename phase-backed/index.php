<?php
include 'DbConnection.php';
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: http://localhost:3000');
//header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');


$objDb = new DbConnection;

$conn = $objDb->connect();
// var_dump($conn);
// exit;

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "GET":
        $sql = "SELECT * FROM `contact`";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if (isset($path[5]) && is_numeric($path[5])) {
            $sql .= "WHERE id = :id";
            $stm = $conn->prepare($sql);
            $stm->bindParam(':id', $path[5]);
            $stm->execute();
            $users = $stm->fetchAll(PDO::FETCH_ASSOC);
        } else {
            $stm = $conn->prepare($sql);
            $stm->execute();
            $users = $stm->fetchAll(PDO::FETCH_ASSOC);
        }
        echo json_encode($users);
        break;
    case "POST":
        $user = json_decode(file_get_contents('php://input'));

        if ($conn) {
            $sql = "INSERT INTO `contact`(`id`, `name`, `mobile`, `email`) VALUES (null, :name, :mobile, :email)";
            $stm = $conn->prepare($sql);


            $name = $user->name;
            $email = $user->email;
            $mobile = !empty($user->mobile) ? $user->mobile : '1234567890';

            $stm->bindParam(':name', $name);
            $stm->bindParam(':email', $email);
            $stm->bindParam(':mobile', $mobile, PDO::PARAM_INT);


            if ($stm->execute()) {
                $response = ["status" => "true", "message" => "Data Created Successfully."];
            } else {
                $response = ["status" => "false", "message" => "Failed to Create Record."];
            }
            echo json_encode($response);
        } else {
            $response = ["status" => "false", "message" => "Failed to Connect to Database."];
            echo json_encode($response);
        }
        break;

    case "PUT":
        $user = json_decode(file_get_contents('php://input'));


        $sql = "UPDATE `contact` SET `id`=:id,`name`=:name,`email`=:email,`mobile`=:mobile WHERE `id`=:id";
        $stm = $conn->prepare($sql);



        $id = $user->id;
        $name = $user->name;
        $email = $user->email;
        $mobile = !empty($user->mobile) ? $user->mobile : '1234567890';

        $stm->bindParam("id", $id);
        $stm->bindParam(':name', $name);
        $stm->bindParam(':email', $email);
        $stm->bindParam(':mobile', $mobile, PDO::PARAM_INT);



        if ($stm->execute()) {
            $response = ["status" => "true", "message" => "Data Updated Successfully."];
        } else {
            $response = ["status" => "false", "message" => "Failed to Update Record."];
        }
        echo json_encode($response);
        break;

    case "DELETE":
        
        $id = $_GET['id'];

        $sql = "DELETE FROM `contact` WHERE `contact`.`id`=:id";
        
        $stm = $conn->prepare($sql);
        $stm->bindParam(':id', $id);
        
        if ($stm->execute()) {
            $response = ["status" => "true", "message" => "Data Deleted Successfully." . "id" ];
        } else {
            $response = ["status" => "false", "message" => "Failed to delete Record."];
        }
        
        echo json_encode($response);
        
    default:
        $response = ["status" => "false", "message" => "Invalid Request Method."];
        echo json_encode($response);
        break;
}
?>