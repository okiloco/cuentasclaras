<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Usuario extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -  
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in 
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
		
	}
	public function listarUsuarios(){
		
		$start = $this->input->post('start') ? $this->input->post('start') : 0;
		$limit = $this->input->post('limit') ? $this->input->post('limit') : PHP_INT_MAX;

		$filtro = $this->input->post("filtro");

		$this->db->select("SQL_CALC_FOUND_ROWS 
			u.id,
			u.username,
			u.email,
			u.identificacion,
			u.telefono,
			u.celular,
			u.direccion,
			u.nombres,
			IFNULL(u.apellidos,'') apellidos,
			u.rol_id,
			r.nombre rol
		",false);
		$this->db->from("usuario u");
		$this->db->join("roles r","u.rol_id = r.id","inner");
		$this->db->where("u.estado = 1 AND (u.nombres LIKE '%$filtro%' OR u.apellidos LIKE '%$filtro%')",NULL,FALSE);
		$this->db->limit($limit,$start);
		$query = $this->db->get();

		$usuarios = $query->result_array();
		$cantidad=$this->db->query("SELECT FOUND_ROWS() as total;", false);
        $cantidad=$cantidad->row_array();

        echo json_encode(array(
            'success' => true,
            'data' => $usuarios,
            'total' => $cantidad["total"],
        ));

	}

	public function listarRoles(){
		$this->db->where("estado = 1");
		$query=$this->db->get("roles");
		echo json_encode(array(
			'data'=>$query->result_array()
		));
	}
	public function guardarUsuario(){
		
		$id = $this->input->post("id");
		$password = $this->input->post("password");
        $username = trim($this->input->post("username"));
		$nombres = $this->input->post("nombres");
        $apellidos = $this->input->post("apellidos");
        $identificacion = $this->input->post("identificacion");

        $email = $this->input->post('email');
        $telefono = $this->input->post('telefono');
        $celular = $this->input->post('celular');
        $direccion = $this->input->post('direccion');
		$rol_id = $this->input->post("rol_id");

		$this->db->where('username',$username);
        $this->db->where('estado',1);
		$rs = $this->db->get("usuario");

		$msg="";
		$success=false;

		if($rs->num_rows()===1 && empty($id)){
			 $msg="El usuario ya existe";
		}else{
			$data=array(
				'username'=>$username,
				'password'=>md5($password),
				'email'=>$email,
				'telefono'=>$telefono,
				'direccion'=>$direccion,
				'nombres'=>$nombres,
				'apellidos'=>$apellidos,
				'identificacion'=>$identificacion,
				'telefono'=>$telefono,
				'celular'=>$celular,
				'rol_id'=>$rol_id
			);
			if(empty($id)){
				$this->db->insert('usuario',$data);
				$id = $this->db->insert_id();
				$msg = "Persona Registrada Correctamente";
			}else{
				unset($data["password"]);
				$this->db->update('usuario',$data,"id = $id");
				$msg="Persona Actualizada Correctamente";
			}
			$success=true;
		}

		echo json_encode(array(
		    'success' => $success,
		    'msg' => $msg,
		    'id' => $id
		)); 

	}

	public function eliminarUsuario(){
		$id = $this->input->post("id");        
		$this->db->update('usuario', array('estado' => -1), "id = $id");       
		echo json_encode(array(
		    'success' => true,
		    'msg' => "Persona Eliminada Correctamente"
		)); 
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */