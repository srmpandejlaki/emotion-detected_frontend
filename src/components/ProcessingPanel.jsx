import React, { useState, useEffect } from 'react';
import { processingService } from '../utils/api';

const ProcessingPanel = ({ dataId }) => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preprocessedText, setPreprocessedText] = useState('');
  const [emotion, setEmotion] = useState('');
  const [isPreprocessing, setIsPreprocessing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (dataId) {
      fetchStatus();
    } else {
      resetState();
    }
  }, [dataId]);

  const resetState = () => {
    setStatus(null);
    setLoading(false);
    setError(null);
    setPreprocessedText('');
    setEmotion('');
    setIsPreprocessing(false);
    setIsProcessing(false);
  };

  const fetchStatus = async () => {
    try {
      setLoading(true);
      const response = await processingService.getProcessingStatus(dataId);
      setStatus(response.status);
      if (response.status === 'completed') {
        setEmotion(response.emotion);
      }
      setError(null);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch processing status');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePreprocess = async () => {
    try {
      setIsPreprocessing(true);
      setError(null);
      const response = await processingService.preprocessData(dataId);
      setPreprocessedText(response.preprocessed_text);
      setStatus('preprocessed');
      await fetchStatus(); // Refresh status
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to preprocess data');
      console.error(err);
    } finally {
      setIsPreprocessing(false);
    }
  };

  const handleProcess = async () => {
    try {
      setIsProcessing(true);
      setError(null);
      const response = await processingService.processData(dataId);
      setEmotion(response.emotion);
      setStatus('completed');
      await fetchStatus(); // Refresh status
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to process data');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!dataId) {
    return (
      <div className="processing-panel">
        <h2>Data Processing</h2>
        <div className="no-selection">
          <p>Please select a data entry from the Data Collection page to process</p>
        </div>
      </div>
    );
  }

  return (
    <div className="processing-panel">
      <h2>Data Processing</h2>
      <div className="status">
        <h3>Status: {status || 'not_started'}</h3>
        {error && <div className="error">{error}</div>}
      </div>

      <div className="actions">
        {status === 'not_started' && (
          <button 
            onClick={handlePreprocess} 
            disabled={isPreprocessing || loading}
          >
            {isPreprocessing ? 'Preprocessing...' : 'Start Preprocessing'}
          </button>
        )}
        {status === 'preprocessed' && (
          <button 
            onClick={handleProcess} 
            disabled={isProcessing || loading}
          >
            {isProcessing ? 'Processing...' : 'Start Processing'}
          </button>
        )}
      </div>

      {preprocessedText && (
        <div className="preprocessed-text">
          <h3>Preprocessed Text:</h3>
          <p>{preprocessedText}</p>
        </div>
      )}

      {emotion && (
        <div className="emotion-result">
          <h3>Detected Emotion:</h3>
          <p>{emotion}</p>
        </div>
      )}

      <div className="refresh-button">
        <button 
          onClick={fetchStatus} 
          disabled={loading}
        >
          {loading ? 'Refreshing...' : 'Refresh Status'}
        </button>
      </div>
    </div>
  );
};

export default ProcessingPanel; 