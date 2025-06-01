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

// Untuk prediksi batch (dengan data text dan emotion)
export const predictBatchEmotion = async (texts, trueLabels) => {
  try {
    const response = await fetch(`${BASE_URL}/predict/batch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        texts: texts,
        true_labels: trueLabels
      })
    });

    if (!response.ok) {
      throw new Error("Gagal memproses batch prediksi");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Batch prediction error:", error.message);
    return null;
  }
};
