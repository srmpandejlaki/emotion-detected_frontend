import { BASE_URL } from '../index';

// Ambil semua data preprocessing
export const fetchAllPreprocessing = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(`${BASE_URL}/preprocessing/?page=${page}&limit=${limit}`);
    const data = await response.json();
    return { error: false, data };
  } catch (error) {
    console.error("Gagal fetch preprocessing:", error);
    return { error: true, data: [] };
  }
};

// Buat preprocessing baru (bukan menjalankan proses)
export const createPreprocessing = async (payload) => {
  try {
    const response = await fetch(`${BASE_URL}/preprocessing/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return { error: false, data };
  } catch (error) {
    console.error("Gagal create preprocessing:", error);
    return { error: true };
  }
};

// Jalankan preprocessing untuk 1 data berdasarkan ID
export const runPreprocessing = async (id_data) => {
  try {
    const response = await fetch(`${BASE_URL}/preprocessing/run/${id_data}`, {
      method: "POST",
    });

    const data = await response.json();
    return { error: false, data };
  } catch (error) {
    console.error("Gagal run preprocessing:", error);
    return { error: true };
  }
};

// Jalankan preprocessing banyak data
export const runPreprocessingMany = async (idDataList) => {
  try {
    const payload = { id_data_list: Array.isArray(idDataList) ? idDataList : [idDataList] };

    const response = await fetch(`${BASE_URL}/preprocessing/run-many`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return { error: false, data };
  } catch (error) {
    console.error("Gagal preprocessing banyak:", error);
    return { error: true };
  }
};

// Ambil data preprocessing berdasarkan ID
export const getPreprocessingById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/preprocessing/${id}`);
    const data = await response.json();
    return { error: false, data };
  } catch (error) {
    console.error("Gagal fetch preprocessing by ID:", error);
    return { error: true };
  }
};

// Update hasil_preprocessing dan/atau emotion
export const updatePreprocessing = async (id, payload) => {

  try {
    const response = await fetch(`${BASE_URL}/preprocessing/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return { error: false, data };
  } catch (error) {
    console.error("Gagal update preprocessing:", error);
    return { error: true };
  }
};

// Hapus data preprocessing
export const deletePreprocessing = async (id) => {
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
