<?php

    class UserController extends BaseController {

        public function listUserAction() {

            $strErrorDesc = '';
            $requestMethod = $_SERVER['REQUEST_METHOD'];
            $arrQueryStringParams = $this -> getQueryStringParams();

            if (strtoupper($requestMethod) == 'GET') {

                try {

                    $userModel = new UsersModel();

                    $arrUsers = $userModel -> getUsers();
                    $responseData = '{"items": '.json_encode($arrUsers).'}';

                } catch (Error $e) {

                    $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
                    $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';

                }

            } else {

                $strErrorDesc = 'Method not allowed';
                $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';

            }

            if (!$strErrorDesc) {

                $this -> sendOutput(
                    $responseData,
                    array('Content-Type: application/json', 'HTTP/1.1 200 OK')
                );

            } else {

                $this -> sendOutput(
                    json_encode(array('error' => $strErrorDesc)),
                    array('Content-Type: application/json', $strErrorHeader)
                );

            }

        }

        public function idsUserAction() {

            $strErrorDesc = '';
            $requestMethod = $_SERVER['REQUEST_METHOD'];
            $arrQueryStringParams = $this -> getQueryStringParams();

            if (strtoupper($requestMethod) == 'GET') {

                try {

                    $userModel = new UsersModel();

                    $usersIDs = $userModel -> getUsersIDs();
                    $responseData = '{"ids": '.json_encode($usersIDs).'}';

                } catch (Error $e) {

                    $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
                    $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';

                }

            } else {

                $strErrorDesc = 'Method not allowed';
                $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';

            }

            if (!$strErrorDesc) {

                $this -> sendOutput(
                    $responseData,
                    array('Content-Type: application/json', 'HTTP/1.1 200 OK')
                );

            } else {

                $this -> sendOutput(
                    json_encode(array('error' => $strErrorDesc)),
                    array('Content-Type: application/json', $strErrorHeader)
                );

            }

        }

    }

?>