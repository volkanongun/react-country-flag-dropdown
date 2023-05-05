import React from 'react';
import styles from './PhoneNumberSelectorWithFlags.module.scss';
var CountryListItem = function (_a) {
    var country = _a.country, setSelectedPhoneCode = _a.setSelectedPhoneCode, setSelectedFlag = _a.setSelectedFlag, setOpen = _a.setOpen, selectedCountry = _a.selectedCountry, numberInputerRef = _a.numberInputerRef, listItemRef = _a.listItemRef;
    var handleDropdownItemClick = function (flag) {
        var _a;
        var codes = flag.code.split(',');
        setSelectedPhoneCode(codes[0]);
        setSelectedFlag(flag);
        setOpen(false);
        (_a = numberInputerRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    };
    var handleKeydown = function (e) {
        if (e.key === 'Escape') {
            setOpen(false);
        }
    };
    return (React.createElement("li", { className: (selectedCountry === null || selectedCountry === void 0 ? void 0 : selectedCountry.name) === country.name ? "".concat(styles.active, " currentItem") : '', ref: listItemRef },
        React.createElement("button", { onClick: function () { return handleDropdownItemClick(country); }, onKeyDown: handleKeydown },
            React.createElement("span", null,
                React.createElement("img", { src: country.flagURL, width: 18, height: 12, alt: country.name + ' flag' })),
            React.createElement("span", null, country.name),
            React.createElement("span", { "aria-label": "Country Phone Code ".concat(country.code) }, country.code.split(',').length > 1 ? (country.code.split(',').map(function (code, i) { return React.createElement("cite", { key: i }, code); })) : (React.createElement("cite", null, country.code))))));
};
export default CountryListItem;
//# sourceMappingURL=CountryListItem.js.map