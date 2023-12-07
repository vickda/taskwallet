import React from "react";
import emailLogo from "../images/EmailLogo.png";

const TodoInviteEmail = ({
  inviterEmail,
  inviterUsername,
  inviteeEmail,
  link,
}) => {
  const btncontainerstyle = {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
  };

  return (
    <div
      style={{
        background: "#081b2a",
        padding: "2rem",
        borderRadius: "0.375rem",
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        maxWidth: "20rem",
        margin: "auto",
        marginTop: "2.5rem",
        color: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "1.5rem",
        }}
      >
        <img
          src={emailLogo["src"]}
          alt="TaskWallet logo"
          style={{ height: "8rem", width: "8rem", objectFit: "contain" }}
        />
      </div>
      <h2
        style={{
          textAlign: "center",
          fontSize: "1.875rem",
          fontWeight: "bold",
          marginBottom: "1rem",
        }}
      >
        Group Invitation
      </h2>
      <p style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        You have been invited by {inviterUsername} ({inviterEmail}) to join
        their group.
      </p>
      <div style={btncontainerstyle}>
        <a
          href={`${process.env.URL}/api/link/invite?status=accepted&url=${link}&email=${inviteeEmail}`}
          style={{
            background: "#10b981",
            color: "#fff",
            padding: "0.75rem 1.5rem",
            borderRadius: "0.375rem",
            textDecoration: "none", // Add this line
            cursor: "pointer",
            transition: "background 0.3s",
            outline: "none",
            border: "none",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
          }}
        >
          Accept
        </a>
        <a
          href={`${process.env.URL}/api/link/invite?status=rejected&url=${link}&email=${inviteeEmail}`}
          style={{
            background: "#ef4444",
            color: "#fff",
            padding: "0.75rem 1.5rem",
            borderRadius: "0.375rem",
            textDecoration: "none", // Add this line
            cursor: "pointer",
            transition: "background 0.3s",
            outline: "none",
            border: "none",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
          }}
        >
          Reject
        </a>
      </div>
    </div>
  );
};

export default TodoInviteEmail;
