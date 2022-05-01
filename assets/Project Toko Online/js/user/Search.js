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

const titleHeader = document.querySelector('.search-container .tittle-header span')
const showProducts = document.querySelector('.search-container .show-products')
const paginationContainer = document.querySelector('.search-container .pagination-container')

const getAllProductsByName = async n => {
  const r = await fetch(baseUrl('api/search'+n), {
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

  showInfo(r)
  paginationContainer.innerHTML = showPagination(r)
}

getAllProductsByName(location.search)

const showInfo = d => {
  titleHeader.textContent = `Hasil pencarian untuk "${d.namaPencarian == '' ? 'Semua' : d.namaPencarian}"`
  if (d.products == '') {
    showProducts.innerHTML =  `
                                <div class="empty">
                                  <img src="${baseUrl('assets/Project Toko Online/icon/empty-oder.svg')}">
                                  <h2>Yahh.. tidak ada produk</h2>
                                </div>
                              `
  } else {
    showProducts.innerHTML = d.products.map(i => {
      return  `
                <div class="product-card">
                  <a href="${baseUrl('toko/'+i.toko.domainToko+'/'+i.slug)}">
                    <div class="product-image">
                      <img src="${i.foto.length == 0 ? baseUrl('assets/Project Toko Online/image/no-product-image.png') : baseUrl('assets/Project Toko Online/image/products/'+i.foto[0].nama_foto)}">
                    </div>
                    <div class="product-info">
                      <div class="product-name">${i.namaBarang}</div>
                      <div class="product-price">${formatRupiah(i.harga[0].harga)}</div>
                    </div>
                    <div class="shop-info">
                      <i class="fas fa-store"></i>
                      <div class="infos">
                        <span>${i.toko.kotaToko.split(' ')[0] == 'Kabupaten' ? i.toko.kotaToko.split(' ')[1] : i.toko.kotaToko.split(' ')[0]}</span>
                        <span>${i.toko.namaToko}</span>
                      </div>
                    </div>
                  </a>
                </div>
              `
    }).join('')
  }
}

const showPagination = d => {
  let p = ``

  if (d.halamanAktif > 1) {
    p +=  `
            <a href="${location.search == '' ? baseUrl('search?page='+(d.halamanAktif - 1)) : baseUrl('search?nama_barang='+d.namaPencarian+'&page='+(d.halamanAktif - 1))}" class="pagination-btn prev">
              <img src="${baseUrl('assets/Project Toko Online/icon/prevArrow.svg')}">
            </a>
          `
  }

  if (d.jumlahHalaman > 5) {
    if (d.halamanAktif >= 3 && d.halamanAktif < d.jumlahHalaman - 2) {
      for (let i = d.halamanAktif - 2; i <= d.halamanAktif + 2; i++) {
        p += `<a href="${location.search == '' ? baseUrl('search?page='+i) : baseUrl('search?nama_barang='+d.namaPencarian+'&page='+i)}" class="pagination-btn ${i == d.halamanAktif ? 'active' : ''}">${i}</a>`
      }
    }else if (d.halamanAktif >= d.jumlahHalaman - 2){
      for (let i = d.jumlahHalaman - 4; i <= d.jumlahHalaman; i++) {
        p += `<a href="${location.search == '' ? baseUrl('search?page='+i) : baseUrl('search?nama_barang='+d.namaPencarian+'&page='+i)}" class="pagination-btn ${i == d.halamanAktif ? 'active' : ''}">${i}</a>`
      }
    }else{
      for (let i = 1; i <= 5; i++) {
        p += `<a href="${location.search == '' ? baseUrl('search?page='+i) : baseUrl('search?nama_barang='+d.namaPencarian+'&page='+i)}" class="pagination-btn ${i == d.halamanAktif ? 'active' : ''}">${i}</a>`
      }
    }
  }else{
    for (let i = 1; i <= d.jumlahHalaman; i++) {
      p += `<a href="${location.search == '' ? baseUrl('search?page='+i) : baseUrl('search?nama_barang='+d.namaPencarian+'&page='+i)}" class="pagination-btn ${i == d.halamanAktif ? 'active' : ''}">${i}</a>`
    }
  }

  if (d.halamanAktif < d.jumlahHalaman) {
    p +=  `
            <a href="${location.search == '' ? baseUrl('search?page='+(d.halamanAktif + 1)) : baseUrl('search?nama_barang='+d.namaPencarian+'&page='+(d.halamanAktif + 1))}" class="pagination-btn next">
              <img src="${baseUrl('assets/Project Toko Online/icon/nextArrow.svg')}">
            </a>
          `
  }

  return p
}






