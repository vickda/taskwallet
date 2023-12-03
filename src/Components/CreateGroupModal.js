// CreateTodoModal.js
import React, { useState } from "react";
import Modal from "react-modal";

// Modal.setAppElement(".container");

const CreateTodoModal = ({ isOpen, onClose }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [newPerson, setNewPerson] = useState("");

  const onSubmit = () => {
    // Process the form data here
    const formData = {
      groupName,
      selectedPeople,
    };

    console.log(formData);

    // Perform any additional processing here

    // Close the modal
    onClose();
  };

  const handlePeopleChange = (e) => {
    setNewPerson(e.target.value);
  };

  const addPerson = () => {
    if (newPerson.trim() !== "") {
      setSelectedPeople([...selectedPeople, newPerson]);
      setNewPerson("");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border p-6 rounded-md w-96"
      overlayClassName="overlay fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-4">Create Todo Group</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Group Name
          </label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            People
          </label>
          <div className="flex">
            <input
              type="text"
              value={newPerson}
              onChange={handlePeopleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={addPerson}
              className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          {/* Display selected people */}
          <div className="mt-2">
            {selectedPeople.map((person) => (
              <div key={person}>{person}</div>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <button
            onClick={() => onClose()}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Close
          </button>
          <button
            onClick={onSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Create
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateTodoModal;
