import React from "react";
import maintenance from "../images/maintenance.png";

const UnderMaintenance = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center bg-color">
        <img
          src={maintenance["src"]}
          alt="maintenanceImage"
          className="w-180 h-180 mx-auto mb-2"
        />
        <div className="text-center font-serif">
          <h2 className="text-3xl font-bold mb-1">Under Maintenance</h2>
          <p className="text-black-500 text-lg">
            We are working on something new. Please check back later.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnderMaintenance;
