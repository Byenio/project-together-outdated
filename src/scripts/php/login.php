<?php

    ini_set('display_errors', '1');
    ini_set('display_startup_errors', '1');
    error_reporting(E_ALL);

    $email = $_POST['email'];
    $pass = md5($_POST['password']);

    $query = "SELECT email, password FROM students WHERE email = '".$email."';";

    include './php-components/connect.php';

    setcookie('logged', false, -1, '/');
    setcookie('userExists', false, -1, '/');
    setcookie('user["email"]', false, -1, '/');
    setcookie('user["password"]', false, -1, '/');
    setcookie('invalidAuth', false, -1, '/');

    $student = mysqli_fetch_array(mysqli_query($conn, $query), MYSQLI_ASSOC);

    function checkEmail($conn, $query) {

        $student = mysqli_fetch_array(mysqli_query($conn, $query), MYSQLI_ASSOC);
        
        if (!$student) { return false; }
        return true;

    }

    if (!checkEmail($conn, $query)) {

        setcookie('userExists', false, strtotime('+10 minutes'), '/');

        header("Location: http://localhost:3000/register");
        exit();

    }

    function checkPass($student, $pass) {

        if ($student['password'] == $pass) return true;
        return false;

    }

    if (!checkPass($student, $pass)) {

        setcookie('invalidAuth', true, strtotime('+10 minutes'), '/');

        header('Location: http://localhost:3000/login');
        exit();
        
    }

    if ($conn -> connect_error) { die('Connection error: ' . $conn -> connect_error); }

    setcookie('logged', true, strtotime('+30 days'), '/');
    setcookie('user["email"]', $email, strtotime('+30 days'), '/');
    setcookie('user["password"]', $pass, strtotime('+30 days'), '/');

    header("Location: http://localhost:3000/account");
    exit();

?>