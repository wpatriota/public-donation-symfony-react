import { Item } from "./item";

export class InstallmentsDonation implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public payment?: string,
    public status?: string,
    public donation?: string,
    public amountPaid?: number,
    public amount_paid?: number
  ) {
    this["@id"] = _id;
  }
}
