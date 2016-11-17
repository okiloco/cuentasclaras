<?php
 
if (!defined('BASEPATH'))
    exit('No direct script access allowed');
 
class Prestamo extends CI_Controller {
 
    public function getSession(){
    	echo json_encode(array(
    		"data"=>$this->session->userdata("usuario")
    	));
    }
}
 
