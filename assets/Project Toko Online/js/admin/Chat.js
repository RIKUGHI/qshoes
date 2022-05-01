const chatContainerSeller = document.querySelector('.main-admin-container .container-chat-seller')
const chatMemberContainer = chatContainerSeller.querySelector('.chat-member')
const chatMemberList = chatContainerSeller.querySelectorAll('.chat-member-list')
const chatContentContainer = chatContainerSeller.querySelector('.chat-content-container')
const actionContainer = chatContainerSeller.querySelector('.action-container')
const actionDeleteBtn = chatContainerSeller.querySelector('.delete-action')
const textArea = chatContainerSeller.querySelector('.chat-input-area')
const notifContainer = document.querySelector('.notification-container')
const notifText = notifContainer.querySelector('p')
defaultTime = 0
let map = {}

let baseUrlC = url => {
  return 'http://localhost/CI/'+url
}

const setNotification = (status,message,time) => {
  notifContainer.classList.add(status)
  notifText.textContent = message
  setTimeout(() => {
    notifContainer.classList.remove(status)
    defaultTime = 0
  }, defaultTime = defaultTime + time);
}

// ----------------------------------------------------------------- get my chat member -----------------------------------------------------------------
const getMyChatMember = async (idU,a) => {
  if (a != 0) {
    chatMemberContainer.innerHTML = '<h3 style="text-align: center; margin-top: 20px;">Loading...</h3>'
  }

  const r = await fetch(baseUrlC('seller/getmychatmember'), {
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

  if (r.myChatMembers.length == 0) {
    chatMemberContainer.innerHTML = '<h3 style="text-align: center; margin-top: 20px;">No Chat Members</h3>'
  }else{
    chatMemberContainer.innerHTML = r.myChatMembers.map(d => {
      time = d.time.split(':')
      time.pop()
      return  `
                <div class="chat-member-list" data-iduser="${d.idUser}">
                  <div class="container-image">
                    <div class="circle-image">
                      ${d.gambarUser == '' || d.gambarUser == null ? `<i class="far fa-user"></i>` : `<img src="${baseUrlC('assets/Project Toko Online/image/users/'+d.gambarUser)}">`}
                    </div>
                  </div>
                  <div class="more-info">
                    <span class="main-info">${d.namaUser}</span>
                    <span class="mobile-info">${d.lastMsg.length >= 30 ? d.lastMsg.substr(0,30)+'...' : d.lastMsg}</span>
                  </div>
                  <div class="last-message-time">${time.join(':')}</div>
                  ${d.unread == 0 ? '' : `<span class="unread">${d.unread}</span>`}
                </div> 
              `
    }).join('')
  }

  const chatMemberList = chatMemberContainer.querySelectorAll('.chat-member-list')
  memberListActive(chatMemberList,idU)
}

getMyChatMember()

const memberListActive = (chatMemberList,idU) => {
  if (chatMemberList.length != 0) {
    chatMemberList.forEach(x => {
      if (x.getAttribute('data-iduser') == idU) {
        x.classList.add('active')
      }
    })

    chatMemberList.forEach(e => {
      e.addEventListener('click', async () => {
        if (!e.classList.contains('active')) {
          chatMemberList.forEach(e => {
            e.classList.remove('active')
          })
          e.classList.add('active')
          getMyChatContent(e.dataset.iduser)
          x = await updateStatusRead(e.dataset.iduser)
          if (x.status == 'success') {
            getMyChatMember(e.dataset.iduser,0)
            getNotifMsg()
          }
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

const getMyChatContent = async idU => {
  chatContentContainer.innerHTML =  `
                                      <div class="chat-content-header">
                                        <div class="shop-info">
                                          <button class="back">
                                            <i class="fas fa-arrow-left back"></i>
                                          </button>
                                          <div class="container-image">
                                            <div class="circle-image">
                                              <span class="chat-status" id="status"></span>
                                              <img src="${baseUrl('assets/Project Toko Online/icon/no-shop-image.jpg')}" id="gambar-user">
                                            </div>
                                          </div>
                                          <div class="more-info">
                                            <span id="nama-user">Loading...</span>
                                            <span id="status-text"></span>
                                          </div>
                                        </div>
                                        <div class="more-action">
                                          <button class="delete-action">
                                            <i class="fas fa-ellipsis-v delete-action"></i>
                                            <div class="action-container">
                                              <div class="action-list delete" id="delete-chat" data-idtoko="${idU}">Hapus</div>
                                            </div>
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
  const actionContainer = chatContainerSeller.querySelector('.action-container')
  const actionDeleteBtn = chatContainerSeller.querySelector('.delete-action')
  chatContentContainer.addEventListener('click', async e => {
    // open the action container
    if (e.target.classList.contains('delete-action')) {
      actionContainer.classList.toggle('open')
      actionDeleteBtn.classList.toggle('active')
    }

     // delete button
    if (e.target.classList.contains('delete')) {
      z = await deleteChat(idU)
      if (z.status == 'success') {
        setNotification(z.status,z.message,3000)
        loadMoreChatContent(idU)
        getMyChatMember(idU,0)
        chatContentContainer.innerHTML  = `
                                            <div class="start-to-chat">
                                              <img src="${baseUrl('assets/Project Toko Online/icon/chat.svg')}">
                                              <h3>Mari memulai obrolan!</h3>
                                              <p>Silahkan memilih pesan untuk memulai percakapan</p>
                                            </div>
                                          `
        actionContainer.classList.remove('open')
        actionDeleteBtn.classList.remove('active')
      } else {
        setNotification(z.status,z.message,3000)
      }
    }

    // back to member list
    if (e.target.classList.contains('back')) {
      chatContentContainer.classList.remove('open')
      actionContainer.classList.remove('open')
      actionDeleteBtn.classList.remove('active')
      const chatMemberList = chatMemberContainer.querySelectorAll('.chat-member-list')
      chatMemberList.forEach(e => {
        e.classList.remove('active')
      })
    }
  })

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
  const r = await fetch(baseUrl('seller/getmychatcontent?id_user='+idU), {
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

  document.getElementById('nama-user').textContent = r.username
  document.getElementById('status').style.background = r.online == '0' ? '#20e237' : '#3a3b3c'
  document.getElementById('status-text').textContent = r.online == '0' ? 'Online' : 'Offline'
  document.getElementById('gambar-user').src = r.gambarUser == '' || r.gambarUser == null ? baseUrl('assets/Project Toko Online/icon/no-shop-image.jpg') : baseUrl('assets/Project Toko Online/image/users/'+r.gambarUser)
  document.getElementById('delete-chat').setAttribute('data-iduser',r.idUser)
  
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

  // auto growing textarea
  const textArea = chatContainerSeller.querySelector('.chat-input-area')
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
    if (textArea.value != '') {
      if (navigator.onLine) {
        const res = await inputMsg(r.idUser,textArea.value.trim())

        if (res.status == 'success') {
          textArea.value = ''
          loadMoreChatContent(idU)
          getMyChatMember(idU,0)
        } else {
          setNotification(res.status,res.message,3000)
        }
      } else {
        setNotification('error','Periksa koneksi internetmu',3000)
      }
    }
  })
}

const inputMsg = (a,b) => {
  const form = new FormData()
  form.append('id_user',a)
  form.append('msg',b)

  return fetch(baseUrl('seller/inputmsg'), {
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

const loadMoreChatContent = async idU => {
  const chatContent = await chatContentContainer.querySelector('.chat-content')

  const r = await fetch(baseUrl('seller/getmychatcontent?id_user='+idU), {
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

const deleteChat = idU => {
  const form = new FormData()
  form.append('id_user',idU)

  return fetch(baseUrl('seller/deletechat'), {
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

const updateStatusRead = idU => {
  const form = new FormData()
  form.append('id_user',idU)

  return fetch(baseUrl('seller/updatestatusread'), {
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














