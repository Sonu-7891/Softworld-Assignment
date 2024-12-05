import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "../redux/actions/leadActions";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import "./Dashboard.module.css"

const Dashboard = () => {
  const dispatch = useDispatch();
  const { leads, loading, error } = useSelector((state) => state.leads);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchLeads(`page=${currentPage}`));
  }, [currentPage, dispatch]);

  return (
    <div>
      <h2>Leads Dashboard</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <Table headers={["Name", "Status", "Contact"]} data={leads} />
          <Pagination
            currentPage={currentPage}
            totalPages={5} // Example
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
