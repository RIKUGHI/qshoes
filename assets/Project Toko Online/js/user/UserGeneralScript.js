formatRupiah = bilangan => {
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

const formSearchH = document.getElementById('form-search-h')
const searchInputH = document.getElementById('input-search-h')
const searchResultsH = document.getElementById('search-results-h')

searchInputH.addEventListener('keyup', async () => {
  searchInputH.value = searchInputH.value.replace(/[^a-zA-Z0-9\s]+/, '')
  r = await getAllProductsByNameH(searchInputH.value)
  searchResultsH.innerHTML = r.map(i => {
    return  `
              <a href="${baseUrl('toko/'+i.toko.domainToko+'/'+i.slug)}" class="list-item">
                <img src="${i.foto.length == 0 ? baseUrl('assets/Project Toko Online/image/no-product-image.png') : baseUrl('assets/Project Toko Online/image/products/'+i.foto[0].nama_foto)}" class="list-item-img">
                <div class="list-item-name">
                  <h2>${i.namaBarang}</h2>
                </div>
              </a>
            `
  }).join('')
})

formSearchH.addEventListener('submit', e => {
  e.preventDefault()
  if (searchInputH.value != '') {
    window.location = baseUrl('search?nama_barang='+searchInputH.value)
  }
})

const formSearchC = document.getElementById('form-search-c')
const searchInputC = document.getElementById('input-search-c')
const searchResultsC = document.getElementById('search-results-c')

searchInputC.addEventListener('keyup', async () => {
  searchInputC.value = searchInputC.value.replace(/[^a-zA-Z0-9\s]+/, '')
  r = await getAllProductsByNameH(searchInputC.value)

  if (r == '') {
    searchResultsC.style.display = 'none'
  }else{
    searchResultsC.style.display = 'block'
    searchResultsC.innerHTML = r.map(i => {
      return  `
                <a href="${baseUrl('toko/'+i.toko.domainToko+'/'+i.slug)}" class="list-item">
                  <img src="${i.foto.length == 0 ? baseUrl('assets/Project Toko Online/image/no-product-image.png') : baseUrl('assets/Project Toko Online/image/products/'+i.foto[0].nama_foto)}" class="list-item-img">
                  <div class="list-item-name">
                    <h2>${i.namaBarang}</h2>
                  </div>
                </a>
              ` 
    }).join('')
  }
})

formSearchC.addEventListener('submit', e => {
  e.preventDefault()
  if (searchInputC.value != '') {
    window.location = baseUrl('search?nama_barang='+searchInputC.value)
  }
})

document.addEventListener('click', e => {
  if (e.target.id != 'input-search-h' | e.target.id != 'input-search-c') {
    if (searchResultsH != null) {
      searchResultsH.innerHTML = ''
    }
    searchResultsC.innerHTML = ''
  }
})

const notifMsg = document.getElementById('notif-msg')

const getNotifMsg = async () => {
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
  
  if (r.login != false) {
    unread = 0
    r.myChatMember.forEach(e => {
      unread = e.unread + unread
    })
  }

  if (notifMsg != null) {
    if (unread != 0) {
      newNotifMsg = document.createElement('span')
      newNotifMsgText = document.createTextNode(unread)
      
      newNotifMsg.appendChild(newNotifMsgText)
      notifMsg.appendChild(newNotifMsg)
    }
  }
}

getNotifMsg()

const getAllProductsByNameH = n => {
  return fetch(baseUrl('api/getallproductsbyname/?ss='+n), {
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

const totalCartHU = document.querySelector('header .notify-user .shopping-cart .cart a')
const containerCardHeader = document.querySelector('header .notify-user .shopping-cart .container-cart .content-cart .container-card')

const getKeranjang = async () => {
  const r = await fetch(baseUrl('keranjang/getkeranjanguser'), {
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
  
  if (r != undefined) {
    if (r.status == 'success') {
      newCount = document.createElement('span')
      newCount.setAttribute('class','count')
      newCountText = document.createTextNode(r.totalCart)
    
      newCount.appendChild(newCountText)
      totalCartHU.appendChild(newCount)
  
      containerCardHeader.innerHTML = r.produk.map(i => {
        return  `
                  <div class="product-card">
                    <div class="product-image">
                      <img src="${baseUrl('assets/Project Toko Online/image/products/'+i.fotoProduk)}">
                    </div>
                    <div class="product-desk">
                      <div class="product-name">${i.namaProduk}</div>
                      <div class="product-price">${formatRupiah(i.hargaProduk)}</div>
                    </div>
                  </div>
                `
      }).join('')
    } else {
      containerCardHeader.innerHTML = `
                                          <div class="empty">
                                            <img src="${baseUrl('assets/Project Toko Online/icon/empty_cart.svg')}">
                                            <h4>Keranjang Belanja Kosong!!</h4>
                                          </div> 
                                        `
    }
  }
}

getKeranjang()

const notifyUser = document.getElementById('notify-user')
const searchBtn = notifyUser.querySelector('.search-popup .search')
const searchControl = document.querySelector('.search-control')
const inputSearch = searchControl.querySelector('.search-box form input')
const accountBtn = notifyUser.querySelector('.user')
const containerInfoAccount = notifyUser.querySelector('.container-info-account')
const popUpContainer = document.querySelector('.popup-container')
const logoutBtn = document.getElementById('logout-btn')
const notifContainer = document.querySelector('.notification-container')
const notifText = notifContainer.querySelector('p')
let defaultTimeD = 0
baseUrl = url => {
  return 'http://localhost/CI/'+url
}

notifyUser.addEventListener('click', e => {
  if (e.target.classList.contains('search')) {
    searchControl.classList.toggle('open')
    searchBtn.classList.toggle('active')
    if (searchControl.classList.contains('open')) {
      setTimeout(() => {
        inputSearch.value = ''
      },100)
    }
  }else if(e.target.classList.contains('user')){
    if (window.innerWidth <= 768) {
      accountBtn.classList.toggle('active')
      if (containerInfoAccount != null) {
        containerInfoAccount.classList.toggle('open')
      }
    }
  }
})

// ----------------------------- LOGIN OR SIGN UP -----------------------------
if (accountBtn.dataset.login == 'false') {
  accountBtn.addEventListener('click', e => {
    e.preventDefault()
    popUpContainer.classList.add('open')
    popUpContainer.innerHTML = componentLoginSignUp()
  
    const loginSignupContainer = popUpContainer.querySelector('.login-signup-container')
    const loginBtn = document.getElementById('login')
    const signUpBtn = document.getElementById('signup')
    const loginSignUpBody = loginSignupContainer.querySelector('.login-signup-body')
    const loginSignUpValidationHandling = loginSignUpBody.querySelector('.login-signup-validation-handling')
    const inputLoginEmail = document.getElementById('login-email')
    const inputLoginPassword = document.getElementById('login-password')
    const inputPassword = loginSignupContainer.querySelectorAll('input[type=password]')
    const inputRegisterUsername = document.getElementById('register-username')
    const inputRegisterEmail = document.getElementById('register-email')
    const inputRegisterPassword = document.getElementById('register-password')
    const passwordMode = loginSignupContainer.querySelectorAll('.login-signup-body .form-group button')
    const validationHandling = loginSignUpBody.querySelectorAll('.signup .validation-handling')
    const loginOrSignUpBtn = loginSignupContainer.querySelector('.login-signup-footer button')
    const loader = popUpContainer.querySelector('.loader')
  
    const otpVerificationContainer = popUpContainer.querySelector('.otp-verification-container')
    const infoEmailRegister = document.getElementById('info-email-register')
    const backSignUpBtn = document.getElementById('back-signup')
    const infoEmailText = 'Kode telah dikirim melalui e-mail ke'
    const inputVerificationCode = document.getElementById('input-verification-code')
    const otpValidationHandling = document.getElementById('otp-validation')
    const otpFooter = otpVerificationContainer.querySelector('.otp-footer')
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let resendBtn
    let sec = 20
    let timeRemaining
  
    loginBtn.addEventListener('click', () => {
      signUpBtn.removeAttribute('class')
      loginBtn.classList.add('active')
      loginSignUpBody.querySelector('.signup').classList.add('hidden')
      loginSignUpBody.querySelector('.login').classList.remove('hidden')
      loginOrSignUpBtn.textContent = 'Login'
    })
    
    signUpBtn.addEventListener('click', () => {
      loginBtn.removeAttribute('class')
      signUpBtn.classList.add('active')
      loginSignUpBody.querySelector('.login').classList.add('hidden')
      loginSignUpBody.querySelector('.signup').classList.remove('hidden')
      loginOrSignUpBtn.textContent = 'Sign Up'
    })
  
    passwordMode.forEach((e,i) => {
      e.addEventListener('click', () => {
        if (inputPassword[i].getAttribute('type') === 'password') {
          inputPassword[i].setAttribute('type', 'text')
          passwordMode[i].innerHTML = '<i class="far fa-eye"></i>'
        } else {
          inputPassword[i].setAttribute('type', 'password')
          passwordMode[i].innerHTML = '<i class="far fa-eye-slash"></i>'
        }
      })
    })
  
    // ----------------------------- CHECK USERNAME -----------------------------
    inputRegisterUsername.addEventListener('keyup', async () => {
      inputRegisterUsername.value = inputRegisterUsername.value.replace(/[^a-zA-Z0-9\s]+/, '')
  
      if (inputRegisterUsername.value.length <= 3) {
        validationHandling[0].classList.remove('error')
        validationHandling[0].classList.remove('success')
        validationHandling[0].textContent = 'Username minimal lebih dari 3 huruf'
        inputRegisterUsername.removeAttribute('data-status')
      }else{
        
        result = await checkUsername(inputRegisterUsername.value.replace(/[^a-zA-Z0-9\s]+/, ''))
        
        validationHandling[0].classList.remove('error')
        validationHandling[0].classList.remove('success')
        inputRegisterUsername.setAttribute('data-status',result.availabel)
        validationHandling[0].classList.add(result.status)
        validationHandling[0].textContent = result.message
      }
    })
  
    inputRegisterEmail.addEventListener('keyup', async () => {
      validationHandling[1].classList.remove('error')
      validationHandling[1].classList.remove('success')
  
      if (inputRegisterEmail.value.length == 0) {
        validationHandling[1].textContent = 'Email harus diisi'
      } else {
        if (re.test(String(inputRegisterEmail.value).toLowerCase())){
          resultEmail = await checkEmail(inputRegisterEmail.value)
          if (resultEmail.availabel) {
            validationHandling[1].classList.add('success')
            validationHandling[1].textContent = 'Pastikan email sudah benar'
            inputRegisterEmail.setAttribute('data-status',resultEmail.availabel)
          } else {
            validationHandling[1].classList.add('error')
            validationHandling[1].textContent = resultEmail.message
            inputRegisterEmail.setAttribute('data-status',resultEmail.availabel)
          }
        }else{
          validationHandling[1].classList.add('error')
          validationHandling[1].textContent = 'Format email salah'
          inputRegisterEmail.setAttribute('data-status',false)
        }
      }
    })
  
    loginOrSignUpBtn.addEventListener('click', async () => {
      if (loginOrSignUpBtn.textContent.trim().toString() === 'Login') {
        if (inputLoginEmail.value == '' || inputLoginPassword.value == '') {
          loginSignUpValidationHandling.innerHTML = '<span>Email dan password tidak boleh kosong</span>'
        } else {
          if (re.test(String(inputLoginEmail.value).toLowerCase())) {
            rL = await login(inputLoginEmail.value,inputLoginPassword.value)
            if (rL.statusLogin) {
              location.reload()
            } else {
              loginSignUpValidationHandling.innerHTML = `<span>${rL.message}</span>`
            }
          } else {
            loginSignUpValidationHandling.innerHTML = '<span>Format Email salah</span>'
          }
        }
      } else {
        if (inputRegisterUsername.value == '' | inputRegisterEmail.value == '') {
          setNotification('error','Pastikan semua inputan sudah terisi',3000)
        }else if (inputRegisterPassword.value.length <= 3) {
          setNotification('error','Password minimal lebih dari 3 huruf',3000)
        }else if (inputRegisterUsername.getAttribute('data-status') == 'true' && inputRegisterEmail.getAttribute('data-status') == 'true' && inputRegisterPassword.value.length > 3){
          loginSignupContainer.classList.add('disable')
          loader.classList.remove('disable')
          
          resultV = await signUpVerification(inputRegisterUsername.value,inputRegisterEmail.value,inputRegisterPassword.value)

          if (resultV.statusSended) {
            loader.classList.add('disable')
            otpVerificationContainer.classList.remove('disable')
            
            timeRemaining = setInterval(() => {
              otpFooter.innerHTML = `<span>Mohon tunggu dalam ${sec} detik untuk kirim ulang</span>`
              sec = sec - 1
            }, 1000);
            
            const timeOut = () => {
              setTimeout(() => {
                sec = 20
                clearInterval(timeRemaining)
                otpFooter.innerHTML = `Tidak menerima kode? <span class="resend">Kirim ulang</span>`
                resendBtn = otpFooter.querySelector('.resend')
                resendBtn.addEventListener('click', () => {
                  resendCode(inputRegisterEmail.value)
                  timeRemaining = setInterval(() => {
                    otpFooter.innerHTML = `<span>Mohon tunggu dalam ${sec} detik untuk kirim ulang</span>`
                    sec = sec - 1
                    timeOut()
                  }, 1000);
                })
              }, 20000);
            }
            timeOut()
  
            infoEmailRegister.textContent = infoEmailText + ' ' + inputRegisterEmail.value
          } else {
            setNotification(resultV.status,resultV.message,4000)
            popUpContainer.innerHTML = ''
            popUpContainer.classList.remove('open')
          }
        }else{
          setNotification('error','Pastikan semua status berwarna hijau',3000)
        }
      }
    })
  
    backSignUpBtn.addEventListener('click', async () => {
      resultD = await deleteAccountBeforeVerification(inputRegisterEmail.value)
  
      otpVerificationContainer.classList.add('disable')
      loginSignupContainer.classList.remove('disable')
      inputRegisterUsername.value = ''
      inputRegisterEmail.value = ''
      inputRegisterPassword.value = ''
      validationHandling[0].classList.remove('success')
      validationHandling[1].classList.remove('success')
    })
  
    inputVerificationCode.addEventListener('keypress', e => {
      ch = String.fromCharCode(e.which)
      if (!(/[0-9]/.test(ch))) {
        e.preventDefault()
      }
    })
  
    inputVerificationCode.addEventListener('input', async () => {
  
      if (inputVerificationCode.value.length == 4) {
        resultC = await checkOtpCode(inputRegisterEmail.value,parseInt(inputVerificationCode.value))
  
        if (resultC.status == 'success') {
          popUpContainer.innerHTML = ''
          popUpContainer.classList.remove('open')
          location.reload()
        } else {
          setNotification(resultC.status,resultC.message,2000)
        }
      }
    })
  
    popUpContainer.addEventListener('click', async e => {
      if (e.target.classList.contains('popup-container')) {
        resultD = await deleteAccountBeforeVerification(inputRegisterEmail.value)
  
        popUpContainer.classList.remove('open')
        popUpContainer.innerHTML = ''
      }
    })
  })
}else{
  logoutBtn.addEventListener('click', async () => {
    rLO = await logout()
    if (rLO.statusLogout) {
      location.reload()
    }
  })
}


const componentLoginSignUp = () => {
  return  `
            <div class="login-signup-container">
              <div class="login-signup">
                <nav class="login-signup-header">
                  <button class="active" id="login"> Login </button>
                  <button id="signup"> Sign Up </button>
                  <div class="active-button"></div>
                </nav>
                <div class="login-signup-body">
                  <div class="login">
                    <div class="login-signup-validation-handling"></div>
                    <div class="form-group">
                      <input type="text" required id="login-email">
                      <div class="underline"></div>
                      <label>Email Address</label>
                    </div>
                    <div class="form-group">
                      <input type="password" required autocomplete="off" maxlength="38" id="login-password">
                      <div class="underline"></div>
                      <label>Password</label>
                      <button>
                        <i class="far fa-eye-slash"></i>
                      </button>
                    </div>
                  </div>
                  <div class="signup hidden">
                    <div class="form-group">
                      <input type="text" required id="register-username" maxlength="30" autocomplete="off">
                      <div class="underline"></div>
                      <label>Username</label>
                      <div class="validation-handling">Buat username yang unik</div>
                    </div>
                    <div class="form-group">
                      <input type="text" required id="register-email">
                      <div class="underline"></div>
                      <label>Email Address</label>
                      <div class="validation-handling">Example: email@qshoes.com</div>
                    </div>
                    <div class="form-group">
                      <input type="password" required id="register-password" autocomplete="off" maxlength="38">
                      <div class="underline"></div>
                      <label>Password</label>
                      <button>
                        <i class="far fa-eye-slash"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="login-signup-footer">
                  <button>
                    Login
                  </button>
                </div>
              </div>
            </div>
            <div class="loader disable"></div>
            <div class="otp-verification-container disable">
              <div class="otp-verification">
                <div class="otp-header">
                  <button id="back-signup">
                    <i class="fas fa-arrow-left back"></i>
                  </button>
                  <div class="icon">
                    <i class="far fa-envelope"></i>
                  </div>
                  <div class="info">
                    <span>Masukan Kode Verifikasi</span>
                    <span id="info-email-register">Kode telah dikirim melalui e-mail ke text@ext.com</span>
                  </div>
                </div>
                <div class="otp-body">
                  <div class="form-group">
                    <input type="text" required maxlength="4" id="input-verification-code" autocomplete="off">
                    <div class="validation-handling" id="otp-validation">
                      <!-- Kode verifikasi salah -->
                    </div>
                  </div>
                </div>
                <div class="otp-footer"></div>
              </div>
            </div>
          `
}

const login = (e,p) => {
  const formLogin = new FormData()
  formLogin.append('email', e)
  formLogin.append('password', p)

  return fetch(baseUrl('api/login'), {
    method: 'POST',
    body: formLogin
  }).then(res => {
    if (res.ok) {
      return res.json()
    } else {
      console.error('Gagal mengambil data');
    }
  }).then(data => data).catch(err => console.error(err))
}

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

const checkUsername = async n => {
  const formU = new FormData()
  formU.append('username', n)

  const r = await fetch(baseUrl('api/checkUsername'), {
    method: 'POST',
    body: formU
  }).then(res => {
    if (res.ok) {
      return res.json()
    } else {
      console.error('Gagal mengambil data');
    }
  }).then(data => data).catch(err => console.error(err))
  
  return r
}

const checkEmail = async e => {
  const formEmail = new FormData()
  formEmail.append('email', e)

  const r = await fetch(baseUrl('api/checkemail'), {
    method: 'POST',
    body: formEmail
  }).then(res => {
    if (res.ok) {
      return res.json()
    } else {
      console.error('Gagal mengambil data');
    }
  }).then(data => data).catch(err => console.error(err))
    
  return r
}

const signUpVerification = async (u,e,p) => {
  const formSignUp = new FormData()
  formSignUp.append('username',u)
  formSignUp.append('email',e)
  formSignUp.append('password',p)

  const r = await fetch(baseUrl('api/signupverification'), {
    method: 'POST',
    body: formSignUp
  }).then(res => {
    if (res.ok) {
      return res.json()
    } else {
      console.error('Gagal mengambil data');
    }
  }).then(data => data).catch(err => console.error(err))

  return r
}

const resendCode = async e => {
  const newCode = new FormData()
  newCode.append('email',e)

  await fetch(baseUrl('api/resendCode'), {
    method: 'POST',
    body: newCode
  }).then(res => {
    if (res.ok) {
      return res.json()
    } else {
      console.error('Gagal mengambil data');
    }
  }).then(data => data).catch(err => console.error(err))
}

const checkOtpCode = async (e,c) => {
  const formOtp = new FormData()
  formOtp.append('email',e)
  formOtp.append('code',c)

  const r = await fetch(baseUrl('api/checkotpcodebyemail') , {
    method: 'POST',
    body: formOtp
  }).then(res => {
    if (res.ok) {
      return res.json()
    } else {
      console.error('Gagal mengambil data');
    }
  }).then(data => data).catch(err => console.error(err))

  return r
}

const deleteAccountBeforeVerification = async e => {
  const formD = new FormData()
  formD.append('email',e)

  const r = await fetch(baseUrl('api/deleteaccountbeforeverification') , {
    method: 'POST',
    body: formD
  }).then(res => {
    if (res.ok) {
      return res.json()
    } else {
      console.error('Gagal mengambil data');
    }
  }).then(data => data).catch(err => console.error(err))

  return r
}  

const setNotification = (status,message,time) => {
  notifContainer.classList.add(status)
  notifText.textContent = message
  setTimeout(() => {
    notifContainer.classList.remove(status)
    defaultTimeD = 0
  }, defaultTimeD = defaultTimeD + time);
}