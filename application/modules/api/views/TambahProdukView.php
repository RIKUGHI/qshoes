

	<div class="black-background-sidebar-store"></div>

  <div class="container-add-products">
    <div class="content-header">
      <form action="">
        <input type="text" placeholder="Cari Produkmu">
        <button type="submit">
          <i class="fas fa-search"></i>
        </button>
      </form>
      <button class="add-product-btn">
        <i class="fas fa-plus"></i>
        <span>Tambah Produk</span>
      </button>
    </div>
    <div class="products-container">
      <h3>Daftar Produk</h3>
      <table border="0">
        <thead>
          <tr>
            <th>No</th>
            <th>Gambar</th>
            <th>Nama Barang</th>
            <th>Kondisi</th>
            <th>Deskripsi</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>122</td>
            <td>
              <img src="<?= base_url('assets/Project Toko Online/image/products/p1.jpg'); ?>" alt="">
            </td>
            <td>Sepatu Keadilang Anjay Kimak</td>
            <td>Bekas</td>
            <td>
              <div class="desk">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure blanditiis alias reprehenderit esse harum officia vitae aliquid error fuga deserunt, cupiditate similique sint id. Atque aliquid provident sequi tempore. At.
                Aperiam magnam ad repellendus nisi cumque libero dicta ab, officiis atque ipsa nulla sit mollitia consectetur tenetur possimus id. Labore expedita cumque, atque ipsur c aspernatur quidem recusandae, eius labore ratione non similique a ducimus ut dolore dolor quisquam sed. Possimus maiores eum, eligendi explicabo eveniet perspiciatis iure quae quos.
              </div>
            </td>
            <td>
              <div class="action">
                <button>
                  <i class="far fa-eye"></i>  
                </button>
                <button>
                  <i class="fas fa-pen"></i>
                </button>
                <button>
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>122</td>
            <td>
              <img src="<?= base_url('assets/Project Toko Online/image/products/p12.jpg'); ?>" alt="">
            </td>
            <td>Sepatu Keadilang Anjay Kimak</td>
            <td>Bekas</td>
            <td>
              <div class="desk">
                Barang rusak ojo di tuku asu
              </div>
            </td>
            <td>
              <div class="action">
                <button>
                  <i class="far fa-eye"></i>  
                </button>
                <button>
                  <i class="fas fa-pen"></i>
                </button>
                <button>
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>122</td>
            <td>
              <img src="<?= base_url('assets/Project Toko Online/image/products/p10.jpg'); ?>" alt="">
            </td>
            <td>Sepatu Keadilang Anjay Kimak</td>
            <td>Bekas</td>
            <td>
              <div class="desk">
                bakol e ra niat bakol anjing apeh tuku sempolan bakol e tutup bangke emang
              </div>
            </td>
            <td>
              <div class="action">
                <button>
                  <i class="far fa-eye"></i>  
                </button>
                <button>
                  <i class="fas fa-pen"></i>
                </button>
                <button>
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <button id="add-products-btn">
    <i class="fas fa-plus"></i>
  </button>

  <div class="popup-container">

  </div>

    <!-- <div class="popup-container">
    <div class="delete-product">
      <div class="product-header">
        <h2>Apakah yakin ingin menghapus produk Ventela BTS High</h2>
      </div>
      <div class="action">
        <button>Batal</button>
        <button>Iya</button>
      </div>
    </div>
  </div> -->

  <div class="notification-container">
    <p></p>
  </div>

	<script src="<?= base_url('assets/Project Toko Online/js/admin/admin general script.js'); ?>"></script>
	<script src="<?= base_url('assets/Project Toko Online/js/admin/product.js'); ?>"></script>
