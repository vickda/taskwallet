// CreateTodoModal.js
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import ErrorModal from "./ErrorModal";
import generateLink from "../libs/generateLink";

// Modal.setAppElement(".container");

const isUserExist = async (email) => {
  return await fetch(`/api/user/${email}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => data["userdata"]);
};

const CreateTodoModal = ({ isOpen, onClose, email }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [newPerson, setNewPerson] = useState("");
  const [error, setError] = useState(null);
  const [color, setColor] = useState(null);
  const blueclr = "bg-blue-500";
  const redclr = "bg-red-600";

  const handlePeopleChange = (e) => {
    setNewPerson(e.target.value);
  };

  // Add & REMOVE PERSON
  const addPerson = async () => {
    if (newPerson.trim() !== "") {
      const isUser = await isUserExist(newPerson.trim());

      if (isUser) {
        setSelectedPeople([...selectedPeople, newPerson]);
        setError("User Added");
        setColor(blueclr);
      } else {
        setColor(redclr);
        setError("Oops No User Found");
      }
      console.log(selectedPeople);
      setNewPerson("");
    }
  };

  const removePerson = (index) => {
    const updatedPeople = [...selectedPeople];
    updatedPeople.splice(index, 1);
    setSelectedPeople(updatedPeople);
  };

  const onSubmit = async () => {
    // Process the form data here
    const formData = {
      groupName,
      selectedPeople,
    };

    console.log(formData);

    if (!formData["groupName"] || !formData["selectedPeople"].length) {
      setError("Please Enter Data");
      setColor(redclr);
    } else {
      // Generate User List to add
      const userlist = [{ email: email, status: true }];
      selectedPeople.forEach((val) =>
        userlist.push({ email: val, status: false })
      );

      // Fetch Call Body
      const body = {
        title: groupName,
        link: generateLink(20),
        users: userlist,
        todos: [],
      };
      try {
        await fetch(`/api/link`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(body),
        });
      } catch (error) {
        console.log("Cannot add todo in db", error);
      }
      onClose();
    }

    // Perform any additional processing here

    // Close the modal
  };

  // Use Effect to Remove Error Modal
  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null); // Clear the error after 3 seconds
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

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
            People (Enter Email)
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
          <div className="mt-2 flex flex-wrap">
            {selectedPeople.map((person, index) => (
              <div key={person} className="flex items-center">
                <div className="bg-blue-500 text-white px-3 py-1 rounded-full m-1">
                  {person}
                </div>
                <button
                  onClick={() => removePerson(index)}
                  className="ml-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
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
      {error && <ErrorModal message={error} color={color} />}
    </Modal>
  );
};

export default CreateTodoModal;
