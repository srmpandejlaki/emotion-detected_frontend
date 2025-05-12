import { BASE_URL } from '../index';

export const classifySingleText = async (text) => {
  try {
    const response = await fetch(`${BASE_URL}/validation/classify-single`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail);
    }

    const data = await response.json();
    return data; // { text, predicted_emotion }
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
}

export const processValidationDataset = async (texts) => {
  try {
    const response = await fetch(`${BASE_URL}/validation/classify-batch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texts })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail);
    }

    const data = await response.json();
    return data; // Array of { text, predicted_emotion }
  } catch (error) {
    console.error('Error:', error.message);
    return [];
  }
}

export const saveValidationData = async (dataArray) => {
  try {
    const response = await fetch(`${BASE_URL}/validation/save-correctness`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataArray)
    });

    const data = await response.json();
    return data.message; // "Validation data saved successfully."
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
}

export const evaluateValidation = async (payload) => {
  try {
    const response = await fetch(`${BASE_URL}/validation/save-result`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    return data; // Sesuai ValidationResultResponse
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
}

export const fetchTestingData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/validation/testing`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail);
    }

    const data = await response.json();
    return data; // Array of ValidationDataSchema: { text, predicted_emotion, actual_emotion, ... }
  } catch (error) {
    console.error('Error:', error.message);
    return [];
  }
}
