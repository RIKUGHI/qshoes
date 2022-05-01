const currentUrl = location.href.split('/')
const shopHeader = document.querySelector('.profile-shop-container .shop-header')
const shopContent = document.querySelector('.profile-shop-container .shop-content')
const domain = currentUrl[5]
let total = 0
let baseUrl = url => {
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

const getProductByDomain = async d => {
  const response = await fetch(baseUrl('api/getproductsbydomain/'+d), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    if (res.ok) {
      return res.json()
    } else {
      console.error('Gagal mengambil data')
    }
  }).then(data => data).catch(err => console.error(err))

  showInfoTokoByDomain(response)
}

getProductByDomain(domain)

const showInfoTokoByDomain = r => {
  shopHeader.querySelector('.image').innerHTML = `<img src="${r.toko.gambarToko != null ?  baseUrl('assets/Project Toko Online/icon/no-shop-image.jpg') : baseUrl('assets/Project Toko Online/icon/no-shop-image.jpg')}">`
  shopHeader.querySelector('h1').textContent = r.toko.namaToko
  shopHeader.querySelector('.simple-data:first-child span').textContent = 'Kab. '+r.toko.kotaToko.split(' ')[1]
  r.products.forEach(e => {
    total++
  });
  shopHeader.querySelector('.simple-data:last-child span:last-child').textContent = total

  shopContent.innerHTML = showProductItems(r.toko,r.products)
}

const showProductItems = (t,r) => {
  if (r != '') {
    return r.map(i => { 
      return  `
                <div class="product-card">
                  <a href="${baseUrl('toko/'+t.domainToko+'/'+i.slug)}">
                    <div class="product-image">
                      <img src="${i.foto.length == 0 ? baseUrl('assets/Project Toko Online/image/no-product-image.png') : baseUrl('assets/Project Toko Online/image/products/'+i.foto[0].nama_foto)}">
                    </div>
                    <div class="product-info">
                      <div class="product-name">${i.namaBarang}</div>
                      <div class="product-price">${formatRupiah(i.harga)}</div>
                    </div>
                  </a>
                </div>
              `
    }).join('')
  } else {
    return  `
              <div class="empty">
                <img src="${baseUrl('assets/Project Toko Online/icon/empty-oder.svg')}">
                <h2>Toko Belum Mempunyai Produk</h2>
              </div>
            `
  }
}