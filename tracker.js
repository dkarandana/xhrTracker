var xhrTracker = function ( options ){
	console.log('optimizer running', options);

	var settings = {
		loadCls: "filter-processing",
		onBefore: null,
		onAfter: null,
		onComplete: null
	};

	$body = $(document.body);
	$.extend( settings, options );

	var $handler = $( '.destination-blk' );

	$handler.bind('click',function(){
		
		$body.addClass( settings.loadCls );
		if( typeof settings.onBefore === 'function' ){
			settings.onBefore.call();
		}
	});

	$(document ).ajaxComplete(function( event , xhr, settings ) {
		var _url = settings.url,
		 	Rx = /[^?]socketName=filterInfoAndPaginatedItems(.*)$/ig;
		if( _url.match( Rx ) !== null  ){
			if( typeof options.onComplete === 'function' ){
				options.onComplete.call();
				$(document.body).removeClass( options.loadCls );
			}
		}
	});
};

$.fn.xhrTracker = xhrTracker;

$('body').xhrTracker( {
	loadCls : "filter-processing",
	onBefore:function(){
		console.log( '--onBefore' );
	},
	onComplete:function(){
		console.log( '--onComplete' );
	}
});
