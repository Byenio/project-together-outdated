<?php

    error_reporting(E_ALL);
    ini_set("display_errors", 1);

    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $email = $_POST['email'];
    $class = $_POST['class'];
    $pass = $_POST['password'];
    $passRepeat = $_POST['password-repeat'];

    include './php-components/connect.php';

    if ((md5($pass) != md5($passRepeat))) {
        header("Location: http://localhost:3000/register");
        exit();
    }

    if ($conn -> connect_error) { die("Connection error: " . $conn -> connect_error); }

    $stmt = $conn ->prepare(
        "INSERT INTO students(fName, lName, email, password, class)
        VALUES (?, ?, ?, ?, ?)"
    );
    $stmt -> bind_param("ssssi", $fname, $lname, $email, md5($pass), $class);
    $execval = $stmt -> execute();
    $stmt -> close();
    $conn -> close();

    header("Location: http://localhost:3000/login");
    exit();

?>