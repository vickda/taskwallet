"use client";
import React, { useState } from "react";
import CreateGroupModal from "./CreateGroupModal";
import InviteGroupModal from "../Components/InviteGroupModal";

// A dummy array of data for demonstration purposes
const data = [
  { title: "Learn Next.js", id: 1 },
  { title: "Build a Todo app", id: 2 },
  { title: "Deploy to Vercel", id: 3 },
];

// A custom component that renders a card with a title and a join button
const Card = ({ title, id }) => {
  // A function that handles the join button click
  const handleJoin = () => {
    // Do something when the user clicks the join button
    console.log(`Joined ${title}`);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 m-2">
      <h3 className="text-lg font-semibold">{title}</h3>
      <button
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-2"
        onClick={handleJoin}
      >
        Join
      </button>
    </div>
  );
};

// The main component that renders the buttons and the cards
const DisplayGroups = ({ email }) => {
  const [isCreateGroupModalOpen, setCreateGroupModalOpen] = useState(false);
  const [isInviteGroupModalOpen, setInviteGroupModalOpen] = useState(false);

  const [inviteData, setInviteData] = useState();
  const [groups, setGroups] = useState();

  const getGroupData = () => {};

  const getInviteData = () => {};

  // A function that handles the create group todo button click
  const handleCreate = () => setCreateGroupModalOpen(true);

  // A function that handles the view invitations button click
  const handleView = () => setInviteGroupModalOpen(true);

  return (
    <div className="container mx-auto">
      <div className="flex justify-center">
        <button
          className="bg-purple-100 hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded m-4"
          onClick={(e) => handleCreate(e)}
        >
          Create Group Todo
        </button>
        <button
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded m-4"
          onClick={handleView}
        >
          View Invitations
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.map((item) => (
          <Card key={item.id} title={item.title} id={item.id} />
        ))}
      </div>

      {/* Render the Modals */}
      {isCreateGroupModalOpen && (
        <CreateGroupModal
          isOpen={isCreateGroupModalOpen}
          onClose={setCreateGroupModalOpen}
        />
      )}

      {isInviteGroupModalOpen && (
        <InviteGroupModal
          isOpen={isInviteGroupModalOpen}
          onClose={setInviteGroupModalOpen}
          email={email}
        />
      )}
    </div>
  );
};

export default DisplayGroups;
