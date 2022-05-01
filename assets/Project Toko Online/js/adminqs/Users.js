baseUrl = url => {
  return 'http://localhost/CI/'+url
}

const usersContainer = document.querySelector('.container-add-products .transaction-detail')

const getAllUser = async url => {
  const r = await fetch(baseUrl('adminqs/getallusers'), {
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

  if (r.length != 0) {
    no = 1
    usersContainer.innerHTML =  `
                                              <h3>Users Terdaftar</h3>
                                              <table border="0">
                                                <thead>
                                                  <tr>
                                                    <th>No</th>
                                                    <th>Username</th>
                                                    <th>Toko</th>
                                                    <th>Email</th>
                                                    <th>Nomer Hp</th>
                                                    <th>Status Email</th>
                                                    <th>Status</th>
                                                    <th style="display: none;">Aksi</th>
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                ${r.map(d => {
                                                  switch (parseInt(d.status)) {
                                                    case 1:
                                                      status = 'Offline'
                                                      break;
                                                      
                                                    default:
                                                      status = 'Online'
                                                      break;
                                                  }
                                                  return  `
                                                            <tr>
                                                              <td>${no++}</td>
                                                              <td>${d.username}</td>
                                                              <td>${d.toko}</td>
                                                              <td>${d.email}</td>
                                                              <td>${d.noHp}</td>
                                                              <td>${d.statusEmail}</td>
                                                              <td>${status}</td>
                                                              <td style="display: none;">
                                                                <button class="far fa-eye"></button>
                                                                <button class="fas fa-trash-alt"></button>
                                                              </td>
                                                            </tr>
                                                          `
                                                }).join('')}
                                                </tbody>
                                              </table>
                                            `
  } else {
    usersContainer.innerHTML =  `
                                              <h3>Users Terdaftar</h3>
                                              <div class="empty">
                                                <img src="${baseUrl('assets/Project Toko Online/icon/empty-oder.svg')}">
                                                <h2>Tidak Ada Users</h2>
                                              </div>
                                            `
  }
}

getAllUser()



