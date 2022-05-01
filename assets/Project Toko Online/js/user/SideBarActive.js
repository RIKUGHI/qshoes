let baseUrl = url => {
  return 'http://localhost/CI/'+url
}
const menuToggle = document.querySelector('.profile-container .menu-toggle input')
const sideBarContainer = document.querySelector('.profile-container .sidebar-container')
const blackBackgroundSidebar = document.querySelector('.black-background-sidebar')

if (menuToggle != null) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active')
    sideBarContainer.classList.toggle('open')
    blackBackgroundSidebar.classList.toggle('open')
  })
}

if (blackBackgroundSidebar != null) {
  blackBackgroundSidebar.addEventListener('click', () => {
    menuToggle.classList.toggle('active')
    sideBarContainer.classList.toggle('open')
    blackBackgroundSidebar.classList.toggle('open')
  })
}

const menuItem = sideBarContainer.querySelectorAll('.sidebar .menu-list .menu-item')
if (menuItem != null) {
  menuItem.forEach(e => {
    e.addEventListener('click', () => {
      window.location = e.textContent.toLowerCase() == 'ubah profil' ? baseUrl('user') :  baseUrl('user/'+e.textContent.toLowerCase())
    })
  
    if (location.href == baseUrl('user')) {
      menuItem[0].classList.add('active')
    }else if(location.href == baseUrl('user/chat')){
      menuItem[1].classList.add('active')
    }else if(location.href == baseUrl('user/order') || 
    location.href == baseUrl('user/order?status=menunggu_konfirmasi') || 
    location.href == baseUrl('user/order?status=diproses') || 
    location.href == baseUrl('user/order?status=dikirim') || 
    location.href == baseUrl('user/order?status=tiba_di_tujuan')){
      menuItem[2].classList.add('active')
    }
  })
}