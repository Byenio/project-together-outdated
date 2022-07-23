<?php

    ini_set('display_errors', '1');
    ini_set('display_startup_errors', '1');
    error_reporting(E_ALL);

    $user = $_COOKIE['user'];
    $email = $user['"email"'];
    $pass = $user['"password"'];
    $id = $user['"id"'];

    $post_id = $_GET['id'];

    $queryRemove = 'DELETE FROM posts WHERE posts.id = ' . $post_id;
    $queryStudent = "SELECT id, email, password FROM students WHERE email = '".$email."';";
    $queryTeacher = "SELECT id, email, password FROM teachers WHERE email = '".$email."';";

    include './php-components/connect.php';

    $student = mysqli_fetch_array(mysqli_query($conn, $queryStudent), MYSQLI_ASSOC);
    $teacher = mysqli_fetch_array(mysqli_query($conn, $queryTeacher), MYSQLI_ASSOC);

    function checkEmail($conn, $query) {

        $user = mysqli_fetch_array(mysqli_query($conn, $query), MYSQLI_ASSOC);
        
        if (!$user) { return false; }
        return true;

    }

    if (!checkEmail($conn, $queryStudent) && !checkEmail($conn, $queryTeacher)) {

        setcookie('userExists', false, 0, '/');

        //header("Location: http://localhost:3000/register");
        exit();

    }

    function who($conn, $queryStudent, $queryTeacher) {
        
        if (checkEmail($conn, $queryTeacher)) {
            
            setcookie('isTeacher', true, 0, '/');
            return 'teacher';

        }

        if (checkEmail($conn, $queryStudent)) {

            setcookie('isTeacher', false, 0, '/');
            return 'student';

        }

    }

    function checkPass($user, $pass) {

        if ($user['password'] == $pass) return true;
        return false;

    }

    function validAuth($user, $pass) {

        if (!checkPass($user, $pass)) {

            setcookie('invalidAuth', true, 0, '/');

            header('Location: http://localhost:3000/login');
            exit();

        }

        setcookie('user["id"]', $user['id'], 0, '/');
        return true;

    }

    if ($conn -> connect_error) { die('Connection error: ' . $conn -> connect_error); }

    if (who($conn, $queryStudent, $queryTeacher) == 'student') {

        validAuth($student, $pass);
        $stmt = $conn -> prepare($queryRemove);

    }

    if (who($conn, $queryStudent, $queryTeacher) == 'teacher') {

        validAuth($teacher, $pass);
        $stmt = $conn -> prepare($queryRemove);

    }

    $execval = $stmt -> execute();
    $stmt -> close();
    $conn -> close();

    setcookie('logged', true, 0, '/');
    setcookie('user["email"]', $email, 0, '/');
    setcookie('user["password"]', $pass, 0, '/');

    header("Location: http://localhost:3000/account");
    exit();

?>