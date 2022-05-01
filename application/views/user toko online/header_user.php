
  
  <header>
    <div class="logo">
      <a href="<?= base_url(''); ?>">
        <img src="<?= base_url('assets/Project Toko Online/icon/qshoes.png'); ?>" alt="">
      </a>
    </div>
    <div class="search-box">
      <form action="" id="form-search-h">
        <input type="text" placeholder="Search..." autocomplete="off" id="input-search-h">
        <button>
          <i class="fas fa-search"></i>
        </button>
      </form>
      <div class="search-results" id="search-results-h"></div>
    </div>
    <div class="notify-user" id="notify-user">
      <div class="search-popup">
        <div class="search">
          <a href="">
            <img src="<?= base_url('assets/Project Toko Online/icon/search.svg'); ?>">
            <!-- <span>1</span> -->
          </a>
        </div>
      </div>

      <?php if ($this->session->userdata('username') != '') : ?>
      <div class="shopping-cart">
        <div class="cart">
          <a href="<?= base_url('keranjang'); ?>">
            <img src="<?= base_url('assets/Project Toko Online/icon/cart.svg'); ?>" alt="">
          </a>
        </div>
        <div class="container-cart">
          <div class="content-cart">
            <div class="tittle">
              <h4>Keranjang</h4>
              <a href="<?= base_url('keranjang'); ?>">Check Keranjang</a>
            </div>
            <div class="container-card"></div>
          </div>
        </div>
      </div>
      <?php endif ; ?>

      <?php if ($this->session->userdata('username') != '') : ?>
      <div class="notify-order">
        <div class="order">
          <a href="<?= base_url('user/order'); ?>">
            <img src="<?= base_url('assets/Project Toko Online/icon/bell.svg'); ?>">
            <?php if ($my_total_order != 0) : ?>
              <span><?= $my_total_order; ?></span>
            <?php endif ; ?>
          </a>
        </div>
        <div class="container-order">
          <div class="content-order">
            <div class="tittle">
              <h4>Transaksi</h4>
            </div>
            <div class="container-transaksi">
              <div class="transaksi-card">
                <a href="<?= base_url('user/order?status=menunggu_konfirmasi'); ?>">
                  <i class="fas fa-hourglass-half">
                  <?php if ($menunggu_konfirmasi != 0) : ?>
                    <span><?= $menunggu_konfirmasi; ?></span>
                  <?php endif ; ?>
                  </i>
                  <h5>Menunggu Konfirmasi</h5>
                </a>
              </div>
              <div class="transaksi-card">
                <a href="<?= base_url('user/order?status=diproses'); ?>">
                  <i class="fas fa-spinner">
                  <?php if ($diproses != 0) : ?>
                    <span><?= $diproses; ?></span>
                  <?php endif ; ?>
                  </i>
                  <h5>Sedang Diproses</h5>
                </a>
              </div>
              <div class="transaksi-card">
                <a href="<?= base_url('user/order?status=dikirim'); ?>">
                  <i class="fas fa-car-side">
                  <?php if ($dikirim != 0) : ?>
                    <span><?= $dikirim; ?></span>
                  <?php endif ; ?>
                  </i>
                  <h5>Sedang Dikirim</h5>
                </a>
              </div>
              <div class="transaksi-card">
                <a href="<?= base_url('user/order?status=tiba_di_tujuan'); ?>">
                  <i class="fas fa-map-marker-alt">
                  <?php if ($tiba_di_tujuan != 0) : ?>
                    <span><?= $tiba_di_tujuan; ?></span>
                  <?php endif ; ?>
                  </i>
                  <h5>Sampai Tujuan</h5>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <?php endif ; ?>

      <?php if ($this->session->userdata('username') != '') : ?>
      <div class="notify-message">
        <div class="message">
          <a href="<?= base_url('user/chat'); ?>" id="notif-msg">
            <img src="<?= base_url('assets/Project Toko Online/icon/message.svg'); ?>">
          </a>
        </div>
      </div>
      <?php endif ; ?>

      <div class="account-user">
        <div class="user" data-login="<?= $this->session->userdata('username') != '' ? 'true' : 'false' ?>">
          <a href="<?= base_url('user'); ?>">
            <img src="<?= base_url('assets/Project Toko Online/icon/user.svg'); ?>" class="default-image">
            <!-- <img src="<?= base_url('assets/Project Toko Online/image/users/pp.JPG'); ?>"> -->
          </a>
        </div>
        <?php if ($this->session->userdata('username') != '') : ?>
        <div class="container-info-account">
          <div class="info-account">
            <div class="info">
              <a href="<?= base_url('user'); ?>">
                <div class="container-image">
                  <div class="circle-image">
                    <?php if ($gambar_user != null) : ?>
                      <img src="<?= base_url('assets/Project Toko Online/image/users/'.$gambar_user); ?>">
                    <?php else : ?>
                        <i class="far fa-user"></i>
                    <?php endif; ?>
                  </div>
                </div>
                <div class="more-info">
                  <span class="name">
                    <?= $username; ?>
                  </span>
                  <span class="check">
                    Lihat profil
                  </span>
                </div>
              </a>
            </div>
            <div class="border-bot"></div>
            <?php if ($nama_toko != '') : ?>
              <div class="info" id="info-toko">
                <a href="<?= base_url('seller'); ?>">
                  <div class="container-image">
                    <div class="circle-image">
                      <?php if ($gambar_toko != '') : ?>
                        <img src="<?= base_url('assets/Project Toko Online/image/users/'.$gambar_toko); ?>">
                      <?php else : ?>
                        <i class="fas fa-store"></i>
                      <?php endif ; ?>
                    </div>
                  </div>
                  <div class="more-info">
                    <span class="name">
                      <?= $nama_toko; ?>
                    </span>
                    <span class="check">
                      Lihat Toko
                    </span>
                  </div>
                  <?php if ($total_order != 0) : ?>
                  <span class="unread-notif"><?= $total_order; ?></span>
                  <?php endif ; ?>
                </a>
              </div>
            <?php else : ?>
              <div class="info">
                <a href="<?= base_url('toko/daftar'); ?>">
                  <div class="container-image">
                    <div class="circle-image">
                      <!-- <img src="<?= base_url('assets/Project Toko Online/image/users/foto profile.png'); ?>"> -->
                      <i class="fas fa-store"></i>
                    </div>
                  </div>
                  <div class="more-info">
                    <span class="name">
                      Buat Tokomu
                    </span>
                    <span class="check">
                      Klik Disini
                    </span>
                  </div>
                </a>
              </div>
            <?php endif; ?>
            <div class="border-bot"></div>
            <div class="nav-btn-container" id="logout-btn">
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
        <?php endif ; ?>
      </div>
    </div>
  </header>