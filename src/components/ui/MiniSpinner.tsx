const MiniSpinner = () => {
  return (
    <div
      style={{
        width: "20px",
        height: "20px",
        border: "4px solid #ffffff",
        borderTop: "4px solid transparent",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }}
    />
  );
};

export default MiniSpinner;
