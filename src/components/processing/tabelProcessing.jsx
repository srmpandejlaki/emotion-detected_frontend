import React from 'react';

function TabelProcessing({
  data = [],
  pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 1,
  },
  onPageChange = () => {},
}) {
  const hasData = data && data.length > 0;
  if (!hasData) {
    return (
      <table className='dataset'>
        <thead>
          <tr>
            <th className='nomor'>No.</th>
            <th className='text3'>Hasil Pemrosesan</th>
            <th className='emotion2'>Emosi Manual</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan='4'>Tidak ada data tersedia.</td>
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <>
      <table className='dataset'>
        <thead>
          <tr>
            <th className='nomor'>No.</th>
            <th className='text3'>Hasil Pemrosesan</th>
            <th className='emotion'>Emosi Manual</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={index}>
              <td>{(pagination.currentPage - 1) * pagination.itemsPerPage + index + 1}</td>
              <td>{item.preprocessed_text}</td>
              <td>{item.emotion}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {pagination.totalPages > 1 && (
        <div className='pagination-controls'>
          <button
            onClick={() => onPageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className='btn-pagination'
          >
            &laquo; Previous
          </button>
          <span className='page-info'>
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button
            onClick={() => onPageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
            className='btn-pagination'
          >
            Next &raquo;
          </button>
        </div>
      )}
    </>
  );
}

export default TabelProcessing;
