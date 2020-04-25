export interface ICompanyContact {
  contactId: number
  country: string
  city: string
  address?: string
  email?: string
  phone?: string
}
export interface ICompanyCreateRequest extends ICompanyContact {
  name: string
}
export interface ICompanyCreated extends ICompanyCreateRequest {
  companyId: number
}
