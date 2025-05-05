export async function fetchTestingData() {
  try {
    const res = await fetch('/api/validation/testing-data');
    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error("Gagal mengambil data testing:", error);
    return { success: false, error };
  }
}

export async function processValidation() {
  try {
    const res = await fetch('/api/validation/process', { method: 'POST' });
    const data = await res.json();
    if (res.ok) {
      return { success: true, data };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error("Gagal memproses data testing:", error);
    return { success: false, error };
  }
}

// Ambil semua data uji untuk validasi
export async function fetchValidationData() {
  try {
    const res = await fetch('/api/validation/data');
    const data = await res.json();

    return { success: true, data };
  } catch (error) {
    console.error("Gagal mengambil data validasi:", error);
    return { success: false, error };
  }
}

// Kirim data manual atau CSV untuk validasi
export async function submitValidationData(payload) {
  try {
    const res = await fetch('/api/validation/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await res.json();

    if (res.ok) {
      return { success: true, data: result };
    } else {
      return { success: false, message: result.message };
    }
  } catch (error) {
    console.error("Gagal mengirim data validasi:", error);
    return { success: false, error };
  }
}

// Ambil confusion matrix
export async function fetchConfusionMatrix() {
  try {
    const res = await fetch('/api/validation/confusion-matrix');
    const data = await res.json();

    return { success: true, data };
  } catch (error) {
    console.error("Gagal mengambil confusion matrix:", error);
    return { success: false, error };
  }
}

// Ambil evaluasi: akurasi, precision, recall
export async function fetchEvaluationMetrics() {
  try {
    const res = await fetch('/api/validation/metrics');
    const data = await res.json();

    return { success: true, data };
  } catch (error) {
    console.error("Gagal mengambil metrik evaluasi:", error);
    return { success: false, error };
  }
}
