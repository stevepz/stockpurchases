import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:3000"
})

// ============== Home ================

// export const indexHome = async () => {
//   const resp = await api.get(`/`);
//   return resp.data
// }

// export const showHome = async (id, getData) => {
//   const resp = await api.get(`/${id}`, getData);
//   return resp.data
// }

// ============== Auth ================

export const loginUser = async (loginData) => {
  try {
    const resp = await api.post('/auth/login', loginData)
    localStorage.setItem('authToken', resp.data.token);
    api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
    return resp.data.user
  }
  catch (e) {
    return ({ username: "", id: -1 })
  }
}

export const registerUser = async (registerData) => {
  try {
    const resp = await api.post('/users', { user: registerData })
    localStorage.setItem('authToken', resp.data.token);
    api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
    return resp.data.user
  }
  catch (e) {
    return ({ username: "", id: null })
  }
}

export const verifyUser = async () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`
    const resp = await api.get('/auth/verify');
    return resp.data
  }
  return false;
}

// ============== User ===============



export const showUser = async (id) => {
  const resp = await api.get(`/users/${id}`);
  return resp.data
}

// export const putUser = async (id, putData) => {
//   const resp = await api.put(`/user/${id}`, putData);

//   return resp.data
// }
// export const patchUser = async (id, putData) => {
//   try {
//     const response = await api.patch(`/user/${id}`, putData);
//     return response.data
//   } catch (e) {
//     console.log(`😱 Axios request failed: ${e}`);
//   }

// }

// export const destroyUser = async (id, deleteData) => {
//   const resp = await api.delete(`/user/${id}`, deleteData);
//   return resp.data
// }

// ============== ===============



export const addStock = async (id, postData) => {
  const resp = await api.post(`/users/${id}/stocks`, postData);
  return resp.data
}

export const editStock = async (id, putData) => {
  const resp = await api.put(`/users/${putData.user_id}/stocks/${putData.id}`, putData);
  return resp.data
}

export const deleteStock = async (id, user_id) => {
  const resp = await api.delete(`/users/${user_id}/stocks/${id}`);
  return resp.data
}


// { user: registerData })
export const addPurchase = async (user_id, stock_id, postData) => {
  const resp = await api.post(`/users/${user_id}/stocks/${stock_id}/purchases`, { purchase: postData });
  return resp.data
}

export const editPurchase = async (user_id, putData) => {
  const resp = await api.put(`/users/${user_id}/stocks/${putData.stock_id}/purchases/${putData.id}`, putData);
  return resp.data
}

export const deletePurchase = async (user_id, stock_id, id) => {
  const resp = await api.delete(`/users/${user_id}/stocks/${stock_id}/purchases/${id}`);
  return resp.data
}
