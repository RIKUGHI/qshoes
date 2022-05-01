const notifContainer = document.querySelector('.notification-container')
const notifText = notifContainer.querySelector('p')
defaultTime = 0

baseUrl = url => {
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

const imgStore = document.querySelector('.container-add-products .user-image img')
const inputGambarBtn = document.querySelector('.container-add-products .user-image button')
const inputGambar = document.getElementById('input-gambar')

inputGambarBtn.addEventListener('click', () => {
  inputGambar.click()
})

inputGambar.addEventListener('change', async () => {
  file = inputGambar.files[0]
  fileType = file.type
  fileSize = file.size
  validExtensions = ['image/jpeg','image/jpg','image/png']
  if (validExtensions.includes(fileType)) {
    if (fileSize > 5000000) {
      setNotification('error','Ukuran gambar maks 5 megabytes',3000)
    } else {
      const form = new FormData()
      form.append('gambar_toko',file)

      const rG = await fetch(baseUrl('seller/updategambartoko'), {
        method: 'POST',
        body: form
      }).then(res => {
        if (res.ok) {
          return res.json()
        } else {
          console.error('Gagal mengupdate data');
        }
      }).then(data => data).catch(err => console.error(err))

      if (rG.status == 'success') {
        setNotification(rG.status,rG.message,3000)

        fileReader = new FileReader()
        fileReader.onload = () => {
          imgStore.src = fileReader.result 
        }
  
        fileReader.readAsDataURL(file)
      } else {
        setNotification(rG.status,rG.message,3000)
      }
    }
  } else {
    setNotification('error','Pastikan file adalah gambar',3000)
  }
})


const nama = document.getElementById('nama-toko')
const domain = document.getElementById('domain-toko')
const alamat = document.getElementById('alamat')
const nomerHp = document.getElementById('nomer-hp')
const dibuat = document.getElementById('dibuat')

const getInfoToko = async () => {
  const r = await fetch(baseUrl('seller/getinfotoko'), {
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

  pisah = r.toko.tgl_dibuat.split(' ')
  tanggal = pisah[0].split('-')
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

  imgStore.src = r.toko.gambar_toko != '' && r.toko.gambar_toko != null ? baseUrl('assets/Project Toko Online/image/users/'+r.toko.gambar_toko) : baseUrl('assets/Project Toko Online/image/no-user-image.jpg')
  nama.textContent = r.toko.nama_toko
  domain.textContent = 'qshoes.com/'+r.toko.domain_toko
  alamat.textContent = r.toko.provinsi_toko+', '+r.toko.kota_toko
  nomerHp.textContent = r.user.nomer_hp
  dibuat.textContent = tanggal[2]+' '+bulan+' '+tanggal[0]+' '+pisah[1]+' WIB'
}

getInfoToko()







