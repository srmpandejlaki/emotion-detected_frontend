import { BASE_URL } from '../index';

// utils/api.js atau bisa langsung di file JS frontend kamu
export const predictEmotion = async (text) => {
  try {
    const response = await fetch(`${BASE_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text }) // pastikan struktur payload-nya sesuai dengan backend
    });

    if (!response.ok) {
      throw new Error("Gagal memproses prediksi");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
}
