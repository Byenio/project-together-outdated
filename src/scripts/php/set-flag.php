<?php

    ini_set('display_errors', '1');
    ini_set('display_startup_errors', '1');
    error_reporting(E_ALL);

    $user = $_COOKIE['user'];
    $email = $user['"email"'];
    $pass = $user['"password"'];
    $id = $user['"id"'];

    $api_url = 'http://localhost/project-together/api.php/users/ids';
    $json_data = file_get_contents($api_url);
    $response_data = json_decode($json_data);
    $users_ids = $response_data->ids;

    foreach ($users_ids as $user_id) {

        $IDs[] = $user_id->id;

    }

    foreach ($IDs as $id) {

        $arr[$id]['bool'] = intval(explode("_", $_POST["flag$id"])[0]);
        $arr[$id]['id'] = intval(explode("_", $_POST["flag$id"])[1]);

    }

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

    if ($conn -> connect_error) { die('Connection error: ' . $conn -> connect_error); }

    if (who($conn, $queryStudent, $queryTeacher) == 'student') {

        validAuth($student, $pass);

        foreach ($IDs as $update_id) {
  
            $queryUpdate = "UPDATE students SET students.isTutor = ".$arr[$update_id]['bool']." WHERE students.id = ".$arr[$update_id]['id']."";
            mysqli_query($conn, $queryUpdate);

        }

    }

    if (who($conn, $queryStudent, $queryTeacher) == 'teacher') {

        validAuth($teacher, $pass);
        
        foreach ($IDs as $update_id) {
            
            $queryUpdate = "UPDATE students SET students.isTutor = ".$arr[$update_id]['bool']." WHERE students.id = ".$arr[$update_id]['id']."";
            mysqli_query($conn, $queryUpdate);

            print_r($queryUpdate);

        }

    }

    setcookie('logged', true, 0, '/');
    setcookie('user["email"]', $email, 0, '/');
    setcookie('user["password"]', $pass, 0, '/');

    header("Location: http://localhost:3000/account");
    exit();

?>