<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Checkout extends CI_Controller {

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
		$this->load->model('CheckoutModel');
		if ($this->session->userdata('username') == '') {
			redirect(base_url());
		}
	}
		

	public function index(){
		$data['title'] = 'Checkout | QShoes';

		if ($this->session->userdata('username') != '') {
			$data['id_user'] = $this->session->userdata('id_user');
			$data['username'] = $this->session->userdata('username');

			$resU = $this->CheckoutModel->getUserData($data['id_user']);
			$resT = $this->CheckoutModel->getTokoData($data['id_user']);
			$data['gambar_user'] = $resU['gambar_user'] != '' ? $resU['gambar_user'] : '';
			$data['nama_toko'] = $resT->num_rows() == 1 ? $resT->result_array()[0]['nama_toko'] : '';
			$data['domain_toko'] = $resT->num_rows() == 1 ? $resT->result_array()[0]['domain_toko'] : '';
			$data['gambar_toko'] = $resT->num_rows() == 1 ? $resT->result_array()[0]['gambar_toko'] : '';

			$no = 0;
			$newOrder = $this->CheckoutModel->getNewOrder($this->session->userdata('id_toko'));
			$tUnread = 0;
			$unread = $this->CheckoutModel->getUnreadMsg($this->session->userdata('id_toko'));

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

			$myOrder = $this->CheckoutModel->getMyOrder($this->session->userdata('id_user'));
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
		$this->load->view('CheckoutView');
		$this->load->view('user toko online/footer');
	}

	public function getkeranjanguser(){
		if ($_SERVER['REQUEST_METHOD'] == 'GET') {
			$t = 0;
			$resultResponse = array();
			$resultProducts = array();

			$r = $this->CheckoutModel->getKeranjangUser($this->session->userdata('id_user'));
			foreach ($r as $key => $value) {
				$p = $this->CheckoutModel->getProdukByIdBarang($value['id_barang'])[0];
				$tk = $this->CheckoutModel->getTokoByIdToko($p['id_toko'])[0];
				$u = $this->CheckoutModel->getUkuranByIdukuran($value['id_ukuran'])[0];
				$f = $this->CheckoutModel->getFotoByIdBarang($value['id_barang'])[0];
				array_push($resultProducts, array(
					'namaToko' => $tk['nama_toko'],
					'domainToko' => $tk['domain_toko'],
					'idToko' => $tk['id_toko'],
					'idKota' => $tk['id_kota'],
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


			echo json_encode(array(
				'user' => array(
					'idUser' => $this->CheckoutModel->getUserData($this->session->userdata('id_user'))['id_user'],
					'username' => $this->CheckoutModel->getUserData($this->session->userdata('id_user'))['username'],
					'nomerHp' => $this->CheckoutModel->getUserData($this->session->userdata('id_user'))['nomer_hp']
				),
				'keranjang' => $resultResponse
			));
		}
	}

	public function getCost(){
		$curl = curl_init();

		curl_setopt_array($curl, array(
			CURLOPT_URL => "https://api.rajaongkir.com/starter/cost",
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => "",
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 30,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => "POST",
			CURLOPT_POSTFIELDS => "origin=".$this->input->post('origin')."&destination=".$this->input->post('destination')."&weight=1000&courier=jne",
			CURLOPT_HTTPHEADER => array(
				"content-type: application/x-www-form-urlencoded",
				"key: 276589ca70c66fd10d6d11715bce70ca"
			),
		));

		$response = curl_exec($curl);
		$err = curl_error($curl);

		curl_close($curl);

		if ($err) {
			echo "cURL Error #:" . $err;
		} else {
			echo $response;
		}
	}

	public function createOrder(){
		date_default_timezone_set("Asia/Jakarta");
		$status = true;
		$i = 0;
		$data['transaksi_group'] = $this->CheckoutModel->getGroupTransaction();
		$data['tanggal'] = date('Y-m-d');
		$data['waktu'] = date('H:i:s');

		$saldo['transaksi_group'] = $data['transaksi_group'];
		$saldo['tanggal'] = $data['tanggal'];
		$saldo['waktu'] = $data['waktu'];
		$saldo['total_bayar'] = $this->input->post('total_bayar');
		$saldo['profit'] = 0;

		$this->CheckoutModel->createSaldo($saldo);
		if ($_SERVER['REQUEST_METHOD'] == 'POST') {
			$r = $this->CheckoutModel->getCompleteKeranjangUser($this->session->userdata('id_user'));
			foreach ($r as $key => $value) {
				$data['invoice'] = 'INV'.'/'.date('Ymd').'/'.$value['id_toko'].'/'.$this->CheckoutModel->getInvoice();
				$data['nama_penerima'] = $this->input->post('nama_penerima');
				$data['nomer_hp'] = $this->input->post('nomer_hp');
				$data['provinsi'] = $this->input->post('provinsi');
				$data['kota'] = $this->input->post('kota');
				$data['detail_alamat'] = $this->input->post('detail_alamat');
				$data['bank'] = $this->input->post('bank');
				$data['biaya_administrasi'] = $this->input->post('biaya_administrasi');
				$data['status'] = 1;

				if ($this->CheckoutModel->createOrder($data)) {

					$rD = $this->CheckoutModel->getDetailKeranjangUser($this->session->userdata('id_user'),$value['id_toko']);
					foreach ($rD as $key => $valueD) {
						$i++;
						$tk = $this->CheckoutModel->getTokoByIdToko($value['id_toko'])[0];
						$detail['invoice'] = $data['invoice'];
						$detail['id_user'] = $this->session->userdata('id_user');
						$detail['id_toko'] = $tk['id_toko'];
						$detail['id_barang'] = $valueD['id_barang'];
						$detail['id_ukuran'] = $valueD['id_ukuran'];
						$detail['qty'] = $valueD['qty'];
						$detail['harga_t'] = $valueD['harga'];
						$detail['ongkos_kirim'] = $this->input->post('ongkos_kirim')[$i - 1];
						$detail['deskripsi'] = $this->input->post('deskripsi')[$i - 1];
						$detail['estimasi'] = $this->input->post('estimasi')[$i - 1];
			
						$this->CheckoutModel->createDetailOrder($detail);
					}
	
					
					$status = true;
				} else {
					$status = false;
				}
			}
			
			if ($status) {
				echo json_encode(array(
					'status' => 'success',
					'message' => 'Order berhasil'
				));
			} else {
				echo json_encode(array(
					'status' => 'error',
					'message' => 'Order gagal'
				));
			}
			$this->CheckoutModel->deleteKeranjangUser($this->session->userdata('id_user'));
		}
	}

}
