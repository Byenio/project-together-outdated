<?php

    require_once PROJECT_ROOT_PATH."/Model/Database.php";

    class ClassesModel extends Database {

        public function getClasses() { return $this -> select("SELECT classes.id, classes.name FROM classes"); }

    }

?>