<?php
 
if (!defined('BASEPATH'))
    exit('No direct script access allowed');
 
class Login extends CI_Controller {
 
    function index() {
         
    }
 
    function horaSistema(){
        echo json_encode(array(
            "ano"=>date('Y'),
            "mes"=>date('m'),
            "dia"=>date('d'),
            "hora"=>date('H'),
            "minuto"=>date('i'),
            "segundo"=>date('s')
        ));
    }
     
    function logout() {
        $this->session->sess_destroy();
        echo json_encode(array(
            'success' => true
        ));
    }

    function getPass(){
        $password=$this->input->get("password");
        echo "pass: ".md5($password);
    }
 
    function cambiarContrasena() {
        $user = $this->session->userdata("usuario");

        $data = array(            
            "password" => md5($this->input->post("password"))
        );
        $this->db->update('usuario', $data, "id = $user[id]");
        echo json_encode(array(
            'success' => true,
            'msg' => 'Contrase&ntilde;a cambiada correctamente'
        ));          
    }
    function accesoUsuario() {
        $data = array(
            "username" => $this->input->post("username"),
            "password" => md5($this->input->post("password")),
            "estado" => 1
        );
               
        $this->db->where($data);
        $rs = $this->db->get("usuario");
        
        if ($rs->num_rows() === 1) {

            $data = array(
                "u.username" => $this->input->post("username"),
                "u.password" => md5($this->input->post("password")),
                "u.estado" => 1
            );
            $this->db->select("u.id,
            u.username,
            u.email,
            u.identificacion,
            u.telefono,
            u.celular,
            u.direccion,
            u.nombres,
            u.estado,
            u.apellidos,
            u.imagen,
            u.rol_id,
            r.nombre rol");
            $this->db->from("usuario u");
            $this->db->join("roles r","u.rol_id=r.id","inner");
            $this->db->where($data);

            $rs = $this->db->get();
            $usuario = $rs->row_array();

            unset($usuario["password"]);
           
            $this->session->set_userdata(array(
                "usuario" => $usuario,
            ));

            echo json_encode(array(
                "usuario" => $this->session->userdata("usuario"),
                'success' => true
            ));
        } else {
            unset($data["password"]);
            $this->db->where($data);
            $rs = $this->db->get("usuario");

            if($rs->num_rows() === 1){
                echo json_encode(array(
                    'success' => false,
                    'msg' => 'Usuario y/o contrase&ntilde;a invalido.'
                ));                
            }else{
                echo json_encode(array(
                    'success' => false,
                    'msg' => 'Usuario No Existe.'                    
                ));
            }            
        }
    }
 
    function estaConectado() {
        $user = $this->session->userdata("usuario"); //["user_data"];
        echo json_encode(array(
            'success' => is_array($user),
            'usuario' => $user
        ));
    } 
}
 
?>