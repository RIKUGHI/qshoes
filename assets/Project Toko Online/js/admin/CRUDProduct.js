const idToko = 10
let baseUrl = url => {
  return 'http://localhost/CI/'+url
}
const formatRupiah = bilangan => {
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
const searchInput = formSearch.querySelector('input')
const popUpContainer = document.querySelector('.popup-container')
const productAddBtnDesktop = document.querySelector('.container-add-products .add-product-btn')
const productAddBtnMobile = document.getElementById('add-products-btn')
const notifContainer = document.querySelector('.notification-container')
const notifText = notifContainer.querySelector('p')
let file
let getAllFile = []
let getAllFileWithId = []
let getAllIdFile = []
let defaultTime = 0

formSearch.addEventListener('submit', e => {
  e.preventDefault()
})

searchInput.addEventListener('keyup', async () => {
  // const productsContainer = document.querySelector('.container-add-products .products-container')
  // productsContainer.innerHTML = '<div class="loader"></div>'
  const r = await fetch(baseUrl('seller/getproductbyname?nm='+searchInput.value), {
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
  })
  .then(data => data)
  .catch(err => console.error('Gagal mengambil data'))

  showAllProducts(r)
})

const getAllProductsByIdToko = async () => {
  const productsContainer = document.querySelector('.container-add-products .products-container')
  productsContainer.innerHTML = '<div class="loader"></div>'
  const response = await fetch(baseUrl('api/getallproductsbyidtoko/'), {
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
  })
  .then(data => data)
  .catch(err => console.error('Gagal mengambil data'))

  showAllProducts(response)
}

const showAllProducts = res => {
  const productsContainer = document.querySelector('.container-add-products .products-container')
  productsContainer.innerHTML = res != '' ? showProductItem(res) : showEmptyProducts()
}

const showProductItem = r => {
  return `<h3>Daftar Produk</h3>
          <table border="0">
          <thead>
            <tr>
              <th>No</th>
              <th>Gambar</th>
              <th>Nama Barang</th>
              <th>Kondisi</th>
              <th>Deskripsi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
          ${r.map((d,i) => {
            return  `
                      <tr>
                        <td>${i + 1}</td>
                        <td>
                          <img src="${d.dataFoto[0] != null ? baseUrl('assets/Project Toko Online/image/products/' + d.dataFoto[0].nama_foto) : baseUrl('assets/Project Toko Online/image/no-product-image.png')}">
                        </td>
                        <td>${d.namaBarang}</td>
                        <td>${d.kondisiBarang}</td>
                        <td>
                          <div class="desk">
                            <textarea readonly>${d.deskripsiBarang}</textarea>
                          </div>
                        </td>
                        <td>
                          <div class="action" data-idBarang="${d.idBarang}" data-namaBarang="${d.namaBarang}">
                            <button class="far fa-eye mata"></button>
                            <button class="fas fa-pen ubah"></button>
                            <button class="fas fa-trash-alt hapus"></button>
                          </div>
                        </td>
                      </tr>
                    `
          }).join('')}
          </tbody>
        </table>
  `
}

const showEmptyProducts = () => {
  return `<h3>Daftar Produk</h3>
          <div class="empty">
            <img src="${baseUrl('assets/Project Toko Online/icon/empty-oder.svg')}">
            <h2>Toko Belum Mempunya Produk</h2>
          </div>
  `
}

const getProductByIdBarang = async (idBarang,c) => {
  const popUpContainer = document.querySelector('.popup-container')
  popUpContainer.innerHTML = '<div class="loader"></div>'
  const response = await fetch(baseUrl('api/getproductbyidbarang/'+idBarang), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.ok ? res.json() : console.error('Gagal mengambil data')).then(data => data).catch(err => console.error(err))
  
  showDetailOrEdit(response[0],c,idBarang)
}

const componentInputFile = i => {
  return  `
            <div class="icon">
              <i class="fas fa-cloud-upload-alt"></i>
            </div>
            <div class="info">Drag & Drop to Upload Files</div>
            <span>OR</span>
            <label for="file${i + 1}">Browse File</label>
            <input type="file" id="file${i + 1}" class="disable">
          `
}

const showDetailOrEdit = (res,c,iB) => {
  popUpContainer.innerHTML = componentDetailProducts(res,c)
  const closePopUpContainerBtn = document.getElementById('close')
  const batalBtn = document.getElementById('batal')
  const ubahBtn = popUpContainer.querySelector('button[type=submit]')

  const deleteProductImagetByIdFoto = async (idBarang,idFoto) => {
    const formDeleteImage = new FormData()
    formDeleteImage.append('idToko', idToko)
    formDeleteImage.append('idBarang', idBarang)
    formDeleteImage.append('idFoto', idFoto)
    
    const response = await fetch(baseUrl('seller/deleteproductimagebyidfoto'), {
      method: 'POST',
      body: formDeleteImage
    }).then(res => res.json()).then(data => data).catch(err => console.error(err))

    setNotification(response.deletedStatus,response.message,3000)
  }

  const deleteUkuranByIdUkuran = async (idBarang,idUkuran) => {
    const formDeleteUkuran = new FormData()
    formDeleteUkuran.append('idToko', idToko)
    formDeleteUkuran.append('idBarang', idBarang)
    formDeleteUkuran.append('idUkuran', idUkuran)

    const response = await fetch(baseUrl('seller/deleteproductsizebyidukuran'), {
      method: 'POST',
      body: formDeleteUkuran
    }).then(res => res.json()).then(data => data).catch(err => console.error(err))

    setNotification(response.deletedStatus,response.message,3000)
  }

  const dropArea = popUpContainer.querySelectorAll('.drag-area')
  const addImagesContainer = popUpContainer.querySelector('.add-images')
  const formAddProduct = document.getElementById('add-product')
  const ubahNamaBarang = document.getElementById('nama_barang')
  const ubahKondisi = document.getElementsByName('kondisi_barang')
  const ubahDeskripsiBarang = document.getElementById('deskripsi')
  const addData2 = popUpContainer.querySelector('.add-data-2')
  const addNewVariantBtn = document.getElementById('add-new-variant')
  const mainInputUkuran = addData2.querySelector('.data-group .form-group:first-child input')
  const mainInputHarga = addData2.querySelector('.data-group .form-group:nth-child(2) input')
  const mainInputstok = addData2.querySelector('.data-group .form-group:nth-child(3) input')
  const progressBarContainer = popUpContainer.querySelector('.progress-bar-container')
  const progressBarText = popUpContainer.querySelector('h3')
  const progressBarFill = progressBarContainer.querySelector('.progress-bar-fill')
  const allowOnlyNumeric = e => {
    ch = String.fromCharCode(e.which)
    if (!(/[0-9]/.test(ch))) {
      e.preventDefault()
    }
  }

  if (c == 'ubah') {
    batalBtn.addEventListener('click', () => {
      popUpContainer.classList.remove('open')
      popUpContainer.innerHTML = ''
    })

    dropArea.forEach((e,i) => {

      const input = e.querySelector('input')
      const btnEdit = e.querySelector('.action button:first-child')
      const btnDelete = e.querySelector('.action button:last-child')
    
      e.addEventListener('dragover', evt => {
        evt.preventDefault()
        const dragText = dropArea[i].querySelector('.info')
        isDropped = e.dataset.isdropped
        isDropped == 'true' ? '' : e.classList.add('active')
        isDropped == 'true' ? '' : dragText.textContent = 'Relase to Upload File'
      })
    
      e.addEventListener('dragleave', evt => {
        evt.preventDefault()
        const dragText = dropArea[i].querySelector('.info')
        isDropped = e.dataset.isdropped
        isDropped == 'true' ? '' : e.classList.remove('active')
        isDropped == 'true' ? '' : dragText.textContent = 'Drag & Drop to Upload Files'
      })
    
      e.addEventListener('drop', evt => {
        evt.preventDefault()
        const dragText = dropArea[i].querySelector('.info')
        // getting user select file and [0] this means if user select multiple files the we'll select only the first one
        file = evt.dataTransfer.files[0]
        parseInt(e.dataset.idfoto) != 0 ? idFoto = parseInt(e.dataset.idfoto) : idFoto = 0
        isDropped = e.dataset.isdropped
        isDropped == 'true' ? setNotification('error','Masukan gambar di kotak berikutnya jika tersedia',3000) : showFileEdit(e,dragText,idFoto)
      })
      
      if (input != null) {
        input.addEventListener('change', () => {
          const dragText = dropArea[i].querySelector('.info')
          file = input.files[0]
          parseInt(e.dataset.idfoto) != 0 ? idFoto = parseInt(e.dataset.idfoto) : idFoto = 0
          showFileEdit(e,dragText,idFoto)
        })
      }

      if (btnEdit != null) {
        btnEdit.addEventListener('click', () => {
          e.classList.remove('active')
          e.setAttribute('data-isdropped', 'false')
          e.innerHTML = componentInputFile(i)
          inputEditImage = e.querySelector('input')
          inputEditImage.addEventListener('change', () => {
            e.innerHTML = componentInputFile(i)
            const dragText = dropArea[i].querySelector('.info')
            parseInt(e.dataset.idfoto) != 0 ? idFoto = parseInt(e.dataset.idfoto) : idFoto = 0
            file = inputEditImage.files[0]
            showFileEdit(e,dragText,idFoto)
          })
        })
      }

      if (btnDelete != null) {
        btnDelete.addEventListener('click', () => {
          idFoto = parseInt(e.dataset.idfoto)
          idBarang = iB
          deleteProductImagetByIdFoto(idBarang,idFoto,e,i)
          e.innerHTML = componentInputFile(i)
          e.classList.remove('active')
          e.setAttribute('data-isdropped', 'false')
          e.setAttribute('data-idfoto', 0)
          inputEditImage = e.querySelector('input')
          inputEditImage.addEventListener('change', () => {
            const dragText = dropArea[i].querySelector('.info')
            parseInt(e.dataset.idfoto) != 0 ? idFoto = parseInt(e.dataset.idfoto) : idFoto = 0
            file = inputEditImage.files[0]
            showFileEdit(e,dragText,idFoto)
          })
        })
      }
    })
    
    formAddProduct.addEventListener('submit', e => {
      e.preventDefault()
    })

    ubahBtn.addEventListener('click', () => {
      const xhr = new XMLHttpRequest()
      const dataUbah = new FormData()
      let noImages = 0
      let ubahKondisiValue
      ubahKondisi.forEach(e => {
        if (e.checked) {
          ubahKondisiValue = e.value
        }
      })
      // addImagesContainer.querySelectorAll('.drag-area').forEach(e => {
        // console.log(e)
      // })
      const isDataImagesEmpty = () => {
        dropArea.forEach(e => {
          // e.dataset.isdropped == 'true' ? noImages : noImages++
          e.dataset.isdropped == 'true' ? noImages = 0 : noImages++
        })
        return noImages == 4 ? true : false
      }
      const otherDataGroupU = addData2.querySelectorAll('.data-group:not(:first-child)')
      const isData2Empty = () => {
        otherDataGroupU.forEach(e => {
          initData2(e)
          status
    
          if (inputAllUkuran.value == '' | Number.isNaN(parseInt(splitAllHarga.join(''))) | inputAllStok.value == '') {
            status = true
          }else{
            status = false
          }
        })
        return status
      }
      const checkStatusData2 = isData2Empty() == 'true' ? true : false
      
      if (isDataImagesEmpty()) {
        setNotification('error','Masukan minimal 1 gambar',3000)
      } else if(ubahNamaBarang.value == '' | ubahKondisiValue == null | ubahDeskripsiBarang.value == '' | checkStatusData2){
        setNotification('error','Pastikan semua inputan tidak ada yang kosong',3000)
      }else {
        if (navigator.onLine) {
          // data 1
          dataUbah.append('id_barang', iB)
          dataUbah.append('slug', res.slug)
          dataUbah.append('nama_barang', ubahNamaBarang.value)
          dataUbah.append('kondisi_barang', ubahKondisiValue)
          dataUbah.append('deskripsi_barang', ubahDeskripsiBarang.value)
          // data file
          for (const file of getAllFile){
            dataUbah.append('berkas_gambar[]', file)
          }
          for (const file of getAllFileWithId) {
            dataUbah.append('berkas_gambar_id[]', file)
          }
          for (const idFile of getAllIdFile) {
            dataUbah.append('berkas_id_file[]', idFile)
          }
          // data 2
          otherDataGroupU.forEach(e => {
            initData2(e)
            if (e.dataset.idukuran == undefined ) {
              dataUbah.append('ukuran[]', parseInt(inputAllUkuran.value))
              dataUbah.append('harga[]', parseInt(splitAllHarga.join('')))
              dataUbah.append('stok[]', parseInt(inputAllStok.value))
            } else {
              dataUbah.append('id_ukuran[]', parseInt(e.dataset.idukuran))
              dataUbah.append('ukuran_id[]', parseInt(inputAllUkuran.value))
              dataUbah.append('harga_id[]', parseInt(splitAllHarga.join('')))
              dataUbah.append('stok_id[]', parseInt(inputAllStok.value))
            }
        })

        xhr.open('POST', baseUrl('seller/updateandupload'), true)
    
        xhr.onloadstart = () => {
          progressBarContainer.classList.remove('disable')
        }
    
        xhr.upload.addEventListener('progress', e => {
          const percent = e.lengthComputable ? (e.loaded / e.total) * 100 : 0
          progressBarText.textContent = Math.round(percent) + '%'
          progressBarFill.style.width = percent + '%'
        })
    
        xhr.onload = () => {
          popUpContainer.innerHTML = ''
          getAllFile = []
          getAllFileWithId = []
          getAllIdFile = []
          getAllProductsByIdToko()
        }
    
        xhr.onreadystatechange = () => {
          if(xhr.readyState == 4 && xhr.status == 200){
            response = JSON.parse(xhr.responseText)
            popUpContainer.classList.remove('open')
            setNotification(response.updatedStatus,response.message,3000)
          }
        }
    
        // xhr.setRequestHeader('Content-Type', 'multipart/form-data')
        // xhr.setRequestHeader("Content-type","multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2));
        xhr.send(dataUbah)

        } else {
          setNotification('error','Tidak ada koneksi internet',3000)
        }
      }
    })

    ubahNamaBarang.addEventListener('keyup', () => {
      ubahNamaBarang.value = ubahNamaBarang.value.replace(/[^a-zA-Z0-9\s]+/, '')
    })

    ubahDeskripsiBarang.addEventListener('keyup', () => {
      ubahDeskripsiBarang.value = ubahDeskripsiBarang.value.replace(/[^a-zA-Z0-9\s]+/, '')
    })

    if (mainInputUkuran != null) {
      mainInputUkuran.addEventListener('keypress', e => {
        allowOnlyNumeric(e) 
      })

      mainInputstok.addEventListener('keypress', e => {
        allowOnlyNumeric(e)
      })

      mainInputHarga.addEventListener('keyup', () => {
        mainInputHarga.value = liveFormatRupiah(mainInputHarga.value, 'Rp.')
      })
    }
    
    const otherDataGroupF = addData2.querySelectorAll('.data-group:not(:first-child)')
    otherDataGroupF.forEach(e => {
      initData2(e)
      inputAllUkuran.addEventListener('keypress', e => {
        allowOnlyNumeric(e)
      })

      inputAllStok.addEventListener('keypress', e => {
        allowOnlyNumeric(e)
      })
    })

    const otherInputHargaF = addData2.querySelectorAll('.data-group .form-group:nth-child(2) input')
    otherInputHargaF.forEach(e => {
      e.addEventListener('keyup', () => {
        e.value = liveFormatRupiah(e.value, 'Rp.')
      })
    })

    const dataGroupF = addData2.querySelectorAll('.data-group:not(:first-child)')
      dataGroupF.forEach(e => {
        deleteDataGroupBtn = e.querySelector('button')
        deleteDataGroupBtn.addEventListener('click', () => {
          idUkuran = parseInt(e.dataset.idukuran)
          deleteUkuranByIdUkuran(iB,idUkuran)
          e.remove()
        })
      })

    addNewVariantBtn.addEventListener('click', () => {
      addData2.insertBefore(createDataGroup(), addNewVariantBtn)
      // initData2()
      const otherDataGroup = addData2.querySelectorAll('.data-group:not(:first-child)')
      otherDataGroup.forEach(e => {
        initData2(e)
        inputAllUkuran.addEventListener('keypress', e => {
          allowOnlyNumeric(e)
        })
    
        inputAllStok.addEventListener('keypress', e => {
          allowOnlyNumeric(e)
        })

        deleteDataGroupBtn = e.querySelector('button')
        deleteDataGroupBtn.addEventListener('click', () => {
          idBarang = iB
          if (Number.isNaN(parseInt(e.dataset.idukuran))) {
            e.remove()
          } else {
            idUkuran = parseInt(e.dataset.idukuran)
            deleteUkuranByIdUkuran(iB,idUkuran)
            e.remove()
          }
        })
      })

      const otherInputHarga = addData2.querySelectorAll('.data-group .form-group:nth-child(2) input')
      otherInputHarga.forEach(e => {
        e.addEventListener('keyup', () => {
          e.value = liveFormatRupiah(e.value, 'Rp.')
        })
      })
    })

    const showFileEdit = (e,dragText,idFoto) => {
      fileType = file.type
      fileSize = file.size
      validExtensions = ['image/jpeg','image/jpg','image/png']
      if (validExtensions.includes(fileType)) {
        if (fileSize > 5000000) {
          setNotification('error','Ukuran gambar maks 5 megabytes',3000)
          e.classList.remove('active')
          dragText.textContent = 'Drag & Drop to Upload Files'
        } else {
          e.classList.add('active')
          e.setAttribute('data-isdropped','true')
    
          if (idFoto != 0) {
            getAllFileWithId.push(file)
            getAllIdFile.push(idFoto)
          } else {
            getAllFile.push(file)
          }
          fileReader = new FileReader()
          fileReader.onload = () => {
            fileURL = fileReader.result // passing user file source in fileURL variable
            imgTag = `<img src="${fileURL}">` // creating an img tag and passing user selected file source inside src attribute
            e.innerHTML = imgTag
          }
          fileReader.readAsDataURL(file)
        }
      } else {
        setNotification('error','Pastikan file adalah gambar',3000)
        e.classList.remove('active')
        dragText.textContent = 'Drag & Drop to Upload Files'
      }
    }
  }

  closePopUpContainerBtn.addEventListener('click', () => {
    popUpContainer.classList.remove('open')
    popUpContainer.innerHTML = ''
  })
}

const deleteProductByIdBarang = async (idBarang,namaBarang) => {
  const formDelete = new FormData()
  formDelete.append('idToko', idToko)
  formDelete.append('idBarang', idBarang)
  
  const response = await fetch(baseUrl('seller/deleteproductbyidbarang'), {
    method: 'POST',
    body: formDelete
  }).then(res => res.json())
  .then(data => data)
  .catch(err => err)

  setNotification(response.deletedStatus,'Produk '+ namaBarang +' '+ response.message,3000)
}

window.addEventListener('DOMContentLoaded', () => {
  getAllProductsByIdToko()
})

document.addEventListener('click', e => {
  if (e.target.classList.contains('mata') | e.target.classList.contains('ubah') | e.target.classList.contains('hapus')) {
    const idBarang = parseInt(e.target.parentElement.dataset.idbarang)
    const namaBarang = e.target.parentElement.dataset.namabarang
    getAllFile = []
    getAllFileWithId = []
    getAllIdFile = []
    if (e.target.classList.contains('fa-eye')) {
      popUpContainer.classList.add('open')
      getProductByIdBarang(idBarang,'detail')

    }else if(e.target.classList.contains('fa-pen')){
      popUpContainer.classList.add('open')
      getProductByIdBarang(idBarang,'ubah')
    }else if(e.target.classList.contains('fa-trash-alt')){
      popUpContainer.classList.add('open')
      popUpContainer.innerHTML = componentDeteleProduct(namaBarang)
  
      const batalBtn = document.getElementById('batalDelete')
      const iyaBtn = document.getElementById('iyaDelete')

      batalBtn.addEventListener('click', () => {
        popUpContainer.classList.remove('open')
        popUpContainer.innerHTML = ''
      })

      iyaBtn.addEventListener('click', () => {
        deleteProductByIdBarang(idBarang,namaBarang)
        setTimeout(() => {
          popUpContainer.classList.remove('open')
          popUpContainer.innerHTML = ''
          getAllProductsByIdToko()
        }, 500);
      })

      popUpContainer.addEventListener('click', e => {
        if (e.target.classList.contains('popup-container')) {
          popUpContainer.classList.remove('open')
          popUpContainer.innerHTML = ''
        }
      })
    }
  }
})

const componentDeteleProduct = n => {
  return `
          <div class="delete-product">
            <div class="product-header">
              <h2>Apakah yakin ingin menghapus produk ${n}</h2>
            </div>
            <div class="action">
              <button id="batalDelete">Batal</button>
              <button id="iyaDelete">Iya</button>
            </div>
          </div>
  `
}

const componentAddProducts = () => {
  return `
          <div class="add-products">
            <div class="product-header">
              <h2>Tambah Produk</h2>
              <button id="close">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="product-content">
              <form id="add-product">
                <div class="add-images">
                  <div class="drag-area" data-isdropped="false">
                    <div class="icon">
                      <i class="fas fa-cloud-upload-alt"></i>
                    </div>
                    <div class="info">Drag & Drop to Upload Files</div>
                    <span>OR</span>
                    <label for="file1">Browse File</label>
                    <input type="file" id="file1" class="disable">
                  </div>
                  <div class="drag-area hidden" data-isdropped="false">
                    <div class="icon">
                      <i class="fas fa-cloud-upload-alt"></i>
                    </div>
                    <div class="info">Drag & Drop to Upload Files</div>
                    <span>OR</span>
                    <label for="file2">Browse File</label>
                    <input type="file" id="file2" class="disable">
                  </div>
                  <div class="drag-area hidden" data-isdropped="false">
                    <div class="icon">
                      <i class="fas fa-cloud-upload-alt"></i>
                    </div>
                    <div class="info">Drag & Drop to Upload Files</div>
                    <span>OR</span>
                    <label for="file3">Browse File</label>
                    <input type="file" id="file3" class="disable">
                  </div>
                  <div class="drag-area hidden" data-isdropped="false">
                    <div class="icon">
                      <i class="fas fa-cloud-upload-alt"></i>
                    </div>
                    <div class="info">Drag & Drop to Upload Files</div>
                    <span>OR</span>
                    <label for="file4">Browse File</label>
                    <input type="file" id="file4" class="disable">
                  </div> 
                </div>
                <div class="add-data-1">
                  <div class="data-group">
                    <div class="form-group name">
                      <label>Nama Barang</label>
                      <input type="text" maxlength="100" id="nama_barang" autocomplete="off"> 
                    </div>
                    <div class="form-group">
                      <label>Kondisi</label>
                      <div class="radio-group">
                        <label class="radio" for="opt1">
                          <input type="radio" name="kondisi_barang" id="opt1" value="baru">
                          Baru
                          <span></span>
                        </label>
                        <label class="radio" for="opt2">
                          <input type="radio" name="kondisi_barang" id="opt2" value="bekas">
                          Bekas
                          <span></span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="data-group">
                    <div class="form-group">
                      <label>Deskripsi</label>
                      <textarea id="deskripsi"></textarea>
                    </div>
                  </div>
                </div>
                <div class="add-data-2">
                  <div class="data-group">
                    <div class="form-group">
                      <label>Ukuran</label>
                      <input type="text">
                    </div>
                    <div class="form-group">
                      <label>Harga</label>
                      <input type="text">
                    </div>
                    <div class="form-group">
                      <label>Stok</label>
                      <input type="text">
                    </div>
                    <button class="fas fa-trash-alt disable"></button>
                  </div>
                  <button id="add-new-variant">Tambah Varian</button>
                </div>
                <div class="last-data">
                  <button id="batal" type="reset">Batal</button>
                  <button type="submit">Simpan</button>
                </div>
              </form>
            </div>
            <div class="progress-bar-container disable">
              <div class="wrapper">
                <h3>0%</h3>
                <div class="progress-bar">
                  <div class="progress-bar-fill"></div>
                </div>
              </div>
            </div>
          </div>
  `
}

const componentDetailProducts = (r,c) => {
  return `
          <div class="add-products">
            <div class="product-header">
              <h2>${c == 'detail' ? 'Detail Produk' : 'Ubah Produk'}</h2>
              <button id="close">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="product-content">
              <form id="add-product">
                <div class="add-images">
                ${c == 'detail' ? r.dataFoto.map(e => {
                  return  `
                            <div class="drag-area active">
                              <img src="${baseUrl('assets/Project Toko Online/image/products/'+e.nama_foto)}">
                            </div>
                          `
                }).join('') : 
                  `
                    <div class="drag-area ${r.dataFoto[0] != null ? 'active' : ''}" data-isdropped="${r.dataFoto[0] != null ? 'true' : 'false'}" ${r.dataFoto[0] != null ? `data-idFoto="${r.dataFoto[0].id_foto}"` : 'data-idFoto="0"'}>
                    ${r.dataFoto[0] != null ? 
                        `
                          <img src="${baseUrl('assets/Project Toko Online/image/products/'+r.dataFoto[0].nama_foto)}">
                          <div class="action">
                            <button class="fas fa-pen"></button>
                            <button class="fas fa-trash-alt"></button>
                          </div>
                        `
                      : 
                      `
                        <div class="icon">
                          <i class="fas fa-cloud-upload-alt"></i>
                        </div>
                        <div class="info">Drag & Drop to Upload Files</div>
                        <span>OR</span>
                        <label for="file1">Browse File</label>
                        <input type="file" id="file1" class="disable">
                      `
                    }
                    </div>
                    <div class="drag-area ${r.dataFoto[1] != null ? 'active' : ''}" data-isdropped="${r.dataFoto[1] != null ? 'true' : 'false'}" ${r.dataFoto[1] != null ? `data-idFoto="${r.dataFoto[1].id_foto}"` : 'data-idFoto="0"'}>
                    ${r.dataFoto[1] != null ? 
                      `
                        <img src="${baseUrl('assets/Project Toko Online/image/products/'+r.dataFoto[1].nama_foto)}">
                        <div class="action">
                          <button class="fas fa-pen"></button>
                          <button class="fas fa-trash-alt"></button>
                        </div>
                      `
                    : 
                      `
                        <div class="icon">
                          <i class="fas fa-cloud-upload-alt"></i>
                        </div>
                        <div class="info">Drag & Drop to Upload Files</div>
                        <span>OR</span>
                        <label for="file2">Browse File</label>
                        <input type="file" id="file2" class="disable">
                      `
                    }
                    </div>
                    <div class="drag-area ${r.dataFoto[2] != null ? 'active' : ''}" data-isdropped="${r.dataFoto[2] != null ? 'true' : 'false'}" ${r.dataFoto[2] != null ? `data-idFoto="${r.dataFoto[2].id_foto}"` : 'data-idFoto="0"'}>
                    ${r.dataFoto[2] != null ? 
                      `
                        <img src="${baseUrl('assets/Project Toko Online/image/products/'+r.dataFoto[2].nama_foto)}">
                        <div class="action">
                          <button class="fas fa-pen"></button>
                          <button class="fas fa-trash-alt"></button>
                        </div>
                      `
                    : 
                      `
                        <div class="icon">
                          <i class="fas fa-cloud-upload-alt"></i>
                        </div>
                        <div class="info">Drag & Drop to Upload Files</div>
                        <span>OR</span>
                        <label for="file3">Browse File</label>
                        <input type="file" id="file3" class="disable">
                      `
                    }
                    </div>
                    <div class="drag-area ${r.dataFoto[3] != null ? 'active' : ''}" data-isdropped="${r.dataFoto[3] != null ? 'true' : 'false'}" ${r.dataFoto[3] != null ? `data-idFoto="${r.dataFoto[3].id_foto}"` : 'data-idFoto="0"'}>
                    ${r.dataFoto[3] != null ? 
                      `
                        <img src="${baseUrl('assets/Project Toko Online/image/products/'+r.dataFoto[3].nama_foto)}">
                        <div class="action">
                          <button class="fas fa-pen"></button>
                          <button class="fas fa-trash-alt"></button>
                        </div>
                      `
                    : 
                      `
                        <div class="icon">
                          <i class="fas fa-cloud-upload-alt"></i>
                        </div>
                        <div class="info">Drag & Drop to Upload Files</div>
                        <span>OR</span>
                        <label for="file4">Browse File</label>
                        <input type="file" id="file4" class="disable">
                      `
                    }
                    </div> 
                  `
                  }
                </div>
                <div class="add-data-1">
                  <div class="data-group">
                    <div class="form-group name">
                      <label>Nama Barang</label>
                      <input type="text" maxlength="100" id="nama_barang" autocomplete="off" value="${r.namaBarang}" ${c == 'detail' ? 'readonly' : ''}> 
                    </div>
                    <div class="form-group">
                      <label>Kondisi</label>
                      <div class="radio-group">
                        <label class="radio" for="opt1">
                          <input type="radio" name="kondisi_barang" id="opt1" value="baru" ${r.kondisiBarang == 'baru' ? 'checked' : ''} ${c == 'detail' ? 'disabled' : ''}>
                          Baru
                          <span></span>
                        </label>
                        <label class="radio" for="opt2">
                          <input type="radio" name="kondisi_barang" id="opt2" value="bekas" ${r.kondisiBarang == 'bekas' ? 'checked' : ''} ${c == 'detail' ? 'disabled' : ''}>
                          Bekas
                          <span></span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="data-group">
                    <div class="form-group">
                      <label>Deskripsi</label>
                      <textarea id="deskripsi" ${c == 'detail' ? 'readonly' : ''}>${r.deskripsiBarang}</textarea>
                    </div>
                  </div>
                </div>
                <div class="add-data-2" ${c == 'detail' ? 'style="margin-bottom: 0px"' : ''}>
                  <div class="data-group">
                    <div class="form-group">
                      <label>Ukuran</label>
                    </div>
                    <div class="form-group">
                      <label>Harga</label>
                    </div>
                    <div class="form-group" ${c == 'detail' ? 'style="margin-right: 0px;"' : ''}>
                      <label>Stok</label>
                    </div>
                  </div>
                  ${r.dataUkuran.map(e => {
                    return  `
                              <div class="data-group" data-idUkuran="${e.id_ukuran}">
                                <div class="form-group">
                                  <input type="text" value="${e.ukuran}" ${c == 'detail' ? 'readonly' : ''}>
                                </div>
                                <div class="form-group">
                                  <input type="text" value="${parseInt(e.harga) != 0 ? formatRupiah(e.harga) : 'Rp. '+0}" ${c == 'detail' ? 'readonly' : ''}>
                                </div>
                                <div class="form-group" ${c == 'detail' ? 'style="margin-right: 0px;"' : ''}>
                                  <input type="text" value="${e.stok}" ${c == 'detail' ? 'readonly' : ''}>
                                </div>
                                ${c == 'detail' ? '' : '<button class="fas fa-trash-alt"></button>'}
                              </div>
                            `
                  }).join('')}
                  ${c == 'detail' ? '' : '<button id="add-new-variant">Tambah Varian</button>'}
                </div>
                <div class="last-data" ${c == 'detail' ? 'style="display: none;"' : ''}>
                  <button id="batal" type="reset">Batal</button>
                  <button type="submit">Simpan</button>
                </div>
              </form>
            </div>
            <div class="progress-bar-container disable">
              <div class="wrapper">
                <h3>0%</h3>
                <div class="progress-bar">
                  <div class="progress-bar-fill"></div>
                </div>
              </div>
            </div>
          </div>
  `
}

productAddBtnDesktop.addEventListener('click', () => {
  popUpContainer.classList.toggle('open')
  addAndUploadProduct()
})

productAddBtnMobile.addEventListener('click', () => {
  popUpContainer.classList.toggle('open')
  addAndUploadProduct()
})

const addAndUploadProduct = () => {         
  popUpContainer.innerHTML = componentAddProducts()

  const closePopUpContainerBtn = document.getElementById('close')
  const batalBtn = document.getElementById('batal')
  
  closePopUpContainerBtn.addEventListener('click', () => {
    popUpContainer.classList.remove('open')
    getAllFile = []
    popUpContainer.innerHTML = ''
  })

  batalBtn.addEventListener('click', () => {
    popUpContainer.classList.remove('open')
    getAllFile = []
    popUpContainer.innerHTML = ''
  })

  const dropArea = popUpContainer.querySelectorAll('.drag-area')
  const addImagesContainer = popUpContainer.querySelector('.add-images')
  const formAddProduct = document.getElementById('add-product')
  const inputNamaBarang = document.getElementById('nama_barang')
  const inputKondisi = document.getElementsByName('kondisi_barang')
  const inputDeskripsiBarang = document.getElementById('deskripsi')
  const addData2 = popUpContainer.querySelector('.add-data-2')
  const addNewVariantBtn = document.getElementById('add-new-variant')
  const mainInputUkuran = addData2.querySelector('.data-group .form-group:first-child input')
  const mainInputHarga = addData2.querySelector('.data-group .form-group:nth-child(2) input')
  const mainInputstok = addData2.querySelector('.data-group .form-group:nth-child(3) input')
  const progressBarContainer = popUpContainer.querySelector('.progress-bar-container')
  const progressBarText = popUpContainer.querySelector('h3')
  const progressBarFill = progressBarContainer.querySelector('.progress-bar-fill')
  const simpanBtn = formAddProduct.querySelector('button[type=submit]')
  const allowOnlyNumeric = e => {
    ch = String.fromCharCode(e.which)
    if (!(/[0-9]/.test(ch))) {
      e.preventDefault()
    }
  }

  dropArea.forEach((e,i) => {
    const dragText = dropArea[i].querySelector('.info')
    const input = dropArea[i].querySelector('input')
  
    e.addEventListener('dragover', evt => {
      evt.preventDefault()
      e.classList.add('active')
      dragText.textContent = 'Relase to Upload File'
    })
  
    e.addEventListener('dragleave', evt => {
      evt.preventDefault()
      e.classList.remove('active')
      dragText.textContent = 'Drag & Drop to Upload Files'
    })
  
    e.addEventListener('drop', evt => {
      evt.preventDefault()
      // getting user select file and [0] this means if user select multiple files the we'll select only the first one
      file = evt.dataTransfer.files[0]
      isDropped = e.dataset.isdropped
      isDropped == 'true' ? setNotification('error','Masukan gambar di kotak berikutnya jika tersedia',3000) : showFile(e,dragText,i)
    })
    
    input.addEventListener('change', () => {
      file = input.files[0]
      showFile(e,dragText,i)
    })
  })

  formAddProduct.addEventListener('submit', e => {
    e.preventDefault()
  })
  
  simpanBtn.addEventListener('click', () => {
    const xhr = new XMLHttpRequest()
    const data = new FormData()
    let kondisiValue
    inputKondisi.forEach(e => {
      if (e.checked) {
        kondisiValue = e.value
      }
    })
    const otherDataGroup = addData2.querySelectorAll('.data-group')
  
    const isData2Empty = () => {
      otherDataGroup.forEach(e => {
        initData2(e)
        status
  
        if (inputAllUkuran.value == '' | Number.isNaN(parseInt(splitAllHarga.join(''))) | inputAllStok.value == '') {
          status = true
        }else{
          status = false
        }
      })
      return status
    }
    const checkStatusData2 = isData2Empty() == 'true' ? true : false
  
    if (getAllFile.length === 0) {
      setNotification('error','Masukan minimal 1 gambar',3000)
    }else if(inputNamaBarang.value == '' | kondisiValue == null | inputDeskripsiBarang.value == '' | checkStatusData2){
      setNotification('error','Pastikan semua inputan tidak ada yang kosong',3000)
    }else{
      if (navigator.onLine) {
        // data 1
        data.append('nama_barang', inputNamaBarang.value)
        data.append('kondisi_barang', kondisiValue)
        data.append('deskripsi_barang', inputDeskripsiBarang.value)
        // data file
        for (const file of getAllFile){
          data.append('berkas_gambar[]', file)
        }
        // data 2
        otherDataGroup.forEach(e => {
          initData2(e)
          data.append('ukuran[]', parseInt(inputAllUkuran.value))
          data.append('harga[]', parseInt(splitAllHarga.join('')))
          data.append('stok[]', parseInt(inputAllStok.value))
        })
        
        xhr.open('POST', baseUrl('seller/createandupload'), true)
    
        xhr.onloadstart = () => {
          progressBarContainer.classList.remove('disable')
        }
    
        xhr.upload.addEventListener('progress', e => {
          const percent = e.lengthComputable ? (e.loaded / e.total) * 100 : 0
          progressBarText.textContent = Math.round(percent) + '%'
          progressBarFill.style.width = percent + '%'
        })
    
        xhr.onload = () => {
          popUpContainer.innerHTML = ''
          getAllFile = []
          getAllProductsByIdToko()
        }
    
        xhr.onreadystatechange = () => {
          if(xhr.readyState == 4 && xhr.status == 200){
            try {
              response = JSON.parse(xhr.responseText)
              popUpContainer.classList.remove('open')
              setNotification(response.addedStatus,response.message,3000)
            } catch (error) {
              setNotification('error','Terjadi kesalahan saat menambah barang',3000)
            }
          }
        }
    
        // xhr.setRequestHeader('Content-Type', 'multipart/form-data')
        // xhr.setRequestHeader("Content-type","multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2));
        xhr.send(data)
      } else {
        setNotification('error','Tidak ada koneksi internet',3000)
      }
    }
  })

  inputNamaBarang.addEventListener('keyup', () => {
    inputNamaBarang.value = inputNamaBarang.value.replace(/[^a-zA-Z0-9\s]+/, '')
  })

  inputDeskripsiBarang.addEventListener('keyup', () => {
    inputDeskripsiBarang.value = inputDeskripsiBarang.value.replace(/[^a-zA-Z0-9\s]+/, '')
  })

  mainInputUkuran.addEventListener('keypress', e => {
    allowOnlyNumeric(e) 
  })
  
  mainInputHarga.addEventListener('keypress', e => {
    allowOnlyNumeric(e)
  })
  
  mainInputstok.addEventListener('keypress', e => {
    allowOnlyNumeric(e)
  })

  mainInputHarga.addEventListener('keyup', () => {
    mainInputHarga.value = liveFormatRupiah(mainInputHarga.value, 'Rp.')
  })
  
  addNewVariantBtn.addEventListener('click', () => {
    addData2.insertBefore(createDataGroup(), addNewVariantBtn)
    // initData2()
    const otherDataGroup = addData2.querySelectorAll('.data-group')
    otherDataGroup.forEach(e => {
      initData2(e)
      inputAllUkuran.addEventListener('keypress', e => {
        allowOnlyNumeric(e)
      })
  
      inputAllStok.addEventListener('keypress', e => {
        allowOnlyNumeric(e)
      })
    })
    const otherInputHarga = addData2.querySelectorAll('.data-group .form-group:nth-child(2) input')
    otherInputHarga.forEach(e => {
      e.addEventListener('keyup', () => {
        e.value = liveFormatRupiah(e.value, 'Rp.')
      })
    })
  
    const dataGroup = addData2.querySelectorAll('.data-group')
    dataGroup.forEach(e => {
      deleteDataGroupBtn = e.querySelector('button')
      deleteDataGroupBtn.addEventListener('click', () => {
        e.remove()
      })
    })
  })

  const showFile = (e,dragText,i) => {
    fileType = file.type
    fileSize = file.size
    validExtensions = ['image/jpeg','image/jpg','image/png']
    if (validExtensions.includes(fileType)) {
      if (fileSize > 5000000) {
        setNotification('error','Ukuran gambar maks 5 megabytes',3000)
        e.classList.remove('active')
        dragText.textContent = 'Drag & Drop to Upload Files'
      } else {
        e.classList.add('active')
        e.setAttribute('data-isdropped','true')
        i + 1 > 3 ? null : dropArea[i + 1].classList.remove('hidden')
  
        getAllFile.push(file)
        fileReader = new FileReader()
        fileReader.onload = () => {
          fileURL = fileReader.result // passing user file source in fileURL variable
          imgTag = `<img src="${fileURL}">` // creating an img tag and passing user selected file source inside src attribute
          e.innerHTML = imgTag
        }
        fileReader.readAsDataURL(file)
      }
    } else {
      setNotification('error','Pastikan file adalah gambar',3000)
      e.classList.remove('active')
      dragText.textContent = 'Drag & Drop to Upload Files'
    }
  }
}

const createNewFormGroup = param => {
  newDataGroup = document.createElement('div')
  newDataGroup.setAttribute('class', 'data-group')
  newFormGroup = document.createElement('div')
  newFormGroup.setAttribute('class', 'form-group')
  newInputNumber = document.createElement('input')
  newInputNumber.setAttribute('type', param)

  newFormGroup.appendChild(newInputNumber) 
  return newFormGroup   
}

const createDeleteDataGroupBtn = () => {
  newDeleteDataGroup = document.createElement('button')
  newDeleteDataGroup.setAttribute('class', 'fas fa-trash-alt')

  return newDeleteDataGroup
}

const createDataGroup = () => {
  formGroup1 = createNewFormGroup('text')
  formGroup2 = createNewFormGroup('text')
  formGroup3 = createNewFormGroup('text')
  deleteDataGroupBtn = createDeleteDataGroupBtn()
  newDataGroup.appendChild(formGroup1)
  newDataGroup.appendChild(formGroup2)
  newDataGroup.appendChild(formGroup3)  
  newDataGroup.appendChild(deleteDataGroupBtn)  
  return newDataGroup
}

const initData2 = e => {
  inputAllUkuran = e.querySelector('.form-group:first-child input[type="text"]')
  inputAllHarga = e.querySelector('.form-group:nth-child(2) input[type="text"]')
  inputAllStok = e.querySelector('.form-group:nth-child(3) input[type="text"]')
  splitAllHarga = inputAllHarga.value.split('.')
  splitAllHarga.shift()
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

