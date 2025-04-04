export class UpdateUserDTO {
  fullname: string;
  address: string;
  phone_number: string;
  password: string;
  retype_password: string;
  date_of_birth: Date | null;

  constructor(data: any) {
    this.fullname = data.fullname;
    this.address = data.address;
    this.phone_number = data.phone_number;
    this.password = data.password;
    this.retype_password = data.retype_password;
    this.date_of_birth = data.date_of_birth;
  }
}
