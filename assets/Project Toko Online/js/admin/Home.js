const stockContainer = document.querySelector('.main-admin-container .status-container .general .status-card:first-child h2')
const dikirimContainer = document.querySelector('.main-admin-container .status-container .general .status-card:last-child h2')
const saldoContainer = document.querySelector('.main-admin-container .status-container .special .status-card h2')
const withdrawBtn = document.querySelector('.main-admin-container .status-container .special .status-card .action button')
const newOrderContainer = document.querySelector('.main-admin-container .new-order-container .new-order')
const popUpContainer = document.querySelector('.popup-container')
const notifContainer = document.querySelector('.notification-container')
const notifText = notifContainer.querySelector('p')
defaultTime = 0

baseUrl = url => {
  return 'http://localhost/CI/'+url
}

const liveFormatRupiah = (angka, prefix) => {
  number_string = angka.replace(/[^,\d]/g, '').toString()
  sisa 	= number_string.length % 3
  rupiah 	= number_string.substr(0, sisa)
  ribuan 	= number_string.substr(sisa).match(/\d{3}/gi)
    
  if (ribuan) {
    separator = sisa ? '.' : ''
    rupiah += separator + ribuan.join('.')
  }
  
  return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '')
}

const setNotification = (status,message,time) => {
  notifContainer.classList.add(status)
  notifText.textContent = message
  setTimeout(() => {
    notifContainer.classList.remove(status)
    defaultTime = 0
  }, defaultTime = defaultTime + time);
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

const getStock = async () => {
  const r = await fetch(baseUrl('seller/getstock'), {
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

  st = formatRupiah(r.stock).split(' ')
  st.shift()
  stockContainer.textContent = st.join('')
}

getStock()

const getSaldo = async () => {
  const r = await fetch(baseUrl('seller/getsaldo'), {
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

  saldoContainer.textContent = formatRupiah(r.saldo)
}

getSaldo()

const getDikirim = async () => {
  const r = await fetch(baseUrl('seller/getdikirim'), {
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

  dikirimContainer.textContent = r.dikirim
}

getDikirim()

withdrawBtn.onclick = () => {
  popUpContainer.classList.add('open')
  popUpContainer.innerHTML =  `
                                <div class="withdraw-container">
                                  <div class="withdraw-content">
                                    <div class="form-group">
                                      <label>Pilih Bank</label>
                                      <div class="districts-container" id="bank">
                                        <div class="district-selected">
                                          <input type="text" placeholder="Pilih Bank" readonly>
                                          <i class="fas fa-caret-down"></i>
                                        </div>
                                        <div class="control-select-option">
                                          <ul>
                                            <li>BCA</li>
                                            <li>BNI</li>
                                            <li>BRI</li>
                                            <li>MANDIRI</li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="form-group">
                                      <label>No Rekening</label>
                                      <input type="text" id="rekening" autocomplete="off">
                                    </div>
                                    <div class="form-group">
                                      <label>Masukan Nominal</label>
                                      <input type="text" id="nominal" autocomplete="off">
                                    </div>
                                  </div>
                                  <div class="withdraw-footer">
                                    <button>Batal</button>
                                    <button>Withdraw</button>
                                  </div>
                                </div>
                              `

  const bank = document.getElementById('bank')
  const bankSelected = bank.querySelector('input')
  bank.onclick = e => {
    const openDistrictsList = bank.querySelector('ul')
    const openArrowDistricts = bank.querySelector('i')
    const districtsList = bank.querySelectorAll('li')

    if (e.target.localName === 'li') {
      bankSelected.setAttribute('value', e.target.innerText)
  
      districtsList.forEach(e => {
        e.classList.remove('active')
        e.removeAttribute('class')
      })
      e.target.classList.add('active')
      openDistrictsList.classList.toggle('open')
      openArrowDistricts.classList.toggle('open')
    }else{
      openDistrictsList.classList.toggle('open')
      openArrowDistricts.classList.toggle('open')
    }
  }

  const rekening = document.getElementById('rekening')
  rekening.onkeypress = e => {
    ch = String.fromCharCode(e.which)
    if (!(/[0-9]/.test(ch))) {
      e.preventDefault()
    }
  }

  const nominal = document.getElementById('nominal')
  nominal.onkeyup = () => {
    nominal.value =  liveFormatRupiah(nominal.value,'Rp.')
  }

  popUpContainer.querySelector('.withdraw-container .withdraw-footer button:first-child').onclick = () => {
    popUpContainer.classList.remove('open')
    popUpContainer.innerHTML = ''
  }



  popUpContainer.querySelector('.withdraw-container .withdraw-footer button:last-child').onclick = async () => {
    if (bankSelected.value == '' | rekening.value == '' | nominal.value == '') {
      setNotification('error','Pastikan semua inputan tidak ada yang kosong',3000)
    } else {
      popUpContainer.innerHTML = '<div class="loader"></div>'
      saldo = saldoContainer.textContent.split('.')
      saldo.shift()
      tarik = nominal.value.split('.')
      tarik.shift()

      if (parseInt(tarik.join('')) > parseInt(saldo.join(''))) {
        setNotification('error','Upss.. Saldomu tidak mencukupi',3000)
        popUpContainer.classList.remove('open')
        popUpContainer.innerHTML = ''
      } else {
        r = await withdraw(parseInt(tarik.join('')))
        if (r.status == 'success') {
          setNotification(r.status,r.message,5000)
          popUpContainer.classList.remove('open')
          popUpContainer.innerHTML = ''
          getSaldo()
        } else {
          setNotification(r.status,r.message,3000)
          popUpContainer.classList.remove('open')
          popUpContainer.innerHTML = ''
        }
      }
    }
  }

  popUpContainer.onclick = e => {
    if (e.target.classList.contains('popup-container')) {
      popUpContainer.classList.remove('open')
      popUpContainer.innerHTML = ''
    }
  }
}

const confirmOrder = inv => {
  const form = new FormData()
  form.append('invoice',inv)

  popUpContainer.innerHTML = '<div class="loader"></div>'

  return fetch(baseUrl('seller/confirmorder'), {
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

const getNewOrder = async () => {
  const r = await fetch(baseUrl('seller/getneworder'), {
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
    newOrderContainer.innerHTML = `
                                    <table border="0">
                                      <thead>
                                        <tr>
                                          <th>Invoice</th>
                                          <th>Tanggal - Waktu</th>
                                          <th>Aksi</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                      ${r.details.map(d => {
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
                                                    <td>${invoice[0]+'/'+invoice[1]+'/'+invoice[2]+'/'+d.transaksiGroup+'/'+invoice[3]}</td>
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
    newOrderContainer.querySelectorAll('button').forEach(e => {
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
  }else{
    newOrderContainer.innerHTML = `
                                    <div class="empty">
                                      <img src="${baseUrl('assets/Project Toko Online/icon/empty-oder.svg')}">
                                      <h2>Tidak Ada Pesanan Terbaru</h2>
                                    </div>
                                  `
  }
}

getNewOrder()

const getNewOrderDetails = async a => {
  let totalBarang = 0
  let totalHarga = 0
  
  popUpContainer.innerHTML = '<div class="loader"></div>'
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
                                        <p>${r.status == '1' ? 'Menunggu Konfirmasi' : ''}</p>
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
                                      <button id="konfirmasi" data-inv="${r.invoice}">Konfirmasi Pesanan</button>
                                    </div>
                                  </div>
                                </div>
                              `
  document.getElementById('close').addEventListener('click', () => {
    popUpContainer.classList.remove('open')
    popUpContainer.innerHTML = ''
  })

  document.getElementById('konfirmasi').addEventListener('click', async () => {
    x = await confirmOrder(document.getElementById('konfirmasi').dataset.inv)
    if (x.status == 'success') {
      popUpContainer.classList.remove('open')
      popUpContainer.innerHTML = ''
      getNotifOrder()
      getStock()
      getNewOrder()
      getMyShopOrdersNotif()
      setNotification(x.status,x.message,3000)
    }else{
      popUpContainer.classList.remove('open')
      popUpContainer.innerHTML = ''
      setNotification(x.status,x.message,3000)
    }
  })
}

const withdraw = a => {
  const form = new FormData()
  form.append('nominal',a)

  return fetch(baseUrl('seller/withdraw'), {
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







