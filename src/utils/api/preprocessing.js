import { BASE_URL } from '../index';

// Ambil semua data preprocessing (preprocessed)
export const fetchPreprocessedData = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(`${BASE_URL}/dataset/preprocessed/data?page=${page}&limit=${limit}`);
    const data = await response.json();
    return { error: false, data };
  } catch (error) {
    console.error("Gagal fetch data preprocessed:", error);
    return { error: true, data: [] };
  }
};

// Jalankan preprocessing data baru
export const runPreprocessNewData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/dataset/preprocessed/process`, {
      method: "POST",
    });

    const data = await response.json();
    return { error: false, data };
  } catch (error) {
    console.error("Gagal menjalankan preprocessing data baru:", error);
    return { error: true };
  }
};

// Edit data baru (hasil_preprocessing dan/atau emotion)
export const editPreprocessedData = async (id, payload) => {
  try {
    const response = await fetch(`${BASE_URL}/dataset/preprocessed/data/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return { error: false, data };
  } catch (error) {
    console.error("Gagal edit data preprocessed:", error);
    return { error: true };
  }
};

// Hapus semua data baru
export const deletePreprocessedData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/dataset/preprocessed/data`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Gagal menghapus data preprocessed");
    return { error: false };
  } catch (error) {
    console.error("Gagal delete data preprocessed:", error);
    return { error: true };
  }
};

// Tandai semua data sebagai sudah di-train
export const markPreprocessedAsTrained = async () => {
  try {
    const response = await fetch(`${BASE_URL}/dataset/preprocessed/mark-trained`, {
      method: "POST",
    });

    const data = await response.json();
    return { error: false, data };
  } catch (error) {
    console.error("Gagal menandai data sebagai trained:", error);
    return { error: true };
  }
};
