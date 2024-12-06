import React from "react";
import "./Table.module.css"

const Table = ({ headers, data, actions }) => {
  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
          {actions && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data && data.length ? (
          data.map((item) => (
            <tr key={item._id}>
              {headers.map((header) => (
                <td key={`${item._id}-${header}`}>{item[header]}</td>
              ))}
              {actions && (
                <td>
                  {actions.map((action, index) => (
                    <button key={index} onClick={() => action.onClick(item)}>
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
};

export default Table;
