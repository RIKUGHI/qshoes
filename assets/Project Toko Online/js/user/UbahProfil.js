const dataGroup = document.querySelectorAll('.main-content-container .data-group')
const imgUser = document.querySelector('.main-content-container .user-image img')
const inputGambar = document.getElementById('input-gambar')
const inputGambarBtn = document.querySelector('.main-content-container .user-image button')
const nama = dataGroup[0].querySelector('span:nth-child(2)')
const ubahNamaBtn = dataGroup[0].querySelector('button')
const email = dataGroup[1].querySelector('span:nth-child(2)')
const emailStatus = dataGroup[1].querySelector('.status')
const ubahEmailBtn = dataGroup[1].querySelector('button')
const password = dataGroup[2].querySelector('span:nth-child(2)')
const ubahPasswordBtn = dataGroup[2].querySelector('button')
const nomerHp = dataGroup[3].querySelector('span:nth-child(2)')
const ubahNomerHpBtn = dataGroup[3].querySelector('button')
popUpContainer = document.querySelector('.popup-container')
const componentChangeSingleDataContainer = (t,p,s) => {
  return  ` 
            <div class="change-data-container">
              <div class="data-header">
                <h2>${t}</h2>
                <button class="fas fa-times"></button>
              </div>
              <div class="form-group">
                <label>${p}</label>
                <input type="text" maxlength="38" autocomplete="off">
              </div>
              <button type="submit">Simpan</button>
            </div>
            <div class="loader disable"></div>
            ${s ? 
              `
                <div class="otp-verification-container disable">
                  <div class="otp-verification">
                    <div class="otp-header">
                      <button id="back-email">
                        <i class="fas fa-arrow-left back"></i>
                      </button>
                      <div class="icon">
                        <i class="far fa-envelope"></i>
                      </div>
                      <div class="info">
                        <span>Masukan Kode Verifikasi</span>
                        <span id="info-email-baru"></span>
                      </div>
                    </div>
                    <div class="otp-body">
                      <div class="form-group">
                        <input type="text" required maxlength="4" id="input-verification-code" autocomplete="off">
                        <div class="validation-handling" id="otp-validation">
                        </div>
                      </div>
                    </div>
                    <div class="otp-footer"></div>
                  </div>
                </div>
              `
              : 
              ``
            }
          `
}
const componentChangeMultiDataContainer = () => {
  return  `
            <div class="change-data-container">
              <div class="data-header">
                <h2>Ubah Password</h2>
                <button class="fas fa-times"></button>
              </div>
              <div class="form-group">
                <label>Password Saat Ini</label>
                <input type="password" maxlength="38" id="current-password" autocomplete="off">
              </div>
              <div class="form-group">
                <label>Password Baru</label>
                <input type="password" maxlength="38" id="new-password" autocomplete="off">
              </div>
              <div class="form-group">
                <label>Ketik Ulang Password Baru</label>
                <input type="password" maxlength="38" id="repeat-new-password" autocomplete="off">
              </div>
              <button type="submit">Simpan</button>
            </div>
            <div class="loader disable"></div>
  
  `
}
const validE = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const getUserData = async () => {
  const r = await fetch(baseUrl('user/getuserdata'), {
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

  showData(r)
}

getUserData()

const showData = d => {
  emailStatus.classList.remove('true')
  emailStatus.classList.remove('false')

  imgUser.src = d.gambar_user != null ? baseUrl('assets/Project Toko Online/image/users/'+d.gambar_user) : baseUrl('assets/Project Toko Online/image/no-user-image.jpg')
  nama.textContent = d.username
  email.textContent = d.email
  nomerHp.textContent = d.nomer_hp == '0' ? '-' : d.nomer_hp
  ubahNomerHpBtn.textContent = d.nomer_hp == '0' ? 'Tambah Nomer Hp' : 'Ubah Nomer Hp'

  emailStatus.textContent = d.status_email
  emailStatus.classList.add(d.status_email == 'Verifikasi' ? 'false' : 'true')
}

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
      const rG = await updateSingleField(file,'user/updateimageuser','gambar_user')
      if (rG.status == 'success') {
        setNotification(rG.status,rG.message,3000)

        fileReader = new FileReader()
        fileReader.onload = () => {
          imgUser.src = fileReader.result 
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

ubahNamaBtn.addEventListener('click', () => {
  popUpContainer.classList.add('open')
  popUpContainer.innerHTML = componentChangeSingleDataContainer('Ubah Nama','Masukan Nama Baru',false)

  const closeBtn = popUpContainer.querySelector('.fa-times')
  closeBtn.addEventListener('click', () => {
    popUpContainer.classList.remove('open')
    popUpContainer.innerHTML = ''
  })

  const inputNewUsername = popUpContainer.querySelector('input[type="text"]')
  inputNewUsername.value = nama.textContent

  const changeDataContainer = popUpContainer.querySelector('.change-data-container')
  const loader = popUpContainer.querySelector('.loader')

  const simpanBtn = popUpContainer.querySelector('button[type="submit"]')
  simpanBtn.addEventListener('click', async () => {
    if (inputNewUsername.value.length > 3) {
      changeDataContainer.style.display = 'none'
      loader.classList.remove('disable')

      const res = await updateSingleField(inputNewUsername.value,'user/updateusername','username')
      if (res.status == 'success') {
        getUserData()
        setNotification(res.status,res.message,2000)

        popUpContainer.innerHTML = ''
        popUpContainer.classList.remove('open')
        location.reload()
      } else {
        setNotification(res.status,res.message,3000)

        changeDataContainer.style.display = 'block'
        loader.classList.add('disable')
      }
    } else if (inputNewUsername.value.length <= 3){
      setNotification('error','Masukan minimal lebih dari 3 huruf',2000)
    } else {
      setNotification('error','Inputan tidak boleh kosong',2000)
    }
  })

  inputNewUsername.addEventListener('keyup', e => {
    inputNewUsername.value = inputNewUsername.value.replace(/[^a-zA-Z0-9\s]+/, '')
    if (e.key == 'Enter') {
      if (inputNewUsername.value != '') {
        simpanBtn.click()
      } else {
        setNotification('error','Nama tidak boleh kosong',2000)
      }
    }
  })

})

ubahEmailBtn.addEventListener('click', () => {
  popUpContainer.classList.add('open')
  popUpContainer.innerHTML = componentChangeSingleDataContainer('Ubah Email','Masukan Email Baru',true)

  const closeBtn = popUpContainer.querySelector('.fa-times')
  closeBtn.addEventListener('click', () => {

    popUpContainer.classList.remove('open')
    popUpContainer.innerHTML = ''
  })

  const inputNewEmail = popUpContainer.querySelector('input[type="text"]')
  inputNewEmail.value = email.textContent

  const changeDataContainer = popUpContainer.querySelector('.change-data-container')
  const loader = popUpContainer.querySelector('.loader')
  const backEmailBtn = document.getElementById('back-email')
  const otpVerificationContainerU = popUpContainer.querySelector('.otp-verification-container')
  const infoEmailBaru = document.getElementById('info-email-baru')
  const inputVerificationCodeU = document.getElementById('input-verification-code')
  const otpFooterU = otpVerificationContainerU.querySelector('.otp-footer')
  let sec = 20

  backEmailBtn.addEventListener('click',async () => {
    otpVerificationContainerU.classList.add('disable')
    changeDataContainer.style.display = 'block'
    rCU = await cancleUpdateEmail()
  })

  const simpanBtn = popUpContainer.querySelector('button[type="submit"]')
  simpanBtn.addEventListener('click', async () => {
    if (validE.test(String(inputNewEmail.value).toLowerCase())) {
      changeDataContainer.style.display = 'none'
      loader.classList.remove('disable')

      const res = await updateSingleField(inputNewEmail.value,'user/updateemail','email')
      if (res.status == 'success') {
        changeDataContainer.style.display = 'none'
        loader.classList.add('disable')
        otpVerificationContainerU.classList.remove('disable')
        infoEmailBaru.textContent = `Kode telah dikirim melalui e-mail ke ${inputNewEmail.value}`

        timeRemaining = setInterval(() => {
          otpFooterU.innerHTML = `<span>Mohon tunggu dalam ${sec} detik untuk kirim ulang</span>`
          sec = sec - 1
        }, 1000);
        
        const timeOut = () => {
          setTimeout(() => {
            sec = 20
            clearInterval(timeRemaining)
            otpFooterU.innerHTML = `Tidak menerima kode? <span class="resend">Kirim ulang</span>`
            resendBtn = otpFooterU.querySelector('.resend')
            resendBtn.addEventListener('click', () => {
              updateSingleField(inputNewEmail.value,'user/resendcode','email')
              timeRemaining = setInterval(() => {
                otpFooterU.innerHTML = `<span>Mohon tunggu dalam ${sec} detik untuk kirim ulang</span>`
                sec = sec - 1
              }, 1000);
              timeOut()
            })
          }, 20000);
        }
        timeOut()
      } else {
        setNotification(res.status,res.message,3000)

        changeDataContainer.style.display = 'block'
        loader.classList.add('disable')
      }
    } else {
      setNotification('error','Format email salah',3000)
    }
  })

  inputNewEmail.addEventListener('keyup', e => {
    if (e.key == 'Enter') {
      if (inputNewEmail.value != '') {
        simpanBtn.click()
      } else {
        setNotification('error','Email tidak boleh kosong',2000)
      }
    }
  })

  inputVerificationCodeU.addEventListener('keypress', e => {
    ch = String.fromCharCode(e.which)
      if (!(/[0-9]/.test(ch))) {
        e.preventDefault()
      }
  })

  inputVerificationCodeU.addEventListener('input', async () => {
    if (inputVerificationCodeU.value.length == 4) {
      const rC = await checkOtpCodeByEmailBaru(inputNewEmail.value,parseInt(inputVerificationCodeU.value))
      if (rC.status == 'success') {
        getUserData()
        setNotification(rC.status,rC.message,2000)

        popUpContainer.innerHTML = ''
        popUpContainer.classList.remove('open')
      } else {
        setNotification(rC.status,rC.message,2000)
      }
    }
  })

  popUpContainer.addEventListener('click', async e => {
    if (e.target.classList.contains('popup-container')){
      rCU = await cancleUpdateEmail()
  
      popUpContainer.classList.remove('open')
      popUpContainer.innerHTML = ''
    }
  })
})

ubahPasswordBtn.addEventListener('click', () => {
  popUpContainer.classList.add('open')
  popUpContainer.innerHTML = componentChangeMultiDataContainer()

  const closeBtn = popUpContainer.querySelector('.fa-times')
  closeBtn.addEventListener('click', () => {

    popUpContainer.classList.remove('open')
    popUpContainer.innerHTML = ''
  })

  const changeDataContainer = popUpContainer.querySelector('.change-data-container')
  const loader = popUpContainer.querySelector('.loader')
  const currentPassword = document.getElementById('current-password')
  const newPassword = document.getElementById('new-password')
  const repeatNewPassword = document.getElementById('repeat-new-password')

  const simpanBtn = popUpContainer.querySelector('button[type="submit"]')
  simpanBtn.addEventListener('click', async () => {
    if (currentPassword.value == '' || newPassword.value == '' || repeatNewPassword.value == '') {
      setNotification('error','Password tidak boleh kosong',2000)
    } else if (currentPassword.value.length <= 3 || newPassword.value.length <= 3 || repeatNewPassword.value.length <= 3) {
      setNotification('error','Password minimal lebih dari 3 huruf ',2000)
    } else if (currentPassword.value.length > 3 || newPassword.value.length > 3 || repeatNewPassword.value.length > 3){
      if ( newPassword.value == repeatNewPassword.value) {
        loader.classList.remove('disable')
        changeDataContainer.style.display = 'none'

        rP = await updatePassword(currentPassword.value,newPassword.value)
        if (rP.status == 'success') {
          setNotification(rP.status,rP.message,3000)
          getUserData()
          popUpContainer.classList.remove('open')
          popUpContainer.innerHTML = ''
        } else {
          setNotification(rP.status,rP.message,3000)
          loader.classList.add('disable')
          changeDataContainer.style.display = 'block'
        }
      } else {
        setNotification('error','Password baru harus cocok',2000)
      }
    }
  })

  currentPassword.addEventListener('keyup', e => {
    if (e.key == 'Enter') {
      simpanBtn.click()
    }
  })

  newPassword.addEventListener('keyup', e => {
    if (e.key == 'Enter') {
      simpanBtn.click()
    }
  })

  repeatNewPassword.addEventListener('keyup', e => {
    if (e.key == 'Enter') {
      simpanBtn.click()
    }
  })

})

ubahNomerHpBtn.addEventListener('click', () => {
  popUpContainer.classList.add('open')
  popUpContainer.innerHTML = componentChangeSingleDataContainer(ubahNomerHpBtn.textContent,'Masukan Nomer Hp',false)

  const closeBtn = popUpContainer.querySelector('.fa-times')
  closeBtn.addEventListener('click', () => {

    popUpContainer.classList.remove('open')
    popUpContainer.innerHTML = ''
  })

  const changeDataContainer = popUpContainer.querySelector('.change-data-container')
  const loader = popUpContainer.querySelector('.loader')
  const inputNomerHp = popUpContainer.querySelector('input[type="text"]')
  inputNomerHp.value = nomerHp.textContent == '-' ? '' : nomerHp.textContent

  const simpanBtn = popUpContainer.querySelector('button[type="submit"]')
  simpanBtn.addEventListener('click', async () => {
    if (inputNomerHp.value == '') {
      setNotification('error','Nomer hp tidak boleh kosong',2000)
    } else {
      loader.classList.remove('disable')
      changeDataContainer.style.display = 'none'

      rN = await updateSingleField(inputNomerHp.value,'user/updatenomerhp','nomer_hp')
      if (rN.status == 'success') {
        setNotification(rN.status,rN.message,3000)
        getUserData()
        
        popUpContainer.classList.remove('open')
        popUpContainer.innerHTML = ''
      } else {
        setNotification(rN.status,rN.message,3000)

        loader.classList.add('disable')
        changeDataContainer.style.display = 'block'
      }
    }
  })

  inputNomerHp.addEventListener('keyup', e => {
    if (e.key == 'Enter') {
      simpanBtn.click()
    }
  })

  inputNomerHp.addEventListener('keypress', e => {
    ch = String.fromCharCode(e.which)
    if (!(/[0-9]/.test(ch))) {
      e.preventDefault()
    }
  })
})

popUpContainer.addEventListener('click', e => {
  if (e.target.classList.contains('popup-container')){
    popUpContainer.classList.remove('open')
    popUpContainer.innerHTML = ''
  }
})

const updateSingleField = (d,a,p) => {
  const form = new FormData()
  form.append(p,d)

  const r = fetch(baseUrl(a), {
    method: 'POST',
    body: form
  }).then(res => {
    if (res.ok) {
      return res.json()
    } else {
      console.error('Gagal mengupdate data');
    }
  }).then(data => data).catch(err => console.error(err))

  return r
}

const checkOtpCodeByEmailBaru = (e,c) => {
  const form = new FormData()
  form.append('email_baru',e)
  form.append('code_otp',c)

  const r = fetch(baseUrl('user/checkcodeotpbyemailbaru'), {
    method: 'POST',
    body: form
  }).then(res => {
    if (res.ok) {
      return res.json()
    } else {
      console.error('Gagal mengupdate data');
    }
  }).then(data => data).catch(err => console.error(err))

  return r
      
}

const cancleUpdateEmail = () => {
  return fetch(baseUrl('user/deletenewaccountbeforeverification'), {
    method: 'POST'
  }).then(res => {
    if (res.ok) {
      return res.json()
    } else {
      console.error('Gagal mengupdate data');
    }
  }).then(data => data).catch(err => console.error(err))
}

const updatePassword = (cp,np) => {
  const form = new FormData()
  form.append('password',cp)
  form.append('new_password',np)

  return fetch(baseUrl('user/updatepassword'), {
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