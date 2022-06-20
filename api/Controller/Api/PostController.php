<?php

    class PostController extends BaseController {

        public function listPostAction() {

            $strErrorDesc = '';
            $requestMethod = $_SERVER['REQUEST_METHOD'];
            $arrQueryStringParams = $this -> getQueryStringParams();

            if (strtoupper($requestMethod) == 'GET') {

                try {

                    $postModel = new PostsModel();

                    $arrPosts = $postModel -> getPosts();
                    $responseData = '{"items": '.json_encode($arrPosts).'}';

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