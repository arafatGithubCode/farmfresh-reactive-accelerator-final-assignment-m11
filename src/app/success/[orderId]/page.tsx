const SuccessPage = ({
  params: { orderId },
}: {
  params: { orderId: string };
}) => {
  return (
    <div>
      <h1>welcome to {orderId}</h1>
    </div>
  );
};

export default SuccessPage;
