const berlangsung = document.querySelector('.main-admin-container .status-container .general .status-card:first-child h2')
const selesai = document.querySelector('.main-admin-container .status-container .general .status-card:last-child h2')
const saldoContainer = document.querySelector('.main-admin-container .status-container .special .status-card h2')
const berlangsungContainer = document.querySelector('.main-admin-container .new-order-container .new-order')
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

const getBerlangsung = async () => {
  const r = await fetch(baseUrl('adminqs/gettransaksiberlangsung'), {
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
    berlangsungContainer.innerHTML = `
                                    <div class="empty">
                                      <img src="${baseUrl('assets/Project Toko Online/icon/empty-oder.svg')}">
                                      <h2>Tidak Ada Pesanan yang Sedang Berlangsung</h2>
                                    </div>
                                  `
  } else {
    langsung = 0
    berlangsungContainer.innerHTML = `
                                    <table border="0">
                                      <thead>
                                        <tr>
                                          <th>Invoice</th>
                                          <th>Tanggal - Waktu</th>
                                          <th>Aksi</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                      ${r.map(d => {
                                        langsung++
                                        invoice = d.invoice.split('/')
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
                                        return  `
                                                  <tr>
                                                    <td>${invoice[0]+'/'+invoice[1]+'/'+invoice[2]+'/'+d.transaksi_group+'/'+invoice[3]}</td>
                                                    <td>${tanggal[2]+' '+bulan+' '+tanggal[0]+' - '+d.waktu}</td>
                                                    <td>
                                                      <button data-inv="${d.invoice}">Lihat Order</button>
                                                    </td>
                                                  </tr>
                                                `
                                      }).join('')}
                                      </tbody>
                                    </table>
                                  `
    berlangsung.textContent = langsung

    berlangsungContainer.querySelectorAll('button').forEach(e => {
      e.addEventListener('click', () => {
        popUpContainer.classList.add('open')
        getNewOrderDetails(e.dataset.inv)
      })
    });
  
    popUpContainer.addEventListener('click', e => {
      if (e.target.classList.contains('popup-container')) {
        popUpContainer.classList.remove('open')
        popUpContainer.innerHTML = ''
      }
    })
  }


}

getBerlangsung()

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

  sel = 0

  if (r.length == 0) {
    selesai.textContent = 0 
  } else {
    r.forEach(d=> {
      sel++
    });

    selesai.textContent = sel
  }
}

getTransaksiSelesai()

const getSaldoAndProfit = async () => {
  const r = await fetch(baseUrl('adminqs/getsaldoandprofit'), {
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

  saldoContainer.textContent = formatRupiah(r.saldo)+' / '+formatRupiah(r.profit)
}

getSaldoAndProfit()

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














