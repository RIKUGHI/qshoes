const registerShopContainer = document.querySelector('.register-shop-container')
const stepItem1 = registerShopContainer.querySelector('.step-item.step-1')
const stepStatus1 = stepItem1.querySelector('.step-status')
const nextStep2 = document.getElementById('next-step-2')
const stepItem2 = registerShopContainer.querySelector('.step-item.step-2')
const stepStatus2 = stepItem2.querySelector('.step-status')
const stepAction2 =  stepItem2.querySelector('.step-action')
const backStep1 = document.getElementById('back-step-1')
const nextLastStep = document.getElementById('next-last-step')
const stepLastItem = registerShopContainer.querySelector('.step-item.step-3')
const backStep2 = document.getElementById('back-step-2')
const selesaiBtn = document.getElementById('selesai')
const inputNumberToko = stepItem1.querySelector('input')
const inputNamaToko = stepItem2.querySelector('.main-step-container:first-child input')
const inputDomainToko = stepItem2.querySelector('.main-step-container:nth-child(2) input')
const secondValidation = stepItem2.querySelector('.main-step-container:first-child .validation-handling')
const thirdValidation = stepItem2.querySelector('.main-step-container:nth-child(2) .validation-handling')
const validationHandlingnama = stepItem2.querySelector('.main-step-container:first-child .validation-handling span:first-child')
const inputNamaTokoLength = stepItem2.querySelector('.main-step-container:first-child .validation-handling span:last-child')
const validationHandlingDomain = stepItem2.querySelector('.main-step-container:nth-child(2) .validation-handling span:first-child')
const inputDomainTokoLength = stepItem2.querySelector('.main-step-container:nth-child(2) .validation-handling span:last-child')
const provinsi = document.getElementById('provinsi')
const provinsiSelected = provinsi.querySelector('input')
const kota = document.getElementById('kota')
const kotaSelected = kota.querySelector('input')
popUpContainer = document.querySelector('.popup-container')
let baseUrl = url => {
  return 'http://localhost/CI/'+url
}

if (nextStep2 != null) {
  nextStep2.addEventListener('click', () => {
    if (inputNumberToko.value.trim() == '') {
      setNotification('error','No hp tidak boleh kosong',3000)
    } else {
      stepItem1.classList.replace('active', 'completed')
      setTimeout(() => {
        stepStatus1.innerHTML = '<i class="fas fa-check"></i>'
      }, 300);
      inputNumberToko.setAttribute('data-status','true')
      nextStep2.classList.add('hidden')
      stepItem2.classList.add('active')
    }
  })
}

if (backStep1 != null) {
  backStep1.addEventListener('click', () => {
    stepItem1.classList.replace('completed', 'active')
    setTimeout(() => {
      stepStatus1.innerText = '1'
    }, 300);
  
    stepItem2.classList.replace('active', 'disable')
    stepItem2.classList.replace('activeb', 'disable')
    setTimeout(() => {
      stepItem2.classList.remove('disable')
    }, 300);
  
    nextStep2.classList.remove('hidden')
  })
}

nextLastStep.addEventListener('click', () => {
  if (inputNamaToko.getAttribute('data-status') == 'false' || inputDomainToko.getAttribute('data-status') == 'false') {
    setNotification('error','Pastikan semua status berwarna hijau',2000)
  } else {
    stepItem2.classList.replace('active', 'completed')
    setTimeout(() => {
      stepStatus2.innerHTML = '<i class="fas fa-check"></i>'
    }, 300);
  
    stepLastItem.classList.add('active')
    stepAction2.classList.add('hidden')
  }
})

backStep2.addEventListener('click', () => {
  stepItem2.classList.replace('completed', 'active')
  setTimeout(() => {
    stepStatus2.innerText = '2'
  }, 300);

  stepLastItem.classList.replace('active', 'disable')
  setTimeout(() => {
    stepLastItem.classList.remove('disable')
  }, 300);

  stepAction2.classList.remove('hidden')
})

selesaiBtn.addEventListener('click', async () => {
  if (inputNumberToko.value == '' || inputNamaToko.value == '' || inputDomainToko.value == '' || provinsiSelected.value == ''|| kotaSelected.value == '') {
    setNotification('error','Pastikan semua inputan tidak ada yang kosong',3000)
  } else {
    popUpContainer.classList.add('open')
    popUpContainer.innerHTML = '<div class="loader"></div>'
    
    rr = await registerToko(inputNumberToko.value,inputNamaToko.value,inputDomainToko.value,provinsiSelected.value,kotaSelected.value,kotaSelected.dataset.id)
    if (rr.status == 'success') {
      setNotification(rr.status,rr.message,3000)
      popUpContainer.classList.remove('open')
      popUpContainer.innerHTML = ''
      
      registerShopContainer.innerHTML = `
                                          <div class="berhasil-container">
                                            <img src="${baseUrl('assets/Project Toko Online/icon/sukses-daftar-toko.svg')}">
                                            <h3>Yey..... Berhasil Daftar</h3>
                                            <button>Cek Tokomu</button>
                                          </div>
                                        `
      registerShopContainer.querySelector('.berhasil-container button').addEventListener('click', () => {
        window.location.href = baseUrl('seller')
      })
    } else {
      popUpContainer.classList.remove('open')
      popUpContainer.innerHTML = ''
      setNotification(rr.status,rr.message,3000)
    }
  }
})

