export interface Billing {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  address2: string;
  country: string;
  city: string;
  zip: string;
  sameShippingAddress: false;
  cardName: string;
  cardNumber: string;
  cardExpiry: Date;
  cardCvv: string;
}
