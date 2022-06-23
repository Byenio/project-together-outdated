<?php

    ini_set('display_errors', '1');
    ini_set('display_startup_errors', '1');
    error_reporting(E_ALL);

    $email = $_POST['email'];
    $pass = md5($_POST['password']);

    $queryStudent = "SELECT id, email, password FROM students WHERE email = '".$email."';";
    $queryTeacher = "SELECT id, email, password FROM teachers WHERE email = '".$email."';";

    include './php-components/connect.php';

    setcookie('logged', false, -1, '/');
    setcookie('userExists', false, -1, '/');
    setcookie('user["email"]', false, -1, '/');
    setcookie('user["password"]', false, -1, '/');
    setcookie('invalidAuth', false, -1, '/');
    setcookie('isTeacher', false, 0, '/');
    setcookie('user["id"]', false, -1, '/');

    $student = mysqli_fetch_array(mysqli_query($conn, $queryStudent), MYSQLI_ASSOC);
    $teacher = mysqli_fetch_array(mysqli_query($conn, $queryTeacher), MYSQLI_ASSOC);

    function checkEmail($conn, $query) {

        $user = mysqli_fetch_array(mysqli_query($conn, $query), MYSQLI_ASSOC);
        
        if (!$user) { return false; }
        return true;

    }

    if (!checkEmail($conn, $queryStudent) && !checkEmail($conn, $queryTeacher)) {

        setcookie('userExists', false, 0, '/');

        header("Location: http://localhost:3000/register");
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

    if (who($conn, $queryStudent, $queryTeacher) == 'student') { validAuth($student, $pass); }
    if (who($conn, $queryStudent, $queryTeacher) == 'teacher') { validAuth($teacher, $pass); }

    if ($conn -> connect_error) { die('Connection error: ' . $conn -> connect_error); }

    setcookie('logged', true, 0, '/');
    setcookie('user["email"]', md5($email), 0, '/');
    setcookie('user["password"]', $pass, 0, '/');

    header("Location: http://localhost:3000/account");
    exit();

?>