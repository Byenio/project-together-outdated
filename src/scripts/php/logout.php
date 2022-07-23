<?php

    setcookie('user["password"]', null, -1, '/');
    setcookie('user["email"]', null, -1, '/');
    setcookie('user["id"]', null, -1, '/');
    setcookie('user', null, -1, '/');
    setcookie('logged', null, -1, '/');

    header('Location: http://localhost:3000');

?>