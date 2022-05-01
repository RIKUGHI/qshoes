

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

  <div class="register-shop-container">
    <span class="title">
      Halo,
      <b>
        <?= $username; ?>
      </b>
      ayo isi detail tokomu
    </span>
    <div class="step-item step-1 <?= $nomer_hp != 0 ? 'completed' : 'active'?>">
      <div class="step-header">
        <div class="step-status"><?= $nomer_hp != 0 ? '<i class="fas fa-check"></i>' : 1 ?></div>
        <h4>Masukan No Hp</h4>
      </div>
      <div class="step-content">
        <input type="text" value=" <?= $nomer_hp != 0 ?  $nomer_hp : ''?>" data-status="<?= $nomer_hp != 0 ?  'true' : 'false'?>" maxlength="15">
        <?php if ($nomer_hp == 0) : ?>
        <button id="next-step-2">
          Lanjut
        </button>
        <?php endif ; ?>
      </div>
    </div>
    <div class="step-item step-2 <?= $nomer_hp != 0 ? 'active' : ''?>">
      <div class="step-header">
        <div class="step-status">
          2
        </div>
        <h4>
          Masukan Nama Toko dan Domain
        </h4>
      </div>
      <div class="step-content">
        <div class="main-step-container">
          <label>Nama Toko</label>
          <input type="text" maxlength="60" data-status="false">
          <div class="validation-handling">
            <span>
              Pastikan nama toko sudah benar
            </span>
            <span>
              0/60
            </span>
          </div>
        </div>
        <div class="main-step-container">
          <label>Nama Domain</label>
          <div class="domain-container">
            <span>
              qshoes.com/toko/
            </span>
            <input type="text" maxlength="24" data-status="false">
          </div>
          <div class="validation-handling">
            <span>Pastikan nama domain sudah benar</span>
            <span>0/24</span>
          </div>
        </div>
        <div class="step-action">
        <?php if ($nomer_hp == 0) : ?>
          <button id="back-step-1">
            Kembali
          </button>
        <?php endif ; ?>
          <button id="next-last-step">
            lanjut
          </button>
        </div>
      </div>
    </div>
    <div class="step-item step-3">
      <div class="step-header">
        <div class="step-status">
          3
        </div>
        <h4>
          Masukan Alamat Tokomu
        </h4>
      </div>
      <div class="step-content">
        <div class="main-step-container">
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
        <div class="main-step-container" style="margin-bottom: 14px;">
          <label>Kota</label>
          <div class="districts-container" id="kota">
            <div class="district-selected">
              <input type="text" placeholder="Kota" readonly>
              <i class="fas fa-caret-down"></i>
            </div>
            <div class="control-select-option">
              <ul></ul>
            </div>
          </div>
        </div>
        <div class="step-action">
          <button id="back-step-2">
            Kembali
          </button>
          <button id="selesai">
            selesai
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="popup-container"></div>

  <div class="notification-container">
    <p></p>
  </div>

  <script src="<?= base_url('assets/Project Toko Online/js/user/RegisterToko.js'); ?>"></script>
  