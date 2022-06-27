<?php

    require_once PROJECT_ROOT_PATH."/Model/Database.php";

    class TypesModel extends Database {

        public function getTypes() { return $this -> select("SELECT types.id, types.name FROM types"); }

    }

?>