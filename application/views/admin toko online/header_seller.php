

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
    <div class="search-box">
      <form action="" id="form-search-s">
        <input type="text" placeholder="Search..." autocomplete="off" id="search-input-s">
        <button>
          <i class="fas fa-search"></i>
        </button>
      </form>
    </div>
    <div class="account-user">
      <div class="user">
        <a href="">
          <!-- <img src="<?= base_url('assets/Project Toko Online/icon/user.svg'); ?>" class="default-image"> -->
          <img src="<?= base_url('assets/Project Toko Online/image/users/pp.JPG'); ?>">
        </a>
        <span><?= $nama_toko; ?></span>
      </div>
      <div class="container-info-account">
        <div class="info-account">
          <div class="info">
            <a href="<?= base_url('user'); ?>">
              <div class="container-image">
                <div class="circle-image">
                  <?php if ($gambar_user == '' || $gambar_user == null) : ?>
                    <i class="far fa-user"></i>
                  <?php else : ?>
                    <img src="<?= base_url('assets/Project Toko Online/image/users/'.$gambar_user); ?>">
                  <?php endif ; ?>
                </div>
              </div>
              <div class="more-info">
                <span class="name"><?= $username; ?></span>
                <span class="check">Lihat Profil</span>
              </div>
            </a>
          </div>
          <div class="border-bot"></div>
          <div class="info" id="info-toko">
            <a href="<?= base_url('toko/'.$domain_toko); ?>">
              <div class="container-image">
                <div class="circle-image">
                  <?php if ($gambar_toko != null) : ?>
                    <img src="<?= base_url('assets/Project Toko Online/image/users/'.$gambar_toko); ?>">
                  <?php else : ?>
                    <i class="fas fa-store"></i>
                  <?php endif ; ?>
                </div>
              </div>
              <div class="more-info">
                <span class="name"><?= $nama_toko; ?></span>
                <span class="check">Lihat dashboard toko</span>
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