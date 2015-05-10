/* global WW */

WW.ButtonGroupSelect = function (rootView) {
    var unitSelectorButtons = rootView.find('button');
    
    var self = this;
    this._valueUpdateHandlers = [];
    
    rootView.on('click', 'button', function () {
        var element = $(this);

        self._valueUpdateHandlers.forEach(function (fn) {
            fn(element.data('value'));
        });
        
        unitSelectorButtons.removeClass('active');
        element.addClass('active');        
    });
};

WW.ButtonGroupSelect.prototype.onValueUpdate = function (fn) {
    this._valueUpdateHandlers.push(fn);
};