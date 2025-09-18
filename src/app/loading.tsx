const loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-24 h-24">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
          <linearGradient id="a11">
            <stop offset="0" stopColor="#22C55E" stop-opacity="0"></stop>
            <stop offset="1" stopColor="#22C55E"></stop>
          </linearGradient>
          <circle
            fill="none"
            stroke="url(#a11)"
            strokeWidth="20"
            strokeLinecap="round"
            strokeDasharray="0 44 0 44 0 44 0 44 0 360"
            cx="100"
            cy="100"
            r="70"
            transformOrigin="center"
          >
            <animateTransform
              type="rotate"
              attributeName="transform"
              calcMode="discrete"
              dur="2"
              values="360;324;288;252;216;180;144;108;72;36"
              repeatCount="indefinite"
            ></animateTransform>
          </circle>
        </svg>
      </div>
    </div>
  );
};

export default loading;
