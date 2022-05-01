const user = document.querySelector('.header-seller .account-user .user')
const containerInfoAccount = document.querySelector('.header-seller .account-user .container-info-account')
const menuToggle = document.querySelector('.header-seller .wrapper .menu-toggle')
const sideBarAdminContainer = document.querySelector('.sidebar-store-container')
const containerAddProducts = document.querySelector('.container-add-products')
const mainAdminContainer = document.querySelector('.main-admin-container')
const blackBackgroundSidebarStore = document.querySelector('.black-background-sidebar-store')
const menuList = document.querySelectorAll('.sidebar-store-container .menu-list')
const logoutBtn = document.getElementById('logout-btn')

user.addEventListener('click', () => {
  if (window.innerWidth <= 768) {
    user.classList.toggle('active')
    containerInfoAccount.classList.toggle('open')
  }
})

menuToggle.addEventListener('click', () => {
  sideBarAdminContainer.classList.toggle('open')
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

menuList.forEach(e => {
  e.href == location.href ? e.classList.add('active') : null;
})

blackBackgroundSidebarStore.addEventListener('click', () => {
  sideBarAdminContainer.classList.remove('open')
  blackBackgroundSidebarStore.classList.remove('active')
})

logoutBtn.onclick = async () => {
  rLO = await logout()
  if (rLO.statusLogout) {
    location.reload()
  }
}

const logout = () => {
  return fetch(baseUrl('adminqs/logout'), {
    method: 'POST'
  }).then(res => {
    if (res.ok) {
      return res.json()
    } else {
      console.error('Gagal logout');
    }
  }).then(data => data).catch(err => console.error(err))
}


