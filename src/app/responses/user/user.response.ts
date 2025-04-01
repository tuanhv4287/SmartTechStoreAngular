import { Role } from '../../models/role';

export interface UserResponse {
  id: number;
  fullname: string;
  phone_number: string;
  address: string;
  password: string;
  is_active: boolean;
  date_of_birth: Date;
  facebook_account_id: number;
  google_account_id: number;
  role: Role;
  email: String;
}
