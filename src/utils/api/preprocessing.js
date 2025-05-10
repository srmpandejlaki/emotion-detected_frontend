import { BASE_URL } from '../index';

// Ambil semua data preprocessing
export const fetchAllPreprocessing = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(`${BASE_URL}/preprocessing/list?page=${page}&limit=${limit}`);
    const data = await response.json();
    return { error: false, data };
  } catch (error) {
    console.error("Gagal fetch preprocessing:", error);
    return { error: true, data: [] };
  }
};

// Tambahkan data baru dan lakukan preprocessing
export const runPreprocessing = async (payload) => {
  try {
    const response = await fetch(`${BASE_URL}/preprocessing/preprocess`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload), // hanya { id_data: 5 }
    });

    const data = await response.json();
    return { error: false, data };
  } catch (error) {
    console.error("Gagal create preprocessing:", error);
    return { error: true };
  }
};


// Ambil data preprocessing berdasarkan ID
export const getPreprocessingById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/preprocessing//${id}`);
    const data = await response.json();
    return { error: false, data };
  } catch (error) {
    console.error("Gagal fetch preprocessing by ID:", error);
    return { error: true };
  }
};

// Update emosi di preprocessing
export const updatePreprocessingEmotion = async (id, newEmotion) => {
  try {
    const response = await fetch(`${BASE_URL}/preprocessing/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emotion: newEmotion }),
    });

    const data = await response.json();
    return { error: false, data };
  } catch (error) {
    console.error("Gagal update preprocessing:", error);
    return { error: true };
  }
};

// Hapus data preprocessing
export const deletePreprocessingData = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/preprocessing/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Gagal menghapus");

    return { error: false };
  } catch (error) {
    console.error("Gagal delete preprocessing:", error);
    return { error: true };
  }
};
