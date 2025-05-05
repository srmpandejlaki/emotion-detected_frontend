import { BASE_URL } from '../index';

export const splitDataset = async (rawDatasetId, preprocessedDatasetId, splitSize) => {
  try {
    const response = await fetch(`${BASE_URL}/process/split/${preprocessedDatasetId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ raw_dataset_id: rawDatasetId, test_size: splitSize }),
    });
    return await response.json();
  } catch {
    return { error: 'Failed to split dataset.' };
  }
};

export const trainModel = async (rawDatasetId, preprocessedDatasetId, name, splitSize, n_neighbors) => {
  try {
    const response = await fetch(`${BASE_URL}/process/train/${preprocessedDatasetId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ raw_dataset_id: rawDatasetId, name, test_size: splitSize, n_neighbors }),
    });
    return await response.json();
  } catch {
    return { error: 'Failed to train model.' };
  }
};

export async function fetchProcessingData() {
  try {
    const res = await fetch('/api/processing-data');
    const data = await res.json();

    return {
      success: true,
      data: {
        newDataCount: data.newDataCount,
        oldDataCount: data.oldDataCount,
        totalDataCount: data.totalDataCount,
        dataset: data.dataset
      }
    };
  } catch (error) {
    console.error("Gagal mengambil data:", error);
    return { success: false, error };
  }
}

export async function processData(trainRatio, testRatio) {
  try {
    const response = await fetch('/api/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ trainRatio, testRatio })
    });

    const result = await response.json();

    if (response.ok) {
      return { success: true, result };
    } else {
      return { success: false, message: result.message };
    }
  } catch (error) {
    console.error("Error saat proses:", error);
    return { success: false, error };
  }
}
