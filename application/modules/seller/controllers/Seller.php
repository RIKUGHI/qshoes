<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require('./excel/vendor/autoload.php');
use PhpOffice\PhpSpreadsheet\Helper\Sample;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;


class Seller extends CI_Controller {

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
		$this->load->model('SellerModel');
			if ($this->session->userdata('id_toko') == null) {
				redirect(base_url('toko/daftar'));
			}
		}
		

	public function index(){
		if ($this->session->userdata('id_toko') != null) {
			$data['username'] = $this->session->userdata('username');
			$data['nama_toko'] = $this->session->userdata('nama_toko');

			$resU = $this->SellerModel->getUserData($this->session->userdata('id_user'));
			$r = $this->SellerModel->getTokoData($this->session->userdata('id_toko'));
			$data['gambar_user'] = $resU['gambar_user'] != '' ? $resU['gambar_user'] : '';
			$data['nama_toko'] = $r[0]['nama_toko'];
			$data['domain_toko'] = $r[0]['domain_toko'];
			$data['gambar_toko'] = $r[0]['gambar_toko'] != null ? $r[0]['gambar_toko'] : '';
		}

		$this->load->view('admin toko online/header', $data);
		$this->load->view('admin toko online/header_seller');
		$this->load->view('admin toko online/sidebar');
		$this->load->view('HomeView');
		$this->load->view('admin toko online/footer');
	}

	public function chat(){
		if ($this->session->userdata('id_toko') != null) {
			$data['username'] = $this->session->userdata('username');

			$resU = $this->SellerModel->getUserData($this->session->userdata('id_user'));
			$r = $this->SellerModel->getTokoData($this->session->userdata('id_toko'));
			$data['gambar_user'] = $resU['gambar_user'] != '' ? $resU['gambar_user'] : '';
			$data['nama_toko'] = $r[0]['nama_toko'];
			$data['domain_toko'] = $r[0]['domain_toko'];
			$data['gambar_toko'] = $r[0]['gambar_toko'] != null ? $r[0]['gambar_toko'] : '';
		}

		$this->load->view('admin toko online/header', $data);
		$this->load->view('admin toko online/header_seller');
		$this->load->view('admin toko online/sidebar');
		$this->load->view('ChatView');
		$this->load->view('admin toko online/footer');
	}

	public function tambahproduk(){
		if ($this->session->userdata('id_toko') != null) {
			$data['username'] = $this->session->userdata('username');

			$resU = $this->SellerModel->getUserData($this->session->userdata('id_user'));
			$data['gambar_user'] = $resU['gambar_user'] != '' ? $resU['gambar_user'] : '';
			$r = $this->SellerModel->getTokoData($this->session->userdata('id_toko'));
			$data['nama_toko'] = $r[0]['nama_toko'];
			$data['domain_toko'] = $r[0]['domain_toko'];
			$data['gambar_toko'] = $r[0]['gambar_toko'] != null ? $r[0]['gambar_toko'] : '';
		}

		$this->load->view('admin toko online/header', $data);
		$this->load->view('admin toko online/header_seller');
		$this->load->view('admin toko online/sidebar');
		$this->load->view('TambahProdukView');
		$this->load->view('admin toko online/footer');
	}

	public function transaksi(){
		if ($this->session->userdata('id_toko') != null) {
			$data['username'] = $this->session->userdata('username');

			$resU = $this->SellerModel->getUserData($this->session->userdata('id_user'));
			$data['gambar_user'] = $resU['gambar_user'] != '' ? $resU['gambar_user'] : '';
			$r = $this->SellerModel->getTokoData($this->session->userdata('id_toko'));
			$data['nama_toko'] = $r[0]['nama_toko'];
			$data['domain_toko'] = $r[0]['domain_toko'];
			$data['gambar_toko'] = $r[0]['gambar_toko'] != null ? $r[0]['gambar_toko'] : '';
		}

		$this->load->view('admin toko online/header', $data);
		$this->load->view('admin toko online/header_seller');
		$this->load->view('admin toko online/sidebar');
		$this->load->view('TransaksiView');
		$this->load->view('admin toko online/footer');
	}

	public function detailtransaksi(){
		if ($this->session->userdata('id_toko') != null) {
			$data['username'] = $this->session->userdata('username');

			$resU = $this->SellerModel->getUserData($this->session->userdata('id_user'));
			$data['gambar_user'] = $resU['gambar_user'] != '' ? $resU['gambar_user'] : '';
			$r = $this->SellerModel->getTokoData($this->session->userdata('id_toko'));
			$data['nama_toko'] = $r[0]['nama_toko'];
			$data['domain_toko'] = $r[0]['domain_toko'];
			$data['gambar_toko'] = $r[0]['gambar_toko'] != null ? $r[0]['gambar_toko'] : '';
		}

		$this->load->view('admin toko online/header', $data);
		$this->load->view('admin toko online/header_seller');
		$this->load->view('admin toko online/sidebar');
		$this->load->view('DetailTransaksiView');
		$this->load->view('admin toko online/footer');
	}

	public function ubahprofil(){
		if ($this->session->userdata('id_toko') != null) {
			$data['username'] = $this->session->userdata('username');

			$resU = $this->SellerModel->getUserData($this->session->userdata('id_user'));
			$data['gambar_user'] = $resU['gambar_user'] != '' ? $resU['gambar_user'] : '';
			$r = $this->SellerModel->getTokoData($this->session->userdata('id_toko'));
			$data['nama_toko'] = $r[0]['nama_toko'];
			$data['domain_toko'] = $r[0]['domain_toko'];
			$data['gambar_toko'] = $r[0]['gambar_toko'] != null ? $r[0]['gambar_toko'] : '';
		}

		$this->load->view('admin toko online/header', $data);
		$this->load->view('admin toko online/header_seller');
		$this->load->view('admin toko online/sidebar');
		$this->load->view('UbahProfilView');
		$this->load->view('admin toko online/footer');
	}

	public function statusorder(){
		if ($this->session->userdata('id_toko') != null) {
			$data['username'] = $this->session->userdata('username');

			$resU = $this->SellerModel->getUserData($this->session->userdata('id_user'));
			$data['gambar_user'] = $resU['gambar_user'] != '' ? $resU['gambar_user'] : '';
			$r = $this->SellerModel->getTokoData($this->session->userdata('id_toko'));
			$data['nama_toko'] = $r[0]['nama_toko'];
			$data['domain_toko'] = $r[0]['domain_toko'];
			$data['gambar_toko'] = $r[0]['gambar_toko'] != null ? $r[0]['gambar_toko'] : '';
		}

		$this->load->view('admin toko online/header', $data);
		$this->load->view('admin toko online/header_seller');
		$this->load->view('admin toko online/sidebar');
		$this->load->view('StatusOrderView');
		$this->load->view('admin toko online/footer');
	}

	public function createandupload(){
		$status = true;
		$data['id_toko'] = $this->session->userdata('id_toko');
		$data['nama_barang'] = $this->input->post('nama_barang');
		$data['slug'] = url_title(trim($this->input->post('nama_barang')),'-',true);
		$dbProductName = $this->SellerModel->isDuplicateProductName($data['id_toko'],$data['nama_barang']);
		
		if ($dbProductName != null) {
			echo json_encode(array(
				'addedStatus' => 'error',
				'message' => 'Barang dengan nama '.$data['nama_barang'].' sudah tersedia'
			)); 
		} else {
			// input barang
			$data['kondisi_barang'] = $this->input->post('kondisi_barang');
			$data['deskripsi_barang'] = $this->input->post('deskripsi_barang');
			$this->SellerModel->createDataProduk($data);

			// input foto and upload
			foreach ($_FILES['berkas_gambar']['tmp_name'] as $key => $value) {
				$oriFileName = $_FILES['berkas_gambar']['name'][$key];
				$dbFileName = $this->SellerModel->isDuplicateImageName($data['id_toko'], $oriFileName);
				$split = explode('.', $oriFileName);
	
				if ($dbFileName != null) {
					$dataFoto['id_toko'] = $data['id_toko'];
					$dataFoto['id_barang'] = $this->SellerModel->getMaxIdBarang($dataFoto['id_toko']);
					$dataFoto['nama_foto'] = $split[0].'_'.$this->SellerModel->getMaxIdFoto().'.'.$split[1];
					$this->SellerModel->createDataFoto($dataFoto);
	
					$tagetPath = './assets/Project Toko Online/image/products/'.$dataFoto['nama_foto'];
					if (move_uploaded_file($value, $tagetPath)) {
						$status = true;
					} else {
						$status = false;
					}
				} else {
					$dataFoto['id_toko'] = $data['id_toko'];
					$dataFoto['id_barang'] = $this->SellerModel->getMaxIdBarang($dataFoto['id_toko']);
					$dataFoto['nama_foto'] = $split[0].'_'.$this->SellerModel->getMaxIdFoto().'.'.$split[1];
					$this->SellerModel->createDataFoto($dataFoto);
	
					$tagetPath = './assets/Project Toko Online/image/products/'.$dataFoto['nama_foto'];
					if (move_uploaded_file($value, $tagetPath)) {
						$status = true;
					} else {
						$status = false;
					}
				}
			}

			// input ukuran,harga,stok
			foreach ($this->input->post('ukuran') as $key => $value) {
				$data2['id_toko'] = $data['id_toko'];
				$data2['id_barang'] = $this->SellerModel->getMaxIdBarang($data2['id_toko']);
				$data2['ukuran'] = $value;
				$data2['harga'] = $this->input->post('harga')[$key];
				$data2['stok'] = $this->input->post('stok')[$key];
				$this->SellerModel->createDataUkuran($data2);
			}
			
			if ($status) {
				echo json_encode(array(
					'addedStatus' => 'success',
					'message' => 'Tambah barang berhasil'
				)); 
			} else {
				echo json_encode(array(
					'addedStatus' => 'error',
					'message' => 'Tambah barang gagal'
				));
			}
		}
	}

	public function getstock(){
		$r = $this->SellerModel->getStock($this->session->userdata('id_toko'));
		$stock = 0;
		foreach ($r as $key => $value) {
			$stock = $value['stok'] + $stock;
		}
		echo json_encode(array(
			'stock' => $stock
		));
	}

	public function getdikirim(){
		$r = $this->SellerModel->getDikirim($this->session->userdata('id_toko'));
		$dikirim = 0;
		if (empty($r)) {
			$dikirim = 0;
		} else {
			foreach ($r as $key => $value) {
				$dikirim++;
			}
		}
		
		echo json_encode(array(
			'dikirim' => $dikirim
		));
	}

	public function getsaldo(){
		$r = $this->SellerModel->getTokoData($this->session->userdata('id_toko'));
		echo json_encode(array(
			'saldo' => $r[0]['saldo']
		));
	}

	public function getneworder(){
		$resultResponse = array();
		$no = 0;
		$newOrder = $this->SellerModel->getNewOrder($this->session->userdata('id_toko'));
		
		if ($newOrder != null) {
			foreach ($newOrder as $key => $value) {
				$no++;

				array_push($resultResponse, array(
					'invoice' => $value['invoice'],
					'transaksiGroup' => $value['transaksi_group'],
					'tanggal' => $value['tanggal'],
					'waktu' => $value['waktu'],
					'namaPenerima' => $value['nama_penerima'],
					'nomerHp' => $value['nomer_hp'],
					'provinsi' => $value['provinsi'],
					'kota' => $value['kota'],
					'detailAlamat' => $value['detail_alamat'],
					'status' => $value['status']
				));
			}
	
			echo json_encode(array(
				'status' => 'success',
				'message' => 'Ada Pesanan terbaru',
				'totalOrder' => $no,
				'details' => $resultResponse
			));
		} else {
			echo json_encode(array(
				'status' => 'error',
				'message' => 'Tidak ada pesanan terbaru'
			));
		}
		
	}

	public function getneworderdetails(){
		$resultResponse = array();
		$newOrderByInvoice = $this->SellerModel->getNewOrderByInvoice($this->session->userdata('id_toko'), $this->input->get('invoice'));
		if ($newOrderByInvoice != null) {
			$resultDetailOrder = array();
			$newOrderDetails = $this->SellerModel->getNewDetailsOrder($newOrderByInvoice[0]['invoice'], $this->session->userdata('id_toko'));
			foreach ($newOrderDetails as $key => $valueD) {
				$foto = $this->SellerModel->getAllProductImagesByIdBarang($this->session->userdata('id_toko'), $valueD['id_barang']);
				$to = $this->SellerModel->getTokoData($this->session->userdata('id_toko'))[0];
				array_push($resultDetailOrder, array(
					'namaBarang' => $valueD['nama_barang'],
					'idBarang' => $valueD['id_barang'],
					'slug' => $valueD['slug'],
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
			
	
			array_push($resultResponse, array(
				'invoice' => $newOrderByInvoice[0]['invoice'],
				'transaksiGroup' => $newOrderByInvoice[0]['transaksi_group'],
				'tanggal' => $newOrderByInvoice[0]['tanggal'],
				'waktu' => $newOrderByInvoice[0]['waktu'],
				'namaPenerima' => $newOrderByInvoice[0]['nama_penerima'],
				'nomerHp' => $newOrderByInvoice[0]['nomer_hp'],
				'provinsi' => $newOrderByInvoice[0]['provinsi'],
				'kota' => $newOrderByInvoice[0]['kota'],
				'detailAlamat' => $newOrderByInvoice[0]['detail_alamat'],
				'status' => $newOrderByInvoice[0]['status'],
				'details' => $resultDetailOrder
			));

			echo json_encode($resultResponse[0]);
		}else{
			echo json_encode(array(
				'status' => 'error',
				'message' => 'Tidak ada pesanan terbaru'
			));
		}

		
	}

	public function confirmorder(){
		if ($_SERVER['REQUEST_METHOD'] == 'POST') {
			$data['status'] = 2; 
			if ($this->SellerModel->confirmOrder($data, $this->input->post('invoice'))) {
				$r = $this->SellerModel->getNewDetailsOrder($this->input->post('invoice'), $this->session->userdata('id_toko'));
				foreach ($r as $key => $value) {
					$dataU['stok'] = $value['stok'] - $value['qty'];
					$this->SellerModel->updateDataUkuran($this->session->userdata('id_toko'), $value['id_barang'], $value['id_ukuran'], $dataU);
				}
				echo json_encode(array(
					'status' => 'success',
					'message' => 'Berhasil mengkonfirmasi, yuk segera diproses'
				));
			} else {
				echo json_encode(array(
					'status' => 'error',
					'message' => 'Gagal mengkonfirmasi'
				));
			}
			
		}
	}

	public function kirimorder(){
		if ($_SERVER['REQUEST_METHOD'] == 'POST') {
			$data['status'] = 3; 
			if ($this->SellerModel->confirmOrder($data, $this->input->post('invoice'))) {
				echo json_encode(array(
					'status' => 'success',
					'message' => 'Berhasil merubah status dari diproses menjadi dikirim'
				));
			} else {
				echo json_encode(array(
					'status' => 'error',
					'message' => 'Gagal merubah status'
				));
			}
		}
	}

	public function getshoporders(){
		$res = array();
		$r = $this->SellerModel->getShopOrders($this->session->userdata('id_toko'));
		foreach ($r as $key => $value) {
			$n = 0;
			$totalBelanja = 0;
			$d = $this->SellerModel->getShopOrderDetails($value['invoice']);
			foreach ($d as $key => $v) {
				$totalBelanja = $v['qty'] * $v['harga_t'] + $totalBelanja;
				$n++;	
			}
			$f = $this->SellerModel->getAllProductImagesByIdBarang($value['id_toko'],$value['id_barang']);
			array_push($res, array(
				'tanggal' => $value['tanggal'],
				'invoice' => $value['invoice'],
				'transaksiGroup' => $value['transaksi_group'],
				'status' => $value['status'],
				'namaToko' => $value['nama_toko'],
				'namaBarang' => $value['nama_barang'],
				'qty' => $value['qty'],
				'ukuran' => $value['ukuran'],
				'harga' => $value['harga_t'],
				'foto' => $f,
				'totalBelanja' => $totalBelanja,
				'moreProducts' => $n - 1,
				'namaPenerima' => $value['nama_penerima']
			));
		}
		echo json_encode($res);
	}

	public function gettransaksiselesai(){
		if ($this->input->get('inv') == '') {
			$r = $this->SellerModel->getTransaksiSelesai($this->session->userdata('id_toko'),'');
		} else { 
			$r = $this->SellerModel->getTransaksiSelesai($this->session->userdata('id_toko'), $this->input->get('inv'));
		}
		
		$res = array();
		if (empty($r)) {
			echo json_encode(array(
				'status' => 'error',
				'message' => 'Tidak ada transaksi dengan status selesai'
			));
		} else {
			foreach ($r as $key => $value) {
				$jumlahBarang = 0;
				$totalHarga = 0;
				$d = $this->SellerModel->getNewDetailsOrder($value['invoice'], $this->session->userdata('id_toko'));
				foreach ($d as $key => $v) {
					$jumlahBarang = $v['qty'] + $jumlahBarang;
					$totalHarga = $v['qty'] * $v['harga_t'] + $totalHarga;
				}
				array_push($res, array(
					'invoice' => $value['invoice'],
					'transaksiGroup' => $value['transaksi_group'],
					'tanggal' => $value['tanggal'],
					'waktu' => $value['waktu'],
					'jumlahBarang' => $jumlahBarang,
					'totalHarga' => $totalHarga
				));
			}
			echo json_encode(array(
				'status' => 'success',
				'message' => 'Terdapat transaksi dengan status selesai',
				'details' => $res
			));
		}
		
	}

	public function getdetailtransaksiselesai(){
		$res = array();

		if ($this->input->get('inv') == '') {
			$r = $this->SellerModel->getDetailTransaksiSelesai('', $this->session->userdata('id_toko'));
		}else{
			$r = $this->SellerModel->getDetailTransaksiSelesai($this->input->get('inv'), $this->session->userdata('id_toko'));
		}

		if (empty($r)) {
			echo json_encode(array(
				'status' => 'error',
				'message' => 'Tidak ada detail transaksi dengan status selesai'
			));
		} else {
			foreach ($r as $key => $value) {
				array_push($res, array(
					'invoice' => $value['invoice'],
					'transaksiGroup' => $value['transaksi_group'],
					'namaBarang' => $value['nama_barang'],
					'ukuran' => $value['ukuran'],
					'qty' => $value['qty'],
					'harga' => $value['harga_t'],
					'totalHarga' => $value['qty'] * $value['harga_t'],
				));
			}
			echo json_encode(array(
				'status' => 'success',
				'message' => 'Terdapat detail transaksi dengan status selesai',
				'details' => $res
			));
		}
		
	}

	function updateandupload(){
		// update produk
		$idToko = $this->session->userdata('id_toko');
		$idBarang = $this->input->post('id_barang');
		$data['nama_barang'] = $this->input->post('nama_barang');
		$data['slug'] = $this->input->post('slug');
		$data['kondisi_barang'] = $this->input->post('kondisi_barang');
		$data['deskripsi_barang'] = $this->input->post('deskripsi_barang');

		if ($data['slug'] != url_title(trim($this->input->post('nama_barang')),'-',true)) {
			$data['slug'] = url_title(trim($this->input->post('nama_barang')),'-',true) .'-'. $idBarang;
		}

		$this->SellerModel->updateDataProduk($idToko, $idBarang, $data);
		
		// input foto baru dan upload
		if (isset($_FILES['berkas_gambar'])) {
			foreach ($_FILES['berkas_gambar']['tmp_name'] as $key => $value) {
				$oriFileName = $_FILES['berkas_gambar']['name'][$key];
				$split = explode('.', $oriFileName);
	
				$dataFoto['id_toko'] = $idToko;
				$dataFoto['id_barang'] = $idBarang;
				$dataFoto['nama_foto'] = $split[0].'_'.$this->SellerModel->getMaxIdFoto().'.'.$split[1];
				$this->SellerModel->createDataFoto($dataFoto);
	
				$tagetPath = './assets/Project Toko Online/image/products/'.$dataFoto['nama_foto'];
				if (move_uploaded_file($value, $tagetPath)) {
					$status = true;
				} else {
					$status = false;
				}
			}
		}

		// update foto and upload
		if (isset($_FILES['berkas_gambar_id'])){
			foreach ($this->input->post('berkas_id_file') as $key => $value) {
				$oriFileNameUpdate = $_FILES['berkas_gambar_id']['name'][$key];
				$splitU = explode('.', $oriFileNameUpdate);
				$resultProductImageU = $this->SellerModel->getProductImageByIdFoto($idToko,$idBarang,$value);

				
				if(unlink("assets/Project Toko Online/image/products/$resultProductImageU")){
					$updateDataFoto['nama_foto'] = $splitU[0].'_'.$value.'.'.$splitU[1];
					$tmpName = $_FILES['berkas_gambar_id']['tmp_name'][$key];
					$this->SellerModel->updateDataFoto($idToko, $idBarang, $value, $updateDataFoto);

					$newTargetPath = './assets/Project Toko Online/image/products/'.$updateDataFoto['nama_foto'];
					if (move_uploaded_file($tmpName, $newTargetPath)) {
						$status = true;
					} else {
						$status = false;
					}
				}else{
					echo json_encode(array(
						'updatedStatus' => 'error',
						'message' => 'Gambar gagal diupdate'
					)); 
				}
			}
		}

		// input ukuran baru
		if ($this->input->post('ukuran') != null) {
			foreach ($this->input->post('ukuran') as $key => $value) {
				$data2['id_toko'] = $idToko;
				$data2['id_barang'] = $idBarang;
				$data2['ukuran'] = $value;
				$data2['harga'] = $this->input->post('harga')[$key];
				$data2['stok'] = $this->input->post('stok')[$key];
				$this->SellerModel->createDataUkuran($data2);
			}
		}

		// update ukuran
		if ($this->input->post('id_ukuran') != null) {
			foreach ($this->input->post('id_ukuran') as $key => $value) {
				$data2U['ukuran'] = $this->input->post('ukuran_id')[$key];
				$data2U['harga'] = $this->input->post('harga_id')[$key];
				$data2U['stok'] = $this->input->post('stok_id')[$key];
				$this->SellerModel->updateDataUkuran($idToko, $idBarang, $value, $data2U);
			}
		}
		
		echo json_encode(array(
			'updatedStatus' => 'success',
			'message' => 'Update barang berhasil'
		)); 
	}

	function deleteproductbyidbarang(){
		if ($_SERVER['REQUEST_METHOD'] == 'POST') {
			$idToko = $this->session->userdata('id_toko');
			$idBarang =  $this->input->post('idBarang');

			$resultProductImages = $this->SellerModel->getAllProductImagesByIdBarang($idToko,$idBarang);
			foreach ($resultProductImages as $key => $value) {
				$fileName = $value['nama_foto'];
				unlink("assets/Project Toko Online/image/products/$fileName");
			}
	
			if ($this->SellerModel->deleteDataProduct($idToko,$idBarang) &&	$this->SellerModel->deleteDataFoto($idToko,$idBarang) && $this->SellerModel->deleteDataUkuran($idToko,$idBarang)) {
				echo json_encode(array(
					'deletedStatus' => 'success',
					'message' => 'berhasil dihapus'
				)); 
			}else{
				echo json_encode(array(
					'deletedStatus' => 'error',
					'message' => 'gagal dihapus'
				)); 
			}
		}
	}

	function deleteproductimagebyidfoto(){
		if ($_SERVER['REQUEST_METHOD'] == 'POST') {
			$idToko = $this->session->userdata('id_toko');
			$idBarang =  $this->input->post('idBarang');
			$idFoto =  $this->input->post('idFoto');
			$resultProductImage = $this->SellerModel->getProductImageByIdFoto($idToko,$idBarang,$idFoto);

			if(unlink("assets/Project Toko Online/image/products/$resultProductImage")){
				$this->SellerModel->deleteProductImageByIdFoto($idToko,$idBarang,$idFoto);
				echo json_encode(array(
					'deletedStatus' => 'success',
					'message' => 'Gambar berhasil dihapus'
				)); 
			}else{
				echo json_encode(array(
					'deletedStatus' => 'error',
					'message' => 'Gambar gagal dihapus'
				)); 
			}
		}
	}

	function deleteproductsizebyidukuran(){
		if ($_SERVER['REQUEST_METHOD'] == 'POST') {
			$idToko = $this->session->userdata('id_toko');
			$idBarang =  $this->input->post('idBarang');
			$idUkuran =  $this->input->post('idUkuran');
	
			if ($this->SellerModel->deleteProductSizeByIdUkuran($idToko,$idBarang,$idUkuran)) {
				echo json_encode(array(
					'deletedStatus' => 'success',
					'message' => 'Ukuran berhasil dihapus'
				)); 
			}else{
				echo json_encode(array(
					'deletedStatus' => 'error',
					'message' => 'Ukuran gagal dihapus'
				)); 
			}
		}
	}

	public function getinfotoko(){
		$resU = $this->SellerModel->getUserData($this->session->userdata('id_user'));
		$r = $this->SellerModel->getTokoData($this->session->userdata('id_toko'));
		$res = array();
		array_push($res, array(
			'toko' => $r[0],
			'user' => $resU
		));
		echo json_encode($res[0]);
	}

	public function updategambartoko(){
		$oriFileName = $_FILES['gambar_toko']['name'];
		$split = explode('.', $oriFileName);
		$data['gambar_toko'] = $split[0].'_TK'.$this->session->userdata('id_toko').'.'.$split[1];
		$namaFoto = $data['gambar_toko'];
		$tagetPath = './assets/Project Toko Online/image/users/'.$data['gambar_toko'];
		$r = $this->SellerModel->getTokoData($this->session->userdata('id_toko'))[0];
		$oldFoto = $r['gambar_toko'];

		if ($r['gambar_toko'] != '') {
			if (move_uploaded_file($_FILES['gambar_toko']['tmp_name'], $tagetPath)) {
				if ($this->SellerModel->updateFotoToko($data, $this->session->userdata('id_toko'))) {
					(unlink("assets/Project Toko Online/image/users/$oldFoto"));
					echo json_encode(array(
						'status' => 'success',
						'message' => 'Upload gambar berhasil'
					));
				}else{
					unlink("assets/Project Toko Online/image/users/$namaFoto");
					echo json_encode(array(
						'status' => 'error',
						'message' => 'Update gambar gagal'
					));
				}
			}else{
				echo json_encode(array(
					'status' => 'error',
					'message' => 'Upload gambar gagal'
				));
			}
		} else {
			if (move_uploaded_file($_FILES['gambar_toko']['tmp_name'], $tagetPath)) {
				if ($this->SellerModel->updateFotoToko($data, $this->session->userdata('id_toko'))) {
					echo json_encode(array(
						'status' => 'success',
						'message' => 'Upload gambar berhasil'
					));
				}else{
					unlink("assets/Project Toko Online/image/users/$namaFoto");
					echo json_encode(array(
						'status' => 'error',
						'message' => 'Update gambar gagal'
					));
				}
			}else{
				echo json_encode(array(
					'status' => 'error',
					'message' => 'Upload gambar gagal'
				));
			}
		}
	}

	public function getproductbyname(){
		$resultResponse = array();

		if ($this->input->get('nm') == '') {
			$r = $this->SellerModel->getProductByName($this->session->userdata('id_toko'), '');
			foreach ($r as $key => $value) {
				$resultProductImages = $this->SellerModel->getAllProductImagesByIdBarang($this->session->userdata('id_toko'),$value['id_barang']);
				array_push($resultResponse, array(
					'idToko' => $value['id_toko'],
					'idBarang' => $value['id_barang'],
					'namaBarang' => $value['nama_barang'],
					'kondisiBarang' => $value['kondisi_barang'],
					'deskripsiBarang' => $value['deskripsi_barang'],
					'dataFoto' => $resultProductImages
				));
			}
		} else {
			$r = $this->SellerModel->getProductByName($this->session->userdata('id_toko'), $this->input->get('nm'));
			foreach ($r as $key => $value) {
				$resultProductImages = $this->SellerModel->getAllProductImagesByIdBarang($this->session->userdata('id_toko'),$value['id_barang']);
				array_push($resultResponse, array(
					'idToko' => $value['id_toko'],
					'idBarang' => $value['id_barang'],
					'namaBarang' => $value['nama_barang'],
					'kondisiBarang' => $value['kondisi_barang'],
					'deskripsiBarang' => $value['deskripsi_barang'],
					'dataFoto' => $resultProductImages
				));
			}
		}
		echo json_encode($resultResponse);
	}

	public function exporttransaksi(){
		$spreadsheet = new Spreadsheet();
		$spreadsheet->
		getProperties()->
		setCreator('QShoes System')->
		setLastModifiedBy('System Qshoes')->
		setTitle('Office 2019 XLSX Test Document')->
		setSubject('Office 2019 XLSX Test Document')->
		setDescription('Laporan Sukses Transaksi')->
		setKeywords('office 2019 openxml php')->
		setCategory('Result File');

		$sheet = $spreadsheet->getActiveSheet();
		$sheet->setCellValue('A1', 'No')->getStyle('A1')->getFont()->setBold(true);
		$sheet->getCell('A1', 'No')->getStyle('A1')->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
		$sheet->setCellValue('B1', 'Invoice')->getStyle('B1')->getFont()->setBold(true);
		$sheet->getCell('B1', 'Invoice')->getStyle('B1')->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
		$sheet->setCellValue('C1', 'Tanggal - Waktu')->getStyle('C1')->getFont()->setBold(true);
		$sheet->getCell('C1', 'Tanggal - Waktu')->getStyle('C1')->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
		$sheet->setCellValue('D1', 'Jumlah Beli')->getStyle('D1')->getFont()->setBold(true);
		$sheet->getCell('D1', 'Jumlah Beli')->getStyle('D1')->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
		$sheet->setCellValue('E1', 'Total Harga')->getStyle('E1')->getFont()->setBold(true);
		$sheet->getCell('E1', 'Total Harga')->getStyle('E1')->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);

		$no = 2;
		$nourut = 1;
		$totalBarang = 0;
		$totalAllHarga = 0;
		$r = $this->SellerModel->getTransaksiSelesai($this->session->userdata('id_toko'),'');

		foreach ($r as $key => $v) {
			$jumlahBarang = 0;
			$totalHarga = 0;
			$d = $this->SellerModel->getNewDetailsOrder($v['invoice'], $this->session->userdata('id_toko'));
			foreach ($d as $key => $va) {
				$jumlahBarang = $va['qty'] + $jumlahBarang;
				$totalHarga = $va['qty'] * $va['harga_t'] + $totalHarga;
			}
			$totalBarang = $jumlahBarang + $totalBarang;
			$totalAllHarga = $totalHarga + $totalAllHarga;
			$tanggal = explode('-',$v['tanggal']);	
			switch ($tanggal[1]) {
				case '01':
					$bulan = 'Jan';
					break;
				case '02':
					$bulan = 'Feb';
					break;
				case '03':
					$bulan = 'Mar';
					break;
				case '04':
					$bulan = 'Apr';
					break;
				case '05':
					$bulan = 'Mei';
					break;
				case '06':
					$bulan = 'Jun';
					break;
				case '07':
					$bulan = 'Jul';
					break;
				case '08':
					$bulan = 'Aug';
					break;
				case '09':
					$bulan = 'Sep';
					break;
				case '10':
					$bulan = 'Okt';
					break;
				case '11':
					$bulan = 'Nov';
					break;
				case '12':
					$bulan = 'Des';
					break;
			}
			$invoice = explode('/',$v['invoice']);
			$sheet->setCellValue('A'.$no, $nourut++)->getStyle('A'.$no)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
			$sheet->setCellValue('B'.$no, $invoice[0].'/'.$invoice[1].'/'.$invoice[2].'/'.$v['transaksi_group'].'/'.$invoice[3])->getStyle('B'.$no)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
			$sheet->setCellValue('C'.$no, $tanggal[2].' '.$bulan.' '.$tanggal[0].' - '.$v['waktu'].' WIB')->getStyle('C'.$no)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
			$sheet->setCellValue('D'.$no, $jumlahBarang)->getStyle('D'.$no)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
			$sheet->setCellValue('E'.$no, 'Rp. '.number_format($totalHarga,0,',','.'))->getStyle('E'.$no)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
			$no++;
		}

		$sheet->setCellValue('A'.$no, 'Total')->getStyle('A'.$no)->getFont()->setBold(true);
		$sheet->getCell('A'.$no, 'Total')->getStyle('A'.$no)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
		$sheet->setCellValue('B'.$no, '');
		$sheet->setCellValue('C'.$no, '');
		$sheet->setCellValue('D'.$no, $totalBarang)->getStyle('D'.$no)->getFont()->setBold(true);
		$sheet->getCell('D'.$no, 'Total')->getStyle('D'.$no)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
		$sheet->setCellValue('E'.$no, 'Rp. '.number_format($totalAllHarga,0,',','.'))->getStyle('E'.$no)->getFont()->setBold(true);
		$sheet->getCell('E'.$no, 'Total')->getStyle('E'.$no)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);

		header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
		header('Content-Disposition: attachment;filename="Laporan Transaksi '.$this->session->userdata('nama_toko').'.xlsx"');
		header('Cache-Control: max-age=0');

		$write = IOFactory::createWriter($spreadsheet,'Xlsx');
		$write->save('php://output');
		exit;
	}

	public function exportdetailtransaksi(){
		$spreadsheet = new Spreadsheet();
		$spreadsheet->
		getProperties()->
		setCreator('QShoes System')->
		setLastModifiedBy('System Qshoes')->
		setTitle('Office 2019 XLSX Test Document')->
		setSubject('Office 2019 XLSX Test Document')->
		setDescription('Laporan Sukses Detail Transaksi')->
		setKeywords('office 2019 openxml php')->
		setCategory('Result File');

		$sheet = $spreadsheet->getActiveSheet();
		$sheet->setCellValue('A1', 'No')->getStyle('A1')->getFont()->setBold(true);
		$sheet->getCell('A1', 'No')->getStyle('A1')->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
		$sheet->setCellValue('B1', 'Invoice')->getStyle('B1')->getFont()->setBold(true);
		$sheet->getCell('B1', 'Invoice')->getStyle('B1')->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
		$sheet->setCellValue('C1', 'Nama Barang')->getStyle('C1')->getFont()->setBold(true);
		$sheet->getCell('C1', 'Nama Barang')->getStyle('C1')->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
		$sheet->setCellValue('D1', 'Jumlah')->getStyle('D1')->getFont()->setBold(true);
		$sheet->getCell('D1', 'Jumlah')->getStyle('D1')->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
		$sheet->setCellValue('E1', 'Harga')->getStyle('E1')->getFont()->setBold(true);
		$sheet->getCell('E1', 'Harga')->getStyle('E1')->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
		$sheet->setCellValue('F1', 'Total')->getStyle('F1')->getFont()->setBold(true);
		$sheet->getCell('F1', 'Total')->getStyle('F1')->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);

		$no = 2;
		$nourut = 1;
		$jumlahBeli = 0;
		$totalHarga = 0;
		$r = $this->SellerModel->getDetailTransaksiSelesai('', $this->session->userdata('id_toko'));

		foreach ($r as $key => $v) {
			$jumlahBeli = $v['qty'] + $jumlahBeli;
			$totalHarga = $v['qty'] * $v['harga_t'] + $totalHarga;
			$invoice = explode('/',$v['invoice']);
			$sheet->setCellValue('A'.$no, $nourut++)->getStyle('A'.$no)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
			$sheet->setCellValue('B'.$no, $invoice[0].'/'.$invoice[1].'/'.$invoice[2].'/'.$v['transaksi_group'].'/'.$invoice[3])->getStyle('B'.$no)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
			$sheet->setCellValue('C'.$no, $v['nama_barang'].' (size '.$v['ukuran'].')')->getStyle('C'.$no)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
			$sheet->setCellValue('D'.$no, $v['qty'])->getStyle('D'.$no)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
			$sheet->setCellValue('E'.$no, 'Rp. '.number_format($v['harga_t'],0,',','.'))->getStyle('E'.$no)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
			$sheet->setCellValue('F'.$no, 'Rp. '.number_format($v['qty'] * $v['harga_t'],0,',','.'))->getStyle('F'.$no)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
			$no++;
		}

		$sheet->setCellValue('A'.$no, 'Total')->getStyle('A'.$no)->getFont()->setBold(true);
		$sheet->getCell('A'.$no, 'Total')->getStyle('A'.$no)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
		$sheet->setCellValue('B'.$no, '');
		$sheet->setCellValue('C'.$no, '');
		$sheet->setCellValue('D'.$no, $jumlahBeli)->getStyle('D'.$no)->getFont()->setBold(true);
		$sheet->getCell('D'.$no)->getStyle('D'.$no)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
		$sheet->setCellValue('E'.$no, '');
		$sheet->setCellValue('F'.$no, 'Rp. '.number_format($totalHarga,0,',','.'))->getStyle('F'.$no)->getFont()->setBold(true);
		$sheet->getCell('F'.$no)->getStyle('F'.$no)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
		
		header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
		header('Content-Disposition: attachment;filename="Laporan Detail Transaksi '.$this->session->userdata('nama_toko').'.xlsx"');
		header('Cache-Control: max-age=0');

		$write = IOFactory::createWriter($spreadsheet,'Xlsx');
		$write->save('php://output');
	}

	public function getmychatmember(){
		if ($_SERVER['REQUEST_METHOD'] == 'GET' && $this->session->userdata('id_toko') != '') {
			$rC = array();

			$r = $this->SellerModel->getMyChatMember($this->session->userdata('id_toko'));
			foreach ($r as $key => $v) {
				$unread = 0;

				$l = $this->SellerModel->getLastMsg($v['id_user'],$this->session->userdata('id_toko'))[0];
				$x = $this->SellerModel->getUnreadMsg($v['id_user'],$this->session->userdata('id_toko'));
				
				foreach ($x as $key => $val) {
					if ($val['read'] == '1') {
						if ($val['id_receiver'] == $this->session->userdata('id_toko')) {
							$unread++;
						}
					}
				}

				array_push($rC,array(
					'idUser' => $v['id_user'],
					'namaUser' => $v['username'],
					'gambarUser' => $v['gambar_user'],
					'lastMsg' => $l['msg'],
					'time' => $l['time'],
					'unread' => $unread
				));
			}

			echo json_encode(array(
				'login' => true,
				'id_toko' => $this->session->userdata('id_toko'),
				'myChatMembers' => $rC
			));
		}else{
			echo json_encode(array(
				'login' => false,
				'status' => 'error',
				'message' => 'Bad request. Can not find any query param'
			));
		}
	}

	public function getmychatcontent(){
		if ($_SERVER['REQUEST_METHOD'] == 'GET' && $this->session->userdata('id_toko') != '') {
			$date = array();
			$u = $this->SellerModel->getUserData($this->input->get('id_user'));
			$g = $this->SellerModel->getMyChatContentGroupByDate($this->input->get('id_user'),$this->session->userdata('id_toko'));
			
			foreach ($g as $key => $val) {
				$rC = array();
				$r = $this->SellerModel->getMyChatContentByDate($this->input->get('id_user'),$this->session->userdata('id_toko'),$val['date']);

				foreach ($r as $key => $v) {
					if ($v['text'] == 0) {
						array_push($rC, array(
							'sender' => $v['id_sender'] == $this->session->userdata('id_toko') ? true : false,
							'receive' => $v['id_receiver'],
							'msg' => $v['msg'],
							'text' => $v['text'],
							'time' => $v['time']
						));	
					} else {
						$b = $this->SellerModel->getProductByIdBarang($this->session->userdata('id_toko'),$v['id_barang']);
						$f = $this->SellerModel->getAllProductImagesByIdBarang($this->session->userdata('id_toko'),$v['id_barang']);

						if ($v['id_ukuran'] == 0) {
							$ukuran = 0;
						} else {
							$uk = $this->SellerModel->getProductSizeByIdUkuran($v['id_ukuran']);
							$ukuran = $uk['ukuran'];
						}

						array_push($rC, array(
							'sender' => $v['id_sender'] == $this->session->userdata('id_toko') ? true : false,
							'receive' => $v['id_receiver'],
							'namaBarang' => $b[0]['nama_barang'],
							'gambarBarang' => $f,
							'ukuran' => $ukuran,
							'text' => $v['text'],
							'time' => $v['time']
						));	
					}
					
				}

				array_push($date, array(
					'date' => $val['date'],
					'chatContents' => $rC
				));
			}
			
			echo json_encode(array(
				'idUser' => $u['id_user'],
				'username' => $u['username'],
				'gambarUser' => $u['gambar_user'],
				'online' => $u['status'],
				'chatContents' => $date
			));
		}else{
			echo json_encode(array(
				'status' => 'error',
				'message' => 'Bad request. Can not find any query param'
			));
		}
	}

	public function inputmsg(){
		if ($_SERVER['REQUEST_METHOD'] == 'POST' && $this->session->userdata('id_toko') != '') {
			date_default_timezone_set("Asia/Jakarta");
			$data['id_user'] = $this->input->post('id_user');
			$data['id_toko'] = $this->session->userdata('id_toko');
			$data['id_sender'] = $this->session->userdata('id_toko');
			$data['id_receiver'] = $this->input->post('id_user');
			$data['text'] = 0;
			$data['msg'] = $this->input->post('msg');
			$data['date'] = date('Y-m-d');
			$data['time'] = date('H:i:s');
			$data['read'] = 1;

			if ($this->SellerModel->createMsg($data)) {
				echo json_encode(array(
					'status' => 'success',
					'message' => 'Pesan berhasil terkirim'
				));
			} else {
				echo json_encode(array(
					'status' => 'error',
					'message' => 'Pesan gagal terkirim'
				));
			}
		} else {
			echo json_encode(array(
				'status' => 'error',
				'message' => 'Bad request. Can not find any query param'
			));
		}
	}

	public function deletechat(){
		if ($this->SellerModel->deleteChat($this->input->post('id_user'),$this->session->userdata('id_toko'))) {
			echo json_encode(array(
				'status' => 'success',
				'message' => 'Chat berhasil dihapus'
			));
		} else {
			echo json_encode(array(
				'status' => 'error',
				'message' => 'Chat gagal dihapus'
			));
		}
	}

	public function updatestatusread(){
		$data['read'] = 0;
		$this->SellerModel->updateStatusRead($data,$this->input->post('id_user'),$this->session->userdata('id_toko'));
		echo json_encode(array(
			'status' => 'success',
			'message' => 'Chat berhasil dihapus'
		));
	}

	public function withdraw(){
		if ($_SERVER['REQUEST_METHOD'] == 'POST' && $this->session->userdata('id_toko') != '') {
			$r = $this->SellerModel->getTokoData($this->session->userdata('id_toko'))[0];
			$data['saldo'] = (int) $r['saldo'] - (int) $this->input->post('nominal');
			
			if ($this->SellerModel->updateSaldo($data,$this->session->userdata('id_toko'))) {
				echo json_encode(array(
					'status' => 'success',
					'message' => 'Saldo sebesar Rp. '.number_format((int) $this->input->post('nominal'),0,',','.').' berhasil ditarik, Selamat bersenang senang.....'
				));
			} else {
				echo json_encode(array(
					'status' => 'error',
					'message' => 'Saldo tidak bisa ditarik'
				));
			}
			
		} else {
			echo json_encode(array(
				'status' => 'error',
				'message' => 'Bad request. Can not find any query param'
			));
		}
		
	}

}
