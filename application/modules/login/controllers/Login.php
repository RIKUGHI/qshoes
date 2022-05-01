<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {

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
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */

	function __construct(){
		parent::__construct();
		$this->load->library(array('form_validation'));
		$this->load->helper(array('url','form'));

		$config['hostname'] = 'localhost';
		$config['username'] = 'root';
		$config['password'] = '';
		$config['database'] = 'test_ci';
		$config['dbdriver'] = 'mysqli';
		$config['dbprefix'] = '';
		$config['pconnect'] = FALSE;
		$config['db_debug'] = TRUE;
		$this->load->model('Login_model'); //call model
		// $this->load->model('Login_model','',$config); //call model


		}

	public function index()
	{
		
		// jika session username sudah diset maka redirect ke dashboard
		if ($this->session->userdata('username') != ''){
			//alihkan ke halaman login
			redirect(site_url('dashboard'));
		}

		// Fungsi Login
		$valid = $this->form_validation;
		$username = $this->input->post('username');
		$password = $this->input->post('password');
		$valid->set_rules('username','Username','required');
		$valid->set_rules('password','Password','required');
		if ($valid->run()) {	
			$this->Login_model->login($username,$password);
		}

		// if($valid->run()) {
		// 	$this->Simple_login->login($username,$password, base_url('dashboard'), base_url('login'));
		// }
		$this->load->view('login_view');
	}

	public function logout(){
		$this->Login_model->logout();
		} 
}
