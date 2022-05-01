const orderContainer = document.querySelector('.profile-container .main-content-container .order-container')
const statusItem = document.querySelectorAll('.profile-container .main-content-container .order-status-container .wrapper .status button')

const getMyOrder = async (u,s) => {
  const r = await fetch(baseUrl('user/getmyorder'+u), {
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

  if (r != '') {
    orderContainer.innerHTML = r.map(d => {
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
      switch (d.status) {
        case '1':
          status = 'Menunggu Konfirmasi'
          break;
  
        case '2':
          status = 'Diproses'
          break;
  
        case '3':
          status = 'Dikirim'
          break;
  
        case '4':
          status = 'Tiba di Tujuan'
          break;
  
        case '5':
          status = 'Selesai'
          break;
      }
      inv = d.invoice.split('/')
      return  `
                <div class="order-card">
                  <div class="order-header">
                    <span>${tanggal[2]+' '+bulan+' '+tanggal[0]}</span>
                    <span class="status">${status}</span>
                    <span>${inv[0]+'/'+inv[1]+'/'+inv[2]+'/'+d.transaksiGroup+'/'+inv[3]}</span>
                  </div>
                  <div class="order-body">
                    <div class="wrapper-product">
                      <div class="order-image">
                        <img src="${baseUrl('assets/Project Toko Online/image/products/'+d.foto[0].nama_foto)}">
                      </div>
                      <div class="order-info">
                        <label class="shop-name">${d.namaToko}</label>
                        <h4 class="product-name">${d.namaBarang+' (size '+d.ukuran+')'}</h4>
                        <div class="price-info">
                          <span>${d.qty} barang</span>
                          <span>x ${formatRupiah(d.harga)}</span>
                        </div>
                        ${d.moreProduct == 0 ? '' : `<div class="more-products">+${d.moreProduct} produk lainnya</div>`}
                      </div>
                    </div>
                    <div class="order-total">
                      <span>Total Belanja</span>
                      <h4>${formatRupiah(d.totalBelanja + 4000)}</h4>
                    </div>
                  </div>
                  <div class="order-footer">
                    <button data-inv="${d.invoice}">Lihat Detail Transaksi</button>
                    ${s == 3 ? `<button data-inv="${d.invoice}" data-tg="${d.transaksiGroup}">Selesai</button>` : ''}
                  </div>
                </div>
              `
    }).join('')

    orderContainer.querySelectorAll('.order-card .order-footer button:first-child').forEach(e => {
      e.addEventListener('click', async () => {
        popUpContainer.classList.add('open')
        popUpContainer.innerHTML = '<div class="loader"></div>'
        const x = await fetch(baseUrl('user/getmyorderbyinvoice?invoice='+e.dataset.inv), {
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
                                              <span>Nama Toko</span>
                                              <p>${x.namaToko}</p>
                                            </div>
                                            <div class="info-list">
                                              <span>Pengiriman</span>
                                              <p>${x.detailProduk[0].deskripsi+' '+x.detailProduk[0].estimasi+' Hari'}</p>
                                            </div>
                                            <div class="info-list">
                                              <span>Tanggal Pembelian</span>
                                              <p>${tanggalD[2]+' '+bulanD+' '+tanggalD[0]+', '+x.waktu} WIB</p>
                                            </div>
                                          </div>
                                          <div class="order-product">
                                            <label class="title">Daftar Produk</label>
                                            ${x.detailProduk.map(l => {
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
                                                              <a href="${baseUrl('toko/'+x.domainToko+'/'+l.slug)}" class="product-name">${l.namaProduk+' (size '+l.ukuran+')'}</a>
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
                                              <span>bambang</span>
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
      })
    })

    orderContainer.querySelectorAll('.order-card .order-footer button:last-child').forEach(e => {
      e.addEventListener('click', () => {
        popUpContainer.classList.add('open')
        popUpContainer.innerHTML =  `
                                      <div class="confirm-transaction">
                                        <div class="confirm-header">
                                          <h2>Apakah yakin ingin menyelesaikan transaksi ${e.dataset.inv}</h2>
                                        </div>
                                        <div class="warning">
                                          <label>Perhatian!</label>
                                          <p>Saat meyelesaikan transaksi ini pastikan bahwa :</p>
                                          <p>1. Anda telah menerima barang sesuai dengan pesanan anda.</p>
                                          <p>2. Saat transaksi ini selesai secara otomatis sistem akan meneruskan dana ke penjual.</p>
                                          <p>3. Setelah transaksi ini selesai anda tidak dapat melakukan komplain.</p>
                                        </div>
                                        <div class="action">
                                          <button id="batal">Batal</button>
                                          <button id="iya">Iya</button>
                                        </div>
                                      </div>
                                    `
        document.getElementById('batal').addEventListener('click', () => {
          popUpContainer.classList.remove('open')
          popUpContainer.innerHTML = ''
        })

        document.getElementById('iya').addEventListener('click', async () => {
          const form = new FormData()
          form.append('inv',e.dataset.inv)
          form.append('tg',e.dataset.tg)

          popUpContainer.innerHTML = '<div class="loader"></div>'
          const s = await fetch(baseUrl('user/selesaiorder'), {
            method: 'POST',
            body: form
          }).then(res => {
            if (res.ok) {
              return res.json()
            } else {
              console.error('Gagal mengambil data');
            }
          }).then(data => data).catch(err => console.error(err))
  
          if (s.status == 'success') {
            popUpContainer.classList.remove('open')
            popUpContainer.innerHTML = ''
            getMyOrder(location.search,3)
            setNotification(s.status,s.message,3000)
          } else {
            popUpContainer.classList.remove('open')
            popUpContainer.innerHTML = ''
            setNotification(s.status,s.message,3000)
          }
        })
      })
    })

    popUpContainer.addEventListener('click', e => {
      if (e.target.classList.contains('popup-container')) {
        popUpContainer.classList.remove('open')
        popUpContainer.innerHTML = ''
      }
    })

  } else {
    orderContainer.innerHTML =  `
                                  <div class="empty">
                                    <img src="${baseUrl('assets/Project Toko Online/icon/empty-oder.svg')}">
                                    <h2>Oops, nggak ada transaksi</h2>
                                  </div>
                                `
  }
}

switch (location.search) {
  case '?status=menunggu_konfirmasi':
    getMyOrder(location.search,0)
    statusItem[1].classList.add('active')
    break;
  case '?status=diproses':
    getMyOrder(location.search,0)
    statusItem[2].classList.add('active')
    break;
  case '?status=dikirim':
    getMyOrder(location.search,3)
    statusItem[3].classList.add('active')
    break;
  case '?status=tiba_di_tujuan':
    getMyOrder(location.search,3)
    statusItem[4].classList.add('active')
    break;

  default:
    getMyOrder('',0)
    statusItem[0].classList.add('active')
    break;
}

statusItem.forEach(e => {
  e.addEventListener('click', () => {
    statusItem.forEach(i => {
      i.classList.remove('active')
    })

    e.classList.add('active')
    switch (e.textContent.toLowerCase()) {
      case 'semua':
        window.history.pushState('','','order')
        getMyOrder('',0)
        break;

      case 'menunggu konfirmasi':
        window.history.pushState('','','order?status=menunggu_konfirmasi')
        getMyOrder(location.search,0)
        break;

      case 'diproses':
        window.history.pushState('','','order?status=diproses')
        getMyOrder(location.search,0);
        break;

      case 'dikirim':
        window.history.pushState('','','order?status=dikirim')
        getMyOrder(location.search,3);
        break;

      case 'tiba di tujuan':
        window.history.pushState('','','order?status=tiba_di_tujuan')
        getMyOrder(location.search,3);
        break;
    }
  })
})




