<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User extends CI_Controller {

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
		$this->load->model('UserModel');

			if ($this->session->userdata('username') == '') {
				redirect(base_url());
			}
		}
		

	public function index(){
		$data['title'] = 'User | Ubah Profil';

		if ($this->session->userdata('username') != '') {
			$data['id_user'] = $this->session->userdata('id_user');
			$data['username'] = $this->session->userdata('username');

			$resU = $this->UserModel->getUserData($data['id_user']);
			$resT = $this->UserModel->getTokoData($data['id_user']);
			$data['gambar_user'] = $resU['gambar_user'] != '' ? $resU['gambar_user'] : '';
			$data['nama_toko'] = $resT->num_rows() == 1 ? $resT->result_array()[0]['nama_toko'] : '';
			$data['domain_toko'] = $resT->num_rows() == 1 ? $resT->result_array()[0]['domain_toko'] : '';
			$data['gambar_toko'] = $resT->num_rows() == 1 ? $resT->result_array()[0]['gambar_toko'] : '';

			$no = 0;
			$newOrder = $this->UserModel->getNewOrder($this->session->userdata('id_toko'));
			$tUnread = 0;
			$unread = $this->UserModel->getUnreadMsg($this->session->userdata('id_toko'));

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

			$myOrder = $this->UserModel->getMyOrderNotif($this->session->userdata('id_user'));
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
		$this->load->view('UserView');
		$this->load->view('user toko online/footer');
	}

	public function chat(){
		$data['title'] = 'User | Chat';

		if ($this->session->userdata('username') != '') {
			$data['id_user'] = $this->session->userdata('id_user');
			$data['username'] = $this->session->userdata('username');

			$resU = $this->UserModel->getUserData($data['id_user']);
			$resT = $this->UserModel->getTokoData($data['id_user']);
			$data['gambar_user'] = $resU['gambar_user'] != '' ? $resU['gambar_user'] : '';
			$data['nama_toko'] = $resT->num_rows() == 1 ? $resT->result_array()[0]['nama_toko'] : '';
			$data['domain_toko'] = $resT->num_rows() == 1 ? $resT->result_array()[0]['domain_toko'] : '';
			$data['gambar_toko'] = $resT->num_rows() == 1 ? $resT->result_array()[0]['gambar_toko'] : '';

			$no = 0;
			$newOrder = $this->UserModel->getNewOrder($this->session->userdata('id_toko'));
			$tUnread = 0;
			$unread = $this->UserModel->getUnreadMsg($this->session->userdata('id_toko'));

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

			$myOrder = $this->UserModel->getMyOrderNotif($this->session->userdata('id_user'));
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
		$this->load->view('UserChatView');
		$this->load->view('user toko online/footer');
	}

	public function order(){
		$data['title'] = 'User | Order Status';

		if ($this->session->userdata('username') != '') {
			$data['id_user'] = $this->session->userdata('id_user');
			$data['username'] = $this->session->userdata('username');

			$resU = $this->UserModel->getUserData($data['id_user']);
			$resT = $this->UserModel->getTokoData($data['id_user']);
			$data['gambar_user'] = $resU['gambar_user'] != '' ? $resU['gambar_user'] : '';
			$data['nama_toko'] = $resT->num_rows() == 1 ? $resT->result_array()[0]['nama_toko'] : '';
			$data['domain_toko'] = $resT->num_rows() == 1 ? $resT->result_array()[0]['domain_toko'] : '';
			$data['gambar_toko'] = $resT->num_rows() == 1 ? $resT->result_array()[0]['gambar_toko'] : '';

			$no = 0;
			$newOrder = $this->UserModel->getNewOrder($this->session->userdata('id_toko'));
			$tUnread = 0;
			$unread = $this->UserModel->getUnreadMsg($this->session->userdata('id_toko'));

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

			$myOrder = $this->UserModel->getMyOrderNotif($this->session->userdata('id_user'));
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
		$this->load->view('UserOrderStatusView');
		$this->load->view('user toko online/footer');
	}

	public function getuserdata(){
		$r = $this->UserModel->getUserData($this->session->userdata('id_user'));
		$data['username'] = $r['username'];
		$data['email'] = $r['email'];
		$data['nomer_hp'] = $r['nomer_hp'];
		$data['gambar_user'] = $r['gambar_user'];
		$data['status_email'] = $r['status_email'];

		echo json_encode($data);
	}

	public function updateimageuser(){
		$oriFileName = $_FILES['gambar_user']['name'];
		$split = explode('.', $oriFileName);
		$data['gambar_user'] = $split[0].'_'.$this->session->userdata('id_user').'.'.$split[1];
		$namaFoto = $data['gambar_user'];
		$tagetPath = './assets/Project Toko Online/image/users/'.$data['gambar_user'];
		$r = $this->UserModel->getUserData($this->session->userdata('id_user'));
		$oldFoto = $r['gambar_user'];

		if ($r['gambar_user'] != '') {
			if (move_uploaded_file($_FILES['gambar_user']['tmp_name'], $tagetPath)) {
				if ($this->UserModel->updateUsername($data, $this->session->userdata('id_user'))) {
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
			if (move_uploaded_file($_FILES['gambar_user']['tmp_name'], $tagetPath)) {
				if ($this->UserModel->updateUsername($data, $this->session->userdata('id_user'))) {
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

	public function updateusername(){
		if ($_SERVER['REQUEST_METHOD'] == 'POST') {
			$idUser = $this->session->userdata('id_user');
			$data['username'] = $this->input->post('username');

			if ($this->UserModel->isDuplicateUsername($data['username']) != null) {
				echo json_encode(array(
					'status' => 'error',
					'message' => 'Nama tersebut sudah terdaftar atau sedang kamu gunakan'
				));
			} else {
				if ($this->UserModel->updateUsername($data, $idUser)) {
					echo json_encode(array(
						'status' => 'success',
						'message' => 'Nama berhasil diubah'
					));
					$this->session->set_userdata('username', $data['username']);
				} else {
					echo json_encode(array(
						'status' => 'error',
						'message' => 'Nama gagal diubah'
					));
				}
			}		
		}
	}

	public function updateemail(){
		if ($this->UserModel->isDuplicateEmail('email', $this->input->post('email')) != null) {
			echo json_encode(array(
				'status' => 'error',
				'message' => 'Email tersebut sudah terdaftar atau sedang kamu gunakan'
			));
		} else {
			if ($this->UserModel->isDuplicateEmail('email_baru', $this->input->post('email')) != null) {
				echo json_encode(array(
					'status' => 'error',
					'message' => 'Email tersebut sedang dalam verifikasi'
				));
			} else {
				$data['email_baru'] = $this->input->post('email');
				$data['code_otp'] = rand(9999, 1111);

				if ($this->UserModel->updateEmailBaru($data, $this->session->userdata('id_user'))) {
					$subject = "Email Verification Code";
					$message = "QShoes - JANGAN MEMBERI TAHU KODE INI KE SIAPAPUN termasuk pihak QShoes " . $data['code_otp'];
					$sender = "From: kurohikoblacknight5601@gmail.com";
					if(mail($this->input->post('email'), $subject, $message, $sender)){
						echo json_encode(array(
							'status' => 'success',
							'message' => 'Kode telah dikirim melalui email ke '.$data['email_baru']
						));
						}else{
							$data['email_baru'] = '';
							$data['code_otp'] = 0;
							$this->UserModel->updateEmailBaru($data, $this->session->userdata('id_user'));

							echo json_encode(array(
								'status' => 'error',
								'message' => 'Gagal saat mengirim kode'
							));
						}
				} else {
					echo json_encode(array(
						'status' => 'error',
						'message' => 'Gagal mengupdate email'
					));	
				}
			}
		}
		
	}

	public function checkcodeotpbyemailbaru(){
		$emailBaru = $this->input->post('email_baru');
		$code = $this->input->post('code_otp');

		if ($this->UserModel->checkCodeOtpByEmailBaru($emailBaru,$code) != null) {
			$data['email'] = $emailBaru;
			$data['email_baru'] = '';
			$data['code_otp'] = 0;
			$this->UserModel->updateEmailBaru($data, $this->session->userdata('id_user'));

			echo json_encode(array(
				'status' => 'success',
				'message' => 'Email '. $emailBaru .' sudah terupdate dan terverifikasi'
			));
		} else {
			echo json_encode(array(
				'status' => 'error',
				'message' => 'Anda memasukkan kode yang salah'
			));
		}
		
	}

	public function resendCode(){
		$data['code_otp'] = rand(9999, 1111);

		if ($this->UserModel->resendCode($data, $this->input->post('email'))) {
			$subject = "Email Verification Code";
			$message = "QShoes - JANGAN MEMBERI TAHU KODE INI KE SIAPAPUN termasuk pihak QShoes " . $data['code_otp'];
			$sender = "From: kurohikoblacknight5601@gmail.com";
			if(mail($this->input->post('email'), $subject, $message, $sender)){
				echo json_encode(array(
					'status' => 'success',
					'message' => 'Kode telah dikirim melalui email ke '.$data['email_baru']
				));
				}else{
					$data['email_baru'] = '';
					$data['code_otp'] = 0;
					$this->UserModel->updateEmailBaru($data, $this->session->userdata('id_user'));

					echo json_encode(array(
						'status' => 'error',
						'message' => 'Gagal saat mengirim kode'
					));
				}
		} else {
			echo json_encode(array(
				'status' => 'error',
				'message' => 'Gagal mengupdate kode'
			));	
		}
		
	}

	public function deletenewaccountbeforeverification(){
		$data['email_baru'] = '';
		$data['code_otp'] = 0;

		$this->UserModel->updateEmailBaru($data, $this->session->userdata('id_user'));

		echo json_encode(array(
			'status' => 'error',
			'message' => 'Tidak jadi mengupdate email'
		));	
	}

	public function updatepassword(){
		$r = $this->UserModel->getUserData($this->session->userdata('id_user'));
		$data['password'] = password_hash($this->input->post('new_password'), PASSWORD_BCRYPT);
		
		if (password_verify($this->input->post('password'), $r['password'])) {
			if ($this->UserModel->updatePassword($data,$this->session->userdata('id_user'))) {
				echo json_encode(array(
					'status' => 'success',
					'message' => 'Password berhasil diupdate'
				));	
			} else {
				echo json_encode(array(
					'status' => 'error',
					'message' => 'Password gagal diupdate'
				));	
			}
			
		} else {
			echo json_encode(array(
				'status' => 'error',
				'message' => 'Password saat ini salah'
			));	
		}
		
	}

	public function updatenomerhp(){
		$data['nomer_hp'] = $this->input->post('nomer_hp');

		if ($this->UserModel->updateUsername($data, $this->session->userdata('id_user'))) {
			echo json_encode(array(
				'status' => 'success',
				'message' => 'Nomer hp berhasil diupdate'
			));	
		} else {
			echo json_encode(array(
				'status' => 'error',
				'message' => 'Nomer hp gagal diupdate'
			));	
		}
		
	}

	public function getmyorder(){
		$r = array();
		if ($this->input->get('status') != null && $this->input->get('status') == 'menunggu_konfirmasi') {
			$status = 1;
		} else if ($this->input->get('status') != null && $this->input->get('status') == 'diproses'){
			$status = 2;
		} else if ($this->input->get('status') != null && $this->input->get('status') == 'dikirim'){
			$status = 3;
		} else if ($this->input->get('status') != null && $this->input->get('status') == 'tiba_di_tujuan'){
			$status = 4;
		}else{
			$status = 0;
		}
		
		$myOrder = $this->UserModel->getMyOrder($this->session->userdata('id_user'),$status);
		foreach ($myOrder as $key => $value) {
			$myOrderByInvoice = $this->UserModel->getMyOrderByInvoice($value['invoice']);
			$moreProducts = $this->UserModel->getMyOrderDetailsByInvoice($value['invoice']);
			$n = 0;
			$totalBelanja = 0;
			foreach ($moreProducts as $key => $vm) {
				$totalBelanja = $vm['qty'] * $vm['harga_t'] + $vm['ongkos_kirim'] + $totalBelanja;
				$n++;	
			}
			foreach ($myOrderByInvoice as $key => $v) {
				$f = $this->UserModel->getAllProductImagesByIdProduct($v['id_barang']);
				array_push($r,array(
					'invoice' => $v['invoice'],
					'transaksiGroup' => $v['transaksi_group'],
					'tanggal' => $v['tanggal'],
					'status' => $v['status'],
					'namaToko' => $v['nama_toko'],
					'namaBarang' => $v['nama_barang'],
					'transaksiGroup' => $v['transaksi_group'],
					'ukuran' => $v['ukuran'],
					'qty' => $v['qty'],
					'harga' => $v['harga_t'],
					'id' => $v['id_barang'],
					'totalBelanja' => $totalBelanja,
					'foto' => $f,
					'moreProduct' => $n - 1
				));
			}
		}
		echo json_encode($r);
	}

	public function getmyorderbyinvoice(){
		$r = array();
		$myOrderByInvoice = $this->UserModel->getMyOrderByInvoice($this->input->get('invoice'))[0];
		$detailProducts = $this->UserModel->getMyOrderDetailsByInvoice($myOrderByInvoice['invoice']);
		foreach ($detailProducts as $key => $value) {
			$f = $this->UserModel->getAllProductImagesByIdProduct($value['id_barang']);
			array_push($r, array(
				'foto' => $f,
				'namaProduk' => $value['nama_barang'],
				'qty' => $value['qty'],
				'harga' => $value['harga_t'],
				'ukuran' => $value['ukuran'],
				'slug' => $value['slug'],
				'deskripsi' => $value['deskripsi'],
				'estimasi' => $value['estimasi'],
				'ongkosKirim' => $value['ongkos_kirim'],
			));
		}

		echo json_encode(array(
			'invoice' => $myOrderByInvoice['invoice'],
			'transaksiGroup' => $myOrderByInvoice['transaksi_group'],
			'status' => $myOrderByInvoice['status'],
			'namaToko' => $myOrderByInvoice['nama_toko'],
			'domainToko' => $myOrderByInvoice['domain_toko'],
			'tanggal' => $myOrderByInvoice['tanggal'],
			'waktu' => $myOrderByInvoice['waktu'],
			'detailAlamat' => $myOrderByInvoice['detail_alamat'],
			'provinsi' => $myOrderByInvoice['provinsi'],
			'kota' => $myOrderByInvoice['kota'],
			'detailProduk' => $r
		));
	}

	public function selesaiorder(){
		if ($_SERVER['REQUEST_METHOD'] == 'POST') {
			$totalBayar = 0;
			$saldoBaru = 0;
			$data['status'] = 5;
			$r = $this->UserModel->getMyOrderBy2Params($this->input->post('inv'), $this->input->post('tg'));
			foreach ($r as $key => $value) {
				$saldoBaru = $value['qty'] * $value['harga_t'] + $saldoBaru;
				$totalBayar = $value['qty'] * $value['harga_t'] + $value['ongkos_kirim'] + $totalBayar;
			}
			$t = $this->UserModel->getTokoByIdToko($r[0]['id_toko']);
			$saldoToko['saldo'] = $t['saldo'] + $saldoBaru;
	
			$sq = $this->UserModel->getTotalBayarByTg($this->input->post('tg'));
			$totalBayarQs = $sq['total_bayar'] - $totalBayar;
			if ($totalBayarQs == 4000) {
				$saldoQ['profit'] = $totalBayarQs;
				$saldoQ['total_bayar'] = 0;
			} else {
				$saldoQ['profit'] = 0;
				$saldoQ['total_bayar'] = $totalBayarQs;
			}

			if ($this->UserModel->updateStatusTransactionByInvoice($data, $this->input->post('inv'))) {
				$this->UserModel->updateSaldoTokoByIdToko($saldoToko, $t['id_toko']);
				$this->UserModel->updateTotalBayarTg($saldoQ, $this->input->post('tg'));
				echo json_encode(array(
					'status' => 'success',
					'message' => 'Transaksi berhasil diselesaikan'
				));
			} else {
				echo json_encode(array(
					'status' => 'error',
					'message' => 'Gagal mengupdate status transaksi'
				));
			}
		}
		
	}


}
