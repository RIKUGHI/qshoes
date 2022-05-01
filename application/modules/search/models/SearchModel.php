<?php
  defined('BASEPATH') OR exit('No direct script access allowed');

  class SearchModel extends CI_Model{

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

    public function getMyOrder($idUser){
      return $this->db->query("SELECT * FROM transaksi t,detail_transaksi dt 
      WHERE t.invoice = dt.invoice AND dt.id_user = '$idUser' AND t.status != 5 GROUP BY t.invoice ORDER BY t.no_transaksi ASC")->result_array(); 
    }

    public function getUnreadMsg($idToko){
      return $this->db->get_where('chat',array('id_toko' => $idToko))->result_array();
    }

  }
?>