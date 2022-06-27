<?php

    require_once PROJECT_ROOT_PATH."/Model/Database.php";

    class SubjectsModel extends Database {

        public function getSubjects() { return $this -> select("SELECT subjects.id, subjects.name FROM subjects"); }

    }

?>