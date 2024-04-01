import React from 'react';
import s from './styles.module.css';

export const Table = ({ columns, data }) => {
  return (
    <div className={s.tableContainer}>
      <table className={s.membersTable}>
        <thead className={s.tHead}>
          <tr className={s.initRow}>
            {columns.map((column, index) => (
              <th key={index} style={{width: column.width}} className={s.columnName}>
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={s.memberRow}>
              {columns.map((column, colIndex) => (
                <td key={colIndex} className={s.memberData}>
                  {item[column.dataIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
