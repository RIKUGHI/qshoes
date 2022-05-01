const transactionContainer = document.querySelector('.container-add-products .transaction')
const searchTransaction = document.querySelector('.container-add-products .wrapper form')
const searchInput = searchTransaction.querySelector('input')
const exportBtn = document.querySelector('.container-add-products .wrapper form~button')
const popUpContainer = document.querySelector('.popup-container')

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

const getTransaksiSelesai = async () => {
  const r = await fetch(baseUrl('adminqs/gettransaksiselesai'), {
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

  if (r.length == 0) {
    transactionContainer.innerHTML =  `
                                        <h3>Transaksi</h3>
                                        <div class="empty">
                                          <img src="${baseUrl('assets/Project Toko Online/icon/empty-oder.svg')}">
                                          <h2>Tidak Ada Transaksi</h2>
                                        </div>
                                      `
  } else {
    no = 1;
    transactionContainer.innerHTML =  ` <h3>Transaksi Selesai</h3>
                                        <table border="0">
                                          <thead>
                                            <tr>
                                              <th>No</th>
                                              <th>Invoice</th>
                                              <th>Nama Penerima</th>
                                              <th>Tanggal - Waktu</th>
                                              <th>Aksi</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                          ${r.map(d => {
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
                                                        <td>${invoice[0]+'/'+invoice[1]+'/'+invoice[2]+'/'+d.transaksi_group+'/'+invoice[3]}</td>
                                                        <td>${d.nama_penerima}</td>
                                                        <td>${tanggal[2]+' '+bulan+' '+tanggal[0]+' - '+d.waktu}</td>
                                                        <td>
                                                          <button class="far fa-eye" data-inv="${d.invoice}"></button>
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
        popUpContainer.classList.add('open')
        getNewOrderDetails(e.dataset.inv)
      })
    })
    popUpContainer.addEventListener('click', e => {
      if (e.target.classList.contains('popup-container')) {
        popUpContainer.classList.remove('open')
        popUpContainer.innerHTML = ''
      }
    })
  }
}

getTransaksiSelesai()

const getNewOrderDetails = async a => {
  let totalBarang = 0
  let totalHarga = 0
  
  popUpContainer.innerHTML = '<div class="loader"></div>'
  const x = await fetch(baseUrl('adminqs/gettransaksidetail?inv='+a), {
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

  tanggalD = x.tanggal.split('-')
  totalBarang = 0
  totalHarga = 0
  totalOngkos = 0

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
  switch (x.status) {
    case '1':
      statusD = 'Menunggu Konfirmasi'
      break;

    case '2':
      statusD = 'Diproses'
      break;

    case '3':
      statusD = 'Dikirim'
      break;

    case '4':
      statusD = 'Tiba di Tujuan'
      break;

    case '5':
      statusD = 'Selesai'
      break;
  }
  invD = x.invoice.split('/')
  popUpContainer.innerHTML =  `
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
                                        <p class="invoice">${invD[0]+'/'+invD[1]+'/'+invD[2]+'/'+x.transaksiGroup+'/'+invD[3]}</p>
                                      </div>
                                      <div class="info-list">
                                        <span>Status</span>
                                        <p>${statusD}</p>
                                      </div>
                                      <div class="info-list">
                                        <span>Username</span>
                                        <p>${x.username}</p>
                                      </div>
                                      <div class="info-list">
                                        <span>Nama Toko</span>
                                        <p>${x.details[0].namaToko}</p>
                                      </div>
                                      <div class="info-list">
                                        <span>Pengiriman</span>
                                        <p>${x.details[0].deskripsi+' '+x.details[0].estimasi+' Hari'}</p>
                                      </div>
                                      <div class="info-list">
                                        <span>Tanggal Pembelian</span>
                                        <p>${tanggalD[2]+' '+bulanD+' '+tanggalD[0]+', '+x.waktu} WIB</p>
                                      </div>
                                    </div>
                                    <div class="order-product">
                                      <label class="title">Daftar Produk</label>
                                      ${x.details.map(l => {
                                        hargaBarang = parseInt(l.qty) * parseInt(l.harga)
                                        totalBarang = parseInt(l.qty) + totalBarang
                                        totalHarga = hargaBarang + totalHarga
                                        totalOngkos = parseInt(l.ongkosKirim) + totalOngkos
                                        return  `
                                                  <div class="product-list">
                                                    <div class="wrapper-product">
                                                      <div class="product-image">
                                                        <img src="${baseUrl('assets/Project Toko Online/image/products/'+l.foto[0].nama_foto)}">
                                                      </div>
                                                      <div class="product-info">
                                                        <a href="${baseUrl('toko/'+x.domainToko+'/'+l.slug)}" class="product-name">${l.namaBarang+' (size '+l.ukuran+')'}</a>
                                                        <div class="quantity">
                                                          <span>${l.qty} Produk</span>
                                                          <span>x ${formatRupiah(l.harga)}</span>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div class="order-total">
                                                      <span>Harga Barang</span>
                                                      <h4>${formatRupiah(hargaBarang)}</h4>
                                                    </div>
                                                  </div>
                                                `
                                      }).join('')}
                                    </div>
                                    <div class="order-shipping">
                                      <label class="title">Dikirim kepada
                                        <span>${x.namaPenerima}</span>
                                      </label>
                                      <div class="alamat">${x.detailAlamat}</div>
                                      <div class="alamat">${x.kota}</div>
                                      <div class="alamat">${x.provinsi}</div>
                                    </div>
                                    <div class="order-detail">
                                      <label class="title">Pembayaran</label>
                                      <div class="detail-list">
                                        <span>Total Harga (${totalBarang} Barang)</span>
                                        <span>${formatRupiah(totalHarga)}</span>
                                      </div>
                                      <div class="detail-list">
                                        <span>Biaya Administrasi</span>
                                        <span>Rp. 4.000</span>
                                      </div>
                                      <div class="detail-list">
                                        <span>Total Ongkos Kirim</span>
                                        <span>${formatRupiah(totalOngkos)}</span>
                                      </div>
                                      <div class="detail-list">
                                        <span>Total Bayar</span>
                                        <span class="total">${formatRupiah(totalHarga + totalOngkos + 4000)}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              `

  document.getElementById('close').addEventListener('click', () => {
    popUpContainer.classList.remove('open')
    popUpContainer.innerHTML = ''
  })
}

searchTransaction.addEventListener('submit', e => {
  e.preventDefault()
})

searchInput.oninput = () => {
  getTransaksiSelesaiByName(searchInput.value)
}

const getTransaksiSelesaiByName = async name => {
  const r = await fetch(baseUrl('adminqs/gettransaksiselesaibypenerima?nama='+name), {
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
  console.log(r);
  if (r.length == 0) {
    transactionContainer.innerHTML =  `
                                        <h3>Transaksi</h3>
                                        <div class="empty">
                                          <img src="${baseUrl('assets/Project Toko Online/icon/empty-oder.svg')}">
                                          <h2>Tidak Ada Transaksi</h2>
                                        </div>
                                      `
  } else {
    no = 1;
    transactionContainer.innerHTML =  ` <h3>Transaksi Selesai</h3>
                                        <table border="0">
                                          <thead>
                                            <tr>
                                              <th>No</th>
                                              <th>Invoice</th>
                                              <th>Nama Penerima</th>
                                              <th>Tanggal - Waktu</th>
                                              <th>Aksi</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                          ${r.map(d => {
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
                                                        <td>${invoice[0]+'/'+invoice[1]+'/'+invoice[2]+'/'+d.transaksi_group+'/'+invoice[3]}</td>
                                                        <td>${d.nama_penerima}</td>
                                                        <td>${tanggal[2]+' '+bulan+' '+tanggal[0]+' - '+d.waktu}</td>
                                                        <td>
                                                          <button class="far fa-eye" data-inv="${d.invoice}"></button>
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
        popUpContainer.classList.add('open')
        getNewOrderDetails(e.dataset.inv)
      })
    })
    popUpContainer.addEventListener('click', e => {
      if (e.target.classList.contains('popup-container')) {
        popUpContainer.classList.remove('open')
        popUpContainer.innerHTML = ''
      }
    })
  }
}