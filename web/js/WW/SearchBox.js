/* global WW */

WW.SearchBox = function (rootView) {
    this._valueEnterHandlers = [];
    
    var self = this,
        searchField = rootView.find('.search-box-field');
    
    rootView.submit(function () {
        self._valueEnterHandlers.forEach(function (fn) {
            fn(searchField.val());
        });
        return false;
    });
};

WW.SearchBox.prototype.onValueEnter = function (fn) {
    this._valueEnterHandlers.push(fn);
};