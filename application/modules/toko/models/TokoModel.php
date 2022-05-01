<?php
  defined('BASEPATH') OR exit('No direct script access allowed');

  class TokoModel extends CI_Model{

    function create($data)
    {
      $this->db->insert('table_produk', $data);
      $this->session->set_flashdata('suksess','Tambah barang berhasil');
    }

    public function getTokoData($idUser){
      return $this->db->get_where('toko',array('id_user' => $idUser));
    }

    public function getNewOrder($idToko){
      return $this->db->query("SELECT t.invoice,t.tanggal,t.waktu,t.nama_penerima,t.nomer_hp,t.provinsi,t.kota,t.detail_alamat
      FROM transaksi t,detail_transaksi dt 
      WHERE t.invoice = dt.invoice AND dt.id_toko = '$idToko' AND t.status = 1 GROUP BY t.invoice")->result_array();
    }

    public function getMyOrder($idUser){
      return $this->db->query("SELECT * FROM transaksi t,detail_transaksi dt 
      WHERE t.invoice = dt.invoice AND dt.id_user = '$idUser' AND t.status != 5 GROUP BY t.invoice ORDER BY t.no_transaksi ASC")->result_array(); 
    }

    public function getUserData($idUser){
      return $this->db->get_where('user',array('id_user' => $idUser))->result_array()[0];
    }

    public function getInfoTokoByName($namaToko){
      return $this->db->get_where('toko',array('nama_toko' => $namaToko))->result_array();
    }

    public function getInfoTokoByDomain($domainToko){
      return $this->db->get_where('toko',array('domain_toko' => $domainToko))->result_array();
    }

    function createToko($data){
      return $this->db->insert('toko', $data);
    }

    function updateDataUser($idUser,$data){
      $this->db->update('user', $data, array('id_user' => $idUser));
    }

    function createKeranjang($data){
      return $this->db->insert('keranjang', $data);
    }

    public function updateKeranjang($data, $idUser, $idBarang, $idUkuran){
      return $this->db->update('keranjang', $data, array('id_user' => $idUser, 'id_barang' => $idBarang, 'id_ukuran' => $idUkuran));
    }

    public function getInfoKeranjangById($idUser, $idBarang, $idUkuran){
      return $this->db->get_where('keranjang',array('id_user' => $idUser, 'id_barang' => $idBarang, 'id_ukuran' => $idUkuran))->result_array();
    }

    public function getInfoUkuran($idUkuran){
      return $this->db->get_where('ukuran',array('id_ukuran' => $idUkuran))->result_array();
    }

    public function getBarangByIdBarang($idBarang){
      return $this->db->get_where('barang',array('id_barang' => $idBarang))->result_array();
    }

    public function getUnreadMsg($idToko){
      return $this->db->get_where('chat',array('id_toko' => $idToko))->result_array();
    }
  }
?>