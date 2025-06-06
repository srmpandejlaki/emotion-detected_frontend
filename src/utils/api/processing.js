import { BASE_URL } from '../index';

// Split dataset (latih & uji)

export const fetchProcessedData = async (page = 1, limit = 10, filter = 'all') => {
  try {
    const response = await fetch(`${BASE_URL}/dataset/preprocessed/data?page=${page}&limit=${limit}&filter=${filter}`);
    const data = await response.json();
    return { error: false, data };
  } catch (error) {
    console.error("Gagal fetch data preprocessed:", error);
    return { error: true, data: [] };
  }
};
export const splitDataset = async (testsize) => {
  try {
    const response = await fetch(`${BASE_URL}/process/split`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ test_size : testsize }),
    });

    const data = await response.json();
    return { error: false, data };
  } catch (error) {
    console.error("Gagal split dataset:", error);
    return { error: true };
  }
};

// Latih model baru
export const trainModel = async (testSize) => {
  try {
    const response = await fetch(`${BASE_URL}/process/train`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ test_size: testSize}),
    });

    const data = await response.json();
    return { error: false, data };
  } catch (error) {
    console.error("Gagal melatih model:", error);
    return { error: true };
  }
};

// Ambil daftar semua model
export const getModels = async () => {
  try {
    const response = await fetch(`${BASE_URL}/process/models/`, {
      method: "GET",
    });

    const data = await response.json();
    console.log(data);
    return { error: false, data };
  } catch (error) {
    console.error("Gagal mengambil daftar model:", error);
    return { error: true, data: [] };
  }
};

// Ambil detail 1 model berdasarkan ID
export const getModel = async () => {
  try {
    const response = await fetch(`${BASE_URL}/process/model`, {
      method: "GET",
    });

    const data = await response.json();
    return { error: false, data };
  } catch (error) {
    console.error(`Gagal mengambil model:`, error);
    return { error: true };
  }
};

// Ambil evaluasi model
export async function getModelEvaluation() {
  try {
    const response = await fetch(`${BASE_URL}/process/model/evaluation`);
    const result = await response.json();

    if (!response.ok) {
      return { error: result.error || "Unknown error" };
    }

    return { data: result };
  } catch (error) {
    return { error: error.message || "Network error" };
  }
}


// Ambil statistik TF-IDF model
export const fetchTfidfStats = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(
      `${BASE_URL}/process/model/tfidf-stats?page=${page}&limit=${limit}`
    );
    const result = await response.json();

    if (!response.ok) {
      return { error: result.error || "Gagal mengambil data TF-IDF" };
    }

    return {
      error: false,
      data: result.data,
      total_pages: result.total_pages,
      current_page: result.current_page,
    };
  } catch (error) {
    console.error("TF-IDF error:", error.message);
    return { error: true };
  }
};

// Ambil probabilitas prior model
export const fetchProbPrior = async () => {
  try {
    const response = await fetch(`${BASE_URL}/process/model/fetch-prob-prior`);
    const data = await response.json();
    return { error: false, data };
  } catch (error) {
    console.error(`Gagal mengambil prior probability model:`, error);
    return { error: true };
  }
};

// Ambil probabilitas kondisi model
export const fetchProbCondition = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(`${BASE_URL}/process/model/fetch-prob-condition?page=${page}&limit=${limit}`);
    console.log(response);
    const data = await response.json();
    return { error: false, data };
  } catch (error) {
    console.error(`Gagal mengambil conditional probability model:`, error);
    return { error: true };
  }
};

// Ambil hasil prediksi dari model (berisi info klasifikasi)
export const fetchPredictResults = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(`${BASE_URL}/process/model/predict-results?page=${page}&limit=${limit}`);
    const data = await response.json();
    return { error: false, data };
  } catch (error) {
    console.error(`Gagal mengambil hasil prediksi model:`, error);
    return { error: true };
  }
};

// Ambil hasil proses BERT + leksikon untuk model tertentu
export const fetchBertLexicon = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(`${BASE_URL}/process/model/fetch-bert-lexicon?page=${page}&limit=${limit}`);
    const data = await response.json();

    return { error: false, data };
  } catch (error) {
    console.error(`Gagal mengambil data BERT + leksikon untuk model:`, error);
    return { error: true };
  }
};
