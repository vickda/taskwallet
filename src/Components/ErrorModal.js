import { useEffect, useState } from "react";

const ErrorModal = ({ message, color }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed bottom-5 right-5 ${color} text-white p-4 rounded-md transition-opacity ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {message}
    </div>
  );
};

/**
 * bg-red-600
 * bg-blue-500
 */

export default ErrorModal;
