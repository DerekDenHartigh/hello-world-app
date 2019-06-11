"use strict";

angular.
module('HelloWorldApp')
.directive('fallbackSrc', function () {
    var fallbackSrc = {
        link: function postLink(scope, iElement, iAttrs) {
            iElement.bind('error', function() {
                angular.element(this).attr("src", iAttrs.fallbackSrc);
            });
        }
    }
    return fallbackSrc;
});

/**
 * Embed this in the tag of a dynamically generated image so that there will be an angular fallback image:
 * fallback-src="https://www.kargomaster.com/pub/media/catalog/product/placeholder/default/sorry-image-not-available.jpg"
 */