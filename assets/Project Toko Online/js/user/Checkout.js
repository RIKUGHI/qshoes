let baseUrl = url => {
  return 'http://localhost/CI/'+url
}
const penerima = document.querySelector('.address-body .data-group:first-child .form-group:first-child input')
const telepon = document.querySelector('.address-body .data-group:first-child .form-group:last-child input')
const detailAlamat = document.querySelector('.address-body .data-group:nth-child(3) .form-group textarea')
const cartContainer = document.querySelector('.address-body .data-group:nth-child(4)')
const jumlahPembayaran = document.querySelector('.address-body .data-group:nth-child(5) .form-group:last-child input')
const popUpContainerC = document.querySelector('.popup-container')
let totalBarang = 0 
let totalHarga = 0
let totalTagihan = 0
let totalOngkosKirim = 0

const getKeranjangUser = () => {
  return fetch(baseUrl('checkout/getkeranjanguser'), {
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
}

const getDistricts = a => {
  return fetch(a, {
    method: 'GET',
    header: {
      'Content-Type' : 'application/json'
    }
  }).then(r => {
    if (r.ok) {
      return r.json()
    } else {
      console.error('Gagal mengambil data');
    }
  }).then(d => d).catch(err => console.error(err))
}

const getCost = (a,b) => {
  const form = new FormData()
  form.append('origin',a)
  form.append('destination',b)

  return fetch(baseUrl('checkout/getcost'), {
    method: 'POST',
    body: form
  }).then(r => {
    if (r.ok) {
      return r.json()
    } else {
      console.error('Gagal mengambil data');
    }
  }).then(d => d).catch(err => console.error(err))
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


window.addEventListener('DOMContentLoaded', async () => {
  r = await getKeranjangUser()

  if (r.keranjang[0].totalCart == 0) {
    setNotification('error','Barang checkout kamu kosong nih. Kamu akan dikembalikan ke halaman Keranjang',4000)
    setTimeout(() => {
      location.replace(baseUrl('keranjang'))
    }, 5000);
  }

  penerima.value = r.user.username
  telepon.value = r.user.nomerHp

  penerima.addEventListener('keyup', () => {
    penerima.value = penerima.value.replace(/[^a-zA-Z0-9\s]+/, '')
  })

  telepon.addEventListener('keypress', e => {
    ch = String.fromCharCode(e.which)
    if (!(/[0-9]/.test(ch))) {
      e.preventDefault()
    }
  })

  jumlahPembayaran.addEventListener('keyup', () => {
    jumlahPembayaran.value = liveFormatRupiah(jumlahPembayaran.value,'RP.')
  })

  cartContainer.innerHTML = r.keranjang[0].produk.map(i => {
    totalBarang = totalBarang + parseInt(i.qty)
    totalHarga = parseInt(i.hargaProduk * i.qty) + totalHarga
    return  `
              <div class="order-card">
                <div class="order-body">
                  <div class="order-image">
                    <img src="${baseUrl('assets/Project Toko Online/image/products/'+i.fotoProduk)}">
                  </div>
                  <div class="order-info">
                    <label class="shop-name">${i.namaToko}</label>
                    <span class="product-name">${i.namaProduk}</span>
                    <span class="more-info">${i.ukuranProduk}</span>
                    <h4>${formatRupiah(i.hargaProduk) + ' x ' + i.qty + ' Barang'}</h4>
                  </div>
                </div>
                <div class="order-footer">
                  <div class="shipping-container" data-origin="${i.idKota}">
                    <div class="shipping-selected">
                      <input type="text" placeholder="Pengiriman" readonly data-cost="0">
                      <i class="fas fa-caret-down"></i>
                    </div>
                    <div class="control-select-option">
                      <ul></ul>
                    </div>
                  </div>
                </div>
              </div>
            `
  }).join('')

  const shippingContainer = cartContainer.querySelectorAll('.shipping-container')
  shippingContainer.forEach(e => {
    e.addEventListener('click', async l => {
      const openDistrictsList = e.querySelector('ul')
      const openArrowDistricts = e.querySelector('i')
      const districtsList = e.querySelectorAll('li')

      if (kotaSelected.dataset.destination == undefined) {
        setNotification('error','Masukan kota tujuan terlebih dahulu',3000)
      } else {
        e.querySelector('input').placeholder = 'Loading...'

        r = await getCost(e.dataset.origin,kotaSelected.dataset.destination)

          if (l.target.localName === 'li') {
            if (parseInt(e.querySelector('input').getAttribute('data-cost')) != parseInt(l.target.dataset.cost)) {
              totalOngkosKirim = parseInt(l.target.dataset.cost) + totalOngkosKirim - parseInt(e.querySelector('input').getAttribute('data-cost'))
            } else {
              totalOngkosKirim = parseInt(l.target.dataset.cost) + totalOngkosKirim - parseInt(l.target.dataset.cost)
            }
            e.querySelector('input').setAttribute('value',l.target.textContent)
            e.querySelector('input').setAttribute('data-cost',l.target.dataset.cost)
            e.querySelector('input').setAttribute('data-description',l.target.dataset.description)
            e.querySelector('input').setAttribute('data-tiba',l.target.dataset.tiba)
            document.getElementById('ongkos-kirim').textContent = formatRupiah(totalOngkosKirim)
            totalTagihan = totalHarga + totalOngkosKirim
            document.getElementById('tagihan').textContent = formatRupiah(totalTagihan + 4000) 

            openDistrictsList.classList.toggle('open')
            openArrowDistricts.classList.toggle('open')
          }else{
            openDistrictsList.classList.toggle('open')
            openArrowDistricts.classList.toggle('open')
            
            if (r.rajaongkir.status.code == 200) {
              e.querySelector('input').placeholder = 'Pilih Pengiriman'
              
              if (r.rajaongkir.results[0].costs != '') {
                openDistrictsList.innerHTML = r.rajaongkir.results[0].costs.map(x => {
                  return  `
                            <li data-cost="${x.cost[0].value}" data-description="${x.description}" data-tiba="${x.cost[0].etd}">${x.description +` | `+ formatRupiah(x.cost[0].value) +` | `+ x.cost[0].etd +` `+ `hari`}</li>
                          `
                }).join('')
                
              } else {
                openDistrictsList.innerHTML = '<li>Tidak ada pilihan pengiriman</li>'
              }
            } else {
              setNotification('error','Gagal mengambil data, tunggu beberapa saat lagi',3000)
            }
          }
      }
    })
  })

  const totalHargaC = document.getElementById('total-harga')
  totalHargaC.querySelector('span:first-child').textContent = `Total Harga (${totalBarang} Barang)`
  totalHargaC.querySelector('span:last-child').textContent = formatRupiah(totalHarga)

})

const provinsi = document.getElementById('provinsi')
const provinsiSelected = provinsi.querySelector('input')
const kota = document.getElementById('kota')
const kotaSelected = kota.querySelector('input')
const bank = document.getElementById('bank')
const bankSelected = bank.querySelector('input')

provinsi.addEventListener('click', async e => {
  const openDistrictsList = provinsi.querySelector('ul')
  const openArrowDistricts = provinsi.querySelector('i')
  const districtsList = provinsi.querySelectorAll('li')

  if (e.target.localName === 'li') {
    provinsiSelected.setAttribute('value', e.target.innerText)
    provinsiSelected.setAttribute('data-id', e.target.dataset.id)

    kotaSelected.removeAttribute('value')
    kotaSelected.removeAttribute('data-id')

    cartContainer.querySelectorAll('.shipping-container').forEach(e => {
      e.querySelector('ul').classList.remove('open')
      e.querySelector('input').placeholder = 'Pengiriman'
      e.querySelector('input').removeAttribute('value')
    })

    k = await getDistricts(baseUrl('api/getcity?province='+e.target.dataset.id))
    if (k.rajaongkir.status == 200) {
      kota.querySelector('.district-selected').classList.remove('disable')
    }
    kota.querySelector('.district-selected').classList.remove('disable')
    kota.querySelector('ul').innerHTML = k.rajaongkir.results.map(l => {
      return  `
                <li data-id="${l.city_id}">${l.city_name}</li>
              `
    }).join('')

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
})

kota.addEventListener('click', async e => {
  const openDistrictsList = kota.querySelector('ul')
  const openArrowDistricts = kota.querySelector('i')
  const districtsList = kota.querySelectorAll('li')

  if (!kota.querySelector('.district-selected').classList.contains('disable')) {
    if (e.target.localName === 'li') {
      kotaSelected.setAttribute('value', e.target.innerText)
      kotaSelected.setAttribute('data-destination', e.target.dataset.id)
  
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
})

bank.addEventListener('click', e => {
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
})

const kembaliBtn = document.getElementById('kembali')
const buatPesanBtn = document.getElementById('pesan')

kembaliBtn.addEventListener('click', () => {    
  location.href = baseUrl('keranjang')
})

buatPesanBtn.addEventListener('click', async () => {
  const shippingContainer = cartContainer.querySelectorAll('.shipping-container')
  let isShippingEmpty
  let stillUndefined = 0
  shippingContainer.forEach((e,i) => {
    if ( shippingContainer[i].querySelector('input').dataset.cost == undefined) {
      stillUndefined++
    }
  })

  if (penerima.value == '' || telepon.value == '' || provinsiSelected.value == '' || kotaSelected.value == '' || detailAlamat.value == '' || stillUndefined != 0 || bankSelected.value == '' || jumlahPembayaran.value == '') {
    setNotification('error','Pastikan semua inputan tidak ada yang kosong',3000)
  }else{
    pembayaran = jumlahPembayaran.value.split('.')
    pembayaran.shift()

    if (parseInt(pembayaran.join('')) < totalTagihan + 4000 || parseInt(pembayaran.join('')) > totalTagihan + 4000) {
      setNotification('error','Jumlah pembayaran harus sama dengan total tagihan',3000)
    } else {
      const form = new FormData()
      form.append('nama_penerima',penerima.value)
      form.append('nomer_hp',telepon.value)
      form.append('provinsi',provinsiSelected.value)
      form.append('kota',kotaSelected.value)
      form.append('detail_alamat',detailAlamat.value)
      form.append('bank',bankSelected.value)
      form.append('biaya_administrasi',4000)
      form.append('total_bayar',totalTagihan + 4000)
      shippingContainer.forEach(e => {
        form.append('ongkos_kirim[]',parseInt(e.querySelector('input').getAttribute('data-cost')))
        form.append('deskripsi[]',e.querySelector('input').getAttribute('data-description'))
        form.append('estimasi[]',e.querySelector('input').getAttribute('data-tiba'))
      })

      popUpContainerC.classList.add('open')
      popUpContainerC.innerHTML = '<div class="loader"></div>'
      
      const r = await fetch(baseUrl('checkout/createorder'), {
        method: 'POST',
        body: form
      }).then(r => {
        if (r.ok) {
          return r.json()
        } else {
          console.error('Gagal mengambil data');
        }
      }).then(d => d).catch(err => console.error(err))
  
      if (r.status == 'success') {
        popUpContainerC.classList.remove('open')
        popUpContainerC.innerHTML = ''
        getKeranjang()
        document.querySelector('.address-container .address-body').innerHTML =  `
                                                                                  <div class="berhasil-container">
                                                                                    <img src="${baseUrl('assets/Project Toko Online/icon/sukses-daftar-toko.svg')}">
                                                                                    <h3>Yey..... Berhasil Order</h3>
                                                                                    <button id="cek-order">Cek Status Orderanmu</button>
                                                                                  </div>
                                                                                `
        document.querySelector('.address-container .address-footer').remove()
        document.getElementById('cek-order').addEventListener('click', () => {
          location.href = baseUrl('user/order?status=menunggu_konfirmasi')
        })
      } else {
        setNotification(r.status,r.message,3000)
      }
    }
    
  }
})








