export interface UserProps {
  $id?: string;
  $createdAt?: string;
  $updatedAt?: string;
  name?: string;
  password?: string;
  hash?: string;
  hashOptions?: {
    type?: string;
    memoryCost?: number;
    timeCost?: number;
    threads?: number;
  };
  labels?: string[];
  passwordUpdate?: string;
  phone?: string;
  emailVerification?: boolean;
  phoneVerification?: boolean;
  prefs?: {};
  accessedAt?: string;
  email?: string;
  registration?: string;
  status?: boolean;
}
