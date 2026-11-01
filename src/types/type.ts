export interface Category {
  _id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
}

export interface Studio {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  location: string;
  imageUrl: string;
  amenitiesList: string[];
}
