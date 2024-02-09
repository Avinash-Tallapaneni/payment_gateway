import Paypal from "./Paypal/Paypal";
import PhonePe from "./PhonePe/PhonePe";

const PaymentMethods = ({ totalPrice }) => {
  return (
    <div className="flex flex-1 items-start justify-center h-screen">
      <div className="mt-10 grid grid-cols-2 gap-4">
        <PhonePe totalPrice={totalPrice} />
        <Paypal />
      </div>
    </div>
  );
};

export default PaymentMethods;
