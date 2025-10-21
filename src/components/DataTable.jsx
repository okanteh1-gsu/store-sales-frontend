import React from "react";

const DataTable = ({ data }) => {
  return (
    <div className="card">
      <h2 className="card-title">Sales Data</h2>
      <div className="data-table">
        <div className="table-header">
          <span>Date</span>
          <span>Total Sales</span>
          <span>Gas Sold</span>
          <span>Lotto Sales</span>
          <span>Day Type</span>
        </div>
        {data.map((item, index) => (
          <div key={index} className="table-row">
            <span>{item.name}</span>
            <span>${item.TotalSales}</span>
            <span>{item.GasSold} gal</span>
            <span>${item.Lotto}</span>
            <span>{item.DayType}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataTable;
