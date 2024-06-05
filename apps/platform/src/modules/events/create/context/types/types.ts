export type SectionStatus = "incomplete" | "complete";

export type EventDetails = {
  name?: string;
  description?: string;
  location?: string;
  date?: string;
  time?: string;
  coverImageUrl?: string;
  status: SectionStatus;
};

export type DateAndTime = {
  startDate?: Date;
  endDate?: Date;
  shouldDisplayStartDate?: boolean;
  shouldDisplayEndDate?: boolean;
  startTime?: string;
  endTime?: string;
  status: SectionStatus;
  timezone?: string;
};

export type LocationDetails = {
  venue?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  onlineLocationLink?: string;
  status: SectionStatus;
};

export type AdditionalInformation = {
  requiresApproval: boolean;
  description?: string;
  tags?: {
    id: string;
    label: string;
  }[];
  status: SectionStatus;
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

export type Tickets = {
  type: "free" | "paid";
  price: number | null;
  status: SectionStatus;
};

export type EventBuilderStage =
  | "details"
  | "date"
  | "location"
  | "additional-information"
  | "tickets"
  | "confirmation";
