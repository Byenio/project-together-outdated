<?php

    require_once PROJECT_ROOT_PATH."/Model/Database.php";

    class UserPostsModel extends Database {

        public function getUserPosts($id) { 
            
            if (!isset($_COOKIE['isTeacher'])) {

                return $this-> select(
                    "SELECT posts.id,
                            subjects.name,
                            students.fName,
                            students.lName,
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