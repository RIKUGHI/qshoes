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

const transactionContainer = document.querySelector('.container-add-products .transaction')
const searchTransaction = document.querySelector('.container-add-products .wrapper form')
const searchInput = searchTransaction.querySelector('input')
const exportBtn = document.querySelector('.container-add-products .wrapper form~button')
const popUpContainerT = document.querySelector('.popup-container')

const getTransaksiSelesai = async url => {
  const r = await fetch(baseUrl('seller/gettransaksiselesai?inv='+url), {
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
    transactionContainer.innerHTML =  ` <h3>Transaksi</h3>
                                        <table border="0">
                                          <thead>
                                            <tr>
                                              <th>No</th>
                                              <th>Invoice</th>
                                              <th>Tanggal - Waktu</th>
                                              <th>Jumlah Beli</th>
                                              <th>Total Harga</th>
                                              <th>Aksi</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                          ${r.details.map(d => {
                                            tanggal = d.tanggal.split('-')
                                            switch (tanggal[1]) {
                                              case '01':
                                                bulan = 'Jan'
                                                break;
                                              case '02':
                                                bulan = 'Feb'
                                                break;
                                              case '03':
                                                bulan = 'Mar'
                                                break;
                                              case '04':
                                                bulan = 'Apr'
                                                break;
                                              case '05':
                                                bulan = 'Mei'
                                                break;
                                              case '06':
                                                bulan = 'Jun'
                                                break;
                                              case '07':
                                                bulan = 'Jul'
                                                break;
                                              case '08':
                                                bulan = 'Aug'
                                                break;
                                              case '09':
                                                bulan = 'Sep'
                                                break;
                                              case '10':
                                                bulan = 'Okt'
                                                break;
                                              case '11':
                                                bulan = 'Nov'
                                                break;
                                              case '12':
                                                bulan = 'Des'
                                                break;
                                            }
                                            invoice = d.invoice.split('/')
                                            return  `
                                                      <tr>
                                                        <td>${no++}</td>
                                                        <td>${invoice[0]+'/'+invoice[1]+'/'+invoice[2]+'/'+d.transaksiGroup+'/'+invoice[3]}</td>
                                                        <td>${tanggal[2]+' '+bulan+' '+tanggal[0]} - ${d.waktu}</td>
                                                        <td>${d.jumlahBarang}</td>
                                                        <td>${formatRupiah(d.totalHarga)}</td>
                                                        <td>
                                                          <button class="far fa-eye" data-inv="${d.invoice}"></button>
                                                          <button class="fas fa-trash-alt" style="display: none;"></button>
                                                        </td>
                                                      </tr>
                                                    `
                                          }).join('')}
                                          </tbody>
                                        </table>
                                      `
    const detailBtn = transactionContainer.querySelectorAll('table tbody tr td:last-child button:first-child')
    detailBtn.forEach(e => {
      e.addEventListener('click', () => {
        popUpContainerT.classList.add('open')
        getNewOrderDetails(e.dataset.inv)
      })
    })
    popUpContainerT.addEventListener('click', e => {
      if (e.target.classList.contains('popup-container')) {
        popUpContainerT.classList.remove('open')
        popUpContainerT.innerHTML = ''
      }
    })
  } else {
    transactionContainer.innerHTML =  `
                                        <h3>Transaksi</h3>
                                        <div class="empty">
                                          <img src="${baseUrl('assets/Project Toko Online/icon/empty-oder.svg')}">
                                          <h2>Tidak Ada Transaksi</h2>
                                        </div>
                                      `
  }
}

getTransaksiSelesai('')

const getNewOrderDetails = async a => {
  let totalBarang = 0
  let totalHarga = 0
  
  popUpContainerT.innerHTML = '<div class="loader"></div>'
  const r = await fetch(baseUrl('seller/getneworderdetails?invoice='+a), {
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

  tanggalD = r.tanggal.split('-')
  switch (tanggalD[1]) {
    case '01':
      bulanD = 'Jan'
      break;
    case '02':
      bulanD = 'Feb'
      break;
    case '03':
      bulanD = 'Mar'
      break;
    case '04':
      bulanD = 'Apr'
      break;
    case '05':
      bulanD = 'Mei'
      break;
    case '06':
      bulanD = 'Jun'
      break;
    case '07':
      bulanD = 'Jul'
      break;
    case '08':
      bulanD = 'Aug'
      break;
    case '09':
      bulanD = 'Sep'
      break;
    case '10':
      bulanD = 'Okt'
      break;
    case '11':
      bulanD = 'Nov'
      break;
    case '12':
      bulanD = 'Des'
      break;
  }

  invoice = r.invoice.split('/')
  popUpContainerT.innerHTML =  `
                                <div class="transaction-detail-container">
                                  <div class="transaction-header">
                                    <h2>Detail Pesanan</h2>
                                    <button id="close">
                                      <i class="fas fa-times"></i>
                                    </button>
                                  </div>
                                  <div class="transaction-content">
                                    <div class="order-info">
                                      <div class="info-list">
                                        <span>Nomer Invoice</span>
                                        <p class="invoice">${invoice[0]+'/'+invoice[1]+'/'+invoice[2]+'/'+r.transaksiGroup+'/'+invoice[3]}</p>
                                      </div>
                                      <div class="info-list">
                                        <span>Nama Pembeli</span>
                                        <p>${r.namaPenerima}</p>
                                      </div>
                                      <div class="info-list">
                                        <span>Nomer Hp</span>
                                        <p>${r.nomerHp}</p>
                                      </div>
                                      <div class="info-list">
                                        <span>Alamat Pengiriman</span>
                                        <p>${r.detailAlamat}</p>
                                        <p>${r.kota}</p>
                                        <p>${r.provinsi}</p>
                                      </div>
                                      <div class="info-list">
                                        <span>Pengiriman</span>
                                        <p>JNE - ${r.details[0].deskripsi} (${r.details[0].estimasi} hari)</p>
                                      </div>
                                      <div class="info-list">
                                        <span>Status</span>
                                        <p>${r.status == '5' ? 'Selesai' : ''}</p>
                                      </div>
                                      <div class="info-list">
                                        <span>Tanggal Pembelian</span>
                                        <p>${tanggalD[2]+' '+bulanD+' '+tanggalD[0]+', '+r.waktu+' WIB'}</p>
                                      </div>
                                    </div>
                                    <div class="order-product">
                                      <label class="title">Daftar Produk</label>
                                      ${r.details.map(d => {
                                        totalBarang = parseInt(d.qty) + totalBarang
                                        totalHarga = parseInt(d.qty) * parseInt(d.harga) + totalHarga
                                        return  `
                                                  <div class="product-list">
                                                    <div class="wrapper-product">
                                                      <div class="product-image">
                                                        <img src="${baseUrl('assets/Project Toko Online/image/products/'+d.foto[0].nama_foto)}">
                                                      </div>
                                                      <div class="product-info">
                                                        <a href="${baseUrl('toko/'+d.domainToko+'/'+d.slug)}" class="product-name">${d.namaBarang+' (size '+d.ukuran+')'}</a>
                                                        <div class="quantity">
                                                          <span>${d.qty} Produk</span>
                                                          <span>x ${formatRupiah(d.harga)}</span>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div class="order-total">
                                                      <span>Harga Barang</span>
                                                      <h4>${formatRupiah(parseInt(d.qty) * parseInt(d.harga))}</h4>
                                                    </div>
                                                  </div>
                                                `
                                      }).join('')}
                                      
                                    </div>
                                    <div class="order-detail">
                                      <label class="title">Pembayaran</label>
                                      <div class="detail-list">
                                        <span>Total Harga (${totalBarang} Barang)</span>
                                        <span class="total">${formatRupiah(totalHarga)}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              `
  document.getElementById('close').addEventListener('click', () => {
    popUpContainerT.classList.remove('open')
    popUpContainerT.innerHTML = ''
  })
}

searchTransaction.addEventListener('submit', e => {
  e.preventDefault()
  if (searchInput.value == '') {
    getTransaksiSelesai('')
  } else {
    inv = searchInput.value.split('/')
    getTransaksiSelesai(inv[0]+'/'+inv[1]+'/'+inv[2]+'/'+inv[4])
  }
})

exportBtn.addEventListener('click', async () => {
  location.replace(baseUrl('seller/exporttransaksi'))
})
