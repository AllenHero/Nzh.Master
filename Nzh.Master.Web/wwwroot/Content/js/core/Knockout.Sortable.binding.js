(function ($,Sortable, ko) {
    var options = {
        toolbar: false,
        navbar: false
    };
 
    ko.bindingHandlers.Sortable = {
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            // This will be called when the binding is first applied to an element
            // Set up any initial state, event handlers, etc. here
            var value = valueAccessor();
            //console.log(value);
            //console.log(allBindings);
            //console.log(viewModel);
            //console.log(bindingContext);
            var options = value.options || {}; 
            Sortable.create(element, options);
        },
        update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            // This will be called once when the binding is first applied to an element,
            // and again whenever any observables/computeds that are accessed change
            // Update the DOM element based on the supplied values here.
            var value = valueAccessor();
            console.log(value);
            console.log(allBindings);
            console.log(viewModel);
            console.log(bindingContext);
        }
    };
})($,Sortable, ko);