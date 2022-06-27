<?php

    require __DIR__."/inc/bootstrap.php";

    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $uri = explode('/', $uri);

    require PROJECT_ROOT_PATH."/Controller/Api/PostController.php";
    require PROJECT_ROOT_PATH."/Controller/Api/ClassController.php";
    require PROJECT_ROOT_PATH."/Controller/Api/UserPostController.php";
    require PROJECT_ROOT_PATH."/Controller/Api/SubjectController.php";
    require PROJECT_ROOT_PATH."/Controller/Api/TypeController.php";

    if ((isset($uri[2]) && ($uri[2] == 'posts'))) {

        $objFeedController = new PostController();
        $strMethodName = $uri[3].'PostAction';
        $objFeedController -> {$strMethodName}();

    } 

    if ((isset($uri[2]) && ($uri[2] == 'classes'))) {

        $objFeedController = new ClassController();
        $strMethodName = $uri[3].'ClassAction';
        $objFeedController -> {$strMethodName}();

    }

    if ((isset($uri[2]) && ($uri[2] == 'subjects'))) {

        $objFeedController = new SubjectController();
        $strMethodName = $uri[3].'SubjectAction';
        $objFeedController -> {$strMethodName}();

    }

    if ((isset($uri[2]) && ($uri[2] == 'types'))) {

        $objFeedController = new TypeController();
        $strMethodName = $uri[3].'TypeAction';
        $objFeedController -> {$strMethodName}();

    }

    if ((isset($uri[2]) && ($uri[2] == 'userposts')) && isset($uri[3])) {

        $objFeedController = new UserPostController();
        $strMethodName = $uri[3].'UserPostAction';
        $objFeedController -> {$strMethodName}();

    }

    header("HTTP/1.1 404 Not Found");
    exit();

?>