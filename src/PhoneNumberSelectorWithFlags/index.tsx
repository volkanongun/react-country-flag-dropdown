import React, { useEffect, useState, useRef } from 'react'
import ClickAwayListener from 'react-click-away-listener'
import countryList from './data/flags.json'
import CountryDropdown from './CountryDropdown'
import { Country } from './types'
import './PhoneNumberSelectorWithFlags.css'
import Flag from './flags'

const PhoneNumberSelectorWithFlags: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [selectedFlag, setSelectedFlag] = useState<Country>()
  const [selectedPhoneCode, setSelectedPhoneCode] = useState<string | undefined>('')

  const numberInputerRef = useRef<HTMLInputElement>(null)
  const searchInputerRef = useRef<HTMLInputElement>(null)

  const handleClickAway = () => {
    setOpen(false)
  }

  const handleFocus = () => {
    if (selectedPhoneCode !== undefined && selectedPhoneCode.length > 0) return
    if (open) return

    setOpen((prevState) => !prevState)
  }

  const handleClick = () => {
    searchInputerRef.current?.focus()
    if (open) return
    setOpen((prevState) => !prevState)
  }

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numberPattern = /[^\d]/
    let sanitized = e.target.value

    sanitized = sanitized.replace(numberPattern, '')

    setPhoneNumber(sanitized)
  }

  useEffect(() => {
    setSelectedFlag(countryList.find((country: Country) => country.name === 'Bermuda'))
    setSelectedPhoneCode(countryList.find((country: Country) => country.name === 'Bermuda')?.code)
  }, [])

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className='dropdownComponentWrapper'>
        <div className='selectedFlagHolder'>
          <button onClick={handleClick} aria-label={selectedFlag?.name + ' flag'}>
            {selectedFlag ? <Flag flag={selectedFlag?.isocode} /> : null}
          </button>
          <span className='selectedPhoneCode'>{selectedPhoneCode}</span>
          <input
            type='text'
            onFocus={handleFocus}
            value={phoneNumber}
            aria-label='Country Phone Number'
            onChange={handlePhoneNumberChange}
            maxLength={20}
            ref={numberInputerRef}
            placeholder='Phone Number'
          />
        </div>

        <div className='dropdownWrapper'>
          {open ? (
            <CountryDropdown
              setSelectedPhoneCode={setSelectedPhoneCode}
              setSelectedFlag={setSelectedFlag}
              setOpen={setOpen}
              numberInputerRef={numberInputerRef}
              searchInputerRef={searchInputerRef}
              open={open}
            />
          ) : null}
        </div>
      </div>
    </ClickAwayListener>
  )
}

export default PhoneNumberSelectorWithFlags
