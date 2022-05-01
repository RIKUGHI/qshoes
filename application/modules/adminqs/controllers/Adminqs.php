<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Adminqs extends CI_Controller {

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
		$this->load->model('AdminQsModel');
	}
		

	public function index(){
		if ($this->session->userdata('id_admin') == null) {
			redirect(base_url('adminqs/login'));
		}
		$data['username_admin'] = $this->session->userdata('username_admin');

		$this->load->view('adminqs/header', $data);
		$this->load->view('adminqs/header_admin');
		$this->load->view('adminqs/sidebar');
		$this->load->view('DashboardView');
	}
	
	public function users(){
		if ($this->session->userdata('id_admin') == null) {
			redirect(base_url('adminqs/login'));
		}
		$data['username_admin'] = $this->session->userdata('username_admin');

		$this->load->view('adminqs/header', $data);
		$this->load->view('adminqs/header_admin');
		$this->load->view('adminqs/sidebar');
		$this->load->view('UsersView');
	}

	public function selesai(){
		if ($this->session->userdata('id_admin') == null) {
			redirect(base_url('adminqs/login'));
		}
		$data['username_admin'] = $this->session->userdata('username_admin');

		$this->load->view('adminqs/header', $data);
		$this->load->view('adminqs/header_admin');
		$this->load->view('adminqs/sidebar');
		$this->load->view('SelesaiView');
	}
	
	public function login(){
		if ($this->session->userdata('id_admin') != null) {
			redirect(base_url('adminqs'));
		}

		$this->load->view('adminqs/header');
		$this->load->view('LoginView');
	}

	public function check(){
		if ($_SERVER['REQUEST_METHOD'] == 'POST') {
			if ($this->input->post('username') != null) {
				$r = $this->AdminQsModel->checkData($this->input->post('col'),$this->input->post('username'));
	
				if (empty($r)) {
					echo json_encode(array(
						'availabel' => true,
						'status' => 'success',
						'message' => 'Username tersedia'
					));
				} else {
					echo json_encode(array(
						'availabel' => false,
						'status' => 'error',
						'message' => 'Username sudah terdaftar'
					));
				}
			}else if ($this->input->post('email') != null) {
				$r = $this->AdminQsModel->checkData($this->input->post('col'),$this->input->post('email'));
	
				if (empty($r)) {
					echo json_encode(array(
						'availabel' => true,
						'status' => 'success',
						'message' => 'Email tersedia'
					));
				} else {
					echo json_encode(array(
						'availabel' => false,
						'status' => 'error',
						'message' => 'Email sudah terdaftar'
					));
				}
			}
		}
	}

	public function signUpVerification(){
		if ($_SERVER['REQUEST_METHOD'] == 'POST') {
			$data['username'] = $this->input->post('username');
			$data['email'] = $this->input->post('email');
			$data['password'] = password_hash($this->input->post('password'), PASSWORD_BCRYPT);
			$data['code_otp'] = rand(9999, 1111);

			if ($this->AdminQsModel->createAdmin($data)) {
				$subject = "Email Verification Code";
				$message = "QShoes - JANGAN MEMBERI TAHU KODE INI KE SIAPAPUN termasuk pihak QShoes " . $data['code_otp'];
				$sender = "From: kurohikoblacknight5601@gmail.com";
				if(mail($data['email'], $subject, $message, $sender)){
					echo json_encode(array(
						'statusSended' => true,
						'status' => 'success',
						'message' => 'Kode telah dikirim melalui email ke '.$data['email']
					));
					}else{
						$this->AdminQsModel->deleteAccountBeforeVerification($data['email']);

							echo json_encode(array(
								'statusSended' => false,
								'status' => 'error',
								'message' => 'Gagal saat mengirim kode, silahkan tunggu beberapa saat	'
							));
					}
			} else {
				echo json_encode(array(
					'statusSended' => false,
					'status' => 'error',
					'message' => 'Gagal mendaftar'
				));
			}
		}
	}

	public function resendCode(){
		$email = $this->input->post('email');
		$data['code_otp'] = rand(9999, 1111);
		$this->AdminQsModel->resendCode($data,$email);

		$subject = "Email Verification Code";
		$message = "QShoes - JANGAN MEMBERI TAHU KODE INI KE SIAPAPUN termasuk pihak QShoes " . $data['code_otp'];
		$sender = "From: kurohikoblacknight5601@gmail.com";

		if(mail($email, $subject, $message, $sender)){
			echo json_encode(array(
				'statusSended' => true,
				'status' => 'success',
				'message' => 'Kode baru telah dikirim melalui email ke '.$email
			));
		}else{
			echo json_encode(array(
				'statusSended' => false,
				'status' => 'error',
				'message' => 'Gagal saat mengirim kode, silahkan tunggu beberapa saat'
			));
		}
	}

	public function deleteAccountBeforeVerification(){
		if ($_SERVER['REQUEST_METHOD'] == 'POST') {
			$email = $this->input->post('email');
			
			if ($this->AdminQsModel->deleteAccountBeforeVerification($email)) {
				echo json_encode(array(
					'status' => 'success',
					'message' => 'Email '. $email .' tidak jadi mendaftar'
				));
			} else {
				echo json_encode(array(
					'status' => 'success',
					'message' => 'Email '. $email .' gagal dihapus'
				));
			}
			
		}
	}

	public function checkOtpCodeByEmail(){
		if ($_SERVER['REQUEST_METHOD'] == 'POST') {
			$email = $this->input->post('email');
			$code = $this->input->post('code');
			$resultOtp = $this->AdminQsModel->checkOtpCodeByEmail($email,$code);

			if ($resultOtp != null) {
				$data['code_otp'] = 0;
				$this->AdminQsModel->updateVerificationEmail($email,$data);
				$this->session->set_userdata('id_admin', $resultOtp[0]['id_admin']);
				$this->session->set_userdata('username_admin', $resultOtp[0]['username']);

				echo json_encode(array(
					'status' => 'success',
					'message' => 'Email '. $email .' sudah Terverifikasi'
				));
			} else {
				echo json_encode(array(
					'status' => 'error',
					'message' => 'Anda memasukkan kode yang salah'
				));
			}
		}
	}

	public function loginn(){
		if ($_SERVER['REQUEST_METHOD'] == 'POST') {
			$email = $this->input->post('email');
			$password = $this->input->post('password');
			$rL = $this->AdminQsModel->login($email);

			if ($rL->num_rows() == 1) {
				$res = $rL->result_array()[0];
				$passwordDb = $res['password'];
				if (password_verify($password, $passwordDb)) {
					$this->session->set_userdata('id_admin', $res['id_admin']);
        	$this->session->set_userdata('username_admin', $res['username']);

					echo json_encode(array(
						'statusLogin' => true,
						'message' => 'Login berhasil'
					));
				}else{
					echo json_encode(array(
						'statusLogin' => false,
						'message' => 'Password salah'
					));
				}
			} else {
				echo json_encode(array(
					'statusLogin' => false,
					'message' => 'Ups.. email belum terdaftar'
				));
			}
		}
	}

	public function logout(){
		if ($_SERVER['REQUEST_METHOD'] == 'POST') {
			$this->AdminQsModel->logout();
			echo json_encode(array(
				'statusLogout' => true
			));
		}
	}

	public function gettransaksiberlangsung(){
		$r = $this->AdminQsModel->getTransaksiBerlangsung();
		echo json_encode($r);
	}

	public function gettransaksidetail(){
		if ($this->input->get('inv') != '') {
			$resultDetail = array();
			$r = $this->AdminQsModel->getTransaksiByInvoice($this->input->get('inv'));
			$d = $this->AdminQsModel->getTransaksiDetail($this->input->get('inv'));
			$u = $this->AdminQsModel->getUserData($r[0]['id_user']);

			foreach ($d as $key => $valueD) {
				$foto = $this->AdminQsModel->getAllProductImagesByIdBarang($valueD['id_toko'], $valueD['id_barang']);
				$to = $this->AdminQsModel->getTokoData($valueD['id_toko'])[0];
				array_push($resultDetail, array(
					'namaBarang' => $valueD['nama_barang'],
					'idBarang' => $valueD['id_barang'],
					'slug' => $valueD['slug'],
					'namaToko' => $to['nama_toko'],
					'domainToko' => $to['domain_toko'],
					'qty' => $valueD['qty'],
					'harga' => $valueD['harga_t'],
					'ukuran' => $valueD['ukuran'],
					'ongkosKirim' => $valueD['ongkos_kirim'],
					'deskripsi' => $valueD['deskripsi'],
					'estimasi' => $valueD['estimasi'],
					'foto' => $foto
				));
			}


			echo json_encode(array(
				'invoice' => $r[0]['invoice'],
				'transaksiGroup' => $r[0]['transaksi_group'],
				'tanggal' => $r[0]['tanggal'],
				'waktu' => $r[0]['waktu'],
				'username' => $u['username'],
				'namaPenerima' => $r[0]['nama_penerima'],
				'nomerHp' => $r[0]['nomer_hp'],
				'provinsi' => $r[0]['provinsi'],
				'kota' => $r[0]['kota'],
				'detailAlamat' => $r[0]['detail_alamat'],
				'status' => $r[0]['status'],
				'details' => $resultDetail
			));
		}else{
			echo json_encode(array(
				'status' => 'error',
				'message' => 'Bad request. Can not find any query param'
			));
		}
	}
	
	public function gettransaksiselesai(){
		$r = $this->AdminQsModel->getTransaksiSelesai();
		echo json_encode($r);
	}

	public function getsaldoandprofit(){
		$saldo = 0;
		$profit = 0;

		$t = $this->AdminQsModel->getSaldoToko();
		$r = $this->AdminQsModel->getSaldo();
		$p = $this->AdminQsModel->getProfit();
		
		foreach ($r as $key => $v) {
			$saldo = $v['total_bayar'] + $saldo;
		}

		foreach ($p as $key => $val) {
			$profit = $val['profit'] + $profit;
		}

		echo json_encode(array(
			'saldo' => (int) $saldo + (int) $t['SUM(saldo)'],
			'profit' => (int) $profit
		));
	}

	public function getallusers(){
		$result = array();
		$r = $this->AdminQsModel->getAllUsers();

		foreach ($r as $key => $v) {
			$t = $this->AdminQsModel->getTokoDataByIdUser($v['id_user']);

			array_push($result, array(
				'username' => $v['username'],
				'toko' => empty($t) ? 'Tidak punya' : $t[0]['nama_toko'],
				'email' => $v['email'],
				'noHp' => $v['nomer_hp'],
				'statusEmail' => $v['status_email'],
				'status' => $v['status'],
			));
		}
		echo json_encode($result);
	}

	public function gettransaksiselesaibypenerima(){
		if ($this->input->get('nama') == '') {
			$r = $this->AdminQsModel->getTransaksiSelesaiByName('');
		} else {
			$r = $this->AdminQsModel->getTransaksiSelesaiByName($this->input->get('nama'));
		}
		echo json_encode($r);
	}
}
