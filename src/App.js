import { useState } from "react";
import "./App.css";
import { Table } from "./components/Table";
import { Modal } from "./components/Modal";

function App() {

  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([
    { page: "Page 1", description: "This is an example", status: "live" },
  ]);

const [rowToEdit, setRowToEdit] = useState(null)

const handleEditRow = (idx) => {
  setRowToEdit(idx)

  setModalOpen(true)
}

  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null ? 
    setRows([...rows, newRow]) :
    setRows(rows.map((currRow, idx) => {
      if (idx !== rowToEdit) return currRow

      return newRow
    }))
  }
  return (
  
    <div className="App">
        <div className="title"><p>To-Do App</p></div>
      <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow}/>
      <button className="btn" onClick={() => setModalOpen(true)}>
        Add
      </button>
      {modalOpen && <Modal closeModal={() => {setModalOpen(false); setRowToEdit(null);}} onSubmit={handleSubmit} defaultValue={rowToEdit !== null && rows[rowToEdit]}/>}
    </div>
  );
}

export default App;
