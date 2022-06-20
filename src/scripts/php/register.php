<?php

    error_reporting(E_ALL);
    ini_set("display_errors", 1);

    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $email = $_POST['email'];
    $class = $_POST['class'];
    $pass = md5($_POST['password']);
    $passRepeat = md5($_POST['password-repeat']);

    $insertStudentsQuery = "INSERT INTO students (fName, lName, email, password, class) 
                            VALUES (?, ?, ?, ?, ?)";
    $getEmailQuery = "SELECT * FROM students WHERE email = '".$email."';";

    include './php-components/connect.php';

    function checkPass($password, $repeated_password) {

        if ($password != $repeated_password) { return false; }
        return true;

    }

    function checkEmail($conn, $getEmailQuery) {

        $student = mysqli_fetch_array(mysqli_query($conn, $getEmailQuery), MYSQLI_ASSOC);
        
        if (!$student) { return false; }
        return true;

    }

    if (checkEmail($conn, $getEmailQuery)) {

        setcookie('userExists', true, strtotime('+10 minutes'));

        header("Location: http://localhost:3000/register");
        exit();

    }

    if (isset($_COOKIE['userExists'])) {

        unset($_COOKIE['userExists']);
        setcookie('userExists', null, time() - 3600, '/');

    }

    if (!checkPass($pass, $passRepeat)) {
        
        header("Location: http://localhost:3000/register");
        exit();

    }

    if ($conn -> connect_error) { die("Connection error: " . $conn -> connect_error); }

    $stmt = $conn ->prepare($insertStudentsQuery);

    $stmt -> bind_param("ssssi", $fname, $lname, $email, $pass, $class);
    $execval = $stmt -> execute();
    $stmt -> close();
    $conn -> close();

    setcookie('logged', true, strtotime('+30 days'));
    setcookie('user["email"]', $email, strtotime('+30 days'));
    setcookie('user["password"]', md5($pass), strtotime('+30 days'));

    header("Location: http://localhost:3000/login");
    exit();

?>