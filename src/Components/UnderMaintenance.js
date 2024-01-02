import React from "react";
import maintenance from "../images/maintenance.png";

const UnderMaintenance = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <img
          src={maintenance["src"]}
          alt="maintenanceImage"
          className="w-180 h-180 mx-auto mb-2"
        />
        <h2 className="text-xl font-bold mb-2">Under Maintenance</h2>
        <p className="text-gray-600">
          We're working on something new. Please check back later.
        </p>
      </div>
    </div>
  );
};

export default UnderMaintenance;
