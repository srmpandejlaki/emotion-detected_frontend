import { BASE_URL } from '../config';

export const fetchPreprocessingData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/preprocessing/list`);
    return await response.json();
  } catch {
    return { error: 'Failed to fetch preprocessing data.' };
  }
};

export const fetchAllPreprocessing = async () => {
  try {
    const response = await fetch(`${BASE_URL}/preprocessing/list`);
    return await response.json();
  } catch {
    return { error: 'Failed to fetch preprocessing data.' };
  }
};

export const runPreprocessing = async () => {
  try {
    const response = await fetch(`${BASE_URL}/preprocessing/process`, {
      method: 'POST'
    });
    return await response.json();
  } catch {
    return { error: 'Failed to run preprocessing.' };
  }
};

export const updatePreprocessingEmotion = async (id, newEmotion) => {
  try {
    const response = await fetch(`${BASE_URL}/preprocessing/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ emotion: newEmotion }),
    });
    return await response.json();
  } catch {
    return { error: 'Failed to update emotion.' };
  }
};

export const deletePreprocessingData = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/preprocessing/${id}`, {
      method: 'DELETE',
    });
    return await response.json();
  } catch {
    return { error: 'Failed to delete preprocessing data.' };
  }
};
