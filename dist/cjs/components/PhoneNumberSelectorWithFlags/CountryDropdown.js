"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var flags_json_1 = tslib_1.__importDefault(require("./data/flags.json"));
var PhoneNumberSelectorWithFlags_module_scss_1 = tslib_1.__importDefault(require("./PhoneNumberSelectorWithFlags.module.scss"));
var CountryListItem_1 = tslib_1.__importDefault(require("./CountryListItem"));
var CountryDropdown = function (_a) {
    var setSelectedPhoneCode = _a.setSelectedPhoneCode, setSelectedFlag = _a.setSelectedFlag, setOpen = _a.setOpen, numberInputerRef = _a.numberInputerRef, searchInputerRef = _a.searchInputerRef, open = _a.open;
    var _b = (0, react_1.useState)(''), searchValue = _b[0], setSearchValue = _b[1];
    var countries = flags_json_1["default"].filter(function (country) { return country.name.toLowerCase().includes(searchValue); });
    var countryIndex = (0, react_1.useRef)(-1);
    var _c = (0, react_1.useState)(countries[countryIndex.current]), selectedCountry = _c[0], setSelectedCountry = _c[1];
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
    var scrollRef = (0, react_1.useRef)(null);
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
    (0, react_1.useEffect)(function () {
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
    var listItemRef = (0, react_1.useRef)([]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("input", { type: 'text', placeholder: 'Search', onChange: handleSearch, value: searchValue, "aria-label": 'Search Country Name', onKeyDown: handleKeyDown, autoComplete: 'off', ref: searchInputerRef }),
        react_1["default"].createElement("div", { className: "".concat(PhoneNumberSelectorWithFlags_module_scss_1["default"].dropdown), ref: scrollRef },
            react_1["default"].createElement("ul", null, countries.map(function (country, key) {
                return (react_1["default"].createElement(CountryListItem_1["default"], { country: country, key: key, countries: countries, setSelectedPhoneCode: setSelectedPhoneCode, setSelectedFlag: setSelectedFlag, setOpen: setOpen, selectedCountry: selectedCountry, numberInputerRef: numberInputerRef, listItemRef: function (ref) { return (listItemRef.current[key] = ref); } }));
            })))));
};
exports["default"] = CountryDropdown;
//# sourceMappingURL=CountryDropdown.js.map