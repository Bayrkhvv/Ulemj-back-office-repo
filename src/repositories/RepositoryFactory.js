import UsersRepository from '@/repositories/UsersRepository';
import CompanyRepository from '@/repositories/CompanyRepository';
import BannerRepository from '@/repositories/BannerRepository';
import PartnerRepository from '@/repositories/PartnerRepository';
import ServiceRepository from '@/repositories/ServiceRepository';

export const USERS = 'users';
export const COMPANY = 'company';
export const BANNERS = 'banners';
export const PARTNERS = 'partners';
export const SERVICES = 'services';

const repositories = {
  [USERS]: UsersRepository,
  [COMPANY]: CompanyRepository,
  [BANNERS]: BannerRepository,
  [PARTNERS]: PartnerRepository,
  [SERVICES]: ServiceRepository,
};

export default {
  get: name => repositories[name],
};
