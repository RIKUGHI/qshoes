const user = document.querySelector('.header-seller .account-user .user')
const containerInfoAccount = document.querySelector('.header-seller .account-user .container-info-account')
const menuToggle = document.querySelector('.header-seller .wrapper .menu-toggle')
const menuList = document.querySelectorAll('.sidebar-store-container .menu-list')
const formSearchS = document.getElementById('form-search-s')
const searchInputS = document.getElementById('search-input-s')
const infoToko = document.getElementById('info-toko').querySelector('a')
const sideBarStoreContainer = document.querySelector('.sidebar-store-container')
const containerAddProducts = document.querySelector('.container-add-products')
const mainAdminContainer = document.querySelector('.main-admin-container')
const blackBackgroundSidebarStore = document.querySelector('.black-background-sidebar-store')
const logoutBtn = document.getElementById('logout-btn')
const notifMsg = document.getElementById('notif-msg')
const totalOrder = document.getElementById('total-order')
baseUrl = url => {
  return 'http://localhost/CI/'+url
}

searchInputS.addEventListener('keyup', () => {
  searchInputS.value = searchInputS.value.replace(/[^a-zA-Z0-9\s]+/, '')
})

formSearchS.addEventListener('submit', e => {
  e.preventDefault()
  if (searchInputS.value != '') {
    window.location = baseUrl('search?nama_barang='+searchInputS.value)
  }
})

user.addEventListener('click', () => {
  if (window.innerWidth <= 768) {
    user.classList.toggle('active')
    containerInfoAccount.classList.toggle('open')
  }
})

menuList.forEach(e => {
  e.href == location.href ? e.classList.add('active') : null;
})

menuToggle.addEventListener('click', () => {
  sideBarStoreContainer.classList.toggle('open')
    if (window.innerWidth <= 768) {
      blackBackgroundSidebarStore.classList.toggle('active')
    menuList.forEach((e,i) => {
      menuList[i].querySelector('.menu-text').classList.remove('hidden')
    })
  }else{
    containerAddProducts != null ? containerAddProducts.classList.toggle('more-space') : mainAdminContainer.classList.toggle('more-space')
    menuList.forEach((e,i) => {
      menuList[i].querySelector('.menu-text').classList.toggle('hidden')
    })
  }
})

blackBackgroundSidebarStore.addEventListener('click', () => {
  sideBarStoreContainer.classList.remove('open')
  blackBackgroundSidebarStore.classList.remove('active')
})

window.addEventListener('resize', () => {
  if (window.innerWidth <= 768) {
    containerAddProducts != null ? containerAddProducts.classList.remove('more-space') : mainAdminContainer.classList.remove('more-space')
  }else{
    blackBackgroundSidebarStore.classList.remove('active')
  }
})

logoutBtn.addEventListener('click', async () => {
  rLO = await logout()
    if (rLO.statusLogout) {
      location.reload()
    }
})

const logout = () => {
  return fetch(baseUrl('api/logout'), {
    method: 'POST'
  }).then(res => {
    if (res.ok) {
      return res.json()
    } else {
      console.error('Gagal logout');
    }
  }).then(data => data).catch(err => console.error(err))
}

const getNotifMsg = async () => {
  const r = await fetch(baseUrl('seller/getmychatmember'), {
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

  unread = 0
  r.myChatMembers.forEach(e => {
    unread = e.unread + unread
  })

  if (unread != 0) {
    newNotifMsg = document.createElement('span')
    newNotifMsgText = document.createTextNode(unread)
    
    newNotifMsg.appendChild(newNotifMsgText)
    notifMsg.appendChild(newNotifMsg)
  }
}

getNotifMsg()

const getNotifOrder = async () => {
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

  const x = await fetch(baseUrl('seller/getmychatmember'), {
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

  unread = 0
  x.myChatMembers.forEach(e => {
    unread = e.unread + unread
  })

  if (r.status == 'success') {
    newUnreadNotif = document.createElement('span')
    newUnreadNotif.setAttribute('class','unread-notif')
    newOrderContainerText = document.createTextNode(r.totalOrder + unread)

    newUnreadNotif.appendChild(newOrderContainerText)
    infoToko.appendChild(newUnreadNotif)
  }else{
    if (unread != 0) {
      newUnreadNotif = document.createElement('span')
      newUnreadNotif.setAttribute('class','unread-notif')
      newOrderContainerText = document.createTextNode(unread)
  
      newUnreadNotif.appendChild(newOrderContainerText)
      infoToko.appendChild(newUnreadNotif)
    }
  }
}

getNotifOrder()

const getMyShopOrdersNotif = async () => {
  const r = await fetch(baseUrl('seller/getshoporders'), {
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

  if (r != '') {
    shopOrderTotal = 0
    r.forEach(e => {
      shopOrderTotal++
    })
    newOrderNotif = document.createElement('span')
    newOrderNotifText = document.createTextNode(shopOrderTotal)
  
    newOrderNotif.appendChild(newOrderNotifText)
    totalOrder.appendChild(newOrderNotif)
  }
}

getMyShopOrdersNotif()
