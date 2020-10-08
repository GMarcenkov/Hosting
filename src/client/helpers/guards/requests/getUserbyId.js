import axios from "axios";

export async function getUserById(id) {
  const url = `http://localhost:5000/users/5ed36fe6c1f3912158a0f247`;
  const request = {
    method: "GET",
    url
  };
  try {
    const response = await axios(request);
    return {
      user: response.data
    };
  } catch (e) {
    return [];
  }
}
