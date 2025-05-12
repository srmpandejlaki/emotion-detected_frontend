import React, { useState } from 'react';
import InputText from '../../components/classifier/inputText';
import OutputClassifier from '../../components/classifier/outputText';
import { classifySingleText } from '../../utils/api/validation';

function ClasifierPage() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClassify = async ({ text }) => {
    try {
      setIsLoading(true);
      const response = await classifySingleText(text); // text saja, bukan { text }

      // Tampilkan hasil klasifikasi ke UI
      setResult(response.predicted_emotion);
      setIsLoading(false);
    } catch (error) {
      console.error('Error during classification:', error);
      setResult('Error');
    }
  };

  return (
    <div className='container'>
      <h1>Ayo Cari Tahu</h1>
      <section className='inputText'>
        <InputText classify={handleClassify} />
        <div className='outputContainer'>
          <OutputClassifier result={result} isLoading={isLoading}/>
        </div>
      </section>
    </div>
  );
}

export default ClasifierPage;
