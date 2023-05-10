import React, { useState, useRef, useEffect } from 'react'
import countryList from './data/flags.json'
import { Country, CountryDropdownProps } from './types'
import CountryListItem from './CountryListItem'
import './PhoneNumberSelectorWithFlags.css'

const CountryDropdown: React.FC<CountryDropdownProps> = ({
  setSelectedPhoneCode,
  setSelectedFlag,
  setOpen,
  numberInputerRef,
  searchInputerRef,
  open,
}) => {
  const [searchValue, setSearchValue] = useState<string>('')
  const countries = countryList.filter((country: Country) => country.name.toLowerCase().includes(searchValue))
  const countryIndex = useRef(-1)
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(countries[countryIndex.current])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowUp':
        if (countryIndex.current <= 0) {
          countryIndex.current = 0
          setSelectedCountry(countries[countryIndex.current])
          return
        }

        countryIndex.current -= 1
        setSelectedCountry(countries[countryIndex.current])

        scrollElement('Up')

        break
      case 'ArrowDown':
        if (countryIndex.current >= countries.length - 1) {
          setSelectedCountry(countries[countries.length - 1])
          return
        }

        countryIndex.current += 1
        setSelectedCountry(countries[countryIndex.current])

        scrollElement('Down')

        break
      case 'Enter':
        if (countryIndex.current === -1) return
        setCountryCodeAndFlag()
        break
      case 'Backspace':
        if (searchValue.length <= 2) {
          setSelectedCountry(countries[0])
        }
        break
      case 'Escape':
        if (open) {
          setOpen(false)
        }
        break
    }
  }

  const setCountryCodeAndFlag = () => {
    setSelectedCountry(countries[countryIndex.current])
    setOpen(false)
    setSelectedFlag(countries[countryIndex.current])
    setSelectedPhoneCode(countries[countryIndex.current].code)
    numberInputerRef.current?.focus()
  }

  const scrollElement = (direction: string) => {
    switch (direction) {
      case 'Up':
        for (let i = 0; i < listItemRef.current.length; i++) {
          const currentItem = listItemRef.current[i - 2]
          if (currentItem?.classList.contains('currentItem')) {
            scrollRef.current?.scrollTo(0, currentItem?.offsetTop - currentItem?.offsetHeight * 3)
          }
        }
        break
      case 'Down':
        for (let i = 0; i < listItemRef.current.length; i++) {
          const currentItem = listItemRef.current[i]
          if (currentItem?.classList.contains('currentItem')) {
            currentItem?.scrollIntoView({ behavior: 'smooth' })
          }
        }
        break
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value.toLowerCase())
    countryIndex.current = -1
  }

  const scrollRef = useRef<HTMLDivElement>(null)
  const scrollKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        break
      case 'ArrowUp':
        e.preventDefault()
        break
    }
  }

  useEffect(() => {
    const refCache = scrollRef.current

    if (scrollRef.current) {
      scrollRef.current.addEventListener('keydown', scrollKeyDown, false)
    }

    return () => {
      if (refCache) {
        refCache.removeEventListener('keydown', scrollKeyDown, false)
      }
    }
  }, [])

  const listItemRef = useRef<(HTMLLIElement | null)[]>([])

  return (
    <>
      <input
        type='text'
        placeholder='Search'
        onChange={handleSearch}
        value={searchValue}
        aria-label='Search Country Name'
        onKeyDown={handleKeyDown}
        autoComplete='off'
        ref={searchInputerRef}
      />
      <div className="dropdown" ref={scrollRef}>
        <ul>
          {countries.map((country: Country, key: number) => {
            return (
              <CountryListItem
                country={country}
                key={key}
                countries={countries}
                setSelectedPhoneCode={setSelectedPhoneCode}
                setSelectedFlag={setSelectedFlag}
                setOpen={setOpen}
                selectedCountry={selectedCountry}
                numberInputerRef={numberInputerRef}
                listItemRef={(ref: any) => (listItemRef.current[key] = ref)}
              />
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default CountryDropdown
