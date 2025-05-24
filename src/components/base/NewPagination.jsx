import React from 'react';

function NewPagination({ currentPage, totalPages, onPageChange }) {
  const goToNextPage = () => onPageChange(currentPage + 1);
  const goToPreviousPage = () => onPageChange(currentPage - 1);
  return (
    <div className='pagination-controls'>
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className='btn-pagination'
      >
        Halaman Pertama
      </button>

      <button onClick={goToPreviousPage} disabled={currentPage === 1} className='btn-pagination'>
        Sebelumnya
      </button>

      <span>
        Halaman {currentPage} dari {totalPages}
      </span>

      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className='btn-pagination'
      >
        Berikutnya
      </button>

      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className='btn-pagination'
      >
        Halaman Terakhir
      </button>
    </div>
  );
}

export default NewPagination;
