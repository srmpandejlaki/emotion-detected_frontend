const showFormattedDate = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('id-ID', options);
};

const mapLabelResult = (result) => {
  const mapping = {
    1: 'Joy',
    2: 'Trust',
    3: 'Shock',
    4: 'Netral',
    5: 'Fear',
    6: 'Sadness',
    7: 'Anger',
    joy: 'Joy',
    trust: 'Trust',
    shock: 'Shock',
    netral: 'Netral',
    fear: 'Fear',
    sadness: 'Sadness',
    anger: 'Anger'
  };
  return mapping[result] || result;
};

const BASE_URL = 'http://127.0.0.1:8000';

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function putAccessToken(accessToken) {
  return localStorage.setItem('accessToken', accessToken);
}

async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

export {
  showFormattedDate,
  mapLabelResult,
  BASE_URL,
  getAccessToken,
  putAccessToken,
  fetchWithToken
};