
  
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

  <div class="profile-container order-status">
    <?php $this->load->view('user toko online/sidebar'); ?>

    <div class="main-content-container">
      <div class="order-status-container">
        <label>Status</label>
        <div class="wrapper">
          <div class="status">
            <button>Semua</button>
            <button>Menunggu Konfirmasi</button>
            <button>Diproses</button>
            <button>Dikirim</button>
            <button>Tiba di Tujuan</button>
          </div>
        </div>
      </div>
      <div class="order-container"></div>
    </div>
  </div>

  <div class="black-background-sidebar"></div>

  <div class="distance-contents"></div>

  <div class="popup-container"></div>

  <div class="notification-container">
    <p></p>
  </div>

  <?php	$this->load->view('user toko online/footer_rules'); ?>

  
  <script src="<?= base_url('assets/Project Toko Online/js/user/SideBarActive.js'); ?>"></script>
  <script src="<?= base_url('assets/Project Toko Online/js/user/MyOrder.js'); ?>"></script>
