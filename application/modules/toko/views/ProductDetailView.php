
  
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

  <div class="main-container detail-container">
    <div class="product-images-container">
      <div class="main-product-image loading" id="magnifying_area"></div>
      <div class="additional-product-images"></div>
    </div>
    <div class="product-desk-container">
      <h2></h2>
      <h1></h1>
      <div class="description-container">
        <div class="condition-container"></div>
        <textarea readonly></textarea>
      </div>
      <div class="shop-info">
        <a href="">
          <div class="container-image">
            <div class="circle-image">
              <!-- <img src="assets/image/foto profile.png"> -->
              <i class="fas fa-store"></i>
            </div>
          </div>
          <div class="more-info">
            <span class="name"></span>
            <span class="check">
              Lihat toko
            </span>
          </div>
        </a>
      </div>
    </div>
    <div class="shopping-cart-container">
      <div class="cart-container">
        <div class="content-container">
          <div class="size-available">
            <span>
              Ukuran :
            </span>
            <span id="varian">-</span>
          </div>
          <div class="size-container" id="size-container">
            <div class="size-selected">
              <input type="text" value="Pilih ukuran" readonly id="value-selected">
              <i class="fas fa-caret-down" id="arrow"></i>
            </div>
            <div class="control-select-option">
              <ul id="sizes-list"></ul>
            </div>
          </div>
          <div class="purchase-quantity-container">
            <div class="quantity-container" id="quantity-container">
              <button class="minus closed">
                <i class="fas fa-minus"></i>
              </button>
              <input type="text" value="1" maxlength="4" id="input-quantity" readonly>
              <button class="plus">
                <i class="fas fa-plus"></i>
              </button>
            </div>
            <div class="stocks-available">
              <span>Stok</span>
              <b>-</b>
            </div>
          </div>
          <div class="subtotal-container">
            <span>Subtotal</span>
            <span class="main" id="sub-total">-</span>
          </div>
          <div class="action-container">
            <div class="cart" id="tombol-keranjang">
              <button>
                <img src="<?= base_url('assets/Project Toko Online/icon/cart.svg'); ?>">
              </button>
              <span>Keranjang</span>
            </div>
            <div class="more-action">
              <button class="chat-btn" id="chat-btn">
                <i class="far fa-comment-dots chat-btn"></i>
                <span class="chat-btn">
                  Chat
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="open-shopping-cart-container" id="open-more-action">
      <button class="chat-btn" id="chat-btn-mbl">
        <i class="far fa-comment-dots chat-btn"></i>
        <span class="chat-btn">
          Chat
        </span>
      </button>
      <button class="open-cart"> 
        <i class="fas fa-cart-arrow-down open-cart"></i>
        <span class="open-cart">
          Buka Keranjang
        </span>
      </button>
    </div>
  </div>

  <div class="black-background"></div>

  <div class="distance-contents"></div>

  <div class="container-chat ">
    <div class="chat-member-container">
      <div class="title">
        <h2>
          Chat
        </h2>
        <button class="chat-close-btn">
          <i class="fas fa-chevron-down chat-close-btn"></i>
        </button>
      </div>
      <div class="chat-member"></div>
    </div>
    <div class="chat-content-container start">
      <div class="start-to-chat">
        <img src="<?= base_url('assets/Project Toko Online/icon/chat.svg'); ?>">
        <h3>Mari memulai obrolan!</h3>
        <p>Silahkan memilih pesan untuk memulai percakapan</p>
      </div>
    </div>
  </div>

  <div class="popup-container"></div>

  <div class="notification-container">
    <p></p>
  </div>

  <script src="<?= base_url('assets/Project Toko Online/js/user/DetailPage.js'); ?>"></script>
