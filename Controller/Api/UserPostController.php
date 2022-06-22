<?php

    class UserPostController extends BaseController {

        public function listUserPostAction() {

            $strErrorDesc = '';
            $requestMethod = $_SERVER['REQUEST_METHOD'];
            $arrQueryStringParams = $this -> getQueryStringParams();

            if (strtoupper($requestMethod) == 'GET') {

                try {

                    $userPostModel = new UserPostsModel();

                    $intId = 0;

                    if (isset($arrQueryStringParams['id']) && $arrQueryStringParams['id']) {

                        $intId = $arrQueryStringParams['id'];

                    }

                    $arrUserPosts = $userPostModel -> getUserPosts($intId);
                    $responseData = '{"items": '.json_encode($arrUserPosts).'}';

                } catch (Error $e) {

                    $strErrorDesc = $e -> getMessage().'Something went wrong. Please contact support.';
                    $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';

                }

            } else {

                $strErrorDesc = 'Method not allowed.';
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