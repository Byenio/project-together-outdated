<?php

    require __DIR__."/inc/bootstrap.php";

    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $uri = explode('/', $uri);

    require PROJECT_ROOT_PATH."/Controller/Api/PostController.php";
    require PROJECT_ROOT_PATH."/Controller/Api/ClassController.php";
    require PROJECT_ROOT_PATH."/Controller/Api/UserPostController.php";
    require PROJECT_ROOT_PATH."/Controller/Api/SubjectController.php";
    require PROJECT_ROOT_PATH."/Controller/Api/TypeController.php";

    if ((isset($uri[2]) && ($uri[3] == 'posts'))) {

        $objFeedController = new PostController();
        $strMethodName = $uri[4].'PostAction';
        $objFeedController -> {$strMethodName}();

    } 

    if ((isset($uri[2]) && ($uri[3] == 'classes'))) {

        $objFeedController = new ClassController();
        $strMethodName = $uri[4].'ClassAction';
        $objFeedController -> {$strMethodName}();

    }

    if ((isset($uri[2]) && ($uri[3] == 'subjects'))) {

        $objFeedController = new SubjectController();
        $strMethodName = $uri[4].'SubjectAction';
        $objFeedController -> {$strMethodName}();

    }

    if ((isset($uri[2]) && ($uri[3] == 'types'))) {

        $objFeedController = new TypeController();
        $strMethodName = $uri[4].'TypeAction';
        $objFeedController -> {$strMethodName}();

    }

    if ((isset($uri[2]) && ($uri[3] == 'userposts')) && isset($uri[4])) {

        $objFeedController = new UserPostController();
        $strMethodName = $uri[4].'UserPostAction';
        $objFeedController -> {$strMethodName}();

    }

    header("HTTP/1.1 404 Not Found");
    exit();

?>