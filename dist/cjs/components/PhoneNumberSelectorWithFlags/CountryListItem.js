"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var PhoneNumberSelectorWithFlags_module_scss_1 = tslib_1.__importDefault(require("./PhoneNumberSelectorWithFlags.module.scss"));
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
    return (react_1["default"].createElement("li", { className: (selectedCountry === null || selectedCountry === void 0 ? void 0 : selectedCountry.name) === country.name ? "".concat(PhoneNumberSelectorWithFlags_module_scss_1["default"].active, " currentItem") : '', ref: listItemRef },
        react_1["default"].createElement("button", { onClick: function () { return handleDropdownItemClick(country); }, onKeyDown: handleKeydown },
            react_1["default"].createElement("span", null,
                react_1["default"].createElement("img", { src: country.flagURL, width: 18, height: 12, alt: country.name + ' flag' })),
            react_1["default"].createElement("span", null, country.name),
            react_1["default"].createElement("span", { "aria-label": "Country Phone Code ".concat(country.code) }, country.code.split(',').length > 1 ? (country.code.split(',').map(function (code, i) { return react_1["default"].createElement("cite", { key: i }, code); })) : (react_1["default"].createElement("cite", null, country.code))))));
};
exports["default"] = CountryListItem;
//# sourceMappingURL=CountryListItem.js.map