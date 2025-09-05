const MiniSpinner = () => {
  return (
    <div
      className="animate-spin"
      style={{
        width: "20px",
        height: "20px",
        border: "4px solid #ffffff",
        borderTop: "4px solid transparent",
        borderRadius: "50%",
      }}
    />
  );
};

export default MiniSpinner;
