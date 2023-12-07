"use client";
import React, { useEffect, useState } from "react";
import CreateGroupModal from "./CreateGroupModal";
import InviteGroupModal from "../Components/InviteGroupModal";
import fetchGroupData from "../libs/fetchGroupData";

// A custom component that renders a card with a title and a join button
const Card = ({ title, id, link }) => {
  // A function that handles the join button click
  const handleJoin = () => {
    // Do something when the user clicks the join button
    console.log(`Joined ${title}`);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 m-2 flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <a
        href={`/sharedtodo/${link}`}
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        // onClick={handleJoin}
      >
        Join
      </a>
    </div>
  );
};

// The main component that renders the buttons and the cards
const DisplayGroups = ({ email }) => {
  const [isCreateGroupModalOpen, setCreateGroupModalOpen] = useState(false);
  const [isInviteGroupModalOpen, setInviteGroupModalOpen] = useState(false);

  const [inviteData, setInviteData] = useState();
  const [groups, setGroups] = useState([
    { title: "Test", id: 1 },
    // { title: "Build a Todo app", id: 2 },
    // { title: "Deploy to Vercel", id: 3 },
  ]);

  const getGroupData = async () => {
    const data = await fetchGroupData(email);
    setGroups(data.groupList);
  };

  const getInviteData = () => {};

  // A function that handles the create group todo button click
  const handleCreate = () => setCreateGroupModalOpen(true);

  // A function that handles the view invitations button click
  const handleView = () => setInviteGroupModalOpen(true);

  useEffect(() => {
    getGroupData();
  }, []);
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
        {groups.map(
          (item, id) =>
            item.title && (
              <Card key={id} title={item.title} id={item.id} link={item.link} />
            )
        )}
      </div>

      {/* Render the Modals */}
      {isCreateGroupModalOpen && (
        <CreateGroupModal
          isOpen={isCreateGroupModalOpen}
          onClose={setCreateGroupModalOpen}
          email={email}
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
