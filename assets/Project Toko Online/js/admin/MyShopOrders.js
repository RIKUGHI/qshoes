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

const mainAdminContainerSo = document.querySelector('.main-admin-container')
const popUpContainerSo = document.querySelector('.popup-container')
const notifContainer = document.querySelector('.notification-container')
const notifText = notifContainer.querySelector('p')
defaultTime = 0

const setNotification = (status,message,time) => {
  notifContainer.classList.add(status)
  notifText.textContent = message
  setTimeout(() => {
    notifContainer.classList.remove(status)
    defaultTime = 0
  }, defaultTime = defaultTime + time);
}

const getMyShopOrders = async () => {
  const r = await fetch(baseUrl('seller/getshoporders'), {
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
    mainAdminContainerSo.innerHTML = r.map(d => {
      tanggalD = d.tanggal.split('-')
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
      invoice = d.invoice.split('/')
      return  `
                <div class="order-card">
                  <div class="order-header">
                    <span>${tanggalD[2]+' '+bulanD+' '+tanggalD[0]}</span>
                    <span class="status">${status}</span>
                    <span>${invoice[0]+'/'+invoice[1]+'/'+invoice[2]+'/'+d.transaksiGroup+'/'+invoice[3]}</span>
                  </div>
                  <div class="order-body">
                    <div class="wrapper-product">
                      <div class="order-image">
                        <img src="${baseUrl('assets/Project Toko Online/image/products/'+d.foto[0].nama_foto)}">
                      </div>
                      <div class="order-info">
                        <label class="shop-name">${d.namaPenerima}</label>
                        <h4 class="product-name">${d.namaBarang+' (size '+d.ukuran+')'}</h4>
                        <div class="price-info">
                          <span>${d.qty} barang</span>
                          <span>x ${formatRupiah(d.harga)}</span>
                        </div>
                        ${d.moreProducts == 0 ? '' : `<div class="more-products">+${d.moreProducts} produk lainnya</div>`}
                      </div>
                    </div>
                    <div class="order-total">
                      <span>Total Belanja</span>
                      <h4>${formatRupiah(d.totalBelanja)}</h4>
                    </div>
                  </div>
                  <div class="order-footer">
                    <button data-inv="${d.invoice}"}>Lihat Detail Transaksi</button>
                  </div>
                </div>
              `
    }).join('')
    mainAdminContainerSo.querySelectorAll('.order-footer button').forEach(e => {
      e.addEventListener('click', () => {
        popUpContainerSo.classList.add('open')
        getNewOrderDetails(e.dataset.inv)
      })
    })
  
    popUpContainerSo.addEventListener('click', (e) => {
      if (e.target.classList.contains('popup-container')) {
        popUpContainerSo.classList.remove('open')
        popUpContainerSo.innerHTML = ''
      }
    })
  } else {
    mainAdminContainerSo.innerHTML =  `
                                        <div class="empty">
                                          <img src="${baseUrl('assets/Project Toko Online/icon/empty-oder.svg')}">
                                          <h2>Tidak Ada Pesanan Yang Sedang Berlangsung</h2>
                                        </div>
                                      `
  }
}

getMyShopOrders()

const getNewOrderDetails = async a => {
  let totalBarang = 0
  let totalHarga = 0
  
  popUpContainerSo.innerHTML = '<div class="loader"></div>'
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
  switch (r.status) {
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
  invoice = r.invoice.split('/')
  popUpContainerSo.innerHTML =  `
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
                                        <p>${status}</p>
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
                                    <div class="order-footer">
                                      <button id="kirim" data-inv="${r.invoice}">Kirim Pesanan</button>
                                    </div>
                                  </div>
                                </div>
                              `
  document.getElementById('close').addEventListener('click', () => {
    popUpContainerSo.classList.remove('open')
    popUpContainerSo.innerHTML = ''
  })

  document.getElementById('kirim').addEventListener('click', async () => {
    x = await kirimOrder(document.getElementById('kirim').dataset.inv)

    if (x.status == 'success') {
      popUpContainerSo.classList.remove('open')
      popUpContainerSo.innerHTML = ''
      getMyShopOrders()
      setNotification(x.status,x.message,4000)
    } else {
      popUpContainerSo.classList.remove('open')
      popUpContainerSo.innerHTML = ''
      setNotification(x.status,x.message,3000)
    }
  })
}

const kirimOrder = inv => {
  const form = new FormData()
  form.append('invoice',inv)

  popUpContainerSo.innerHTML = '<div class="loader"></div>'

  return fetch(baseUrl('seller/kirimorder'), {
    method: 'POST',
    body: form
  }).then(res => {
    if (res.ok) {
      return res.json()
    } else {
      console.error('Gagal mengambil data');
    }
  }).then(data => data).catch(err => console.error(err))
}







