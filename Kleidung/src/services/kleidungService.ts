
import axios from 'axios'

export const fetchKleidung = async () => {
  const response = await axios.get('/api/kleidung/user')
  return response.data
}

export const createKleidung = async (data: any) => {
  const response = await axios.post('/api/kleidung', data)
  return response.data
}

export const updateKleidung = async (id: number, data: any) => {
  const response = await axios.put(`/api/kleidung/${id}`, data)
  return response.data
}
