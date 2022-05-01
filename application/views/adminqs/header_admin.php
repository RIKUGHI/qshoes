

  <div class="header-seller">
    <div class="wrapper">
      <div class="menu-toggle">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="logo">
        <a href="<?= base_url(); ?>">
          <img src="<?= base_url('assets/Project Toko Online/icon/qshoes.png'); ?>">
        </a>
      </div>
    </div>
    <div class="account-user">
      <div class="user">
        <a href="">
          <!-- <img src="<?= base_url('assets/Project Toko Online/icon/user.svg'); ?>" class="default-image"> -->
          <img src="<?= base_url('assets/Project Toko Online/image/users/pp.JPG'); ?>">
        </a>
        <span><?= $username_admin; ?></span>
      </div>
      <div class="container-info-account">
        <div class="info-account">
          <div class="info">
            <a href="<?= base_url(''); ?>">
              <div class="container-image">
                <div class="circle-image">
                  <img src="<?= base_url('assets/Project Toko Online/icon/no-shop-image.jpg'); ?>">
                </div>
              </div>
              <div class="more-info">
                <span class="name">Beranda</span>
                <span class="check">Kembali ke Beranda</span>
              </div>
            </a>
          </div>
          <div class="border-bot"></div>
          <div class="info" id="info-toko">
            <a href="<?= base_url('toko'); ?>">
              <div class="container-image">
                <div class="circle-image">
                  <img src="<?= base_url('assets/Project Toko Online/icon/no-shop-image.jpg'); ?>">
                </div>
              </div>
              <div class="more-info">
                <span class="name">Mitra</span>
                <span class="check">Lihat Mitra</span>
              </div>
            </a>
          </div>
          <div class="border-bot"></div>
          <div class="nav-btn-container"  id="logout-btn">
            <div class="icon-container">
              <div class="icon">
                <img src="<?= base_url('assets/Project Toko Online/icon/keluar.svg'); ?>">
              </div>
            </div>
            <div class="icon-info">
              <span>
                Logout
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>