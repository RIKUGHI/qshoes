baseUrl = url => {
  return 'http://localhost/CI/'+url
}
let formatRupiah = bilangan => {
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
const cartContainer = document.querySelector('.main-cart-container .cart-container')

const getKeranjangUser = async () => {
  const r = await fetch(baseUrl('keranjang/getkeranjanguser'), {
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

  if (r.produk == null) {
    cartContainer.innerHTML = `
                                <div class="empty">
                                  <img src="${baseUrl('assets/Project Toko Online/icon/empty_cart.svg')}">
                                  <h2>Keranjang Kosong</h2>
                                </div> 
                              `
    const buyCartContainer = document.querySelector('.main-cart-container .buy-container')
    const checkoutBtn = buyCartContainer.querySelector('.buy-card button')
    checkoutBtn.style.cursor = 'no-drop'
    checkoutBtn.style.background = '#572d95'
  } else {
    let totalBarang = 0 
    let totalHarga = 0

    cartContainer.innerHTML = r.produk.map(i => {
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
                      <h4>${formatRupiah(i.hargaProduk)}</h4>
                    </div>
                  </div>
                  <div class="order-footer">
                    <div class="quantity-container" data-idukuran="${i.idUkuran}">
                      <button class="fas fa-minus"> </button>
                      <input type="text" value="${i.qty}" maxlength="4" readonly>
                      <button class="fas fa-plus"></button>
                    </div>
                    <button class="fas fa-trash-alt" data-idukuran="${i.idUkuran}"></button>
                  </div>
                  <p class="notif-handling ">Maks. beli ${i.stokProduk} barang</p>
                </div>
              `
    }).join('')

    const orderImage = cartContainer.querySelectorAll('.order-card .order-image img')
    const productName = cartContainer.querySelectorAll('.order-card .order-info .product-name')
    const minBtn = cartContainer.querySelectorAll('.order-card .order-footer .quantity-container .fa-minus')
    const qtyValue = cartContainer.querySelectorAll('.order-card .order-footer .quantity-container input')
    const plusBtn = cartContainer.querySelectorAll('.order-card .order-footer .quantity-container .fa-plus')
    const trashBtn = cartContainer.querySelectorAll('.order-card .order-footer .fa-trash-alt')
    
    orderImage.forEach((e,i) => {
      e.addEventListener('click', () => {
        location.href = baseUrl('toko/'+r.produk[i].domainToko+'/'+r.produk[i].slug)
      })
    })
  
    productName.forEach((e,i) => {
      e.addEventListener('click', () => {
        location.href = baseUrl('toko/'+r.produk[i].domainToko+'/'+r.produk[i].slug)
      })
    })
  
    minBtn.forEach((e,i) => {
      if (parseInt(qtyValue[i].value) == 1) {
        e.style.background = '#572d95'
      }
  
      if (parseInt(qtyValue[i].value) != 1) {
        e.addEventListener('click', async () => {
          qtyValue[i].value = parseInt(qtyValue[i].value) - 1
  
          if (parseInt(qtyValue[i].value) <= 1) {
            qtyValue[i].value = 1
            qtyValue[i].setAttribute('value', 1)
            e.style.background = '#572d95'
            
            re = await updateProductFromKeranjang(e.parentNode.dataset.idukuran,qtyValue[i].value)
            if (re.status == 'success') {
              getKeranjangUser()
            }else{
              setNotification(re.status,re.message,3000)
            }
          }else{
            qtyValue[i].setAttribute('value', qtyValue[i].value)
            plusBtn[i].style.background = ''
            
            re = await updateProductFromKeranjang(e.parentNode.dataset.idukuran,qtyValue[i].value)
            if (re.status == 'success') {
              getKeranjangUser()
            }else{
              setNotification(re.status,re.message,3000)
            }
          }
        })
        
      }

    })
  
    plusBtn.forEach((e,i) => {
      if (parseInt(qtyValue[i].value) == parseInt(r.produk[i].stokProduk)) {
        e.style.background = '#572d95'
      }
      
      if (parseInt(qtyValue[i].value) != (r.produk[i].stokProduk)) {
        e.addEventListener('click', async () => {
          qtyValue[i].value = parseInt(qtyValue[i].value) + 1
          if (parseInt(qtyValue[i].value) >= r.produk[i].stokProduk) {
            qtyValue[i].value = r.produk[i].stokProduk
            qtyValue[i].setAttribute('value', r.produk[i].stokProduk)
            e.style.background = '#572d95'
  
            re = await updateProductFromKeranjang(e.parentNode.dataset.idukuran,qtyValue[i].value)
            if (re.status == 'success') {
              getKeranjangUser()
            }else{
              setNotification(re.status,re.message,3000)
            }
          }else{
            qtyValue[i].setAttribute('value', qtyValue[i].value)
            minBtn[i].style.background = ''
  
            re = await updateProductFromKeranjang(e.parentNode.dataset.idukuran,qtyValue[i].value)
            if (re.status == 'success') {
              getKeranjangUser()
            }else{
              setNotification(re.status,re.message,3000)
            }
          }
        })
      }
    })
  
    trashBtn.forEach((e,i) => {
      e.addEventListener('click', async () => {
        res = await deleteProductFromKeranjang(e.dataset.idukuran)
        if (res.status == 'success') {
          setNotification(res.status,res.message,3000)
          getKeranjangUser()
          getKeranjang()
        } else {
          setNotification(res.status,res.message,3000)
        }
      })
    })

    const buyCartContainer = document.querySelector('.main-cart-container .buy-container')
    const totalB = buyCartContainer.querySelector('.total h6:first-child')
    const totalH = buyCartContainer.querySelector('.total h6:last-child')
    const checkoutBtn = buyCartContainer.querySelector('.buy-card button')

    totalB.textContent = `Total Harga (${totalBarang} Barang)`
    totalH.textContent = formatRupiah(totalHarga)
    checkoutBtn.addEventListener('click', () => {
      window.location = baseUrl('checkout')
    })
  }

}

getKeranjangUser()

const updateProductFromKeranjang = (a,b) => {
  const form = new FormData()
  form.append('id_ukuran',a)
  form.append('qty',b)

  const r = fetch(baseUrl('keranjang/updateprodukfromkeranjang'), {
    method: 'POST',
    body: form
  }).then(res => {
    if (res.ok) {
      return res.json()
    } else {
      console.error('Gagal mengambil data');
    }
  }).then(data => data).catch(err => console.error(err))

  return r
}

let deleteProductFromKeranjang = a => {
  const form = new FormData()
  form.append('id_ukuran',a)

  const r = fetch(baseUrl('keranjang/deleteprodukfromkeranjang'), {
    method: 'POST',
    body: form
  }).then(res => {
    if (res.ok) {
      return res.json()
    } else {
      console.error('Gagal mengambil data');
    }
  }).then(data => data).catch(err => console.error(err))

  return r
}


