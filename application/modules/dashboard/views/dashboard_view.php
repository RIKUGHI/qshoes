<?php defined('BASEPATH') OR exit('No direct script access allowed'); ?>
<!DOCTYPE html>
<head>
	<meta charset="UTF-8">
	<title>Dashboard | Tutorial Simple Login Register CodeIgniter</title>
</head>
<body>
	<!-- <?php print_r($this->session->userdata()) ?> -->
	<h3>Dashboard</h3>
	<p>
	Selamat datang di halaman dashboard, <?php echo ucfirst($this->session->userdata('username')); ?>!
	Untuk logout dari sistem, silakan klik 
	<?php echo 	anchor('login/logout','di sini...'); ?>
	</p>
	<ul>
		<li>
			menu
		</li>
		<li>
			<a href="<?= base_url('tambah_barang'); ?>">tambah barang</a>
		</li>
		<li>
			<a href="">lihat data</a>
		</li>
	</ul>
</body>
</html>