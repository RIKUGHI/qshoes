<?php
  defined('BASEPATH') OR exit('No direct script access allowed');

  class ApiModel extends CI_Model{

    public function login($email){
      return $this->db->get_where('user',array('email' => $email));
    }

    public function logout(){
      $this->session->unset_userdata('username');
      $this->session->unset_userdata('id_user');
      $this->session->unset_userdata('id_toko');
      $this->session->unset_userdata('nama_toko');
    }

    public function getTokoData($idUser){
      return $this->db->get_where('toko',array('id_user' => $idUser));
    }

    public function getUserData($idUser){
      return $this->db->get_where('user',array('id_user' => $idUser))->result_array()[0];
    }

    public function resendCode($data,$email){
      $this->db->update('user', $data, array('email' => $email));
    }

    public function updateStatus($data,$idUser){
      $this->db->update('user', $data, array('id_user' => $idUser));
    }

    public function deleteAccountBeforeVerification($email){
      return $this->db->delete('user', array('email' => $email));
    }

    public function updateVerificationEmail($email,$data){
      $this->db->update('user', $data, array('email' => $email));
    }

    public function checkOtpCodeByEmail($email,$code){
      $query = $this->db->query("SELECT * FROM user WHERE email = '$email' AND code_otp = '$code'");
      return $query->result_array();
    }

    public function createUser($data){
      return $this->db->insert('user', $data);
    }

    public function isAvailableEmail($email){
      $query = $this->db->query("SELECT * FROM user WHERE email = '$email'");
      return $query->result_array();
    }

    public function isAvailableUsername($username){
      $query = $this->db->query("SELECT * FROM user WHERE username = '$username'");
      return $query->result_array();
    }

    function getDataUkuranByIdUkuran($idUkuran){
      $query = $this->db->query("SELECT * FROM ukuran WHERE id_ukuran = '$idUkuran'");
      return $query->result_array()[0];
    }

    function getTokoByDomain($domain){
      $query = $this->db->query("SELECT * FROM toko WHERE domain_toko = '$domain'");
      return $query->result_array();
    }

    function getProductBySlug($idToko,$slug){
      $result = $this->db->query("SELECT * FROM barang WHERE id_toko = '$idToko' AND slug = '$slug'");
      return $result->result_array();
    }

    function getTokoByIdToko($idToko){
      $query = $this->db->query("SELECT * FROM toko WHERE id_toko = '$idToko'");
      return $query->result_array();
    }

    public function getAllToko(){
      return $this->db->get('toko')->result_array();
    }

    function getAllProducts($limit){
      $query = $this->db->query("SELECT * FROM barang LIMIT 0,$limit");
      return $query->result_array();
    }

    public function getAllProductsByName($namaBarang,$strt,$limit){
      return $this->db->query("SELECT * FROM barang WHERE nama_barang LIKE '%$namaBarang%' LIMIT $strt,$limit")->result_array();
    }

    public function getJumlahHalaman($namaBarang, $jumlahDataPerHalaman){
      return ceil($this->db->query("SELECT * FROM barang WHERE nama_barang LIKE '%$namaBarang%'")->num_rows() / $jumlahDataPerHalaman);
    }

    function getProductByIdBarang($idToko,$idBarang){
      $result = $this->db->query("SELECT * FROM barang WHERE id_toko = '$idToko' AND id_barang = '$idBarang'");
      return $result->result_array();
    }

    function getAllProductsByIdToko($idToko){
      $result = $this->db->query("SELECT * FROM barang WHERE id_toko = '$idToko'");
      return $result->result_array();
    }
    
    function getAllProductImagesByIdBarang($idToko,$idBarang){
      $result = $this->db->query("SELECT id_foto,nama_foto FROM foto WHERE id_toko = '$idToko' AND id_barang = '$idBarang'");
      return $result->result_array();
    }

    public function getProductImagesByIdBarang($idBarang){
      return $this->db->get_where('foto',array('id_barang' => $idBarang))->result_array();
    }

    public function getProductHargaByIdBarang($idBarang){
      return $this->db->get_where('ukuran',array('id_barang' => $idBarang))->result_array();
    }
    
    function getAllProductUkuranByIdBarang($idToko,$idBarang){
      $result = $this->db->query("SELECT id_ukuran,ukuran,harga,stok FROM ukuran WHERE id_toko = '$idToko' AND id_barang = '$idBarang'");
      return $result->result_array();
    }

    public function checkMyChatMemberByIdToko($idUser,$idToko){
      return $this->db->query("SELECT * FROM chat WHERE id_user = '$idUser' AND id_toko = $idToko GROUP BY id_toko")->result_array();
    }

    public function getMyChatMember($idUser){
      return $this->db->query("SELECT * FROM chat c, toko t
      WHERE c.id_user = '$idUser' AND c.id_toko = t.id_toko GROUP BY c.id_toko ORDER BY c.no_chat ASC")->result_array();
    }

    public function getLastMsg($idUser,$idToko){
      return $this->db->query("SELECT * FROM chat WHERE id_user = '$idUser' AND id_toko = '$idToko' ORDER BY no_chat DESC")->result_array();
    }

    public function getUnreadMsg($idUser,$idToko){
      return $this->db->get_where('chat',array('id_user' => $idUser, 'id_toko' => $idToko))->result_array();
    }

    public function getMyChatContentGroupByDate($idUser,$idToko){
      return $this->db->query("SELECT * FROM chat WHERE id_user = '$idUser' AND id_toko = '$idToko' GROUP BY date")->result_array();
    }

    public function getMyChatContentByDate($idUser,$idToko,$date){
      return $this->db->get_where('chat',array('id_user' => $idUser, 'id_toko' => $idToko, 'date' => $date))->result_array();
    }

    public function createMsg($data){
      return $this->db->insert('chat', $data);
    }

    public function deleteChat($idUser,$idToko){
      return $this->db->delete('chat', array('id_user' => $idUser, 'id_toko' => $idToko));
    }

    public function updateStatusRead($data,$idUser,$idToko){
      $this->db->update('chat', $data, array('id_user' => $idUser, 'id_toko' => $idToko));
    }
  } 
?>