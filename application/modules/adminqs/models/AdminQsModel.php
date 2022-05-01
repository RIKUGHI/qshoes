<?php
  defined('BASEPATH') OR exit('No direct script access allowed');

  class AdminQsModel extends CI_Model{

    public function getTokoData($idToko){
      return $this->db->get_where('toko',array('id_toko' => $idToko))->result_array();
    }

    public function getUserData($idUser){
      return $this->db->get_where('user',array('id_user' => $idUser))->result_array()[0];
    }

    public function checkData($col,$data){
      return $this->db->get_where('admin',array($col => $data))->result_array();
    }

    public function createAdmin($data){
      return $this->db->insert('admin', $data);
    }

    public function deleteAccountBeforeVerification($email){
      return $this->db->delete('admin', array('email' => $email));
    }

    public function resendCode($data,$email){
      $this->db->update('admin', $data, array('email' => $email));
    }

    public function checkOtpCodeByEmail($email,$code){
      $query = $this->db->query("SELECT * FROM admin WHERE email = '$email' AND code_otp = '$code'");
      return $query->result_array();
    }

    public function updateVerificationEmail($email,$data){
      $this->db->update('admin', $data, array('email' => $email));
    }

    public function login($email){
      return $this->db->get_where('admin',array('email' => $email));
    }

    public function logout(){
      $this->session->unset_userdata('id_admin');
      $this->session->unset_userdata('username_admin');
    }

    function getAllProductImagesByIdBarang($idToko,$idBarang){
      $result = $this->db->query("SELECT nama_foto FROM foto WHERE id_toko = '$idToko' AND id_barang = '$idBarang'");
      return $result->result_array();
    }

    public function getTransaksiBerlangsung(){
      return $this->db->query("SELECT * FROM transaksi WHERE status != 5")->result_array();
    }

    public function getTransaksiByInvoice($inv){
      return $this->db->query("SELECT * FROM transaksi t, detail_transaksi dt
      WHERE t.invoice = dt.invoice AND t.invoice = '$inv' GROUP BY t.invoice")->result_array();
    }

    public function getTransaksiDetail($inv){
      return $this->db->query("SELECT * FROM detail_transaksi dt,barang b, ukuran u
      WHERE dt.invoice = '$inv' AND b.id_barang = dt.id_barang AND u.id_ukuran = dt.id_ukuran")->result_array();
    }

    public function getTransaksiSelesai(){
      return $this->db->query("SELECT * FROM transaksi WHERE status = 5")->result_array();
    }

    public function getSaldoToko(){
      return $this->db->query("SELECT SUM(saldo) FROM toko")->result_array()[0];
    }

    public function getSaldo(){
      return $this->db->query("SELECT * FROM saldo_qshoes WHERE total_bayar != 0")->result_array();
    }

    public function getProfit(){
      return $this->db->query("SELECT * FROM saldo_qshoes WHERE profit = 4000")->result_array();
    }

    public function getAllUsers(){
      return $this->db->get("user")->result_array();
    }

    public function getTokoDataByIdUser($idUser){
      return $this->db->get_where('toko',array('id_user' => $idUser))->result_array();
    }

    public function getTransaksiSelesaiByName($nama){
      if ($nama == '') {
        return $this->db->query("SELECT * FROM transaksi WHERE status = 5")->result_array();
      } else {
        return $this->db->query("SELECT * FROM transaksi WHERE status = 5 AND nama_penerima LIKE '%$nama%'")->result_array();
      }
    }
  }
?>