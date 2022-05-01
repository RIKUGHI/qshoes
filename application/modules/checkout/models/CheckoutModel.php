<?php
  defined('BASEPATH') OR exit('No direct script access allowed');

  class CheckoutModel extends CI_Model{

    public function getTokoData($idUser){
      return $this->db->get_where('toko',array('id_user' => $idUser));
    }

    public function getUserData($idUser){
      return $this->db->get_where('user',array('id_user' => $idUser))->result_array()[0];
    }

    public function getKeranjangUser($idUser){
      return $this->db->query("SELECT * FROM keranjang k,ukuran u 
      WHERE k.id_ukuran = u.id_ukuran AND id_user = '$idUser' ORDER BY u.id_toko ASC")->result_array();
    }

    public function getMyOrder($idUser){
      return $this->db->query("SELECT * FROM transaksi t,detail_transaksi dt 
      WHERE t.invoice = dt.invoice AND dt.id_user = '$idUser' AND t.status != 5 GROUP BY t.invoice ORDER BY t.no_transaksi ASC")->result_array(); 
    }

    public function getCompleteKeranjangUser($idUser){
      return $this->db->query("SELECT * FROM keranjang k,ukuran u 
      WHERE k.id_ukuran = u.id_ukuran AND k.id_user = '$idUser' GROUP BY u.id_toko")->result_array();
    }

    public function getDetailKeranjangUser($idUser,$idToko){
      return $this->db->query("SELECT * FROM keranjang k,ukuran u 
      WHERE k.id_ukuran = u.id_ukuran AND u.id_toko = '$idToko' AND k.id_user = '$idUser'")->result_array();
    }

    public function getProdukByIdBarang($idBarang){
      return $this->db->get_where('barang',array('id_barang' => $idBarang))->result_array();
    }

    public function getTokoByIdToko($idToko){
      return $this->db->get_where('toko',array('id_toko' => $idToko))->result_array();
    }

    public function getUkuranByIdukuran($idUkuran){
      return $this->db->get_where('ukuran',array('id_ukuran' => $idUkuran))->result_array();
    }

    public function getFotoByIdBarang($idBarang){
      return $this->db->get_where('foto',array('id_barang' => $idBarang))->result_array();
    }

    public function getInvoice(){
      $today = date('Y-m-d');

      $max = $this->db->query("SELECT MAX(no_transaksi) AS max_no FROM transaksi WHERE tanggal = '$today'")->result_array()[0];
      
      if ($max['max_no'] == '') {
        return sprintf('%07s',1);
      } else {
        $trans = $this->db->get_where('transaksi', array('no_transaksi' => $max['max_no']))->result_array()[0];
        $split = explode('/', $trans['invoice']);
        $getNo = end($split) + 1;
        return sprintf('%07s', $getNo);
      }
    }

    public function getGroupTransaction(){
      $max = $this->db->query("SELECT MAX(no_group) AS max_no FROM saldo_qshoes")->result_array()[0];

      if ($max['max_no'] == '') {
        return 'TG-'.sprintf('%04s',1);
      } else {
        $g = $this->db->get_where('saldo_qshoes', array('no_group' => $max['max_no']))->result_array()[0];
        $split = explode('-',$g['transaksi_group']);
        $getNo = end($split) + 1;
        return 'TG-'.sprintf('%04s', $getNo);
      }
      
    }

    public function createOrder($data){
      return $this->db->insert('transaksi', $data);
    }

    public function createDetailOrder($detail){
      $this->db->insert('detail_transaksi', $detail);
    }
    
    public function createSaldo($saldo){
      $this->db->insert('saldo_qshoes', $saldo);
    }

    public function deleteKeranjangUser($idUser){
      $this->db->delete('keranjang', array('id_user' => $idUser));
    }

    public function getNewOrder($idToko){
      return $this->db->query("SELECT t.invoice,t.tanggal,t.waktu,t.nama_penerima,t.nomer_hp,t.provinsi,t.kota,t.detail_alamat
      FROM transaksi t,detail_transaksi dt 
      WHERE t.invoice = dt.invoice AND dt.id_toko = '$idToko' AND t.status = 1 GROUP BY t.invoice")->result_array();
    }

    public function getUnreadMsg($idToko){
      return $this->db->get_where('chat',array('id_toko' => $idToko))->result_array();
    }

  }
?>