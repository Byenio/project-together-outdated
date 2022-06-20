<?php

    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $email = $_POST['email'];
    $class = $_POST['class'];
    $pass = $_POST['password'];
    $passRepeat = $_POST['password-repeat'];

    define("DB_HOST", "localhost");
    define("DB_USER", "root");
    define("DB_PASS", "");
    define("DB_NAME", "together");

    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);


    echo $fname, $lname, $pass, $passRepeat, $class.'<br />';

    function checkPass($pass, $passRepeat) {
        if ($pass != $passRepeat) return false;
        return true;
    }

    if (!checkPass(md5($pass), md5($passRepeat))) {
        header("Location: http://localhost:3000/register");
        exit();
    }

    if ($conn -> connect_error) { die("Connection error: " . $conn -> connect_error); }

    $stmt = $conn ->prepare(
        "INSERT INTO students(fname, lname, email, password, class)
        VALUES (?, ?, ?, ?, ?)"
    );
    $stmt -> bind_param("ssssi", $fname, $lname, $email, $password, $class);
    $execval = $stmt ->execute();
    $stmt -> close();
    $conn -> close();

    header("Location: http://localhost/login");
    exit();

?>