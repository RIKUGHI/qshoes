<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Overview extends CI_Controller {

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
		// $this->load->library(array('form_validation'));
		// $this->load->helper(array('url','form'));

		// $config['hostname'] = 'localhost';
		// $config['username'] = 'root';
		// $config['password'] = '';
		// $config['database'] = 'test_ci';
		// $config['dbdriver'] = 'mysqli';
		// $config['dbprefix'] = '';
		// $config['pconnect'] = FALSE;
		// $config['db_debug'] = TRUE;
		// $this->load->model('Tambah_model','',$config); //call model
		}
		

	public function index()
	{
		$this->load->view('admin/head');
		$this->load->view('admin/navbar.php');
		$this->load->view('admin/sidebar');
		$this->load->view('overview_view');
		$this->load->view('admin/footer');
	}

}
