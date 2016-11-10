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
			IFNULL(u.email,'') email,
			u.identificacion,
			u.telefono,
			u.celular,
			u.direccion,
			u.nombres,
			u.estado,
			IFNULL(u.apellidos,'') apellidos,
			u.rol_id,
			CASE WHEN  u.estado=1 THEN 'Activo'
				WHEN u.username='' THEN 'Sin Usuario'
				ELSE 'Bloqueado'
			END estado_desc,  
			r.nombre rol
		",false);
		$this->db->from("usuario u");
		$this->db->join("roles r","u.rol_id = r.id","inner");
		$this->db->where("(u.nombres LIKE '%$filtro%' OR u.apellidos LIKE '%$filtro%')",NULL,FALSE);
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
				'estado'=>($username!='' && $password!='')?1:-1,
				'rol_id'=>$rol_id
			);
			if(empty($id)){
				$this->db->insert('usuario',$data);
				$id = $this->db->insert_id();
				$msg = "Usuario Registrado Correctamente";
			}else{
				unset($data["password"]);
				$this->db->update('usuario',$data,"id = $id");
				$msg="Usuario Actualizado Correctamente";
			}
			$success=true;
		}

		echo json_encode(array(
		    'success' => $success,
		    'msg' => $msg,
		    'id' => $id
		)); 
	}

	public function bloquearUsuario(){
		$id = $this->input->post("id");
		$estado=$this->input->post("estado");

		$this->db->where("id = $id");
		$this->db->update('usuario', array('estado' => ($estado*-1)));       
		echo json_encode(array(
		    'success' => true,
		    'msg' => "Persona Bloqueada Correctamente"
		)); 
	}
	public function eliminarUsuario(){
		$id = $this->input->post("id");
		$this->db->where("id = $id");        
		$this->db->delete('usuario');       
		echo json_encode(array(
		    'success' => true,
		    'msg' => "Persona Eliminada Correctamente"
		)); 
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */