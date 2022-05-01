<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Tambah_barang extends CI_Controller {

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

		$config['hostname'] = 'localhost';
		$config['username'] = 'root';
		$config['password'] = '';
		$config['database'] = 'test_ci';
		$config['dbdriver'] = 'mysqli';
		$config['dbprefix'] = '';
		$config['pconnect'] = FALSE;
		$config['db_debug'] = TRUE;
		$this->load->model('Tambah_model','',$config); //call model
		}
		

	public function index()
	{
		$this->load->view('tambah_view', array('error' => ''));
	}

	public function aksi_upload(){
		$config['upload_path'] = './assets/gambar/';
		$config['allowed_types'] = 'gif|jpg|png';
		// $config['max_size'] = 100;
		// $config['max_width'] = 1024;
		// $config['max_height'] = 768;
		$this->load->library('upload', $config);

		// print_r($this->input->post());
		print_r($_FILES);

		if ( ! $this->upload->do_upload('berkas_gambar')){
			$error = array('error' => $this->upload->display_errors());
			print_r($error);
			// $this->load->view('v_upload', $error);
		}else{
			$responseResults = array('upload_data' => $this->upload->data());
			$data['nama_produk'] = $this->input->post('nama_barang');
			$data['deskripsi'] = $this->input->post('desk');
			$data['harga'] = $this->input->post('harga');
			$data['gambar'] = $responseResults['upload_data']['raw_name'];
			$data['kategori'] = $this->input->post('kategori');
			$this->Tambah_model->create($data);
			$this->load->view('upload_sukses',$responseResults);
		}
	}

}
