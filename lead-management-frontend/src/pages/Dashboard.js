import React, { useEffect, useState } from "react";
import { fetchLeads } from "../api/leadsApi";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import "./Dashboard.module.css";

const Dashboard = () => {
  const [leads, setLeads] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadLeads = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await fetchLeads(`page=${currentPage}&limit=10`);
        setLeads(data.leads || []);
        setTotalPages(data.pagination?.totalPages || 1);
      } catch (err) {
        setError("Failed to fetch leads.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadLeads();
  }, [currentPage]);

  const handleEdit = (lead) => {
    navigate(`/leads/edit/${lead._id}`);
  };

  const handleCreate = () => {
    navigate("/leads/new");
  };

  return (
    <div>
      <h2>Leads Dashboard</h2>
      <button onClick={handleCreate}>Create Lead</button>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <Table
            headers={["leadName", "email", "status"]}
            data={leads}
            actions={[
              {
                label: "Edit",
                onClick: handleEdit,
              },
            ]}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