inputNumberToko.addEventListener('keypress', e => {
  ch = String.fromCharCode(e.which)
  if (!(/[0-9]/.test(ch))) {
    e.preventDefault()
  }
})

inputNamaToko.addEventListener('keyup', async () => {
  inputNamaToko.value = inputNamaToko.value.replace(/[^a-zA-Z0-9\s]+/, '')
  inputNamaTokoLength.textContent = inputNamaToko.value.length+'/'+60

  secondValidation.classList.remove('success')
  secondValidation.classList.remove('error')

  if (inputNamaToko.value.length <= 2) {
    secondValidation.classList.add('error')
    validationHandlingnama.textContent = 'Nama Toko terlalu pendek, minimum 3 karakter'
    inputNamaToko.setAttribute('data-status','false')
  } else {
    rt = await getInfoToko(inputNamaToko.value,'nama_toko','toko/getinfotokobyname')
    secondValidation.classList.add(rt.status)
    validationHandlingnama.textContent = rt.message
    inputNamaToko.setAttribute('data-status',rt.status == 'success' ? 'true' : 'false')
  }
})

inputDomainToko.addEventListener('keyup', async () => {
  inputDomainToko.value = inputDomainToko.value.replace(/[^a-z0-9]+/, '')
  inputDomainTokoLength.textContent = inputDomainToko.value.length+'/'+24

  thirdValidation.classList.remove('success')
  thirdValidation.classList.remove('error')

  if (inputDomainToko.value.length <= 2) {
    thirdValidation.classList.add('error')
    validationHandlingDomain.textContent = 'Domain Toko terlalu pendek, minimum 3 karakter'
    inputDomainToko.setAttribute('data-status','false')
  }else{
    rd = await getInfoToko(inputDomainToko.value,'domain_toko','toko/getinfotokobydomain')
    thirdValidation.classList.add(rd.status)
    validationHandlingDomain.textContent = rd.message
    inputDomainToko.setAttribute('data-status',rd.status == 'success' ? 'true' : 'false')
  }
})

provinsi.addEventListener('click', async e => {
  const openDistrictsList = provinsi.querySelector('ul')
  const openArrowDistricts = provinsi.querySelector('i')
  const districtsList = provinsi.querySelectorAll('li')

  if (e.target.localName === 'li') {
    provinsiSelected.setAttribute('value', e.target.innerText)
    provinsiSelected.setAttribute('data-id', e.target.dataset.id)

    kotaSelected.removeAttribute('value')
    kotaSelected.removeAttribute('data-id')

    k = await getDistricts(baseUrl('api/getcity?province='+e.target.dataset.id))

    kota.querySelector('ul').innerHTML = k.rajaongkir.results.map(l => {
      return  `
                <li data-id="${l.city_id}">${l.city_name}</li>
              `
    }).join('')

    districtsList.forEach(e => {
      e.classList.remove('active')
      e.removeAttribute('class')
    })
    e.target.classList.add('active')
    openDistrictsList.classList.toggle('open')
    openArrowDistricts.classList.toggle('open')
  }else{
    openDistrictsList.classList.toggle('open')
    openArrowDistricts.classList.toggle('open')
  }
})

kota.addEventListener('click', async e => {
  const openDistrictsList = kota.querySelector('ul')
  const openArrowDistricts = kota.querySelector('i')
  const districtsList = kota.querySelectorAll('li')

  if (e.target.localName === 'li') {
    kotaSelected.setAttribute('value', e.target.innerText)
    kotaSelected.setAttribute('data-id', e.target.dataset.id)

    districtsList.forEach(e => {
      e.classList.remove('active')
      e.removeAttribute('class')
    })
    e.target.classList.add('active')
    openDistrictsList.classList.toggle('open')
    openArrowDistricts.classList.toggle('open')
  }else{
    openDistrictsList.classList.toggle('open')
    openArrowDistricts.classList.toggle('open')
  }
})

const getInfoToko = (n,p,a) => {
  const form = new FormData()
  form.append(p,n)

  return fetch(baseUrl(a), {
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

const getDistricts = a => {
  return fetch(a, {
    method: 'GET',
    header: {
      'Content-Type' : 'application/json'
    }
  }).then(r => {
    if (r.ok) {
      return r.json()
    } else {
      console.error('Gagal mengambil data');
    }
  }).then(d => d).catch(err => console.error(err))
}

const registerToko = (a,b,c,d,e,f) => {
  const form = new FormData()
  form.append('nomer_hp',a)
  form.append('nama_toko',b)
  form.append('domain_toko',c)
  form.append('provinsi_toko',d)
  form.append('kota_toko',e)
  form.append('id_kota',f)

  return fetch(baseUrl('toko/registertoko'), {
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



















































