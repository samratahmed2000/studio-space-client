"use client";

import BookingForm, { BookingFormProps } from "./BookingForm";

export type MyBookingCardProps = BookingFormProps;

const MyBookingCard = ({
  studioDetails,
  onSuccess,
  onCancel,
  className = "",
}: MyBookingCardProps) => {
  return (
    <BookingForm
      studioDetails={studioDetails}
      onSuccess={onSuccess}
      onCancel={onCancel}
      className={className}
    />
  );
};

export { MyBookingCard };
export default MyBookingCard;
