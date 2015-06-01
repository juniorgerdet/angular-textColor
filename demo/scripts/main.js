
$(function() {
	$('.navbar-nav li').click(function(e) {
	$('.navbar-nav li').removeClass('active');
	  var $this = $(this);
	  if (!$this.hasClass('active')) {
	    $this.addClass('active');
	  }
	});
})
