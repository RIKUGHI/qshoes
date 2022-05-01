

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

  <div class="address-container">
    <div class="address-header">
        <h2>Checkout</h2>
    </div>
    <div class="address-body">
      <div class="data-group">
        <div class="form-group">
          <label>Nama Penerima</label>
          <input type="text" autocomplete="off" maxlength="60">
        </div>
        <div class="form-group">
          <label>Nomor Telepon</label>
          <input type="text" autocomplete="off" maxlength="15">
        </div>
      </div>
      <div class="data-group">
        <div class="form-group">
          <label>Provinsi</label>
          <div class="districts-container" id="provinsi">
            <div class="district-selected">
              <input type="text" placeholder="Provinsi" readonly>
              <i class="fas fa-caret-down"></i>
            </div>
            <div class="control-select-option">
              <ul>
                <li data-id="1">Bali</li>
                <li data-id="2">Bangka Belitung</li>
                <li data-id="3">Banten</li>
                <li data-id="4">Bengkulu</li>
                <li data-id="5">DI Yogyakarta</li>
                <li data-id="6">DKI Jakarta</li>
                <li data-id="7">Gorontalo</li>
                <li data-id="8">Jambi</li>
                <li data-id="9">Jawa Barat</li>
                <li data-id="10">Jawa Tengah</li>
                <li data-id="11">Jawa Timur</li>
                <li data-id="12">Kalimantan Barat</li>
                <li data-id="13">Kalimantan Selatan</li>
                <li data-id="14">Kalimantan Tengah</li>
                <li data-id="15">Kalimantan Timur</li>
                <li data-id="16">Kalimantan Utara</li>
                <li data-id="17">Kepulauan Riau</li>
                <li data-id="18">Lampung</li>
                <li data-id="19">Maluku</li>
                <li data-id="20">Maluku Utara</li>
                <li data-id="21">Nanggroe Aceh Darussalam (NAD)</li>
                <li data-id="22">Nusa Tenggara Barat (NTB)</li>
                <li data-id="23">Nusa Tenggara Timur (NTT)</li>
                <li data-id="24">Papua</li>
                <li data-id="25">Papua Barat</li>
                <li data-id="26">Riau</li>
                <li data-id="27">Sulawesi Barat</li>
                <li data-id="28">Sulawesi Selatan</li>
                <li data-id="29">Sulawesi Tengah</li>
                <li data-id="30">Sulawesi Tenggara</li>
                <li data-id="31">Sulawesi Utara</li>
                <li data-id="32">Sumatera Barat</li>
                <li data-id="33">Sumatera Selatan</li>
                <li data-id="34">Sumatera Utara</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>Kota</label>
          <div class="districts-container" id="kota">
            <div class="district-selected disable">
              <input type="text" placeholder="Kota" readonly>
              <i class="fas fa-caret-down"></i>
            </div>
            <div class="control-select-option">
              <ul></ul>
            </div>
          </div>
        </div>
      </div>
      <div class="data-group">
        <div class="form-group">
          <label>Detail Alamat</label>
          <textarea placeholder="Isi dengan nama jalan, nomor rumah atau sejenisnya"></textarea>
        </div>
      </div>
      <div class="data-group"></div>
      <div class="data-group pembayaran">
        <div class="form-group">
          <label>Pilih Bank</label>
          <div class="districts-container" id="bank">
            <div class="district-selected">
              <input type="text" placeholder="Pilih Bank" readonly>
              <i class="fas fa-caret-down"></i>
            </div>
            <div class="control-select-option">
              <ul>
                <li>BCA</li>
                <li>BNI</li>
                <li>BRI</li>
                <li>MANDIRI</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>Masukan Jumlah Pembayaran</label>
          <input type="text" autocomplete="off" maxlength="15" placeholder="Masukan Jumlah Pembayaran">
        </div>
      </div>
      <div class="data-group">
        <div class="order-detail">
          <label class="title">Pembayaran</label>
          <div class="detail-list" id="total-harga">
            <span>Total Harga (1 Barang)</span>
            <span>Rp -</span>
          </div>
          <div class="detail-list">
            <span>Biaya Administrasi</span>
            <span>Rp. 4.000</span>
          </div>
          <div class="detail-list">
            <span>Total Ongkos Kirim</span>
            <span id="ongkos-kirim">-</span>
          </div>
          <div class="detail-list">
            <span>Total Tagihan</span>
            <span class="total" id="tagihan">-</span>
          </div>
        </div>
      </div>
    </div>
    <div class="address-footer">
      <button id="kembali">Kembali</button>
      <button id="pesan">Buat Pesanan</button>
    </div>
  </div>

	<div class="popup-container"></div>

  <div class="notification-container">
    <p></p>
  </div>
	
	<script src="<?= base_url('assets/Project Toko Online/js/user/Checkout.js'); ?>"></script>

</body>
</html>