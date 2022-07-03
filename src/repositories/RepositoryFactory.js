import UsersRepository from '@/repositories/UsersRepository';
import CompanyRepository from '@/repositories/CompanyRepository';
import BannerRepository from '@/repositories/BannerRepository';
import PartnerRepository from '@/repositories/PartnerRepository';

export const USERS = 'users';
export const COMPANY = 'company';
export const BANNERS = 'banners';
export const PARTNERS = 'partners';

const repositories = {
  [USERS]: UsersRepository,
  [COMPANY]: CompanyRepository,
  [BANNERS]: BannerRepository,
  [PARTNERS]: PartnerRepository,
};

export default {
  get: name => repositories[name],
};
