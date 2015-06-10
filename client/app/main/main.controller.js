'use strict';

angular.module('creativeRecruitmentApp')
  .controller('MainCtrl', function ($scope, $http) {
    
      $('document').ready(function(){

	

	var lastLink = $('#header .menu-main').find('.lastLink');
	lastLink.find('a').css('margin-right', 0);

	//main content boxes hover

	var linkSubmenu1 = $('.menu-add .left').find('li.dropdown1');
	var linkSubmenu2 = $('.menu-add .left').find('li.dropdown2');

	linkSubmenu1.on('mouseenter', function(){
		var submenu = $('.menu-add .left .dropdown1').find('.sub-menu');
		submenu.addClass('sub-visible');
		$('.menu-main').css('display', 'none');
	});
	linkSubmenu1.on('mouseleave', function(){
		
		var submenu = $('.menu-add .left .dropdown1').find('.sub-menu');
		submenu.removeClass('sub-visible');
		$('.menu-main').css('display', 'block');
	});
	linkSubmenu2.on('mouseenter', function(){
		var submenu = $('.menu-add .left .dropdown2').find('.sub-menu');
		submenu.addClass('sub-visible');
		$('.menu-main').css('display', 'none');
	});
	linkSubmenu2.on('mouseleave', function(){
		
		var submenu = $('.menu-add .left .dropdown2').find('.sub-menu');
		submenu.removeClass('sub-visible');
		$('.menu-main').css('display', 'block');
	});

	//End menu js

	$('#contact').on('click', function() {
		$('.contact').modal('show');
	});
	$('#konto-cr').on('click', function() {
		$('.konto-cr').modal('show');
	});

	//offset always center height

	function OffsetHandler(){

		var needOffset = $('[data-offet-trigger="true"]');
		if(!needOffset.length) return;

		var winH =	$(window).height();
				
		needOffset.css('margin-top', winH/2 - 180/2 - 180 );

		$(window).resize(function(){
			var winH =	$(window).height();
			needOffset.css('margin-top', winH/2 - 180/2 - 180 );			
		}); 

	}

	var offsetHandler = OffsetHandler();

	//animation start

	$('.diagram-first').on('click', function(){
		var el = $('.diagram-first-info');
		el.toggleClass('hide');
		$(this).toggleClass('info');
	});
	$('.diagram-second').on('click', function(){
		var el = $('.diagram-second-info');
		el.toggleClass('hide');
		$(this).toggleClass('info');
	});
	$('.diagram-third').on('click', function(){
		var el = $('.diagram-third-info');
		el.toggleClass('hide');
		$(this).toggleClass('info');
	});
	$('.diagram-fourth').on('click', function(){
		var el = $('.diagram-fourth-info');
		el.toggleClass('hide');
		$(this).toggleClass('info');
	});
	$('.diagram-fifth').on('click', function(){
		var el = $('.diagram-fifth-info');
		el.toggleClass('hide');
		$(this).toggleClass('info');
	});

	var showAllButton = $('.diagram-icon').find('div');
	$('.show-all button').on('click', function(){
		
		if($(this).hasClass('activ')){
			$(this).removeClass('activ');
			$(this).text('Zobacz cały proces');
			showAllButton.addClass('hide');
			$('.diagram-icon').removeClass('info');
			$('.content-how-work .left').slideDown();
		} else {
			$(this).addClass('activ');
			$(this).text('Ukryj proces');
			showAllButton.removeClass('hide');
			$('.diagram-icon').addClass('info');
			$('.content-how-work .left').slideUp();
		}
	});

	$('#contact-form a').click(function (e) {
	  e.preventDefault()
	  $(this).tab('show')
	})

	var iconToShow = $('.content-obszar .opis');
	iconToShow.each(function(){
		var that = $(this);
		that.find('.icon a').on('click', function(e){
			e.preventDefault();
			

			if(that.find('.leftsite').hasClass('show')){
				that.find('ul').removeClass('show').addClass('hide').slideUp();
				that.find('.icon a').html('<span></span>Zobacz przykładowe projekty');
			}
			else {
				
				iconToShow.find('ul').removeClass('show').addClass('hide');
				iconToShow.find('.icon a').html('<span></span>Zobacz przykładowe projekty');
				that.find('.icon a').html('<span></span>Ukryj przykładowe projekty');
				that.find('ul').removeClass('hide').addClass('show').slideDown();
				
			}
		});
	});
	
});

  });
