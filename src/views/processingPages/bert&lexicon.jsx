import React from 'react';

const dummyData = [
  {
    text: "Saya sangat senang dengan pekerjaan saya hari ini!",
    predictedEmotions: ["Happy", "Excited"],
    finalEmotion: "Happy",
    bertWeight: 0.75,
    lexiconWeight: 0.25,
  },
  {
    text: "Ini adalah hari yang buruk, saya merasa sangat cemas.",
    predictedEmotions: ["Sad", "Anxious"],
    finalEmotion: "Anxious",
    bertWeight: 0.65,
    lexiconWeight: 0.35,
  },
  {
    text: "Saya tidak tahu apa yang harus dilakukan, saya bingung.",
    predictedEmotions: ["Confused", "Anxious"],
    finalEmotion: "Confused",
    bertWeight: 0.6,
    lexiconWeight: 0.4,
  },
];

function BertLexiconPage() {
  return (
    <div className="bert-lexicon-page">
      <h1>Metode Tambahan - BERT & Lexicon</h1>

      <section className="description">
        <p>
          Metode ini digunakan *khusus* jika hasil klasifikasi dari Naive Bayes menghasilkan dua emosi dengan bobot probabilitas yang sama.
          Dalam kasus ini, sistem secara otomatis akan melanjutkan proses analisis menggunakan gabungan metode BERT (Bidirectional Encoder Representations from Transformers) dan pendekatan Lexicon-Based untuk menentukan emosi akhir secara lebih akurat.
        </p>
      </section>

      <section className="process-flow">
        <h2>Alur Proses</h2>
        <ol>
          <li>Identifikasi hasil prediksi Naive Bayes dengan dua emosi bernilai probabilitas sama.</li>
          <li>Ambil kalimat terkait untuk dianalisis menggunakan model BERT.</li>
          <li>Ekstraksi fitur konteks emosional dari BERT.</li>
          <li>Periksa kata-kata penting menggunakan kamus leksikon emosi.</li>
          <li>Gabungkan hasil BERT dan Lexicon untuk menentukan satu emosi akhir.</li>
        </ol>
      </section>

      <section className="output-info">
        <h2>Contoh Data</h2>
        <table>
          <thead>
            <tr>
              <th>Teks</th>
              <th>Emosi Prediksi (Naive Bayes)</th>
              <th>Emosi Akhir (BERT + Lexicon)</th>
              <th>Bobot BERT</th>
              <th>Bobot Lexicon</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((data, index) => (
              <tr key={index}>
                <td>{data.text}</td>
                <td>{data.predictedEmotions.join(", ")}</td>
                <td>{data.finalEmotion}</td>
                <td>{data.bertWeight}</td>
                <td>{data.lexiconWeight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="note">
        <h2>Catatan</h2>
        <p>
          Proses ini hanya berjalan pada data uji yang memiliki hasil prediksi ambigu. Data yang telah diproses dengan metode gabungan ini akan ditambahkan ke data latih sebagai data pembelajaran lanjutan.
        </p>
      </section>
    </div>
  );
}

export default BertLexiconPage;
