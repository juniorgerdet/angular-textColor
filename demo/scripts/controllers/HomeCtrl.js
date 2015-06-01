/**
* @fileoverview Controller
*
* @author Junior Gerdet
* @email juniorgerdet@gmail.com
* @version 0.1
*/

'use strict';

angular.module('myApp').controller('HomeCtrl', ['$scope', function($scope) {
	//TODO - put any directive code here
}]);

angular.module('myApp').controller('contactCtrl', ['$scope', '$timeout', function($scope, $timeout) {
	//TODO - put any directive code here
   $timeout = twttr.widgets.load();
   var din ='<script src="//platform.linkedin.com/in.js" type="text/javascript"></script> <script type="IN/MemberProfile" data-id="https://www.linkedin.com/in/juniorgerdet" data-format="click" data-related="false" data-text="Junior Gerdet"></script>';
   $(".linkedinDetail").html(din);
   IN.parse();
}]);