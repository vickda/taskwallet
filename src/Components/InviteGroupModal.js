// InviteGroupModal.js
import React, { useState } from "react";
import Modal from "react-modal";

// Modal.setAppElement(".container");

const getInvites = async (email, setInvitations) => {
  let params = new URLSearchParams({
    email: email,
    type: "Invites",
  });
  await fetch(`${process.env.URL}/api/sharedtodo?${params}`, {
    method: "GET",
    cache: "no-store",
  })
    .then((res) => res.json())
    .then((data) => setInvitations([...data]));
};

const InviteGroupModal = ({ isOpen, onClose, email }) => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [invitations, setInvitations] = useState([]);

  getInvites(email, setInvitations);

  const handleAccept = () => {
    // Handle accepting the invitation for the selected group
    console.log(`Accepted invitation for ${selectedGroup}`);
    // You can add your logic for accepting the invitation here
    // and update the UI accordingly
    onClose();
  };

  const handleDecline = () => {
    // Handle declining the invitation for the selected group
    console.log(`Declined invitation for ${selectedGroup}`);
    // You can add your logic for declining the invitation here
    // and update the UI accordingly
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border p-6 rounded-md w-96"
      overlayClassName="overlay fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-4">Invitations</h2>
        <div className="mb-4">
          {invitations.length === 0 ? (
            <p className="text-gray-700">No invitations available.</p>
          ) : (
            <ul className="space-y-4">
              {invitations.map((group, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer"
                  onClick={() => setSelectedGroup(group)}
                >
                  <span className="text-gray-800">{group}</span>
                  {selectedGroup === group && (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleAccept}
                        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                      >
                        Accept
                      </button>
                      <button
                        onClick={handleDecline}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => onClose()}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default InviteGroupModal;
