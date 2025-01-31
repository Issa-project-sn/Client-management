export interface CompanyProfile {
  name: string;
  address: string;
  email: string;
  phone: string;
  industry?: string;
}

export interface UserProfile {
  email: string;
  company: CompanyProfile;
  createdAt: Date;
}