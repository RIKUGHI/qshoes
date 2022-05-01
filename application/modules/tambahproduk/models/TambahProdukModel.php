<?php
  defined('BASEPATH') OR exit('No direct script access allowed');

  class TambahProdukModel extends CI_Model{

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

  }
?>