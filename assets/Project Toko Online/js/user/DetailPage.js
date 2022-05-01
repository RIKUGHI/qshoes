const currentUrl = location.href.split('/')
const domain = currentUrl[5]
const slug = currentUrl[6]
let defaultTime = 0
let oldHarga = 0
let iB
let namaTokoChat = ''
let oldSrcProductImage = ''
let namaBarang = ''
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

const getProductBySlug = async (d,s) => {
  const response = await fetch(baseUrl('api/getproductbyslug/'+d+'/'+s), {
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
  
  showDetailProduct(response)
}

getProductBySlug(domain,slug)

const getDataUkuranByIdUkuran = async i => {
  const response = await fetch(baseUrl('api/getdataukuranbyidukuran/'+i), {
    method: 'GET',
    headers: {
      'Content-Type': 'application'
    }
  }).then(res => {
    if (res.ok) {
      return res.json()
    } else {
      console.error('Gagal mengambil data');
    }
  }).then(data => data).catch(err => console.log(err))
  
  const stok = document.querySelector('.detail-container .stocks-available b')
  const productDeskContainer = document.querySelector('.detail-container .product-desk-container')
  const hargaProduk = productDeskContainer.querySelector('h1')
  const inputQty = document.getElementById('input-quantity')
  const subTotal = document.getElementById('sub-total')
  stok.textContent = response.stok
  hargaProduk.textContent = formatRupiah(response.harga)
  inputQty.value = 1
  subTotal.textContent = formatRupiah(response.harga)
  oldHarga = response.harga
}

const showDetailProduct = r => {
  // ----------------------------- AUTOMATIC MAIN IMAGE ZOOM -----------------------------
  const magnifyingArea = document.getElementById('magnifying_area')
  magnifyingArea.classList.remove('loading')

  // SET MAIN IMAGE
  magnifyingArea.innerHTML = `<img src="${r[0].dataFoto == '' ?  baseUrl('assets/Project Toko Online/image/no-product-image.png') : baseUrl('assets/Project Toko Online/image/products/' + r[0].dataFoto[0]['nama_foto'])}" id="magnifying_img">`
  const magnifyingImg = document.getElementById('magnifying_img')
  
  magnifyingArea.addEventListener('mousemove', e => {
      clientX = e.clientX - magnifyingArea.offsetLeft
      clientY = e.clientY - magnifyingArea.offsetTop
    
      mWidth = magnifyingArea.offsetWidth
      mHeight = magnifyingArea.offsetHeight
    
      clientX = clientX / mWidth * 100
      clientY = clientY / mHeight * 100
    
      magnifyingImg.style.transform = 'translate(-'+clientX+'%, -'+clientY+'%) scale(2)'
  })
  
  magnifyingArea.addEventListener('mouseleave', () => {
      magnifyingImg.style.transform = 'translate(-50%, -50%) scale(1)'
  })
  
  // ----------------------------- CHANGE MAIN IMAGE AUTO -----------------------------
  const additionalProductImagesContainer = document.querySelector('.detail-container .additional-product-images')
  additionalProductImagesContainer.innerHTML = listProductImages(r[0].dataFoto)
  const listProductImageContainer = document.querySelectorAll('.list-product-image')
  listProductImageContainer[0].classList.add('active')
  const listProductImage = document.querySelectorAll('.list-product-image img')
  oldSrcProductImage = magnifyingImg.src
  let newIndexImage = 0
  let oldIndexImage = 0

  listProductImageContainer.forEach((e,x) => {
    e.addEventListener('mouseover', () => {
      for (let i = 0; i < listProductImageContainer.length; i++) {
        listProductImageContainer[i].classList.remove('active')
      }
      e.classList.add('active')
    })
    e.addEventListener('mouseout', () => {
      // aku gawe code iki 3 jam 30 menit asu
      // utek ku kobong
      for (let i = 0; i < listProductImageContainer.length; i++) {
        if (newIndexImage == oldIndexImage) {
          listProductImageContainer[i].classList.remove('active')
          listProductImageContainer[newIndexImage].classList.add('active')
        }else{
          listProductImageContainer[i].classList.remove('active')
          listProductImageContainer[newIndexImage].classList.add('active')
          oldIndexImage = newIndexImage
        }
      }
    })
    e.addEventListener('click', () => {
      e.classList.add('active')
      newIndexImage = x
    })
  })
  
  listProductImage.forEach((e,x) => {
    e.addEventListener('mouseover', () => {
      magnifyingImg.src = e.src
      imageTransition(e)
    })
    e.addEventListener('mouseout', () => {
      imageTransition(e)
      magnifyingImg.src = oldSrcProductImage
    })
    e.addEventListener('click', () => {
      magnifyingImg.src = e.src
      oldSrcProductImage = e.src
    })
  })
  
  const imageTransition = (e) => {
    if (e.src == oldSrcProductImage) {
      magnifyingArea.style.animation = ''
    }else{
      magnifyingArea.style.animation = 'openGambar 0.3s ease-in-out 1 alternate'
    }
    setTimeout(() => {
      magnifyingArea.style.animation = ''
    }, 300)
  }

  // ----------------------------- STORE AND PRODUCT INFO -----------------------------
  iB = r[0].idBarang
  const productDeskContainer = document.querySelector('.detail-container .product-desk-container')
  const namaProduk = productDeskContainer.querySelector('h2')
  const hargaProduk = productDeskContainer.querySelector('h1')
  const kondisiContainer = productDeskContainer.querySelector('.condition-container')
  const desk = productDeskContainer.querySelector('textarea')
  const linkToko = productDeskContainer.querySelector('.shop-info a')
  const namaToko = productDeskContainer.querySelector('.shop-info .name')

  namaProduk.textContent = r[0].namaBarang
  namaBarang = r[0].namaBarang
  hargaProduk.textContent = formatRupiah(r[0].dataUkuran[0].harga)
  kondisiContainer.innerHTML = `
                              <div class="list-conditions">
                                <span>Kondisi : </span>
                                <span class="main">${r[0].kondisiBarang}</span>
                              </div>
                            `
  desk.textContent = r[0].deskripsiBarang
  namaToko.textContent = r[0].namaToko
  namaTokoChat = r[0].namaToko
  linkToko.setAttribute('href',baseUrl('toko/'+r[0].domain)) 

  // ----------------------------- OPEN THE SIZE LIST -----------------------------
  let getVarian = 0
  r[0].dataUkuran.forEach(e => {
    getVarian++
  })
  const totalVarian = document.getElementById('varian')
  const openSizesList = document.getElementById('sizes-list')
  openSizesList.innerHTML = listUkuran(r[0].dataUkuran)
  const sizesList = openSizesList.querySelectorAll('li')
  const valueSizeSelected = document.getElementById('value-selected')
  const openArrow = document.getElementById('arrow')
  const sizeContainer = document.getElementById('size-container')

  totalVarian.textContent = getVarian +' '+ 'varian'

  sizeContainer.addEventListener('click', e => {
    if (e.target.localName === "li") {
      valueSizeSelected.setAttribute('value', e.target.innerText)
      valueSizeSelected.setAttribute('data-idukuran', e.target.dataset.idukuran)
      for (let i = 0; i < sizesList.length; i++) {
        sizesList[i].classList.remove('active')
        sizesList[i].removeAttribute('class')
      }
      e.target.classList.add('active')
      openSizesList.classList.toggle('open')
      openArrow.classList.toggle('open')

      getDataUkuranByIdUkuran(parseInt(e.target.dataset.idukuran))
    }else{
      openSizesList.classList.toggle('open')
      openArrow.classList.toggle('open')
    }
  })

  document.getElementById('chat-btn').setAttribute('data-idtoko',r[0].idToko) 
  document.getElementById('chat-btn-mbl').setAttribute('data-idtoko',r[0].idToko) 
  document.getElementById('tombol-keranjang').setAttribute('data-isvalid',r[0].dataFoto.length == 0 ? false : true)
}

const listProductImages = d => {
  if (d != '') {
    return d.map(e => {
      return  `
                <div class="list-product-image">
                  <img src="${baseUrl('assets/Project Toko Online/image/products/'+e.nama_foto)}">
                </div>
              `
    }).join('')
  } else {
    return  `
                <div class="list-product-image">
                  <img src="${baseUrl('assets/Project Toko Online/image/no-product-image.png')}">
                </div>
              `
  }
}

const listUkuran = u => {
  return u.map(l => {
    return  `
              <li data-idukuran="${l.id_ukuran}">${l.ukuran}</li>
            `
  }).join('')
}

// ----------------------------- QUANTITY BUTTON -----------------------------
const inputQty = document.getElementById('input-quantity')
const quantityContainer = document.getElementById('quantity-container')
const stocksAvailable = document.querySelector('.stocks-available b')
const subTotal = document.getElementById('sub-total')

quantityContainer.addEventListener('click', e => {
  if (e.target.classList.contains('minus') | e.target.classList.contains('fa-minus')) {
    inputQty.value = parseInt(inputQty.value) - 1
    if (parseInt(inputQty.value) <= 1) {
      inputQty.value = 1
      inputQty.setAttribute('value', 1)
      quantityContainer.querySelector('.minus').classList.add('closed')

      subTotal.textContent = formatRupiah(subHarga(parseInt(inputQty.value),parseInt(oldHarga)))
    }else{
      inputQty.setAttribute('value', inputQty.value)
      quantityContainer.querySelector('.plus').classList.remove('closed')

      subTotal.textContent = formatRupiah(subHarga(parseInt(inputQty.value),parseInt(oldHarga)))
    }
    
  }else if(e.target.classList.contains('plus') | e.target.classList.contains('fa-plus')){
    inputQty.value = parseInt(inputQty.value) + 1
    if (parseInt(inputQty.value) >= parseInt(stocksAvailable.innerText)) {
      inputQty.value = parseInt(stocksAvailable.innerText)
      inputQty.setAttribute('value', parseInt(stocksAvailable.innerText))
      quantityContainer.querySelector('.plus').classList.add('closed')

      subTotal.textContent = formatRupiah(subHarga(parseInt(inputQty.value),parseInt(oldHarga)))
    }else{
      inputQty.setAttribute('value', inputQty.value)
      quantityContainer.querySelector('.minus').classList.remove('closed')

      subTotal.textContent = formatRupiah(subHarga(parseInt(inputQty.value),parseInt(oldHarga)))
    }
  }
})

const subHarga = (qty,subTotal) => {
  // console.log(subTotal);
  return qty * subTotal
}

// ----------------------------- OPEN THE SHOPPING CART IN TABLET OR MOBILE MODE -----------------------------
const openMoreAction = document.getElementById('open-more-action')
const shoppingCartContainer = document.querySelector('.detail-container .shopping-cart-container')
const textOpenCart = openMoreAction.querySelector('.open-cart span.open-cart')
const blackBackground = document.querySelector('.black-background')

openMoreAction.addEventListener('click', e => {
  if(e.target.classList.contains('open-cart')){
    openShoppingCart()
  }
})

blackBackground.addEventListener('click', () => {
  openShoppingCart()
})

const openShoppingCart = () => {
  shoppingCartContainer.classList.toggle('open')
  blackBackground.classList.toggle('open')
  shoppingCartContainer.classList.contains('open') ? text = 'Tutup Keranjang' : text = 'Buka Keranjang';
  textOpenCart.textContent = text
}

// ----------------------------- IT'S ALL ABOUT CHAT -----------------------------
const chatContainer = document.querySelector('.container-chat')
const chatMemberContainer = chatContainer.querySelector('.chat-member')
let chatMemberList = chatContainer.querySelectorAll('.chat-member-list')
const chatContentContainer = chatContainer.querySelector('.chat-content-container')
let map = {}
remove = false

document.addEventListener('click', async e => {
  const textArea = chatContainer.querySelector('.chat-input-area')
  const actionContainer = chatContainer.querySelector('.action-container') 
  const actionDeleteBtn = chatContainer.querySelector('.delete-action') 

  // open the chat container
  if (e.target.classList.contains('chat-btn')) {
    remove = false

    if (document.getElementById('tombol-keranjang').getAttribute('data-isvalid') == 'false') {
      setNotificationD('error','Maaf kamu tidak bisa melakukan chat karena produk tidak valid',3500)
    } else {
      document.getElementById('chat-btn').querySelector('span').textContent = 'Loading..'
      x = await checkMyChatMember(document.getElementById('chat-btn').getAttribute('data-idtoko'))
      document.getElementById('chat-btn').querySelector('span').textContent = 'Chat'
  
      if (x.login) {
        if (x.sameIdT) {
          setNotificationD('error',x.message,3000)
        } else {
          chatContainer.classList.toggle('open')
          chatMemberContainer.innerHTML = '<h3 style="text-align: center; margin-top: 20px;">Loading</h3>'
          if (x.status) {
            getMyChatMember(true,document.getElementById('chat-btn').getAttribute('data-idtoko'))
            getMyChatContent(document.getElementById('chat-btn').getAttribute('data-idtoko'))
            x = await updateStatusRead(document.getElementById('chat-btn').getAttribute('data-idtoko'))
            if (x.status == 'success') {
              getMyChatMember(true,document.getElementById('chat-btn').getAttribute('data-idtoko'))
            }
          } else {
            // create new chat member list
            getMyChatMember(false,document.getElementById('chat-btn').getAttribute('data-idtoko'))
            getMyChatContent(document.getElementById('chat-btn').getAttribute('data-idtoko'))
            // chatMemberContainer.insertBefore(createNewChatMemberList(namaTokoChat),chatMemberList[0])
          }
          
        }
      } else {
        accountBtn.click()
      }
      
      if (window.innerWidth <= 620) {
        chatContentContainer.classList.add('open')
      }
    }
  }else if (e.target.classList.contains('chat-close-btn')){
    // const putChatContainer = chatLogsContainer.querySelector('.put-chat-container')
    chatContentContainer.innerHTML = `
                                        <div class="start-to-chat">
                                          <img src="${baseUrl('assets/Project Toko Online/icon/chat.svg')}">
                                          <h3>Mari memulai obrolan!</h3>
                                          <p>Silahkan memilih pesan untuk memulai percakapan</p>
                                        </div>
                                      `
    textArea.value = ''
    textArea.textContent = ''
    textArea.setAttribute('rows',1)
    chatMemberList.forEach(e => {
      e.classList.remove('active')
    })
    actionContainer.classList.remove('open')
    actionDeleteBtn.classList.remove('active')
    chatContentContainer.classList.remove('open')
    chatContainer.classList.replace('open', 'close')
    setTimeout(() => {
      chatContainer.classList.remove('close')
    },200)

    chatMemberList.forEach(e => {
      if (e.classList.contains('put')){
        e.remove()
      }
    })

    // if (putChatContainer != null) {
    //   putChatContainer.remove()
    // }
  }

  // open the action container
  if (e.target.classList.contains('delete-action')) {
    actionContainer.classList.toggle('open')
    actionDeleteBtn.classList.toggle('active')
  }
  
  // delete button
  if (e.target.classList.contains('delete')) {
    z = await deleteChat(e.target.dataset.idtoko)
    if (z.status == 'success') {
      setNotificationD(z.status,z.message,3000)
      loadMoreChatContent(e.target.dataset.idtoko)
      actionContainer.classList.remove('open')
      actionDeleteBtn.classList.remove('active')
    } else {
      setNotificationD(z.status,z.message,3000)
    }
  }  

  // back to member list
  if (e.target.classList.contains('back')) {
    chatContentContainer.classList.remove('open')
    actionContainer.classList.remove('open')
    actionDeleteBtn.classList.remove('active')
    chatMemberList = chatContainer.querySelectorAll('.chat-member-list')
    chatMemberList.forEach(e => {
      e.classList.remove('active')
    })
  }
})

// check my chat member
const checkMyChatMember = idToko => {
  return fetch(baseUrl('api/checkchatmemberbyidtoko?id_toko='+idToko), {
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

// get my chat member
const getMyChatMember = async (s,idT) => {
  const r = await fetch(baseUrl('api/getmychatmember'), {
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

  chatMemberContainer.innerHTML = r.myChatMember.map(d => {
    time = d.time.split(':')
    time.pop()
    return  `
              <div class="chat-member-list" data-idtoko="${d.idToko}">
                <div class="container-image">
                  <div class="circle-image">
                    <img src="${d.gambarToko == null || d.gambarToko == '' ? baseUrl('assets/Project Toko Online/icon/no-shop-image.jpg') : baseUrl('assets/Project Toko Online/image/users/'+d.gambarToko)}">
                    <!-- <i class="fas fa-store"></i> -->
                  </div>
                </div>
                <div class="more-info">
                  <span class="main-info">${d.namaToko}</span>
                  <span class="web-info">
                    Penjual
                  </span>
                  <span class="mobile-info">${d.lastMsg}</span>
                </div>
                <div class="last-message-time">${time.join(':')}</div>
                ${d.unread == 0 ? '' : `<span class="unread">${d.unread}</span>`}
              </div>
            `
  }).join('')

  
  s ? '' : chatMemberContainer.appendChild(createNewChatMemberList(namaTokoChat))
  chatMemberList = chatContainer.querySelectorAll('.chat-member-list')
  memberListActive(idT)
}

const getMyChatContent = async idT => {
  chatContentContainer.innerHTML =  `
                                      <div class="chat-content-header">
                                        <div class="shop-info">
                                          <button class="back">
                                            <i class="fas fa-arrow-left back"></i>
                                          </button>
                                          <div class="container-image">
                                            <div class="circle-image">
                                              <span class="chat-status" id="status"></span>
                                              <img src="${baseUrl('assets/Project Toko Online/icon/no-shop-image.jpg')}" id="gambar-toko">
                                            </div>
                                          </div>
                                          <div class="more-info">
                                            <span id="nama-toko">Loading...</span>
                                            <span id="status-text"></span>
                                          </div>
                                        </div>
                                        <div class="more-action">
                                          <button class="delete-action">
                                            <i class="fas fa-ellipsis-v delete-action"></i>
                                            <div class="action-container">
                                              <div class="action-list delete" id="delete-chat">Hapus</div>
                                            </div>
                                          </button>
                                          <button id="expand-btn">
                                            <i class="fas fa-expand-arrows-alt"></i>
                                          </button>
                                          <button class="chat-close-btn">
                                            <i class="fas fa-chevron-down chat-close-btn"></i>
                                          </button>
                                        </div>
                                      </div>

                                      <div class="chat-content"></div>

                                      <div class="chat-content-footer">
                                        <textarea class="chat-input-area" placeholder="Tulis pesan..." rows="1"></textarea>
                                        <button id="send-btn">
                                          <img src="${baseUrl('assets/Project Toko Online/icon/send.svg')}">
                                        </button>
                                      </div>
                                    `
  const chatContent = chatContentContainer.querySelector('.chat-content')
  chatContent.innerHTML = `
                            <div class="loading-chat">
                              <div class="📦"></div>
                              <div class="📦"></div>
                              <div class="📦"></div>
                              <div class="📦"></div>
                              <div class="📦"></div>
                            </div>
                          ` 
  const r = await fetch(baseUrl('api/getmychatcontent?id_toko='+idT), {
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
  
  document.getElementById('nama-toko').textContent = r.namaToko == undefined ? namaTokoChat : r.namaToko
  document.getElementById('status').style.background = r.online == '0' ? '#20e237' : '#3a3b3c'
  document.getElementById('status-text').textContent = r.online == '0' ? 'Online' : 'Offline'
  document.getElementById('gambar-toko').src = r.gambarToko == '' || r.gambarToko == null ? baseUrl('assets/Project Toko Online/icon/no-shop-image.jpg') : baseUrl('assets/Project Toko Online/image/users/'+r.gambarToko)
  document.getElementById('delete-chat').setAttribute('data-idtoko',r.idToko)
  
  // expand button
  const expandBtn = document.getElementById('expand-btn')
  expandBtn.addEventListener('click', () => {
    location.href = baseUrl('user/chat')
  })
  
  chatContent.innerHTML = ` <div class="chat-logs-container">
                            ${r.chatContents.map(d => {
                              tanggal = d.date.split('-')
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
                                        <div class="chat-log-list">
                                          <div class="chat-date">${tanggal[2]+' '+bulan+' '+tanggal[0]}</div>
                                        </div>
                                        ${d.chatContents.map(e => {
                                          time = e.time.split(':') 
                                          time.pop()
                                          if (e.text == 0) {
                                            return  `
                                                      <div class="chat-log-list ${e.sender ? 'sender' : ''}">
                                                        <div class="chat-wrapper">
                                                          <p class="chat-message">${e.msg}</p>
                                                          <span class="message-time">${time.join(':')}</span>
                                                        </div>
                                                      </div> 
                                                    `
                                          } else {
                                            return  `
                                                      <div class="chat-log-list ${e.sender ? 'sender' : ''}">
                                                        <div class="chat-wrapper product-wrapper">
                                                          <div class="product-container">
                                                            <div class="image">
                                                              <img src="${baseUrl('assets/Project Toko Online/image/products/'+e.gambarBarang[0].nama_foto)}">
                                                            </div>
                                                            <div class="info">
                                                              <span>${e.namaBarang}</span> 
                                                              ${e.ukuran == 0 ? '' : `<span>${e.ukuran}</span>`}
                                                            </div>
                                                          </div>
                                                          <span class="message-time">${time}</span>
                                                        </div>
                                                      </div>
                                                    `
                                          }
                                        }).join('')}
                                      `
                            }).join('')}
                            </div> 
                          `
  
  chatContent.querySelector('.chat-logs-container').scrollTop = chatContent.querySelector('.chat-logs-container').scrollHeight
  
  if (document.getElementById('chat-btn').getAttribute('data-idtoko') == idT) {
    const chatLogsContainer = chatContentContainer.querySelector('.chat-logs-container')

    if (remove == false) {
      if (valueSizeSelected.value == 'Pilih ukuran') {
        chatLogsContainer.appendChild(createNewPutChat(oldSrcProductImage,namaBarang))
      } else {
        chatLogsContainer.appendChild(createNewPutChat(oldSrcProductImage,namaBarang,valueSizeSelected.value))
      }  
    }
  
    const putChatContainer = chatLogsContainer.querySelector('.put-chat-container')
    if (putChatContainer != null) {
      const closeBtn = putChatContainer.querySelector('.close')
      closeBtn.addEventListener('click', () => {
        putChatContainer.remove()
      })
    }
  }

  // auto growing textarea
  const textArea = chatContainer.querySelector('.chat-input-area')
  if (textArea != null) {
    textArea.onkeydown = onkeyup = e => {
      map[e.keyCode] = e.type == 'keydown'
      if(map[16] && map[13]){
        textArea.setAttribute('rows', calcHeight(textArea.value) + 1)
        if (calcHeight(textArea.value) + 1 >= 3) {
          textArea.setAttribute('rows', 3)
        }
      }else if(map[13]){
        document.getElementById('send-btn').click()
      }
    }
    
    textArea.addEventListener("keyup", e => {
      textArea.textContent = textArea.value
      if (!(e.key == 'Enter')) {
        textArea.setAttribute('rows', calcHeight(textArea.value) + 1 <= 3 ? calcHeight(textArea.value) + 1 : 3)
      }
    });
  }

  const calcHeight = value => {
    let numberOfLineBreaks = (value.match(/\n/g) || []).length;
    return numberOfLineBreaks;
  }

  document.getElementById('send-btn').addEventListener('click', async () => {
    const chatLogsContainer = chatContentContainer.querySelector('.chat-logs-container')
    const putChatContainer = chatLogsContainer.querySelector('.put-chat-container')
    const idB = putChatContainer == null ? 0 : putChatContainer.getAttribute('data-idbarang')
    const idUk = valueSizeSelected.getAttribute('data-idukuran') == null ? 0 : valueSizeSelected.getAttribute('data-idukuran')

    if (textArea.value != '' || idB != 0) {
      if (navigator.onLine) {
        const res = await inputMsg(r.idToko,textArea.value.trim(),idB,idUk)

        if (res.status == 'success') {
          textArea.value = ''
          loadMoreChatContent(idT)
        } else {
          setNotificationD(res.status,res.message,3000)
        }
      } else {
        setNotificationD('error','Periksa koneksi internetmu',3000)
      }
    }
  })
}

//  member list who active
const memberListActive = idT => {
  if (chatMemberList.length != 0) {
    chatMemberList.forEach(e => {
      if (e.dataset.idtoko == idT){
        e.classList.add('active')
      }
    })

    chatMemberList.forEach(e => {
      e.addEventListener('click', async () => {
        if (!e.classList.contains('active')) {
          chatMemberList.forEach(e => {
            e.classList.remove('active')
          })
          e.classList.add('active')
          getMyChatContent(e.dataset.idtoko)
          x = await updateStatusRead(e.dataset.idtoko)
          if (x.status == 'success') {
            getMyChatMember(true,e.dataset.idtoko)
          }
          remove = true
          if (window.innerWidth <= 620) {
            chatContentContainer.classList.add('open')
          }else{
            chatContentContainer.classList.remove('open')
          }
        }
      })
    })
  }else{
    console.log('No chat member');
  }
}

const inputMsg = (a,b,c,d) => {
  const form = new FormData()
  form.append('id_toko',a)
  form.append('msg',b)
  form.append('id_barang',c)
  form.append('id_ukuran',d)

  return fetch(baseUrl('api/inputmsg'), {
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

const loadMoreChatContent = async idT => {
  const chatContent = await chatContentContainer.querySelector('.chat-content')

  const r = await fetch(baseUrl('api/getmychatcontent?id_toko='+idT), {
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

  chatContent.innerHTML = ` <div class="chat-logs-container">
                            ${r.chatContents.map(d => {
                              tanggal = d.date.split('-')
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
                                        <div class="chat-log-list">
                                          <div class="chat-date">${tanggal[2]+' '+bulan+' '+tanggal[0]}</div>
                                        </div>
                                        ${d.chatContents.map(e => {
                                          time = e.time.split(':') 
                                          time.pop()
                                          if (e.text == 0) {
                                            return  `
                                                      <div class="chat-log-list ${e.sender ? 'sender' : ''}">
                                                        <div class="chat-wrapper">
                                                          <p class="chat-message">${e.msg}</p>
                                                          <span class="message-time">${time.join(':')}</span>
                                                        </div>
                                                      </div> 
                                                    `
                                          } else {
                                            return  `
                                                      <div class="chat-log-list ${e.sender ? 'sender' : ''}">
                                                        <div class="chat-wrapper product-wrapper">
                                                          <div class="product-container">
                                                            <div class="image">
                                                              <img src="${baseUrl('assets/Project Toko Online/image/products/'+e.gambarBarang[0].nama_foto)}">
                                                            </div>
                                                            <div class="info">
                                                              <span>${e.namaBarang}</span> 
                                                              ${e.ukuran == 0 ? '' : `<span>${e.ukuran}</span>`}
                                                            </div>
                                                          </div>
                                                          <span class="message-time">${time}</span>
                                                        </div>
                                                      </div>
                                                    `
                                          }
                                        }).join('')}
                                      `
                            }).join('')}
                            </div> 
                          `
  chatContent.querySelector('.chat-logs-container').scrollTop = chatContent.querySelector('.chat-logs-container').scrollHeight
}

const deleteChat = idT => {
  const form = new FormData()
  form.append('id_toko',idT)

  return fetch(baseUrl('api/deletechat'), {
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

const updateStatusRead = idT => {
  const form = new FormData()
  form.append('id_toko',idT)

  return fetch(baseUrl('api/updatestatusread'), {
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

// ----------------------------- RECHECK CART -----------------------------
const valueSizeSelected = document.getElementById('value-selected')
const cartButton = document.getElementById('tombol-keranjang')
const notifContainerD = document.querySelector('.notification-container')
const notifTextD = notifContainerD.querySelector('p')

cartButton.addEventListener('click', async () => {
  if (cartButton.getAttribute('data-isvalid') == 'false') {
    setNotificationD('error','Produk tidak bisa dimasukan ke keranjang karena tidak valid',3500)
  } else {
    if (stocksAvailable.textContent == '-' | valueSizeSelected.value == 'Pilih ukuran') {
      setNotificationD('error','Pastikan memilih ukuran',3000)
    }else{
      const r = await masukKeranjang(parseInt(iB),parseInt(valueSizeSelected.getAttribute('data-idukuran')),parseInt(inputQty.value))
  
      if (r.login) {
        if (r.status == 'success') {
          setNotificationD(r.status,r.message,3000)
          getKeranjang()
        }else{
          setNotificationD(r.status,r.message,3500)
        }
      } else {
        accountBtn.click()
      }
    }
  }
})

const masukKeranjang = (a,b,c) => {
  const form = new FormData()
  form.append('id_barang',a)
  form.append('id_ukuran',b)
  form.append('qty',c)

  return fetch(baseUrl('toko/keranjang'), {
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

const createNewChatMemberList = (namaToko) => {
  newChatMemberList = document.createElement('div')
  newChatMemberList.setAttribute('class','chat-member-list put active')
  newChatMemberList.setAttribute('data-idtoko',document.getElementById('chat-btn').getAttribute('data-idtoko'))
  newContainerImage = document.createElement('div')
  newContainerImage.setAttribute('class','container-image')
  newCircleImage = document.createElement('div')
  newCircleImage.setAttribute('class','circle-image')
  newImage = document.createElement('img')
  newImage.setAttribute('src',baseUrl('assets/Project Toko Online/icon/no-shop-image.jpg'))
  
  newMoreInfo = document.createElement('div')
  newMoreInfo.setAttribute('class','more-info')
  newMainInfo = document.createElement('span')
  newMainInfo.setAttribute('class','main-info')
  newMainInfoText = document.createTextNode(namaToko)
  newWebInfo = document.createElement('span')
  newWebInfo.setAttribute('class','web-info')
  newWebInfoText = document.createTextNode('Penjual')
  newMobileInfo = document.createElement('span')
  newMobileInfo.setAttribute('class','mobile-info')
  
  newCircleImage.appendChild(newImage)
  newContainerImage.appendChild(newCircleImage)
  newChatMemberList.appendChild(newContainerImage)

  newMainInfo.appendChild(newMainInfoText)
  newMoreInfo.appendChild(newMainInfo)
  newWebInfo.appendChild(newWebInfoText)
  newMoreInfo.appendChild(newWebInfo)
  newMoreInfo.appendChild(newMobileInfo)
  newChatMemberList.appendChild(newMoreInfo)

  return newChatMemberList
}

const createNewPutChat = (src,namaProduk,size) => {
  newPutChatContainer = document.createElement('div')
  newPutChatContainer.setAttribute('class','put-chat-container')
  newPutChatContainer.setAttribute('data-idbarang',iB)
  newPutWrapper = document.createElement('div')
  newPutWrapper.setAttribute('class','put-wrapper')
  newPutProductContainer = document.createElement('div')
  newPutProductContainer.setAttribute('class','put-product-container')
  newPutImage = document.createElement('div')
  newPutImage.setAttribute('class','put-image')
  newImg = document.createElement('img')
  newImg.setAttribute('src',src)
  newPutInfo = document.createElement('div')
  newPutInfo.setAttribute('class','put-info')
  newName = document.createElement('span')
  newNameText = document.createTextNode(namaProduk)
  newSize = document.createElement('span')
  newSizeText = document.createTextNode(size)
  
  newButtonClose = document.createElement('button')
  newButtonClose.setAttribute('class','close')
  newI = document.createElement('i')
  newI.setAttribute('class','fas fa-times')

  newName.appendChild(newNameText)
  newPutInfo.appendChild(newName)
  if (size != undefined) {
    newSize.appendChild(newSizeText)
    newPutInfo.appendChild(newSize)
  }
  newPutImage.appendChild(newImg)
  newPutProductContainer.appendChild(newPutImage)
  newPutProductContainer.appendChild(newPutInfo)
  newPutWrapper.appendChild(newPutProductContainer)
  newPutChatContainer.appendChild(newPutWrapper)
  
  newButtonClose.appendChild(newI)
  newPutWrapper.appendChild(newButtonClose)
  
  return newPutChatContainer
}

const setNotificationD = (status,message,time) => {
  notifContainerD.classList.add(status)
  notifTextD.textContent = message
  setTimeout(() => {
    notifContainerD.classList.remove(status)
    defaultTime = 0
  }, defaultTime = defaultTime + time);
}