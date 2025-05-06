export interface FormValues {
  email: string;
  password: string;
  cPassword: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  DOB: string; // ممكن تغيّرها لـ Date لو بتتعامل مع كائن Date
  gender: string;
  address: string;
}

export interface RegisterRole {
  user: string;
  crafter: string;
}
export interface FormConfirmation {
  email: string;
  otp: string;
}
export interface ConfirmFormProps {
  email: string;
}

export interface FormConfirmation {
  email: string;
  otp: string;
}

export interface FormikValues {
  email: string;
  otp: string;
}
export interface CategoryType {
  _id: string;
  name: string;
  image: string;
  secure_url: string;
}
