import { Item } from "./item";

export class Donor implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public name?: string,
    public email?: string,
    public status?: string,
    public donations?: string[],
    public donationValue?: number,
    public donation_value?: number
  ) {
    this["@id"] = _id;
  }
}
