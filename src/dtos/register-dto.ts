export class RegisterDto {
  email: string;
  password: string;
  name: string;
  birthDate: Date;
  address: string;
  phone?: string;

  constructor(
    email: string, 
    password: string,
    name: string,
    birthDate: Date,
    address: string,
    phone?: string
  ) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.birthDate = birthDate;
    this.address = address;
    if (phone) {
      this.phone = phone;
    }
  }
}
