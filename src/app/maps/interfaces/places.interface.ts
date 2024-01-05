export interface PlacesResponse {
  type:        string;
  query:       string[];
  features:    Feature[];
  attribution: string;
}

export interface Feature {
  id:            string;
  type:          string;
  place_type:    string[];
  relevance:     number;
  properties:    Properties;
  text_es:       string;
  place_name_es: string;
  text:          string;
  place_name:    string;
  center:        number[];
  geometry:      Geometry;
  address?:      string;
  context:       Context[];
  bbox?:         number[];
  language_es?:  Language;
  language?:     Language;
}

export interface Context {
  id:           string;
  mapbox_id:    string;
  text_es:      string;
  text:         string;
  wikidata?:    Wikidata;
  language_es?: Language;
  language?:    Language;
  short_code?:  string;
}

export enum Language {
  Es = "es",
}

export enum Wikidata {
  Q386991 = "Q386991",
  Q53079 = "Q53079",
  Q96 = "Q96",
}

export interface Geometry {
  type:        string;
  coordinates: number[];
}

export interface Properties {
  accuracy?:   string;
  mapbox_id:   string;
  wikidata?:   Wikidata;
  short_code?: string;
}
