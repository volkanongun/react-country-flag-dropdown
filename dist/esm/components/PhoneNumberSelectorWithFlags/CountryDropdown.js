import React, { useState, useRef, useEffect } from 'react';
import countryList from './data/flags.json';
import styles from './PhoneNumberSelectorWithFlags.module.scss';
import CountryListItem from './CountryListItem';
var CountryDropdown = function (_a) {
    var setSelectedPhoneCode = _a.setSelectedPhoneCode, setSelectedFlag = _a.setSelectedFlag, setOpen = _a.setOpen, numberInputerRef = _a.numberInputerRef, searchInputerRef = _a.searchInputerRef, open = _a.open;
    var _b = useState(''), searchValue = _b[0], setSearchValue = _b[1];
    var countries = countryList.filter(function (country) { return country.name.toLowerCase().includes(searchValue); });
    var countryIndex = useRef(-1);
    var _c = useState(countries[countryIndex.current]), selectedCountry = _c[0], setSelectedCountry = _c[1];
    var handleKeyDown = function (e) {
        switch (e.key) {
            case 'ArrowUp':
                if (countryIndex.current <= 0) {
                    countryIndex.current = 0;
                    setSelectedCountry(countries[countryIndex.current]);
                    return;
                }
                countryIndex.current -= 1;
                setSelectedCountry(countries[countryIndex.current]);
                scrollElement('Up');
                break;
            case 'ArrowDown':
                if (countryIndex.current >= countries.length - 1) {
                    setSelectedCountry(countries[countries.length - 1]);
                    return;
                }
                countryIndex.current += 1;
                setSelectedCountry(countries[countryIndex.current]);
                scrollElement('Down');
                break;
            case 'Enter':
                if (countryIndex.current === -1)
                    return;
                setCountryCodeAndFlag();
                break;
            case 'Backspace':
                if (searchValue.length <= 2) {
                    setSelectedCountry(countries[0]);
                }
                break;
            case 'Escape':
                if (open) {
                    setOpen(false);
                }
                break;
        }
    };
    var setCountryCodeAndFlag = function () {
        var _a;
        setSelectedCountry(countries[countryIndex.current]);
        setOpen(false);
        setSelectedFlag(countries[countryIndex.current]);
        setSelectedPhoneCode(countries[countryIndex.current].code);
        (_a = numberInputerRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    };
    var scrollElement = function (direction) {
        var _a;
        switch (direction) {
            case 'Up':
                for (var i = 0; i < listItemRef.current.length; i++) {
                    var currentItem = listItemRef.current[i - 2];
                    if (currentItem === null || currentItem === void 0 ? void 0 : currentItem.classList.contains('currentItem')) {
                        (_a = scrollRef.current) === null || _a === void 0 ? void 0 : _a.scrollTo(0, (currentItem === null || currentItem === void 0 ? void 0 : currentItem.offsetTop) - (currentItem === null || currentItem === void 0 ? void 0 : currentItem.offsetHeight) * 3);
                    }
                }
                break;
            case 'Down':
                for (var i = 0; i < listItemRef.current.length; i++) {
                    var currentItem = listItemRef.current[i];
                    if (currentItem === null || currentItem === void 0 ? void 0 : currentItem.classList.contains('currentItem')) {
                        currentItem === null || currentItem === void 0 ? void 0 : currentItem.scrollIntoView({ behavior: 'smooth' });
                    }
                }
                break;
        }
    };
    var handleSearch = function (e) {
        setSearchValue(e.target.value.toLowerCase());
        countryIndex.current = -1;
    };
    var scrollRef = useRef(null);
    var scrollKeyDown = function (e) {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                break;
            case 'ArrowUp':
                e.preventDefault();
                break;
        }
    };
    useEffect(function () {
        var refCache = scrollRef.current;
        if (scrollRef.current) {
            scrollRef.current.addEventListener('keydown', scrollKeyDown, false);
        }
        return function () {
            if (refCache) {
                refCache.removeEventListener('keydown', scrollKeyDown, false);
            }
        };
    }, []);
    var listItemRef = useRef([]);
    return (React.createElement(React.Fragment, null,
        React.createElement("input", { type: 'text', placeholder: 'Search', onChange: handleSearch, value: searchValue, "aria-label": 'Search Country Name', onKeyDown: handleKeyDown, autoComplete: 'off', ref: searchInputerRef }),
        React.createElement("div", { className: "".concat(styles.dropdown), ref: scrollRef },
            React.createElement("ul", null, countries.map(function (country, key) {
                return (React.createElement(CountryListItem, { country: country, key: key, countries: countries, setSelectedPhoneCode: setSelectedPhoneCode, setSelectedFlag: setSelectedFlag, setOpen: setOpen, selectedCountry: selectedCountry, numberInputerRef: numberInputerRef, listItemRef: function (ref) { return (listItemRef.current[key] = ref); } }));
            })))));
};
export default CountryDropdown;
//# sourceMappingURL=CountryDropdown.js.map