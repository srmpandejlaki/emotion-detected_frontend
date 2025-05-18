import { BASE_URL } from '../index';

// Get paginated list of datasets
export const fetchDatasets = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(`${BASE_URL}/dataset?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch datasets');
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch datasets error:", error);
    throw error;
  }
};

// Upload dataset (CSV file)
export const uploadDataset = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${BASE_URL}/dataset/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload dataset");
    }

    return await response.json();
  } catch (error) {
    console.error("Error uploading dataset:", error);
    throw error;
  }
};

// Add data to dataset
export const addDatasetData = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/dataset/data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to add data to dataset");
    }

    return await response.json();
  } catch (error) {
    console.error("Add data error:", error);
    throw error;
  }
};

// Delete data from dataset
export const deleteDatasetData = async (dataIds) => {
  try {
    const response = await fetch(`${BASE_URL}/dataset/data`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids: dataIds }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete data");
    }

    return await response.json();
  } catch (error) {
    console.error("Delete data error:", error);
    throw error;
  }
};