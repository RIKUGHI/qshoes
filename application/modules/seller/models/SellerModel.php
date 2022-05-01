<?php
  defined('BASEPATH') OR exit('No direct script access allowed');

  class SellerModel extends CI_Model{

    public function getTokoData($idToko){
      return $this->db->get_where('toko',array('id_toko' => $idToko))->result_array();
    }

    public function getUserData($idUser){
      return $this->db->get_where('user',array('id_user' => $idUser))->result_array()[0];
    }

    public function updateFotoToko($data, $idToko){
      return $this->db->update('toko', $data, array('id_toko' => $idToko));
    }

    public function getStock($idToko){
      return $this->db->get_where('ukuran',array('id_toko' => $idToko))->result_array();
    }

    public function getProductByName($idToko, $nm){
      if ($nm == '') {
        return $this->db->query("SELECT * FROM barang WHERE id_toko = '$idToko'")->result_array(); 
      } else {
        return $this->db->query("SELECT * FROM barang WHERE id_toko = '$idToko' AND nama_barang LIKE '%$nm%'")->result_array(); 
      }
    }

    function deleteProductSizeByIdUkuran($idToko,$idBarang,$idUkuran){
      return $this->db->delete('ukuran', array('id_toko' => $idToko, 'id_barang' => $idBarang, 'id_ukuran' => $idUkuran));
    }

    function deleteProductImageByIdFoto($idToko,$idBarang,$idFoto){
      return $this->db->delete('foto', array('id_toko' => $idToko, 'id_barang' => $idBarang, 'id_foto' => $idFoto));
    }

    function getProductImageByIdFoto($idToko,$idBarang,$idFoto){
      $result = $this->db->query("SELECT nama_foto FROM foto WHERE id_toko = '$idToko' AND id_barang = '$idBarang' and id_foto = '$idFoto'");
      return $result->result_array()[0]['nama_foto'];
    }

    function getAllProductImagesByIdBarang($idToko,$idBarang){
      $result = $this->db->query("SELECT nama_foto FROM foto WHERE id_toko = '$idToko' AND id_barang = '$idBarang'");
      return $result->result_array();
    }

    function isDuplicateProductName($idToko,$namaBarang){
      $result = $this->db->query("SELECT * FROM barang WHERE id_toko = '$idToko' AND nama_barang = '$namaBarang'");
      return $result->result_array();
    }

    function getMaxIdBarang($idToko){
      $result = $this->db->query("SELECT MAX(id_barang) AS max_id_barang FROM barang WHERE id_toko = '$idToko'");
      return $result->result_array()[0]['max_id_barang'];
    }

    function isDuplicateImageName($idToko,$oriFileName){
      $result = $this->db->query("SELECT * FROM foto WHERE id_toko = '$idToko' AND nama_foto = '$oriFileName'");
      return $result->result_array();
    }

    function getMaxIdFoto(){
      $result = $this->db->query("SELECT MAX(id_foto) AS max_id_foto FROM foto");
      return $result->result_array()[0]['max_id_foto'] + 1;
    }

    function createDataProduk($data){
      $this->db->insert('barang', $data);
    }

    function createDataFoto($data){
      $this->db->insert('foto', $data);
    }

    function createDataUkuran($data){
      $this->db->insert('ukuran', $data);
    }

    function updateDataProduk($idToko,$idBarang,$data){
      $this->db->update('barang', $data, array('id_toko' => $idToko, 'id_barang' => $idBarang));
    }

    function updateDataFoto($idToko,$idBarang,$idFoto,$data){
      $this->db->update('foto', $data, array('id_toko' => $idToko, 'id_barang' => $idBarang, 'id_foto' => $idFoto));
    }

    function updateDataUkuran($idToko,$idBarang,$idUkuran,$data){
      $this->db->update('ukuran', $data, array('id_toko' => $idToko, 'id_barang' => $idBarang, 'id_ukuran' => $idUkuran));
    }

    function deleteDataProduct($idToko,$idBarang){
      return $this->db->delete('barang', array('id_toko' => $idToko, 'id_barang' => $idBarang));
    }
    
    function deleteDataFoto($idToko,$idBarang){
      return $this->db->delete('foto', array('id_toko' => $idToko, 'id_barang' => $idBarang));
    }
    
    function deleteDataUkuran($idToko,$idBarang){
      return $this->db->delete('ukuran', array('id_toko' => $idToko, 'id_barang' => $idBarang));
    }

    public function getNewOrder($idToko){
      return $this->db->query("SELECT t.invoice,t.tanggal,t.waktu,t.transaksi_group,t.nama_penerima,t.nomer_hp,t.provinsi,t.kota,t.detail_alamat,t.status
      FROM transaksi t,detail_transaksi dt 
      WHERE t.invoice = dt.invoice AND dt.id_toko = '$idToko' AND t.status = 1 GROUP BY t.invoice")->result_array();
    }

    public function getNewDetailsOrder($invoice,$idToko){
      return $this->db->query("SELECT * FROM detail_transaksi dt,barang b,ukuran u 
      WHERE dt.invoice = '$invoice' AND b.id_barang = dt.id_barang AND u.id_ukuran = dt.id_ukuran AND dt.id_toko = '$idToko'")->result_array();
    }

    public function getNewOrderByInvoice($idToko, $invoice){
      return $this->db->query("SELECT t.invoice,t.tanggal,t.waktu,t.transaksi_group,t.nama_penerima,t.nomer_hp,t.provinsi,t.kota,t.detail_alamat,t.status
      FROM transaksi t,detail_transaksi dt 
      WHERE t.invoice = dt.invoice AND dt.id_toko = '$idToko' AND dt.invoice = '$invoice' GROUP BY t.invoice")->result_array();
    }

    public function getDikirim($idToko){
      return $this->db->query("SELECT *
      FROM transaksi t,detail_transaksi dt 
      WHERE t.invoice = dt.invoice AND dt.id_toko = '$idToko' AND t.status = 3 GROUP BY t.invoice")->result_array();
    }

    public function confirmOrder($data, $invoice){
      return $this->db->update('transaksi', $data, array('invoice' => $invoice));
    }

    public function getShopOrders($idToko){
      return $this->db->query("SELECT * FROM transaksi t, detail_transaksi dt,barang b, toko tk,ukuran u
      WHERE t.invoice = dt.invoice AND tk.id_toko = dt.id_toko AND b.id_barang = dt.id_barang AND u.id_ukuran = dt.id_ukuran AND
      t.status != 1 AND t.status != 5 AND dt.id_toko = '$idToko' 
      GROUP BY t.invoice ORDER BY t.no_transaksi DESC")->result_array();
    }

    public function getShopOrderDetails($invoice){
      return $this->db->query("SELECT * FROM transaksi t,detail_transaksi dt,barang b,ukuran u
      WHERE t.invoice = dt.invoice AND b.id_barang = dt.id_barang AND u.id_ukuran = dt.id_ukuran AND dt.invoice = '$invoice'")->result_array();
    }

    public function getTransaksiSelesai($idToko, $inv){
      if ($inv == '') {
        return $this->db->query("SELECT *
        FROM transaksi t,detail_transaksi dt 
        WHERE t.invoice = dt.invoice AND dt.id_toko = '$idToko' AND t.status = 5 GROUP BY t.invoice")->result_array();
      } else {
        return $this->db->query("SELECT *
        FROM transaksi t,detail_transaksi dt 
        WHERE t.invoice = dt.invoice AND dt.id_toko = '$idToko' AND t.invoice LIKE '%$inv%' AND t.status = 5 GROUP BY t.invoice")->result_array();
      }
    }

    public function getDetailTransaksiSelesai($inv, $idToko){
      if ($inv == '') {
        return $this->db->query("SELECT * FROM transaksi t,detail_transaksi dt,barang b,ukuran u 
        WHERE t.invoice = dt.invoice AND b.id_barang = dt.id_barang AND u.id_ukuran = dt.id_ukuran AND 
        dt.id_toko = '$idToko' AND t.status = 5")->result_array(); 
      } else {
        return $this->db->query("SELECT * FROM transaksi t,detail_transaksi dt,barang b,ukuran u 
        WHERE t.invoice = dt.invoice AND dt.invoice LIKE '%$inv%' AND b.id_barang = dt.id_barang AND u.id_ukuran = dt.id_ukuran AND 
        dt.id_toko = '$idToko' AND t.status = 5")->result_array();
      }
    }

    public function getProductByIdBarang($idToko,$idBarang){
      return $this->db->get_where('barang',array('id_toko' => $idToko, 'id_barang' => $idBarang))->result_array();
    }

    public function getProductSizeByIdUkuran($idUkuran){
      return $this->db->get_where('ukuran',array('id_ukuran' => $idUkuran))->result_array()[0];
    }

    public function getMyChatMember($idToko){
      return $this->db->query("SELECT * FROM chat c, user u
      WHERE c.id_toko = '$idToko' AND c.id_user = u.id_user GROUP BY u.id_user ORDER BY c.no_chat ASC")->result_array();
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

    public function updateSaldo($data,$idToko){
      return $this->db->update('toko', $data, array('id_toko' => $idToko));
    }
  }
?>