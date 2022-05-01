

  <div class="popup-container open">
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
              <label>
                Email Address
              </label>
            </div>
            <div class="form-group">
              <input type="password" required id="login-password">
              <div class="underline"></div>
              <label>
                Password
              </label>
              <button>
                <i class="far fa-eye-slash"></i>
              </button>
            </div>
          </div>
          <div class="signup hidden">
            <div class="form-group">
              <input type="text" required maxlength="30" id="register-username" autocomplete="off">
              <div class="underline"></div>
              <label>
                Username
              </label>
              <div class="validation-handling">
                Buat username yang unik
              </div>
            </div>
            <div class="form-group">
              <input type="text" required id="register-email" autocomplete="off">
              <div class="underline"></div>
              <label>
                Email Address
              </label>
              <div class="validation-handling">
                Example: email@qshoes.com
              </div>
            </div>
            <div class="form-group">
              <input type="text" required id="register-code" autocomplete="off">
              <div class="underline"></div>
              <label>
                Code Qs
              </label>
              <div class="validation-handling">
                Kode hanya dimiliki pihak QSHOES
              </div>
            </div>
            <div class="form-group">
              <input type="password" required id="register-password" required maxlength="30">
              <div class="underline"></div>
              <label>
                Password
              </label>
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
            <input type="text" required maxlength="4" autocomplete="off" id="input-verification-code">
            <div class="validation-handling error">
              <!-- Kode verifikasi salah -->
            </div>
          </div>
        </div>
        <div class="otp-footer">
          <!-- Tunggu dalam <span>30 detik</span> untuk kirim ulang -->
          Tidak menerima kode? <span class="resend">Kirim ulang</span>
        </div>
      </div>
    </div>
  </div>

  <div class="notification-container">
    <p></p>
  </div>


  <script src="<?= base_url('assets/Project Toko Online/js/adminqs/Login.js'); ?>"></script>
