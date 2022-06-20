<?php

    require_once PROJECT_ROOT_PATH."/Model/Database.php";

    class PostsModel extends Database {

        public function getPosts() { return $this -> select("SELECT * FROM posts"); } 

    }

?>