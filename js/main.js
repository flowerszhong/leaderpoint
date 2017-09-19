;(function () {
	
	'use strict';



	// iPad and iPod detection	
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) || 
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};

	// Main Menu Superfish
	var mainMenu = function() {

		$('#fh5co-primary-menu').superfish({
			delay: 0,
			animation: {
				opacity: 'show'
			},
			speed: 'fast',
			cssArrows: true,
			disableHI: true
		});

	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};


	// Offcanvas and cloning of the main menu
	var offcanvas = function() {

		var $clone = $('#fh5co-menu-wrap').clone();
		$clone.attr({
			'id' : 'offcanvas-menu'
		});
		$clone.find('> ul').attr({
			'class' : '',
			'id' : ''
		});

		$('#fh5co-page').prepend($clone);

		// click the burger
		$('.js-fh5co-nav-toggle').on('click', function(){

			if ( $('body').hasClass('fh5co-offcanvas') ) {
				$('body').removeClass('fh5co-offcanvas');
			} else {
				$('body').addClass('fh5co-offcanvas');
			}
			// $('body').toggleClass('fh5co-offcanvas');

		});

		$('#offcanvas-menu').css('height', $(window).height());

		$(window).resize(function(){
			var w = $(window);


			$('#offcanvas-menu').css('height', w.height());

			if ( w.width() > 769 ) {
				if ( $('body').hasClass('fh5co-offcanvas') ) {
					$('body').removeClass('fh5co-offcanvas');
				}
			}

		});	

	}

	

	// Click outside of the Mobile Menu
	var mobileMenuOutsideClick = function() {
		$(document).click(function (e) {
	    var container = $("#offcanvas-menu, .js-fh5co-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('fh5co-offcanvas') ) {
				$('body').removeClass('fh5co-offcanvas');
			}
	    }
		});
	};


	// Animations

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							el.addClass('fadeInUp animated');
							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};

	

	
	function validateEmail(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}


	var applyCourse = function(){
		$('.btn-apply').on('click',function(e){
			e.preventDefault();
			var title = this.title;
			var msg = "申请：" + title + "课程";
			$('#apply-message').val(msg);
			$("#page-cover").show();
			$('#apply-panel').show();

		});

		$('#page-cover,#btn-cancel').on('click',function(){
			hideModal();
		});

		function hideModal() {
			$("#page-cover").hide();
			$('#apply-panel').hide();
		}


		$('#btn-submit').on('click',function(e){
			e.preventDefault();
			var name = $.trim($('.contact-form #name').val());
			var email = $.trim($('.contact-form #email').val());
			var msg = $.trim($('.contact-form #message').val());

			var alerts = {
				'ok':'留言成功！感谢您的留言，我们会尽快回复您。',
				'fail':'留言失败！邮件服务器故障，请稍后留言或直接发送邮件。',
				'error':'感谢您的关注！邮件服务器故障，请稍后留言或直接发送邮件。'
			};

			sendAjax(name,email,msg,alerts);
		});

		$('#btn-submit-apply').on('click',function(e){
			e.preventDefault();
			var name = $.trim($('#apply-form #apply-name').val());
			var email = $.trim($('#apply-form #apply-email').val());
			var msg = $.trim($('#apply-form #apply-message').val());

			var alerts = {
				'ok':'申请课程成功！感谢您的申请，我们会尽快回复您。',
				'fail':'申请课程失败！邮件服务器故障，请稍后申请或直接发送邮件。',
				'error':'感谢您的关注！邮件服务器故障，请稍后申请或直接发送邮件。'
			};
			sendAjax(name,email,msg,alerts);
			
		});

		function sendAjax(name,email,msg,alerts) {
			if(name == "" || email == "" || msg == ""){
				alert('请将表单填写完整！');
				return;
			}
			if(name.length>20){
				alert('您填写的姓名长度过长！');
				return;
			}

			if(!validateEmail(email)){
				alert('请输入正确的邮箱格式！');
				return;
			}

			if(msg.length>100){
				alert('您的留言过长，请减少至100个字符以内！')
			}

			$.ajax({
				method: "POST",
				url: "sendemail2.php",
				data: { 'name': name, 'email': email, 'msg': msg },
				dataType: 'json'
			})
			.done(function( msg ) {
				if(msg && msg.ok){
					alert(alerts.ok);
				}else{
					alert(alerts.fail);
				}
				hideModal();
			})
			.fail(function () {  
				alert(alerts.error)
			});
		}

	}

	// Document on load.
	$(function(){
		mainMenu();
		parallax();
		offcanvas();
		mobileMenuOutsideClick();
		contentWayPoint();
		applyCourse();
		// if($.fn.typeIt){
		// 	$('#site-desc').typeIt({
		// 		speed: 150,
		// 		autoStart: true
		// 	});
		// }
		
	
	});


}());