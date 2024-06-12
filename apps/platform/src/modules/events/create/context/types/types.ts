export type EventDetails = {
  name?: string;
  description?: string;
  location?: string;
  date?: string;
  time?: string;
  image?: File;
};

export type DateAndTime = {
  startDate?: Date;
  endDate?: Date;
  shouldDisplayStartDate?: boolean;
  shouldDisplayEndDate?: boolean;
  startTime?: string;
  endTime?: string;
  timezone?: string;
};

export type LocationDetails = {
  name?: string;
  formattedAddress?: string;
  placeId?: string;
  coordinates?: {
    lat: string;
    lng: string;
  };
};

export type AdditionalInformation = {
  requiresApproval: boolean;
  description?: string;
  tags?: {
    id: string;
    label: string;
  }[];
  capacity?: number;
  visibility: "public" | "private";
};

export type PaidTicketGroup = {
  id: string;
  name: string;
  description?: string;
  price: number;
  availableQuantity: number;
  salesStart: Date;
  salesEnd: Date;
};

export type FreeTicketGroup = {
  id: string;
  name: string;
  description?: string;
  availableQuantity: number;
  availableFrom: Date;
  availableTo: Date;
};

export type TicketType = {
  id: string;
  name?: string;
  description?: string;
  requiresApproval: boolean;
  price: number | null;
  ticketCapacity: number | null;
  salesStart?: Date;
  startTime?: string;
  salesEnd?: Date;
  endTime?: string;
  lastUpdated: Date;
};

export type Tickets = {
  ticketTypes: Array<TicketType>;
};

export type CreateEventErrors = Record<
  "event-details" | "date-and-time" | "location" | "additional-information" | "ticketing",
  string | null
>;
