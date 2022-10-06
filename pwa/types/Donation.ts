import { Item } from "./item";

export class Donation implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public payment?: string,
    public donor?: string,
    public installmentsDonations?: string[],
    public donationValue?: number,
    public donation_value?: number
  ) {
    this["@id"] = _id;
  }
}
