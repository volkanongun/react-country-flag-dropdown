"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_click_away_listener_1 = tslib_1.__importDefault(require("react-click-away-listener"));
var PhoneNumberSelectorWithFlags_module_scss_1 = tslib_1.__importDefault(require("./PhoneNumberSelectorWithFlags.module.scss"));
var flags_json_1 = tslib_1.__importDefault(require("./data/flags.json"));
var CountryDropdown_1 = tslib_1.__importDefault(require("./CountryDropdown"));
var PhoneNumberSelectorWithFlags = function () {
    var _a = (0, react_1.useState)(false), open = _a[0], setOpen = _a[1];
    var _b = (0, react_1.useState)(''), phoneNumber = _b[0], setPhoneNumber = _b[1];
    var _c = (0, react_1.useState)(), selectedFlag = _c[0], setSelectedFlag = _c[1];
    var _d = (0, react_1.useState)(''), selectedPhoneCode = _d[0], setSelectedPhoneCode = _d[1];
    var numberInputerRef = (0, react_1.useRef)(null);
    var searchInputerRef = (0, react_1.useRef)(null);
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
    (0, react_1.useEffect)(function () {
        var _a;
        setSelectedFlag(flags_json_1["default"].find(function (country) { return country.name === 'Bermuda'; }));
        setSelectedPhoneCode((_a = flags_json_1["default"].find(function (country) { return country.name === 'Bermuda'; })) === null || _a === void 0 ? void 0 : _a.code);
    }, []);
    return (react_1["default"].createElement(react_click_away_listener_1["default"], { onClickAway: handleClickAway },
        react_1["default"].createElement("div", { className: PhoneNumberSelectorWithFlags_module_scss_1["default"].dropdownComponentWrapper },
            react_1["default"].createElement("div", { className: PhoneNumberSelectorWithFlags_module_scss_1["default"].selectedFlagHolder },
                react_1["default"].createElement("button", { onClick: handleClick, "aria-label": (selectedFlag === null || selectedFlag === void 0 ? void 0 : selectedFlag.name) + ' flag' }, selectedFlag ? react_1["default"].createElement("img", { src: selectedFlag === null || selectedFlag === void 0 ? void 0 : selectedFlag.flagURL, alt: selectedFlag === null || selectedFlag === void 0 ? void 0 : selectedFlag.name, width: 22, height: 16 }) : null),
                react_1["default"].createElement("span", { className: PhoneNumberSelectorWithFlags_module_scss_1["default"].selectedPhoneCode }, selectedPhoneCode),
                react_1["default"].createElement("input", { type: 'text', onFocus: handleFocus, value: phoneNumber, "aria-label": 'Country Phone Number', onChange: handlePhoneNumberChange, maxLength: 20, ref: numberInputerRef, placeholder: 'Phone Number' })),
            react_1["default"].createElement("div", { className: PhoneNumberSelectorWithFlags_module_scss_1["default"].dropdownWrapper }, open ? (react_1["default"].createElement(CountryDropdown_1["default"], { setSelectedPhoneCode: setSelectedPhoneCode, setSelectedFlag: setSelectedFlag, setOpen: setOpen, numberInputerRef: numberInputerRef, searchInputerRef: searchInputerRef, open: open })) : null))));
};
exports["default"] = PhoneNumberSelectorWithFlags;
//# sourceMappingURL=App.js.map