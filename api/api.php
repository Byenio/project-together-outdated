<?php

    require __DIR__."/inc/bootstrap.php";

    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $uri = explode('/', $uri);

    if ((isset($uri[2]) && ($uri[2] != 'posts' && $uri[2] != 'classes')) || !isset($uri[3])) {

        header("HTTP/1.1 404 Not Found");
        exit();

    }

    require PROJECT_ROOT_PATH."/Controller/Api/PostController.php";
    require PROJECT_ROOT_PATH."/Controller/Api/ClassController.php";

    if ((isset($uri[2]) && ($uri[2] == 'posts'))) {

        $objFeedController = new PostController();
        $strMethodName = $uri[3].'PostAction';
        $objFeedController -> {$strMethodName}();

    } elseif ((isset($uri[2]) && ($uri[2] == 'classes'))) {

        $objFeedController = new ClassController();
        $strMethodName = $uri[3].'ClassAction';
        $objFeedController -> {$strMethodName}();

    }

?>