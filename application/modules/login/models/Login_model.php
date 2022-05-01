<?php
  defined('BASEPATH') OR exit('No direct script access allowed');

  class Login_model extends CI_Model{

    function login($username,$password)
    {
      //cek username dan password
      $query = $this->db->get_where('users',array('username'=>$username,'password' => md5($password)));
      if($query->num_rows() == 1) {
        //ambil data user berdasar username
        $row = $this->db->query('SELECT id_user FROM users where username = "'.$username.'"');
        $admin = $row->row();
        $id = $admin->id_user;
        //set session user
        $this->session->set_userdata('id_login', uniqid(rand()));
        $this->session->set_userdata('id', $id);
        $this->session->set_userdata('username', $username);
        redirect(site_url('dashboard'));
      }else{
        //jika tidak ada, set notifikasi dalam flashdata.
        $this->session->set_flashdata('sukses','Username atau password anda salah, silakan coba lagi.. ');
        redirect(site_url('login'));
      }
    }

    function logout()
    {
      $this->session->unset_userdata('username');
      $this->session->unset_userdata('id_login');
      $this->session->unset_userdata('id');
      redirect(site_url('login')); 
    }



  }
?>