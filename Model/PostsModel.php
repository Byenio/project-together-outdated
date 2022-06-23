<?php

    require_once PROJECT_ROOT_PATH."/Model/Database.php";

    class PostsModel extends Database {

        public function getPosts() {

            return $this -> select(
                "SELECT posts.id,
                        subjects.name as 'subject',
                        students.fName as 'studentfname',
                        students.lName as 'studentlname',
                        teachers.fName as 'teacherfname',
                        teachers.lName as 'teacherlname',
                        posts.body,
                        classes.name as 'class',
                        types.name as 'type'
                FROM posts
                INNER JOIN subjects ON posts.subject = subjects.id
                LEFT JOIN students ON posts.tutor = students.id
                LEFT JOIN teachers ON posts.teacher = teachers.id
                LEFT JOIN classes ON students.class = classes.id
                INNER JOIN types ON posts.type = types.id"
            );
            exit();
        }

    }

?>