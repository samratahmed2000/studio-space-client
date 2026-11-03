export interface Category {
  _id: string;
  title?: string;
  slug?: string;
  description?: string;
  icon?: string;
}

export interface Studio {
  _id: string;
  title?: string;
  category?: Category[] | string;
  hourlyRate?: number;
  securityDeposit?: number;
  maxCapacity?: number;
  location?: string;
  imageUrl?: string;
  imageUrls?: string[];
  description?: string;
  amenitiesList?: string[];
  hostName?: string;
  hostEmail?: string;
  hostImage?: string;
}

export interface Booking {
  _id: string;
  studioId?: string;
  studioTitle?: string;
  studioLocation?: string;
  studioImage?: string;
  bookingDate?: string;
  startTime?: string;
  endTime?: string;
  totalMember?: number;
  totalAmount?: number;
  bookingDuration?: number;
  status?: string;
}
