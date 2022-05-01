<?php
  defined('BASEPATH') OR exit('No direct script access allowed');

  class UserModel extends CI_Model{

    public function getTokoData($idUser){
      return $this->db->get_where('toko',array('id_user' => $idUser));
    }

    public function getUserData($idUser){
      return $this->db->get_where('user',array('id_user' => $idUser))->result_array()[0];
    }

    public function getNewOrder($idToko){
      return $this->db->query("SELECT t.invoice,t.tanggal,t.waktu,t.nama_penerima,t.nomer_hp,t.provinsi,t.kota,t.detail_alamat
      FROM transaksi t,detail_transaksi dt 
      WHERE t.invoice = dt.invoice AND dt.id_toko = '$idToko' AND t.status = 1 GROUP BY t.invoice")->result_array();
    }

    public function updateUsername($data,$idUser){
      return $this->db->update('user', $data, array('id_user' => $idUser));
    }

    public function isDuplicateUsername($username){
      return $this->db->get_where('user',array('username' => $username))->result_array();
    }
    
    public function isDuplicateEmail($field,$email){
      return $this->db->get_where('user',array($field => $email))->result_array();
    }

    public function updateEmailBaru($data,$idUser){
      return $this->db->update('user', $data, array('id_user' => $idUser));
    }

    public function checkCodeOtpByEmailBaru($emailBaru,$code){
      return $this->db->get_where('user',array('email_baru' => $emailBaru, 'code_otp' => $code))->result_array();
    }

    public function resendCode($data,$email){
      return $this->db->update('user', $data, array('email_baru' => $email));
    }

    public function updatePassword($data,$idUser){
      return $this->db->update('user', $data, array('id_user' => $idUser));
    }

    public function getAllProductImagesByIdProduct($idBarang){
      return $this->db->get_where('foto',array('id_barang' => $idBarang))->result_array();
    }

    public function getMyOrder($idUser,$status){
      if ($status == 0) {
      return $this->db->query("SELECT * FROM transaksi t,detail_transaksi dt 
      WHERE t.invoice = dt.invoice AND dt.id_user = '$idUser' GROUP BY t.invoice ORDER BY t.no_transaksi ASC")->result_array(); 
      } else {
      return $this->db->query("SELECT * FROM transaksi t,detail_transaksi dt 
      WHERE t.invoice = dt.invoice AND dt.id_user = '$idUser' AND t.status = '$status' GROUP BY t.invoice ORDER BY t.no_transaksi ASC")->result_array();
      }
    }

    public function getMyOrderNotif($idUser){
      return $this->db->query("SELECT * FROM transaksi t,detail_transaksi dt 
      WHERE t.invoice = dt.invoice AND dt.id_user = '$idUser' AND t.status != 5 GROUP BY t.invoice ORDER BY t.no_transaksi ASC")->result_array(); 
    }

    public function getMyOrderByInvoice($invoice){
      return $this->db->query("SELECT * FROM transaksi t,detail_transaksi dt,barang b,toko tk,ukuran u 
      WHERE t.invoice = dt.invoice AND tk.id_toko = dt.id_toko AND b.id_barang = dt.id_barang AND u.id_ukuran = dt.id_ukuran AND dt.invoice = '$invoice' 
      GROUP BY t.invoice")->result_array();
    }

    public function getMyOrderDetailsByInvoice($invoice){
      return $this->db->query("SELECT * FROM transaksi t,detail_transaksi dt,barang b,ukuran u
      WHERE t.invoice = dt.invoice AND b.id_barang = dt.id_barang AND u.id_ukuran = dt.id_ukuran AND dt.invoice = '$invoice'")->result_array();
    }

    public function getMyOrderBy2Params($inv,$tg){
      return $this->db->query("SELECT * FROM transaksi t,detail_transaksi dt 
      WHERE t.invoice = dt.invoice AND t.invoice = '$inv' AND t.transaksi_group = '$tg'")->result_array(); 
    }

    public function getTokoByIdToko($idToko){
      return $this->db->get_where('toko',array('id_toko' => $idToko))->result_array()[0];
    }

    public function updateSaldoTokoByIdToko($saldo, $idToko){
      return $this->db->update('toko', $saldo, array('id_toko' => $idToko));
    }

    public function updateStatusTransactionByInvoice($data, $inv){
      return $this->db->update('transaksi', $data, array('invoice' => $inv));
    }

    public function getTotalBayarByTg($tg){
      return $this->db->get_where('saldo_qshoes',array('transaksi_group' => $tg))->result_array()[0];
    }

    public function updateTotalBayarTg($saldoQ, $tg){
      return $this->db->update('saldo_qshoes', $saldoQ, array('transaksi_group' => $tg));
    }

    public function getUnreadMsg($idToko){
      return $this->db->get_where('chat',array('id_toko' => $idToko))->result_array();
    }
  }
?>