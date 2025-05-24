import React from 'react';
import NewPagination from '../base/NewPagination';

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
            <td colSpan='4' className='align'>
              Tidak ada data tersedia.
            </td>
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
              <td className='align'>
                {(pagination.currentPage - 1) * pagination.itemsPerPage + index + 1}
              </td>
              <td className='text'>{item.preprocessed_text}</td>
              <td className='emotion'>{item.emotion}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {pagination.totalPages > 1 && (
        <NewPagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
}

export default TabelProcessing;
