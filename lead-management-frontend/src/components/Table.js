import React from "react";
import "./Table.module.css";

const Table = ({ headers, data, actions }) => (
  <table className="table">
    <thead>
      <tr>
        {headers.map((header) => (
          <th key={header}>{header}</th>
        ))}
        {actions && <th>Actions</th>}
      </tr>
    </thead>
    <tbody>
      {data.length > 0 ? (
        data.map((row, index) => (
          <tr key={index}>
            {headers.map((header) => (
              <td key={`${index}-${header}`}>{row[header]}</td>
            ))}
            {actions && (
              <td>
                {actions.map((action, idx) => (
                  <button
                    key={idx}
                    className={action.className}
                    onClick={() => action.onClick(row)}
                  >
                    {action.label}
                  </button>
                ))}
              </td>
            )}
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={headers.length + (actions ? 1 : 0)}>
            No data available
          </td>
        </tr>
      )}
    </tbody>
  </table>
);

export default Table;
