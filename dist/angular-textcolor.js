/**
* @fileoverview Module angular-textColor 
*
* @author Junior Gerdet
* @email juniorgerdet@gmail.com
* @version 0.1
*/

(function() {

'use strict';

angular.module('angular-textcolor', [])
.factory('angularTextcolor', function() {
	
    var hash = function(word) {
        var h = 0;
        for (var i = 0; i < word.length; i++) {
            h = word.charCodeAt(i) + ((h << 5) - h);
        }
        return h;
    };

    // Change the darkness or lightness
    var shade = function(color, prc) {
        var num = parseInt(color, 16),
            amt = Math.round(2.55 * prc),
            R = (num >> 16) + amt,
            G = (num >> 8 & 0x00FF) + amt,
            B = (num & 0x0000FF) + amt;
        return (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255))
            .toString(16)
            .slice(1);

    };
    // Convert init to an RGBA
    var intToRgba = function(i) {
        var color = ((i >> 24) & 0xFF).toString(16) +
            ((i >> 16) & 0xFF).toString(16) +
            ((i >> 8) & 0xFF).toString(16) +
            (i & 0xFF).toString(16);
        return color;
    };
    return {
        getTextColor: function(str) {
            var rc="#"+shade(intToRgba(hash(str)), -10);
            return rc;
        }
    };

})
.directive('angularTextcolor', ['angularTextcolor', function (angularTextcolor) {
    return {
        restrict: 'A',
        scope: {
        },
        link: function(scope, element, attrs){
            var value, color;
            
            var mainTextcolor=function(value){
                if(attrs.toText){
                    if(attrs.angularTextcolor){
                        color=angularTextcolor.getTextColor(attrs.angularTextcolor);
                        $(element).css("color", color);
                    }else{
                            if (value) {
                                color=angularTextcolor.getTextColor(value);
                                $(element).css("color", color);
                            }else{
                                console.log("Text not found on the HTML item...");
                            }

                    }
                }else{
                    if(attrs.angularTextcolor){
                        color=angularTextcolor.getTextColor(attrs.angularTextcolor);
                        $(element).css("backgroundColor", color);
                    }else{
                        if (value) {
                            color=angularTextcolor.getTextColor(value);
                            $(element).css("backgroundColor", color);
                        }else{
                            console.log("Text not found on the HTML item..." );
                        }

                    }
                }
            };

            if(element.prop("tagName")=="INPUT" || element.prop("tagName")=="TEXTAREA"){
                value=$(element).val().trim();
                element.on("keydown keyup", function(){
                    value=$(element).val().trim();
                    if(value){
                        mainTextcolor(this.value);
                    }else{
                        $(element).css("backgroundColor", "#fff");
                    }
                });
            }else{
                console.log(attrs.materialDesign);
                if(attrs.materialDesign){
                    $(element).css("boxShadow", '0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12)');    
                }
                value=$(element).text().trim();
            }
            mainTextcolor(value);
		},
		controller: function($scope, $element, $attrs) {}
	};
}]);

})();
