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
  description?: string;
  amenitiesList?: string[];
}
