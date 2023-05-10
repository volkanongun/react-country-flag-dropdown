import React from 'react'
import { Country, CountryListItemProps } from './types'
import './PhoneNumberSelectorWithFlags.css'
import Flag from './flags'

const CountryListItem: React.FC<CountryListItemProps> = ({
  country,
  setSelectedPhoneCode,
  setSelectedFlag,
  setOpen,
  selectedCountry,
  numberInputerRef,
  listItemRef,
}) => {
  const handleDropdownItemClick = (flag: Country) => {
    const codes = flag.code.split(',')

    setSelectedPhoneCode(codes[0])
    setSelectedFlag(flag)
    setOpen(false)
    numberInputerRef.current?.focus()
  }

  const handleKeydown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <li className={selectedCountry?.name === country.name ? `active currentItem` : ''} ref={listItemRef}>
      <button onClick={() => handleDropdownItemClick(country)} onKeyDown={handleKeydown}>
        <span>
          {/* <img src={country.flagURL} width={18} height={12} alt={country.name + ' flag'} /> */}
          <Flag flag={country.isocode} />
        </span>
        <span>{country.name}</span>
        <span aria-label={`Country Phone Code ${country.code}`}>
          {country.code.split(',').length > 1 ? (
            country.code.split(',').map((code: string, i: number) => <cite key={i}>{code}</cite>)
          ) : (
            <cite>{country.code}</cite>
          )}
        </span>
      </button>
    </li>
  )
}

export default CountryListItem
