"use client";
import { ICourse } from "@/interfaces";
import { Button, message } from "antd";
import { PlayCircle } from "lucide-react";
import React from "react";
import WatchPromoModal from "./watch-promo-modal";
import { createPaymentIntent } from "@/server-actions/payments";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./checkout-form";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function PurchaseCourse({ course }: { course: ICourse }) {
  const [showWatchPromo, setShowWatchPromo] = React.useState(false);
  const [paymentIntentResponse, setPaymentIntentResponse] =
    React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = React.useState(false);

  const paymentIntentHandler = async () => {
    try {
      setLoading(true);
      const response = await createPaymentIntent(course.price);
      if (response.success) {
        setPaymentIntentResponse(response.data);
        setShowCheckoutForm(true);
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const options = {
    // passing the client secret obtained from the server
    clientSecret: paymentIntentResponse?.client_secret || "",
  };

  return (
    <div className="border rounded-sm border-primary">
      <img
        src={course.coverImage}
        alt="course cover"
        className="w-full h-60 object-cover"
      />
      <div className="p-5 grid grid-cols-2 bg-gray-100 gap-5">
        <Button
          icon={<PlayCircle size={16} />}
          onClick={() => setShowWatchPromo(true)}
        >
          Watch Promo
        </Button>
        <Button type="primary" onClick={paymentIntentHandler} loading={loading}>
          Buy Now $ {course.price}
        </Button>

        <p className="col-span-2 text-sm">
          Once you purchase the course, you will have lifetime access to the
          course and all the updates. You will also get a certificate of
          completion once you finish the course.
        </p>
      </div>

      {showWatchPromo && (
        <WatchPromoModal
          course={course}
          setShowWatchPromo={setShowWatchPromo}
          showWatchPromo={showWatchPromo}
        />
      )}

      {showCheckoutForm && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm
            showCheckoutForm={showCheckoutForm}
            setShowCheckoutForm={setShowCheckoutForm}
            course={course}
          />
        </Elements>
      )}
    </div>
  );
}

export default PurchaseCourse;
