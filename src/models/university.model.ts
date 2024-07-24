export type IUniversity = {
  country: string;
  name: string;
  alpha_two_code: string;
  web_pages: string[];
  domains: string[];
  'state-province': string | null;
};

export type IUniversityQueryObj = {
  name?: string;
  country?: string;
  offset: string;
  limit: string;
};
