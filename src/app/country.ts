export interface Country {
  borders?: string[];
  capital: string[];
  cca3: string;
  currencies: {
    [key: string]: Currency;
  };
  flags: {
    alt: string;
    png: URL;
    svg: URL;
  };
  name: {
    common: string;
    official: string;
  };
  population: number;
  region: string;
}

export interface Currency {
  name: string;
  symbol: string;
}

export interface BorderCountries {
  [country: string]: string;
}
