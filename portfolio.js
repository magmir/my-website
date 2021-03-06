var htmlForPicture = function(index, img, imgTitle) {
 		  	var html = '';
 		  	
	   	html += img;
	   	html += '<p class="title">'+ imgTitle +'</p>';
	   	html += '<div style="height:25px;clear:both;display:block;">';
	 		html += '<a class="controls next" href="'+ (index+2) + '">next &raquo;</a>'; 
	   	html += '<a class="controls previous" href="' + (index) + '">&laquo; prev</a>';
	   	html += '</div>';
	   	return html;
};

$(document).ready(function(){
		$('li img').on('click', function() {
			var imgSrc = $(this).attr('src');
   		var img = '<img src="' + imgSrc + '" class="img-responsive"/>'; 
  		 	var imgTitle=$(this).attr('alt');
  		 	var index = $(this).parent('li').index();
  		 	var html = htmlForPicture(index, img, imgTitle);
    
			$('#myModal').modal();
	   	$('#myModal').on('shown.bs.modal', function(){
	   		$('#myModal .modal-body').html(html);
	   		$('a.controls').trigger('click'); 
	   	});
	   	$('#myModal').on('hidden.bs.modal', function(){
   		$('#myModal .modal-body').html('');
   		});
		});
});

$(document).on('click', 'a.controls', function() {
	debugger;
	var index = $(this).attr('href'); 
	var imgTitle=$('ul.row li:nth-child('+ index +') img').attr('alt'); 
	var src = $('ul.row li:nth-child('+ index +') img').attr('src');
	$('.modal-body img').attr('src',src);
	$('.modal-body p.title').text(imgTitle);
	var newPrevIndex = parseInt(index) - 1;
	var newNextIndex = parseInt(newPrevIndex) + 2;

	if ($(this).hasClass('previous')) {
   	$(this).attr('href', newPrevIndex);
    	$('a.next').attr('href', newNextIndex);
	} else {
    	$(this).attr('href', newNextIndex);
    	$('a.previous').attr('href', newPrevIndex);
   }
    
	var total = $('ul.row li').length + 1;
	//hide next button
	if(total === newNextIndex){
   	$('a.next').hide();
	}else{
   	$('a.next').show()
	}
	//hide previous button
	if(newPrevIndex === 0){
   	$('a.previous').hide();
	}else{
   	$('a.previous').show()
	}

	return false; 
});