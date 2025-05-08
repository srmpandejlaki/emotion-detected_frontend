import { BASE_URL } from '../index';

// Create manual dataset
export const saveManualDataset = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/dataset/manual`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // { text_data, id_label }
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

// Upload dataset via CSV
export const uploadCSV = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${BASE_URL}/dataset/csv`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload CSV");
    }

    return await response.json();
  } catch (error) {
    console.error("Error uploading CSV:", error);
    throw error;
  }
};

// Get paginated list of datasets
export const fetchDatasets = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(`${BASE_URL}/dataset/list?page=${page}&limit=${limit}`);
    return await response.json();
  } catch {
    return { error: 'Failed to fetch datasets.' };
  }
};

// Get a single dataset by ID
export const fetchDatasetById = async (id_data) => {
  try {
    const response = await fetch(`${BASE_URL}/dataset/${id_data}`);
    return await response.json();
  } catch {
    return { error: 'Failed to fetch dataset.' };
  }
};

// Update dataset by ID
export const updateDataset = async (id_data, updatedData) => {
  try {
    const response = await fetch(`${BASE_URL}/dataset/${id_data}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData), // { text_data, id_label }
    });

    if (!response.ok) {
      throw new Error("Failed to update dataset");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating dataset:", error);
    throw error;
  }
};

// Delete a single dataset
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

// Delete all datasets
export const deleteAllDatasets = async () => {
  try {
    const response = await fetch(`${BASE_URL}/dataset/all`, {
      method: 'DELETE',
    });
    return await response.json();
  } catch {
    return { error: 'Failed to delete all datasets.' };
  }
};
