<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Keranjang extends CI_Controller {

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
		$this->load->model('KeranjangModel');
			if ($this->session->userdata('username') == '') {
				redirect(base_url());
			}
		}
		

	public function index(){
		$data['title'] = 'QShoes | Keranjang';

		if ($this->session->userdata('username') != '') {
			$data['id_user'] = $this->session->userdata('id_user');
			$data['username'] = $this->session->userdata('username');

			$resU = $this->KeranjangModel->getUserData($data['id_user']);
			$resT = $this->KeranjangModel->getTokoData($data['id_user']);
			$data['gambar_user'] = $resU['gambar_user'] != '' ? $resU['gambar_user'] : '';
			$data['nama_toko'] = $resT->num_rows() == 1 ? $resT->result_array()[0]['nama_toko'] : '';
			$data['domain_toko'] = $resT->num_rows() == 1 ? $resT->result_array()[0]['domain_toko'] : '';
			$data['gambar_toko'] = $resT->num_rows() == 1 ? $resT->result_array()[0]['gambar_toko'] : '';

			$no = 0;
			$newOrder = $this->KeranjangModel->getNewOrder($this->session->userdata('id_toko'));
			$tUnread = 0;
			$unread = $this->KeranjangModel->getUnreadMsg($this->session->userdata('id_toko'));

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

			$myOrder = $this->KeranjangModel->getMyOrder($this->session->userdata('id_user'));
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
		$this->load->view('KeranjangView');
		$this->load->view('user toko online/footer');
	}

	public function getkeranjanguser(){
		if ($this->session->userdata('username') != '') {
			if ($_SERVER['REQUEST_METHOD'] == 'GET') {
				$resultResponse = array();
				$resultProducts = array();
				$t = 0;
	
				$r = $this->KeranjangModel->getKeranjangUser($this->session->userdata('id_user'));
				foreach ($r as $key => $value) {
					$p = $this->KeranjangModel->getProdukByIdBarang($value['id_barang'])[0];
					$tk = $this->KeranjangModel->getTokoByIdToko($p['id_toko'])[0];
					$u = $this->KeranjangModel->getUkuranByIdukuran($value['id_ukuran'])[0];
					$f = $this->KeranjangModel->getFotoByIdBarang($value['id_barang'])[0];
					array_push($resultProducts, array(
						'namaToko' => $tk['nama_toko'],
						'domainToko' => $tk['domain_toko'],
						'namaProduk' => $p['nama_barang'],
						'slug' => $p['slug'],
						'idUkuran' => $value['id_ukuran'],
						'ukuranProduk' => $u['ukuran'],
						'hargaProduk' => $u['harga'],
						'stokProduk' => $u['stok'],
						'fotoProduk' => $f['nama_foto'],
						'qty' => $value['qty']
					));
					$t++;
				}
				array_push($resultResponse, array(
					'status' => 'success',
					'totalCart' => $t,
					'produk' => $resultProducts
				));
	
				if ($r != null) {
					echo json_encode($resultResponse[0]);
				} else {
					echo json_encode(array(
						'status' => 'error',
						'message' => 'Keranjang kosong'
					));
				}
			}
		}
	}

	public function updateprodukfromkeranjang(){
		if ($_SERVER['REQUEST_METHOD'] == 'POST') {
			$data['qty'] = $this->input->post('qty');

			if ($this->KeranjangModel->updateProductFromKeranjang($data, $this->session->userdata('id_user'), $this->input->post('id_ukuran'))) {
				echo json_encode(array(
					'status' => 'success',
					'message' => '1 barang telah diupdate'
				));
			} else {
				echo json_encode(array(
					'status' => 'error',
					'message' => 'Barang gagal diupdate'
				));
			}
		}
	}

	public function deleteprodukfromkeranjang(){
		if ($_SERVER['REQUEST_METHOD'] == 'POST') {
			if ($this->KeranjangModel->deleteProductFromKeranjang($this->session->userdata('id_user'), $this->input->post('id_ukuran'))) {
				echo json_encode(array(
					'status' => 'success',
					'message' => '1 barang telah dihapus'
				));
			} else {
				echo json_encode(array(
					'status' => 'error',
					'message' => 'Barang gagal dihapus'
				));
			}
		}
	}

}
