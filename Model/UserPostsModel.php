<?php

    ini_set('display_errors', '1');
    ini_set('display_startup_errors', '1');
    error_reporting(E_ALL);

    require_once PROJECT_ROOT_PATH."/Model/Database.php";

    class UserPostsModel extends Database {

        public function getUserPosts($id, $key, $pass) {

            include 'connect.php';
            $queryStudent = "SELECT id, email, password FROM students WHERE email = '".$key."';";
            $queryTeacher = "SELECT id, email, password FROM teachers WHERE email = '".$key."';";

            $student = mysqli_fetch_array(mysqli_query($conn, $queryStudent), MYSQLI_ASSOC);
            $teacher = mysqli_fetch_array(mysqli_query($conn, $queryTeacher), MYSQLI_ASSOC);

            function checkEmail($conn, $query) {

                $user = mysqli_fetch_array(mysqli_query($conn, $query), MYSQLI_ASSOC);

                if (!$user) { return false; }
                return true;
        
            }

            setcookie('invalidAuth', false, -1, '/');
        
            if (!checkEmail($conn, $queryStudent) && !checkEmail($conn, $queryTeacher)) {
        
                setcookie('invalidAuth', true, 0, '/');
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
                    exit();
        
                }
        
                return true;
        
            }
        
            if (who($conn, $queryStudent, $queryTeacher) == 'student') { validAuth($student, $pass); }
            if (who($conn, $queryStudent, $queryTeacher) == 'teacher') { validAuth($teacher, $pass); }
            
            if (who($conn, $queryStudent, $queryTeacher) == 'student') {

                return $this-> select(
                    "SELECT posts.id,
                            subjects.name,
                            students.fName,
                            students.lName,
                            posts.body,
                            classes.name,
                            types.name
                    FROM posts
                    INNER JOIN subjects ON posts.subject = subjects.id
                    INNER JOIN students ON posts.tutor = students.id
                    INNER JOIN classes ON students.class = classes.id
                    INNER JOIN types ON posts.type = types.id
                    WHERE posts.tutor = ?",
                    ["i", $id]
                );
                exit();

            }

            return $this-> select(
                "SELECT posts.id,
                        subjects.name,
                        teachers.fName,
                        teachers.lName,
                        posts.body,
                        types.name
                FROM posts
                INNER JOIN subjects ON posts.subject = subjects.id
                INNER JOIN types ON posts.type = types.id
                INNER JOIN teachers ON posts.teacher = teachers.id
                WHERE posts.teacher = ?",
                ["i", $id]
            );
            exit();
        }
    
    }

?>