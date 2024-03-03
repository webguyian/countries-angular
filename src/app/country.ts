export interface Country {
  capital: string[];
  cca3: string;
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
