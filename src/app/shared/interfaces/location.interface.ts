export interface LocationInterface {
  city: string;
  country: string;
  street: StreetInterface;
}

interface StreetInterface {
  name: string;
  number: number;
}
