<?php
  defined('BASEPATH') OR exit('No direct script access allowed');

  class Register_model extends CI_Model{

    function daftar($data)
    {
      $this->db->insert('users', $data);
    }
  }
?>