

  <div class="search-control">
    <div class="search-box">
      <form action="" id="form-search-c">
        <input type="text" placeholder="Search..." autocomplete="off" id="input-search-c">
        <button>
          <i class="fas fa-search"></i>
        </button>
      </form>
      <div class="search-results" id="search-results-c" style="display: none;"></div>
    </div>
  </div>

  <div class="profile-container ubah-profil">
    <?php $this->load->view('user toko online/sidebar'); ?>

    <div class="main-content-container">
      <div class="user-image">
        <div class="square-image">
          <img src=""> 
        </div>
        <input type="file" id="input-gambar" hidden>
        <button>Ubah Foto</button>
        <p>
          Besar file maks 5mb. 
          Ekstensi file yang diperbolehkan: JPG .JPEG .PNG
        </p>
      </div>
      <div class="user-edit">
        <div class="data-group">
          <span>Nama</span>
          <span>-</span>
          <button>ubah</button>
        </div>
        <div class="data-group">
          <span>Email</span>
          <span>-</span>
          <div class="status">-</div>
          <button>Ubah</button>
        </div>
        <div class="data-group">
          <span>Password</span>
          <span>*************</span>
          <button>Ubah</button>
        </div>
        <div class="data-group">
          <span>Nomer Hp</span>
          <span>-</span>
          <button>Tambah Nomer Hp</button>
        </div>
      </div>
    </div>
  </div>

  <div class="black-background-sidebar"></div>

  <div class="popup-container"></div>

  <div class="notification-container">
    <p></p>
  </div>

  <div class="distance-contents"></div>

  <?php	$this->load->view('user toko online/footer_rules'); ?>
  

  <script src="<?= base_url('assets/Project Toko Online/js/user/SideBarActive.js'); ?>"></script>
  <script src="<?= base_url('assets/Project Toko Online/js/user/UbahProfil.js'); ?>"></script>