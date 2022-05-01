<div class="menu-toggle">
      <input type="checkbox">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="sidebar-container">
      <div class="sidebar">
        <div class="simple-profile">
          <div class="user-image">
            <div class="circle-image">
            <?php if ($gambar_user != null) : ?>
              <img src="<?= base_url('assets/Project Toko Online/image/users/'.$gambar_user); ?>">
            <?php else : ?>
              <img src="<?= base_url('assets/Project Toko Online/image/no-user-image.jpg'); ?>">
            <?php endif; ?>
            </div>
          </div>
          <div class="user-name">
            Jonshon MLBB
          </div>
        </div>
        <div class="menu-list">
          <button class="menu-item">Ubah Profil</button>
          <button class="menu-item">Chat</button>
          <button class="menu-item">Order</button>
        </div>
      </div>
    </div>