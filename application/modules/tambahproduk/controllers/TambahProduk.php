<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class TambahProduk extends CI_Controller {

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

		$this->load->model('TambahProdukModel');
		}
		

	public function index(){
		$this->load->view('admin toko online/header');
		$this->load->view('admin toko online/header_seller');
		$this->load->view('admin toko online/sidebar');
		$this->load->view('TambahProdukView');
		$this->load->view('admin toko online/footer');
	}

	public function createandupload(){
		$status = true;
		$data['id_toko'] = 10;
		$data['nama_barang'] = $this->input->post('nama_barang');
		$data['slug'] = url_title(trim($this->input->post('nama_barang')),'-',true);
		$dbProductName = $this->TambahProdukModel->isDuplicateProductName($data['id_toko'],$data['nama_barang']);
		
		if ($dbProductName != null) {
			echo json_encode(array(
				'addedStatus' => 'error',
				'message' => 'Barang dengan nama '.$data['nama_barang'].' sudah tersedia'
			)); 
		} else {
			// input barang
			$data['kondisi_barang'] = $this->input->post('kondisi_barang');
			$data['deskripsi_barang'] = $this->input->post('deskripsi_barang');
			$this->TambahProdukModel->createDataProduk($data);

			// input foto and upload
			foreach ($_FILES['berkas_gambar']['tmp_name'] as $key => $value) {
				$oriFileName = $_FILES['berkas_gambar']['name'][$key];
				$dbFileName = $this->TambahProdukModel->isDuplicateImageName($data['id_toko'], $oriFileName);
				$split = explode('.', $oriFileName);
	
				if ($dbFileName != null) {
					$dataFoto['id_toko'] = $data['id_toko'];
					$dataFoto['id_barang'] = $this->TambahProdukModel->getMaxIdBarang($dataFoto['id_toko']);
					$dataFoto['nama_foto'] = $split[0].'_'.$this->TambahProdukModel->getMaxIdFoto().'.'.$split[1];
					$this->TambahProdukModel->createDataFoto($dataFoto);
	
					$tagetPath = './assets/Project Toko Online/image/products/'.$dataFoto['nama_foto'];
					if (move_uploaded_file($value, $tagetPath)) {
						$status = true;
					} else {
						$status = false;
					}
				} else {
					$dataFoto['id_toko'] = $data['id_toko'];
					$dataFoto['id_barang'] = $this->TambahProdukModel->getMaxIdBarang($dataFoto['id_toko']);
					$dataFoto['nama_foto'] = $split[0].'_'.$this->TambahProdukModel->getMaxIdFoto().'.'.$split[1];
					$this->TambahProdukModel->createDataFoto($dataFoto);
	
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
				$data2['id_barang'] = $this->TambahProdukModel->getMaxIdBarang($data2['id_toko']);
				$data2['ukuran'] = $value;
				$data2['harga'] = $this->input->post('harga')[$key];
				$data2['stok'] = $this->input->post('stok')[$key];
				$this->TambahProdukModel->createDataUkuran($data2);
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

	function updateandupload(){
		// update produk
		$idToko = 10;
		$idBarang = $this->input->post('id_barang');
		$data['nama_barang'] = $this->input->post('nama_barang');
		$data['slug'] = url_title(trim($this->input->post('nama_barang')),'-',true);
		$data['kondisi_barang'] = $this->input->post('kondisi_barang');
		$data['deskripsi_barang'] = $this->input->post('deskripsi_barang');
		$this->TambahProdukModel->updateDataProduk($idToko, $idBarang, $data);
		
		// input foto baru dan upload
		if (isset($_FILES['berkas_gambar'])) {
			foreach ($_FILES['berkas_gambar']['tmp_name'] as $key => $value) {
				$oriFileName = $_FILES['berkas_gambar']['name'][$key];
				$split = explode('.', $oriFileName);
	
				$dataFoto['id_toko'] = $idToko;
				$dataFoto['id_barang'] = $idBarang;
				$dataFoto['nama_foto'] = $split[0].'_'.$this->TambahProdukModel->getMaxIdFoto().'.'.$split[1];
				$this->TambahProdukModel->createDataFoto($dataFoto);
	
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
				$resultProductImageU = $this->TambahProdukModel->getProductImageByIdFoto($idToko,$idBarang,$value);

				
				if(unlink("assets/Project Toko Online/image/products/$resultProductImageU")){
					$updateDataFoto['nama_foto'] = $splitU[0].'_'.$value.'.'.$splitU[1];
					$tmpName = $_FILES['berkas_gambar_id']['tmp_name'][$key];
					$this->TambahProdukModel->updateDataFoto($idToko, $idBarang, $value, $updateDataFoto);

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
				$this->TambahProdukModel->createDataUkuran($data2);
			}
		}

		// update ukuran
		if ($this->input->post('id_ukuran') != null) {
			foreach ($this->input->post('id_ukuran') as $key => $value) {
				$data2U['ukuran'] = $this->input->post('ukuran_id')[$key];
				$data2U['harga'] = $this->input->post('harga_id')[$key];
				$data2U['stok'] = $this->input->post('stok_id')[$key];
				$this->TambahProdukModel->updateDataUkuran($idToko, $idBarang, $value, $data2U);
			}
		}
		
		echo json_encode(array(
			'updatedStatus' => 'success',
			'message' => 'Update barang berhasil'
		)); 
	}

	function deleteproductbyidbarang(){
		if ($_SERVER['REQUEST_METHOD'] == 'POST') {
			$idToko = $this->input->post('idToko');
			$idBarang =  $this->input->post('idBarang');

			$resultProductImages = $this->TambahProdukModel->getAllProductImagesByIdBarang($idToko,$idBarang);
			foreach ($resultProductImages as $key => $value) {
				$fileName = $value['nama_foto'];
				unlink("assets/Project Toko Online/image/products/$fileName");
			}
	
			if ($this->TambahProdukModel->deleteDataProduct($idToko,$idBarang) &&	$this->TambahProdukModel->deleteDataFoto($idToko,$idBarang) && $this->TambahProdukModel->deleteDataUkuran($idToko,$idBarang)) {
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
			$idToko = $this->input->post('idToko');
			$idBarang =  $this->input->post('idBarang');
			$idFoto =  $this->input->post('idFoto');
			$resultProductImage = $this->TambahProdukModel->getProductImageByIdFoto($idToko,$idBarang,$idFoto);

			if(unlink("assets/Project Toko Online/image/products/$resultProductImage")){
				$this->TambahProdukModel->deleteProductImageByIdFoto($idToko,$idBarang,$idFoto);
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
			$idToko = $this->input->post('idToko');
			$idBarang =  $this->input->post('idBarang');
			$idUkuran =  $this->input->post('idUkuran');
	
			if ($this->TambahProdukModel->deleteProductSizeByIdUkuran($idToko,$idBarang,$idUkuran)) {
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
}
