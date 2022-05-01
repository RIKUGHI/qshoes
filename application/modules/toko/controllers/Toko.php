<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Toko extends CI_Controller {

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
		$this->load->model('TokoModel');
		}
		

	public function index(){
		$data['title'] = 'Mitra Kami';

		if ($this->session->userdata('username') != '') {
			$data['id_user'] = $this->session->userdata('id_user');
			$data['username'] = $this->session->userdata('username');

			$resU = $this->TokoModel->getUserData($data['id_user']);
			$resT = $this->TokoModel->getTokoData($data['id_user']);
			$data['gambar_user'] = $resU['gambar_user'] != '' ? $resU['gambar_user'] : '';
			$data['nama_toko'] = $resT->num_rows() == 1 ? $resT->result_array()[0]['nama_toko'] : '';
			$data['domain_toko'] = $resT->num_rows() == 1 ? $resT->result_array()[0]['domain_toko'] : '';
			$data['gambar_toko'] = $resT->num_rows() == 1 ? $resT->result_array()[0]['gambar_toko'] : '';

			$no = 0;
			$newOrder = $this->TokoModel->getNewOrder($this->session->userdata('id_toko'));
			$tUnread = 0;
			$unread = $this->TokoModel->getUnreadMsg($this->session->userdata('id_toko'));

			foreach ($unread as $key => $value) {
				if ($value['read'] == '1') {
					if ($value['id_receiver'] == $this->session->userdata('id_toko')) {
						$tUnread++;
					}
				}
			}
			
			if ($newOrder != null) {
				foreach ($newOrder as $key => $value) {
					$no++;
				}
		
				$data['total_order'] = $no + $tUnread;
			} else {
				$data['total_order'] = 0 + $tUnread;
			}

			$myTotalOrder = 0;
			$menungguKonfirmasi = 0;
			$diProses = 0;
			$diKirim = 0;
			$tibaDiTujuan = 0;

			$data['my_total_order'] = $myTotalOrder;
			$data['menunggu_konfirmasi'] = $menungguKonfirmasi;
			$data['diproses'] = $diProses;
			$data['dikirim'] = $diKirim;
			$data['tiba_di_tujuan'] = $tibaDiTujuan;

			$myOrder = $this->TokoModel->getMyOrder($this->session->userdata('id_user'));
			foreach ($myOrder as $key => $value) {
				$myTotalOrder++;
				$data['my_total_order'] = $myTotalOrder;

				if ($value['status'] == "1") {
					$menungguKonfirmasi++;
					$data['menunggu_konfirmasi'] = $menungguKonfirmasi;
				}

				if ($value['status'] == "2") {
					$diProses++;
					$data['diproses'] = $diProses;
				}

				if ($value['status'] == "3") {
					$diKirim++;
					$data['dikirim'] = $diKirim;
				}

				if ($value['status'] == "4") {
					$tibaDiTujuan++;
					$data['tiba_di_tujuan'] = $tibaDiTujuan;
				}
			}
		}

		$this->load->view('user toko online/header', $data);
		$this->load->view('user toko online/header_user');
		$this->load->view('TokoView');
		$this->load->view('user toko online/footer');
	}

	public function daftar(){
		$data['title'] = 'Daftar Tokomu';
		if ($this->session->userdata('id_toko') != '') {
			redirect(base_url('seller'));
		}

		if ($this->session->userdata('username') != '') {
			$data['id_user'] = $this->session->userdata('id_user');
			$data['username'] = $this->session->userdata('username');

			$resU = $this->TokoModel->getUserData($data['id_user']);
			$resT = $this->TokoModel->getTokoData($data['id_user']);
			$data['nomer_hp'] = $resU['nomer_hp'] != 0 ? $resU['nomer_hp'] : '';
			$data['gambar_user'] = $resU['gambar_user'] != null ? $resU['gambar_user'] : '';
			$data['nama_toko'] = $resT->num_rows() == 1 ? $resT->result_array()[0]['nama_toko'] : '';
			$data['domain_toko'] = $resT->num_rows() == 1 ? $resT->result_array()[0]['domain_toko'] : '';
			$data['gambar_toko'] = $resT->num_rows() == 1 ? $resT->result_array()[0]['gambar_toko'] : '';

			$no = 0;
			$newOrder = $this->TokoModel->getNewOrder($this->session->userdata('id_toko'));
			
			if ($newOrder != null) {
				foreach ($newOrder as $key => $value) {
					$no++;
				}
		
				$data['total_order'] = $no;
			} else {
				$data['total_order'] = 0;
			}

			$myTotalOrder = 0;
			$menungguKonfirmasi = 0;
			$diProses = 0;
			$diKirim = 0;
			$tibaDiTujuan = 0;

			$data['my_total_order'] = $myTotalOrder;
			$data['menunggu_konfirmasi'] = $menungguKonfirmasi;
			$data['diproses'] = $diProses;
			$data['dikirim'] = $diKirim;
			$data['tiba_di_tujuan'] = $tibaDiTujuan;

			$myOrder = $this->TokoModel->getMyOrder($this->session->userdata('id_user'));
			foreach ($myOrder as $key => $value) {
				$myTotalOrder++;
				$data['my_total_order'] = $myTotalOrder;

				if ($value['status'] == "1") {
					$menungguKonfirmasi++;
					$data['menunggu_konfirmasi'] = $menungguKonfirmasi;
				}

				if ($value['status'] == "2") {
					$diProses++;
					$data['diproses'] = $diProses;
				}

				if ($value['status'] == "3") {
					$diKirim++;
					$data['dikirim'] = $diKirim;
				}

				if ($value['status'] == "4") {
					$tibaDiTujuan++;
					$data['tiba_di_tujuan'] = $tibaDiTujuan;
				}
			}
		}else{
			redirect(base_url());
		}

		$this->load->view('user toko online/header', $data);
		$this->load->view('user toko online/header_user');
		$this->load->view('TokoRegisterView');
		$this->load->view('user toko online/footer');
	}

	public function dashboard(){
		$namaToko = $this->uri->segment(2);
		$data['title'] = $namaToko;

		if ($this->session->userdata('username') != '') {
			$data['id_user'] = $this->session->userdata('id_user');
			$data['username'] = $this->session->userdata('username');

			$resU = $this->TokoModel->getUserData($data['id_user']);
			$resT = $this->TokoModel->getTokoData($data['id_user']);
			$data['gambar_user'] = $resU['gambar_user'] != '' ? $resU['gambar_user'] : '';
			$data['nama_toko'] = $resT->num_rows() == 1 ? $resT->result_array()[0]['nama_toko'] : '';
			$data['domain_toko'] = $resT->num_rows() == 1 ? $resT->result_array()[0]['domain_toko'] : '';
			$data['gambar_toko'] = $resT->num_rows() == 1 ? $resT->result_array()[0]['gambar_toko'] : '';

			$no = 0;
			$newOrder = $this->TokoModel->getNewOrder($this->session->userdata('id_toko'));
			$tUnread = 0;
			$unread = $this->TokoModel->getUnreadMsg($this->session->userdata('id_toko'));

			foreach ($unread as $key => $value) {
				if ($value['read'] == '1') {
					if ($value['id_receiver'] == $this->session->userdata('id_toko')) {
						$tUnread++;
					}
				}
			}
			
			if ($newOrder != null) {
				foreach ($newOrder as $key => $value) {
					$no++;
				}
		
				$data['total_order'] = $no + $tUnread;
			} else {
				$data['total_order'] = 0 + $tUnread;
			}

			$myTotalOrder = 0;
			$menungguKonfirmasi = 0;
			$diProses = 0;
			$diKirim = 0;
			$tibaDiTujuan = 0;

			$data['my_total_order'] = $myTotalOrder;
			$data['menunggu_konfirmasi'] = $menungguKonfirmasi;
			$data['diproses'] = $diProses;
			$data['dikirim'] = $diKirim;
			$data['tiba_di_tujuan'] = $tibaDiTujuan;

			$myOrder = $this->TokoModel->getMyOrder($this->session->userdata('id_user'));
			foreach ($myOrder as $key => $value) {
				$myTotalOrder++;
				$data['my_total_order'] = $myTotalOrder;

				if ($value['status'] == "1") {
					$menungguKonfirmasi++;
					$data['menunggu_konfirmasi'] = $menungguKonfirmasi;
				}

				if ($value['status'] == "2") {
					$diProses++;
					$data['diproses'] = $diProses;
				}

				if ($value['status'] == "3") {
					$diKirim++;
					$data['dikirim'] = $diKirim;
				}

				if ($value['status'] == "4") {
					$tibaDiTujuan++;
					$data['tiba_di_tujuan'] = $tibaDiTujuan;
				}
			}
		}

		$this->load->view('user toko online/header', $data);
		$this->load->view('user toko online/header_user');
		$this->load->view('TokoDashboardView');
		$this->load->view('user toko online/footer');
	}

	public function produk(){
		$namaToko = $this->uri->segment(2);
		$namaProduk = $this->uri->segment(3);
		$data['title'] = $namaToko.' | '.$namaProduk;

		if ($this->session->userdata('username') != '') {
			$data['id_user'] = $this->session->userdata('id_user');
			$data['username'] = $this->session->userdata('username');

			$resU = $this->TokoModel->getUserData($data['id_user']);
			$resT = $this->TokoModel->getTokoData($data['id_user']);
			$data['gambar_user'] = $resU['gambar_user'] != '' ? $resU['gambar_user'] : '';
			$data['nama_toko'] = $resT->num_rows() == 1 ? $resT->result_array()[0]['nama_toko'] : '';
			$data['domain_toko'] = $resT->num_rows() == 1 ? $resT->result_array()[0]['domain_toko'] : '';
			$data['gambar_toko'] = $resT->num_rows() == 1 ? $resT->result_array()[0]['gambar_toko'] : '';

			$no = 0;
			$newOrder = $this->TokoModel->getNewOrder($this->session->userdata('id_toko'));
			$tUnread = 0;
			$unread = $this->TokoModel->getUnreadMsg($this->session->userdata('id_toko'));

			foreach ($unread as $key => $value) {
				if ($value['read'] == '1') {
					if ($value['id_receiver'] == $this->session->userdata('id_toko')) {
						$tUnread++;
					}
				}
			}
			
			if ($newOrder != null) {
				foreach ($newOrder as $key => $value) {
					$no++;
				}
		
				$data['total_order'] = $no + $tUnread;
			} else {
				$data['total_order'] = 0 + $tUnread;
			}

			$myTotalOrder = 0;
			$menungguKonfirmasi = 0;
			$diProses = 0;
			$diKirim = 0;
			$tibaDiTujuan = 0;

			$data['my_total_order'] = $myTotalOrder;
			$data['menunggu_konfirmasi'] = $menungguKonfirmasi;
			$data['diproses'] = $diProses;
			$data['dikirim'] = $diKirim;
			$data['tiba_di_tujuan'] = $tibaDiTujuan;

			$myOrder = $this->TokoModel->getMyOrder($this->session->userdata('id_user'));
			foreach ($myOrder as $key => $value) {
				$myTotalOrder++;
				$data['my_total_order'] = $myTotalOrder;

				if ($value['status'] == "1") {
					$menungguKonfirmasi++;
					$data['menunggu_konfirmasi'] = $menungguKonfirmasi;
				}

				if ($value['status'] == "2") {
					$diProses++;
					$data['diproses'] = $diProses;
				}

				if ($value['status'] == "3") {
					$diKirim++;
					$data['dikirim'] = $diKirim;
				}

				if ($value['status'] == "4") {
					$tibaDiTujuan++;
					$data['tiba_di_tujuan'] = $tibaDiTujuan;
				}
			}
		}

		$this->load->view('user toko online/header', $data);
		$this->load->view('user toko online/header_user');
		$this->load->view('ProductDetailView');
		$this->load->view('user toko online/footer');
	}

	public function redirect(){
		$namaToko = $this->uri->segment(2);
		redirect(base_url('toko/'.$namaToko));
	}

	public function getinfotokobyname(){
		if ($_SERVER['REQUEST_METHOD'] == 'POST') {
			if ($this->TokoModel->getInfoTokoByName($this->input->post('nama_toko')) != null) {
				echo json_encode(array(
					'status' => 'error',
					'message' => 'Maaf, nama toko tersebut telah digunakan'
				));
			} else {	
				echo json_encode(array(
					'status' => 'success',
					'message' => 'Pastikan nama toko yang diisi sudah benar'
				));
			}
		}
	}

	public function getinfotokobydomain(){
		if ($_SERVER['REQUEST_METHOD'] == 'POST') {
			if ($this->TokoModel->getInfoTokoByDomain($this->input->post('domain_toko')) != null) {
				echo json_encode(array(
					'status' => 'error',
					'message' => 'Maaf, domain sudah terdaftar'
				));
			} else {	
				echo json_encode(array(
					'status' => 'success',
					'message' => 'Pastikan nama domain sudah benar'
				));
			}
		}
	}

	public function registertoko(){
		if ($this->session->userdata('id_toko') == null) {
			
		}
		date_default_timezone_set("Asia/Jakarta");
		$resU = $this->TokoModel->getUserData($this->session->userdata('id_user'));

		$dataUser['nomer_hp'] = $this->input->post('nomer_hp');
		$data['id_user'] = $this->session->userdata('id_user');
		$data['nama_toko'] = $this->input->post('nama_toko');
		$data['domain_toko'] = $this->input->post('domain_toko');
		$data['provinsi_toko'] = $this->input->post('provinsi_toko');
		$data['kota_toko'] = $this->input->post('kota_toko');
		$data['id_kota'] = $this->input->post('id_kota');
		$data['tgl_dibuat'] = date('Y-m-d H:i:s');
		$data['saldo'] = 0;

		if ($resU['nomer_hp'] != 0) {
			if ($this->TokoModel->createToko($data)) {
				$resT = $this->TokoModel->getTokoData($this->session->userdata('id_user'));
				$this->session->set_userdata('id_toko', $resT->result_array()[0]['id_toko']);
				echo json_encode(array(
					'status' => 'success',
					'message' => 'Toko berhasil dibuat'
				));
			} else {
				echo json_encode(array(
					'status' => 'error',
					'message' => 'Toko gagal dibuat'
				));
			}
		} else {
			if ($this->TokoModel->createToko($data)) {
				$this->TokoModel->updateDataUser($this->session->userdata('id_user'),$dataUser);
				$resT = $this->TokoModel->getTokoData($this->session->userdata('id_user'));
				$this->session->set_userdata('id_toko', $resT->result_array()[0]['id_toko']);
				$this->session->set_userdata('nama_toko', $resT->result_array()[0]['nama_toko']);
				echo json_encode(array(
					'status' => 'success',
					'message' => 'Toko berhasil dibuat'
				));
			} else {
				echo json_encode(array(
					'status' => 'error',
					'message' => 'Toko gagal dibuat'
				));
			}
		}
	}

	public function keranjang(){
		if ($_SERVER['REQUEST_METHOD'] == 'POST') {
			$data['id_user'] = $this->session->userdata('id_user');
			$data['id_barang'] = $this->input->post('id_barang');
			$data['id_ukuran'] = $this->input->post('id_ukuran');
			$data['qty'] = $this->input->post('qty');

			if ($data['id_user'] == '') {
				echo json_encode(array(
					'login' => false,
				));
			} else {
				$x = $this->TokoModel->getBarangByIdBarang($data['id_barang'])[0];
				if ($x['id_toko'] == $this->session->userdata('id_toko')) {
					echo json_encode(array(
						'login' => true,
						'status' => 'error',
						'message' => 'Upss... sepertinya anda memasukan produk anda sendiri'
					));
				} else {
					$infoKeranjang = $this->TokoModel->getInfoKeranjangById($data['id_user'], $data['id_barang'], $data['id_ukuran']);
					$infoUkuran = $this->TokoModel->getInfoUkuran($data['id_ukuran']);
					if ($infoKeranjang != null) {
						if ($data['qty'] + $infoKeranjang[0]['qty'] <= $infoUkuran[0]['stok']) {
							$data['qty'] = $data['qty'] + $infoKeranjang[0]['qty'];
		
							if ($this->TokoModel->updateKeranjang($data, $data['id_user'], $data['id_barang'], $data['id_ukuran'])) {
								echo json_encode(array(
									'login' => true,
									'status' => 'success',
									'message' => 'Produk berhasil ditambahkan'
								));
							} else {
								echo json_encode(array(
									'login' => true,
									'status' => 'error',
									'message' => 'Produk gagal ditambahkan'
								));
							}
						} else {
							echo json_encode(array(
								'login' => true,
								'status' => 'error',
								'message' => 'Stock barang ini sisa ' .$infoUkuran[0]['stok']. ' dan kamu sudah punya ' .$infoKeranjang[0]['qty']. ' di keranjangmu'
							));
						}
					} else {
						if ($this->TokoModel->createKeranjang($data)) {
							echo json_encode(array(
								'login' => true,
								'status' => 'success',
								'message' => 'Produk berhasil ditambahkan'
							));
						} else {
							echo json_encode(array(
								'login' => true,
								'status' => 'error',
								'message' => 'Produk gagal ditambahkan'
							));
						}
					}
				}
			}
		}
	}

}
