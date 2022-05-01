let limit = 10
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

const formSearch = document.getElementById('form-search')
const searchInput = document.getElementById('search-input')
const searchResults = document.getElementById('search-results')

searchInput.addEventListener('keyup', async () => {
  searchInput.value = searchInput.value.replace(/[^a-zA-Z0-9\s]+/, '')
  r = await getAllProductsByName(searchInput.value)

  if (r == '') {
    searchResults.style.display = 'none'
  } else {
    searchResults.style.display = 'block'
    searchResults.innerHTML = r.map(i => {
      return  `
                <a href="${baseUrl('toko/'+i.toko.domainToko+'/'+i.slug)}" class="list-item">
                  <img src="${i.foto.length == 0 ? baseUrl('assets/Project Toko Online/image/no-product-image.png') : baseUrl('assets/Project Toko Online/image/products/'+i.foto[0].nama_foto)}" class="list-item-img">
                  <div class="list-item-name">
                    <h2>${i.namaBarang}</h2>
                  </div>
                </a>
              `
    }).join('')
  }
})

formSearch.addEventListener('submit', e => {
  e.preventDefault()
  if (searchInput.value != '') {
    window.location = baseUrl('search?nama_barang='+searchInput.value)
  }
})

const getAllProductsByName = n => {
  return fetch(baseUrl('api/getallproductsbyname/?ss='+n), {
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

const brands = document.querySelectorAll('.brands-container .brands-group .brand')
const tittleHeaderProducts = document.querySelector('.main-container .products-container .tittle-header span')
const showProductsContainer = document.querySelector('.main-container .show-products')
const loadMoreButton = document.querySelector('.main-container .products-container .load-more button')

brands.forEach(e => {
  e.addEventListener('click', () => {
    brands.forEach(i => {
      i.classList.remove('active')
    })

    e.classList.add('active')
    
    switch (e.textContent.toLowerCase()) {
      case 'all':
        getAllProductsByNameB('')
        tittleHeaderProducts.textContent = 'Semua Produk'
        loadMoreButton.remove()
        break;

      case 'ventela':
        getAllProductsByNameB('?nama_barang=ventela')
        tittleHeaderProducts.textContent = 'Ventela'
        loadMoreButton.remove()
      break;

        case 'patrobas':
        getAllProductsByNameB('?nama_barang=patrobas')
        tittleHeaderProducts.textContent = 'Patrobas'
        loadMoreButton.remove()
        break;

      case 'campuss':
        getAllProductsByNameB('?nama_barang=campuss')
        tittleHeaderProducts.textContent = 'Campuss'
        loadMoreButton.remove()
        break;

      case 'warrior':
        getAllProductsByNameB('?nama_barang=warrior')
        tittleHeaderProducts.textContent = 'Warrior'
        loadMoreButton.remove()
        break;
    }
  })
})

const getAllProductsByNameB = async n => {
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

  showProductsContainer.innerHTML = r.products.map(i => {
    return  `
              <div class="product-card">
                <a href="${baseUrl('toko/'+i.toko.domainToko+'/'+i.slug)}">
                  <div class="product-image">
                    <img src="${i.foto == '' ? baseUrl('assets/Project Toko Online/image/no-product-image.png') : baseUrl('assets/Project Toko Online/image/products/'+i.foto[0].nama_foto)}">
                  </div>
                  <div class="product-info">
                    <div class="product-name">
                      ${i.namaBarang}
                    </div>
                    <div class="product-price">
                      ${formatRupiah(i.harga[0].harga)}
                    </div>
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

const getAllProductByLimit = async l => {
  const response = await fetch(baseUrl('api/getallproducts?limit='+l), {
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

  showBerandaProducts(response)
}

getAllProductByLimit(limit)

const showBerandaProducts = r => {
  showProductsContainer.innerHTML = showBerandaProductItem(r)
}

const showBerandaProductItem = r => {
  return  r.map(d => {
    return  `
              <div class="product-card">
                <a href="${baseUrl('toko/'+d.domain+'/'+d.slug)}">
                  <div class="product-image">
                    <img src="${d.fotoBarang == '' ? baseUrl('assets/Project Toko Online/image/no-product-image.png') : baseUrl('assets/Project Toko Online/image/products/'+d.fotoBarang[0].nama_foto)}">
                  </div>
                  <div class="product-info">
                    <div class="product-name">
                      ${d.namaBarang}
                    </div>
                    <div class="product-price">
                      ${formatRupiah(d.hargaBarang)}
                    </div>
                  </div>
                  <div class="shop-info">
                    <i class="fas fa-store"></i>
                    <div class="infos">
                      <span>${d.kotaToko.split(' ')[0] == 'Kabupaten' ? d.kotaToko.split(' ')[1] : d.kotaToko.split(' ')[0]}</span>
                      <span>${d.namaToko}</span>
                    </div>
                  </div>
                </a>
              </div>
            `
  }).join('')  
}

loadMoreButton.addEventListener('click', () => {
  limit = limit + 10
  if (limit <= 50) {
    getAllProductByLimit(limit)
  }


  if (limit == 50) {
    loadMoreButton.remove()
  }

})

document.addEventListener('click', e => {
  if (e.target.id != 'search-input') {
    searchResults.style.display = 'none'
    searchResults.innerHTML = ''
  }
})
