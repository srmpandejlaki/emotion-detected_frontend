import { BASE_URL } from '../config';

export const saveManualDataset = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/dataset/manual`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // list of { text, label }
    });

    if (!response.ok) {
      throw new Error("Failed to save dataset");
    }

    return await response.json();
  } catch (error) {
    console.error("Error saving dataset:", error);
    throw error;
  }
};


export const fetchDatasets = async () => {
  try {
    const response = await fetch(`${BASE_URL}/dataset/list`);
    return await response.json();
  } catch {
    return { error: 'Failed to fetch datasets.' };
  }
};

export const fetchDataset = async (id_data, page = 1, limit = 10) => {
  try {
    const response = await fetch(`${BASE_URL}/dataset/${id_data}?page=${page}&limit=${limit}`);
    return await response.json();
  } catch {
    return { error: 'Failed to fetch dataset.' };
  }
};

export const deleteDataset = async (datasetId) => {
  try {
    const response = await fetch(`${BASE_URL}/dataset/${datasetId}`, {
      method: 'DELETE',
    });
    return await response.json();
  } catch {
    return { error: 'Failed to delete dataset.' };
  }
};