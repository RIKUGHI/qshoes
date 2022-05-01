

  <header>
    <div class="logo">
      <a href="<?= base_url(''); ?>">
        <img src="<?= base_url('assets/Project Toko Online/icon/qshoes.png'); ?>" alt="">
      </a>
    </div>
    <div class="search-box" style="display: none;">
      <form action="" id="form-search-h">
        <input type="text" placeholder="Search..." id="input-search-h">
        <button>
          <i class="fas fa-search"></i>
        </button>
      </form>
    </div>
    <div class="notify-user" id="notify-user">
      <div class="search-popup" style="display: none;">
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
            <!-- <span class="count">1</span> -->
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
              <div class="info">
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
                <span>Logout</span>
              </div>
            </div>
          </div>
        </div>
        <?php endif ; ?>
      </div>
    </div>
  </header>

  <div class="search-control" style="display:  none;">
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

  <div class="banner-container">
    <div class="banner-image"></div>
    <div class="center-box">
      <div class="motto">
        <h1>PELINDUNG KAKIMU</h1>
        <h1>ADALAH FASHIONMU</h1>
      </div>
      <div class="search-box">
        <form action="" id="form-search">
          <input type="text" placeholder="Search..." autocomplete="off" id="search-input">
          <button>
            <i class="fas fa-search"></i>
          </button>
        </form>
        <div class="search-results" style="display: none;" id="search-results"></div>
      </div>
    </div>
  </div>
  
  <div class="brands-container">
    <div class="brands-group">
      <div class="brand active">All</div>
      <div class="brand">VENTELA</div>
      <div class="brand">PATROBAS</div>
      <div class="brand">CAMPUSS</div>
      <div class="brand">WARRIOR</div>
    </div>
  </div>

  <div class="distance-contents"></div>

  <div class="main-container">
    <div class="popular-products-container">
      <div class="tittle-header">
        <span>
          Popular Products
        </span>
      </div>
      <div class="popular-products">
        <a href="<?= base_url('search?nama_barang=ventela'); ?>" class="product">
          <img src="<?= base_url('assets/Project Toko Online/image/banner/p1.jpg'); ?>" alt="">
        </a>
        <a href="<?= base_url('search?nama_barang=patrobas'); ?>" class="product">
          <img src="<?= base_url('assets/Project Toko Online/image/banner/p2.jpg'); ?>" alt="">
        </a>
        <a href="<?= base_url('search?nama_barang=campuss'); ?>" class="product">
          <img src="<?= base_url('assets/Project Toko Online/image/banner/campus.jpg'); ?>" alt="">
        </a>
        <a href="<?= base_url('search?nama_barang=warrior'); ?>" class="product">
          <img src="<?= base_url('assets/Project Toko Online/image/banner/p14.jpg'); ?>" alt="">
        </a>
      </div>
    </div>

    <div class="distance-popular-products"></div>

    <div class="products-container">
      <div class="tittle-header">
        <span>
          Semua Produk
        </span>
      </div>
      <div class="show-products">

        

      </div>
      <div class="load-more">
        <button>Muat Lebih Banyak</button>
      </div>
    </div>

  </div>

  <div class="distance-contents"></div>

  <div class="popup-container"></div>

  <div class="notification-container">
    <p></p>
  </div>

  <script src="<?= base_url('assets/Project Toko Online/js/user/ShowProductsByLimit.js'); ?>"></script>