const loginSignupContainer = document.querySelector('.popup-container .login-signup-container')
const loginBtn = document.getElementById('login')
const signUpBtn = document.getElementById('signup')
const loginSignUpBody = loginSignupContainer.querySelector('.login-signup-body')
const loginSignUpValidationHandling = loginSignUpBody.querySelector('.login-signup-validation-handling')
const loginOrSignUpBtn = loginSignupContainer.querySelector('.login-signup-footer button')
const inputLoginEmail = document.getElementById('login-email')
const inputLoginPassword = document.getElementById('login-password')
const inputPassword = loginSignupContainer.querySelectorAll('input[type=password]') 
const inputRegisterUsername = document.getElementById('register-username')
const inputRegisterEmail = document.getElementById('register-email')
const inputRegisterCode = document.getElementById('register-code')
const inputRegisterPassword = document.getElementById('register-password')
const validationHandling = loginSignUpBody.querySelectorAll('.signup .validation-handling')
const passwordMode = loginSignupContainer.querySelectorAll('.login-signup-body .form-group button')
const loader = document.querySelector('.popup-container .loader')
const notifContainer = document.querySelector('.notification-container')
const notifText = notifContainer.querySelector('p')

const otpVerificationContainer = document.querySelector('.popup-container .otp-verification-container')
const infoEmailRegister = document.getElementById('info-email-register')
const infoEmailText = 'Kode telah dikirim melalui e-mail ke'
const inputVerificationCode = document.getElementById('input-verification-code')
const backSignUpBtn = document.getElementById('back-signup')
const otpValidationHandling = document.getElementById('otp-validation')
const otpFooter = otpVerificationContainer.querySelector('.otp-footer')
defaultTime = 0
let sec = 20
const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

loginBtn.onclick = () => {
  signUpBtn.removeAttribute('class')
  loginBtn.classList.add('active')
  loginSignUpBody.querySelector('.signup').classList.add('hidden')
  loginSignUpBody.querySelector('.login').classList.remove('hidden')
  loginOrSignUpBtn.textContent = 'Login'
}

signUpBtn.onclick = () => {
  loginBtn.removeAttribute('class')
  signUpBtn.classList.add('active')
  loginSignUpBody.querySelector('.login').classList.add('hidden')
  loginSignUpBody.querySelector('.signup').classList.remove('hidden')
  loginOrSignUpBtn.textContent = 'Sign Up'
}

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

inputRegisterUsername.onkeyup = async () => {
  inputRegisterUsername.value = inputRegisterUsername.value.replace(/[^a-zA-Z0-9\s]+/, '')
  
  if (inputRegisterUsername.value.length <= 3) {
    validationHandling[0].classList.remove('error')
    validationHandling[0].classList.remove('success')
    validationHandling[0].textContent = 'Username minimal lebih dari 3 huruf'
    inputRegisterUsername.removeAttribute('data-status')
  }else{
    
    result = await check('username',inputRegisterUsername.value.replace(/[^a-zA-Z0-9\s]+/, ''))
    
    validationHandling[0].classList.remove('error')
    validationHandling[0].classList.remove('success')
    inputRegisterUsername.setAttribute('data-status',result.availabel)
    validationHandling[0].classList.add(result.status)
    validationHandling[0].textContent = result.message
  }
}

inputRegisterEmail.onkeyup = async () => {
  validationHandling[1].classList.remove('error')
  validationHandling[1].classList.remove('success')
  
  if (inputRegisterEmail.value.length == 0) {
    validationHandling[1].textContent = 'Email harus diisi'
  } else {
    if (re.test(String(inputRegisterEmail.value).toLowerCase())){
      resultEmail = await check('email',inputRegisterEmail.value)
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
}

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
    if (inputRegisterUsername.value == '' | inputRegisterEmail.value == '' | inputRegisterCode.value == '') {
      setNotification('error','Pastikan semua inputan sudah terisi',3000)
    }else if (inputRegisterPassword.value.length <= 3) {
      setNotification('error','Password minimal lebih dari 3 huruf',3000)
    }else if (inputRegisterCode.value != 'QS1234CODE') {
      setNotification('error','Code Qs salah',3000)
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
              }, 1000);
              timeOut()
            })
          }, 20000);
        }
        timeOut()

        infoEmailRegister.textContent = infoEmailText + ' ' + inputRegisterEmail.value
      } else {
        setNotification(resultV.status,resultV.message,4000)
        loader.classList.add('disable')
        otpVerificationContainer.classList.add('disable')
        loginSignupContainer.classList.remove('disable')
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
  inputRegisterCode.value = ''
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
      location.reload()
    } else {
      setNotification(resultC.status,resultC.message,2000)
    }
  }
})






const check = (a,b) => {
  const form = new FormData()
  form.append(a, b)
  form.append('col',a)

  return fetch(baseUrl('adminqs/check'), {
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

const signUpVerification = (u,e,p) => {
  const form = new FormData()
  form.append('username',u)
  form.append('email',e)
  form.append('password',p)

  return fetch(baseUrl('adminqs/signupverification'), {
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

const resendCode = async e => {
  const form = new FormData()
  form.append('email',e)

  await fetch(baseUrl('adminqs/resendCode'), {
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

const deleteAccountBeforeVerification = async e => {
  const formD = new FormData()
  formD.append('email',e)

  const r = await fetch(baseUrl('adminqs/deleteaccountbeforeverification') , {
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

const checkOtpCode = async (e,c) => {
  const form = new FormData()
  form.append('email',e)
  form.append('code',c)

  const r = await fetch(baseUrl('adminqs/checkotpcodebyemail') , {
    method: 'POST',
    body: form
  }).then(res => {
    if (res.ok) {
      return res.json()
    } else {
      console.error('Gagal mengambil data');
    }
  }).then(data => data).catch(err => console.error(err))

  return r
}

const login = (e,p) => {
  const formLogin = new FormData()
  formLogin.append('email', e)
  formLogin.append('password', p)

  return fetch(baseUrl('adminqs/loginn'), {
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


