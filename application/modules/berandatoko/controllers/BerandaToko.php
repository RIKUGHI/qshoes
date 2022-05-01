<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class BerandaToko extends CI_Controller {

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
		$this->load->model('BerandaTokoModel');
		}
		

	public function index(){
		$data['title'] = 'Situs Jual Beli Sepatu | QShop';
		// jika sudah login
		if ($this->session->userdata('username') != '') {
			$data['id_user'] = $this->session->userdata('id_user');
			$data['username'] = $this->session->userdata('username');
	
			$resU = $this->BerandaTokoModel->getUserData($data['id_user']);
			$resT = $this->BerandaTokoModel->getTokoData($data['id_user']);
			$data['gambar_user'] = $resU['gambar_user'] != '' ? $resU['gambar_user'] : '';
			$data['nama_toko'] = $resT->num_rows() == 1 ? $resT->result_array()[0]['nama_toko'] : '';
			$data['domain_toko'] = $resT->num_rows() == 1 ? $resT->result_array()[0]['domain_toko'] : '';
			$data['gambar_toko'] = $resT->num_rows() == 1 ? $resT->result_array()[0]['gambar_toko'] : '';

			$no = 0;
			$newOrder = $this->BerandaTokoModel->getNewOrder($this->session->userdata('id_toko'));
			$tUnread = 0;
			$unread = $this->BerandaTokoModel->getUnreadMsg($this->session->userdata('id_toko'));

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

			$myOrder = $this->BerandaTokoModel->getMyOrder($this->session->userdata('id_user'));
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

		$this->load->view('user toko online/header' ,$data);
		$this->load->view('BerandaTokoView');
		$this->load->view('user toko online/footer_rules');
		$this->load->view('user toko online/footer');
	}

}
