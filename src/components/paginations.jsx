import React from 'react';

function PaginationPages({ currentPage, totalPages, setCuerrentPage }) {
  return (
    <div className="pagination">
      <button disabled={currentPage === 1} onClick={() => setCuerrentPage(1)} >kiri</button>
      <span>
        Page <strong>{currentPage}</strong> of <strong>{totalPages !== 0 ? totalPages : 1}</strong>
      </span>
      <button disabled={currentPage === totalPages || currentPage > totalPages} onClick={() => setCuerrentPage(totalPages)} >kanan</button>
    </div>
  );
};

export default PaginationPages;