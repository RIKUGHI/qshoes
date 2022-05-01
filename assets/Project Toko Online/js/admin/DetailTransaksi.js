baseUrl = url => {
  return 'http://localhost/CI/'+url
}

formatRupiah = bilangan => {
  number_string = bilangan.toString(),
	sisa 	= number_string.length % 3,
	rupiah 	= number_string.substr(0, sisa),
	ribuan 	= number_string.substr(sisa).match(/\d{3}/g);
		
  if (ribuan) {
    separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }

  return 'Rp. '+rupiah
}

const transactionDetailContainer = document.querySelector('.container-add-products .transaction-detail')
const searchTransaction = document.querySelector('.container-add-products .wrapper form')
const searchInput = searchTransaction.querySelector('input')
const exportBtn = document.querySelector('.container-add-products .wrapper form~button')

const getDetailTransaksiSelesai = async url => {
  const r = await fetch(baseUrl('seller/getdetailtransaksiselesai?inv='+url), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    if (res.ok) {
      return res.json()
    } else {
      console.error('Gagal mengambil data');
    }
  }).then(data => data).catch(err => console.error(err))

  if (r.status == 'success') {
    no = 1;
    totalJumlah = 0
    totalHarga = 0
    transactionDetailContainer.innerHTML =  `
                                              <h3>Detail Transaksi</h3>
                                              <table border="0">
                                                <thead>
                                                  <tr>
                                                    <th>No</th>
                                                    <th>Invoice</th>
                                                    <th>Nama Barang</th>
                                                    <th>Jumlah</th>
                                                    <th>Harga</th>
                                                    <th>Total</th>
                                                    <th style="display: none;">Aksi</th>
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                ${r.details.map(d => {
                                                  totalJumlah = parseInt(d.qty) + totalJumlah
                                                  totalHarga = d.totalHarga + totalHarga
                                                  invoice = d.invoice.split('/')
                                                  return  `
                                                            <tr>
                                                              <td>${no++}</td>
                                                              <td>${invoice[0]+'/'+invoice[1]+'/'+invoice[2]+'/'+d.transaksiGroup+'/'+invoice[3]}</td>
                                                              <td>${d.namaBarang+' (size '+d.ukuran+')'}</td>
                                                              <td>${d.qty}</td>
                                                              <td>${formatRupiah(d.harga)}</td>
                                                              <td>${formatRupiah(d.totalHarga)}</td>
                                                              <td style="display: none;">
                                                                <button class="far fa-eye"></button>
                                                                <button class="fas fa-trash-alt"></button>
                                                              </td>
                                                            </tr>
                                                          `
                                                }).join('')}
                                                </tbody>
                                              </table>
                                            `
  } else {
    transactionDetailContainer.innerHTML =  `
                                              <h3>Detail Transaksi</h3>
                                              <div class="empty">
                                                <img src="${baseUrl('assets/Project Toko Online/icon/empty-oder.svg')}">
                                                <h2>Tidak Ada Detail Transaksi</h2>
                                              </div>
                                            `
  }
}

getDetailTransaksiSelesai('')

searchTransaction.addEventListener('submit', e => {
  e.preventDefault()
  if (searchInput.value == '') {
    getDetailTransaksiSelesai('')
  } else {
    inv = searchInput.value.split('/')
    getDetailTransaksiSelesai(inv[0]+'/'+inv[1]+'/'+inv[2]+'/'+inv[4])
  }
})
  
exportBtn.addEventListener('click', async () => {
  location.replace(baseUrl('seller/exportdetailtransaksi'))
})
