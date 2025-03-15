const User = {
  async render() {
    return `
      <div>
        <h2>Klasifikasi Emosi</h2>
        <p>Program ini merupakan implementasi algoritma Naive Bayes yang didesain untuk melakukan prediksi emosi berdasarkan kata-kata yang dibaca. Masukkan kata-kata yang ingin diprediksi emosi di kotak yang disediakan.</p>
        <input type="text" id="inputText" placeholder="Masukkan teks...">
        <button onclick="predictEmotion()">Prediksi</button>
        <p id="result"></p>
      </div>
    `;
  }, 

  async afterRender() {
    async function predictEmotion() {
      const text = document.getElementById("inputText").value;
      const response = await fetch("http://localhost:8000/predict/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });
      const data = await response.json();
      document.getElementById("result").innerText = "Prediksi: " + data.prediction;
    }
  }
};

export default User;