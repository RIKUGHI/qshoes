<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>
<!DOCTYPE html>
<head>
	<meta charset="UTF-8">
	<title>
		Pendaftaran Akun | Tutorial Simple Login Register CodeIgniter
	</title>
</head>
<body>

	<?php if($this->session->flashdata('suksess')) {
		echo '<p class="warning" style="margin: 10px 20px;">'.$this->session->flashdata('suksess').'</p>';
  }?>

	<form action="<?= base_url('tambah_barang/aksi_upload') ?>" method="post" enctype="multipart/form-data">
		<h2>Pendaftaran Akun form</h2>
		<ul>
			<li>
				<input type="text" name="nama_barang" placeholder="nama barang">
			</li>
			<li>
				<textarea name="desk" id="" cols="30" rows="10" placeholder="deskripsi"></textarea>
			</li>
			<li>
				<input type="number" name="harga" placeholder="harga"> 
			</li>
			<li>
				<input type="file" name="berkas_gambar" placeholder="gambar">
			</li>
			<li>
				<input type="text" name="kategori" placeholder="kategori">
			</li>
		</ul>
		<button type="submit">kirim</button>
	</form>

	Kembali ke beranda, Silakan klik <?php echo	anchor(site_url().'/beranda','di sini..'); ?></p>
</body>
</html>