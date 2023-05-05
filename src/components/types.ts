import { Dispatch, SetStateAction, RefObject } from 'react';

export interface Country {
  name: string;
  code: string;
  isocode: string;
  flagURL: string;
}

export interface PhoneNumberSelectorWithFlagsProps { }

export interface CountryListItemProps {
  country: Country;
  key: number;
  countries: Country[];
  setSelectedPhoneCode: Dispatch<SetStateAction<string | undefined>>;
  setSelectedFlag: Dispatch<SetStateAction<Country | undefined>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selectedCountry: Country | null | undefined;
  numberInputerRef: RefObject<HTMLInputElement>;
  listItemRef: any;
}

export interface CountryDropdownProps {
  setSelectedPhoneCode: Dispatch<SetStateAction<string | undefined>>;
  setSelectedFlag: Dispatch<SetStateAction<Country | undefined>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  numberInputerRef: RefObject<HTMLInputElement>;
  searchInputerRef: RefObject<HTMLInputElement>;
  open: boolean;
}