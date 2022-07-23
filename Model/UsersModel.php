<?php

    require_once PROJECT_ROOT_PATH."/Model/Database.php";

    class UsersModel extends Database {

        public function getUsers() {

            return $this -> select(
                "SELECT students.id,
                        students.fName,
                        students.lName,
                        students.email,
                        classes.name as class,
                        students.isTutor
                FROM students
                INNER JOIN classes ON students.class = classes.id"
            );
        }

        public function getUsersIDs() {

            return $this -> select(
                "SELECT students.id FROM students"
            );
        }

    }

?>