import React, { useEffect, useState, useRef } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import styles from './PhoneNumberSelectorWithFlags.module.scss';
import countryList from './data/flags.json';
import CountryDropdown from './CountryDropdown';
var PhoneNumberSelectorWithFlags = function () {
    var _a = useState(false), open = _a[0], setOpen = _a[1];
    var _b = useState(''), phoneNumber = _b[0], setPhoneNumber = _b[1];
    var _c = useState(), selectedFlag = _c[0], setSelectedFlag = _c[1];
    var _d = useState(''), selectedPhoneCode = _d[0], setSelectedPhoneCode = _d[1];
    var numberInputerRef = useRef(null);
    var searchInputerRef = useRef(null);
    var handleClickAway = function () {
        setOpen(false);
    };
    var handleFocus = function () {
        if (selectedPhoneCode !== undefined && selectedPhoneCode.length > 0)
            return;
        if (open)
            return;
        setOpen(function (prevState) { return !prevState; });
    };
    var handleClick = function () {
        var _a;
        (_a = searchInputerRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        if (open)
            return;
        setOpen(function (prevState) { return !prevState; });
    };
    var handlePhoneNumberChange = function (e) {
        var numberPattern = /[^\d]/;
        var sanitized = e.target.value;
        sanitized = sanitized.replace(numberPattern, '');
        setPhoneNumber(sanitized);
    };
    useEffect(function () {
        var _a;
        setSelectedFlag(countryList.find(function (country) { return country.name === 'Bermuda'; }));
        setSelectedPhoneCode((_a = countryList.find(function (country) { return country.name === 'Bermuda'; })) === null || _a === void 0 ? void 0 : _a.code);
    }, []);
    return (React.createElement(ClickAwayListener, { onClickAway: handleClickAway },
        React.createElement("div", { className: styles.dropdownComponentWrapper },
            React.createElement("div", { className: styles.selectedFlagHolder },
                React.createElement("button", { onClick: handleClick, "aria-label": (selectedFlag === null || selectedFlag === void 0 ? void 0 : selectedFlag.name) + ' flag' }, selectedFlag ? React.createElement("img", { src: selectedFlag === null || selectedFlag === void 0 ? void 0 : selectedFlag.flagURL, alt: selectedFlag === null || selectedFlag === void 0 ? void 0 : selectedFlag.name, width: 22, height: 16 }) : null),
                React.createElement("span", { className: styles.selectedPhoneCode }, selectedPhoneCode),
                React.createElement("input", { type: 'text', onFocus: handleFocus, value: phoneNumber, "aria-label": 'Country Phone Number', onChange: handlePhoneNumberChange, maxLength: 20, ref: numberInputerRef, placeholder: 'Phone Number' })),
            React.createElement("div", { className: styles.dropdownWrapper }, open ? (React.createElement(CountryDropdown, { setSelectedPhoneCode: setSelectedPhoneCode, setSelectedFlag: setSelectedFlag, setOpen: setOpen, numberInputerRef: numberInputerRef, searchInputerRef: searchInputerRef, open: open })) : null))));
};
export default PhoneNumberSelectorWithFlags;
//# sourceMappingURL=App.js.map