const mitraContent = document.querySelector('.profile-shop-container .mitra-content')
let baseUrl = url => {
  return 'http://localhost/CI/'+url
}

const getAllToko = async () => {
  const response = await fetch(baseUrl('api/getalltoko'), {
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

  showToko(response)
}

getAllToko()

const showToko = r => {
  mitraContent.innerHTML = showTokoItems(r)
}

const showTokoItems = i => {
  return i.map(d => {
    return  `
              <div class="shop-card">
                <a href="${baseUrl('toko/'+d.domainToko)}">
                  <div class="card-header">
                    <div class="circle-image">
                      <img src="${d.gambarToko != null && d.gambarToko != ''? baseUrl('assets/Project Toko Online/image/users/'+d.gambarToko) : baseUrl('assets/Project Toko Online/icon/no-shop-image.jpg')}">
                    </div>
                    <div class="info">
                      <div class="simple-data">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${d.kotaToko}</span>
                      </div>
                      <div class="simple-data">
                        <i class="fas fa-cubes"></i>
                        <span>Produk:</span>
                        <span>${d.produkToko}</span>
                      </div>
                    </div>
                  </div>
                  <div class="card-footer">
                    <span>${d.namaToko}</span>
                  </div>
                </a>
              </div>
            `
  }).join('')
}