import { BASE_URL } from '../index';

// Split dataset (latih & uji)
export const splitDataset = async (payload) => {
  try {
    const response = await fetch(`${BASE_URL}/process/split`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return { error: false, data };
  } catch (error) {
    console.error("Gagal split dataset:", error);
    return { error: true };
  }
};

// Latih model baru
export const trainModel = async (payload) => {
  try {
    const response = await fetch(`${BASE_URL}/process/train`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
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
    const response = await fetch(`${BASE_URL}/process/models/`);
    const data = await response.json();
    return { error: false, data };
  } catch (error) {
    console.error("Gagal mengambil daftar model:", error);
    return { error: true, data: [] };
  }
};

// Ambil detail 1 model berdasarkan ID
export const getModel = async (modelId) => {
  try {
    const response = await fetch(`${BASE_URL}/process/model/${modelId}`);
    const data = await response.json();
    return { error: false, data };
  } catch (error) {
    console.error(`Gagal mengambil model ${modelId}:`, error);
    return { error: true };
  }
};

// Ambil evaluasi model
export const getModelEvaluation = async (modelId) => {
  try {
    const response = await fetch(`${BASE_URL}/process/model/evaluation/${modelId}`);
    const data = await response.json();
    return { error: false, data };
  } catch (error) {
    console.error(`Gagal mengambil evaluasi model ${modelId}:`, error);
    return { error: true };
  }
};

// Ambil statistik TF-IDF model
export const fetchTfidfStats = async (modelId) => {
  try {
    const response = await fetch(`${BASE_URL}/process/model/tfidf-stats/${modelId}`);
    const data = await response.json();
    return { error: false, data };
  } catch (error) {
    console.error(`Gagal mengambil TF-IDF stats model ${modelId}:`, error);
    return { error: true };
  }
};

// Ambil probabilitas prior model
export const fetchProbPrior = async (modelId) => {
  try {
    const response = await fetch(`${BASE_URL}/process/model/fetch-prob-prior/${modelId}`);
    const data = await response.json();
    return { error: false, data };
  } catch (error) {
    console.error(`Gagal mengambil prior probability model ${modelId}:`, error);
    return { error: true };
  }
};

// Ambil probabilitas kondisi model
export const fetchProbCondition = async (modelId) => {
  try {
    const response = await fetch(`${BASE_URL}/process/model/fetch-prob-condition/${modelId}`);
    const data = await response.json();
    return { error: false, data };
  } catch (error) {
    console.error(`Gagal mengambil conditional probability model ${modelId}:`, error);
    return { error: true };
  }
};

// Ambil hasil prediksi dari model (berisi info klasifikasi)
export const fetchPredictResults = async (modelId) => {
  try {
    const response = await fetch(`${BASE_URL}/process/model/predict-results/${modelId}`);
    const data = await response.json();
    return { error: false, data };
  } catch (error) {
    console.error(`Gagal mengambil hasil prediksi model ${modelId}:`, error);
    return { error: true };
  }
};

// Ambil hasil proses BERT + leksikon untuk model tertentu
export const fetchBertLexicon = async (modelId) => {
  try {
    const response = await fetch(`${BASE_URL}/process/model/fetch-bert-lexicon/${modelId}`);
    const data = await response.json();
    return { error: false, data };
  } catch (error) {
    console.error(`Gagal mengambil data BERT + leksikon untuk model ${modelId}:`, error);
    return { error: true };
  }
};
