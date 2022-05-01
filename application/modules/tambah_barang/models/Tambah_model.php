<?php
  defined('BASEPATH') OR exit('No direct script access allowed');

  class Tambah_model extends CI_Model{

    function create($data)
    {
      $this->db->insert('table_produk', $data);
      $this->session->set_flashdata('suksess','Tambah barang berhasil');
    }
  }
?>