$(document).ready(() => {
	$('form header a').each((idx, item) => {
		$(item).click(function() {
			$(this).siblings().removeClass('active');
			$(this).addClass('active');
			
			const idx = $(this).index();
			$('form section').css('display', 'none');
			$(`form section#section-${idx + 1}`).css('display', 'block');
			
			if(idx === 1) {
				$('form footer').css('display', 'none');
			} else {
				$('form footer').css('display', 'block');
			}
		});
	});
    $('form footer a').click(function() {
        console.log("El click anda");
        $("#section-1").removeClass('active');
        $("#section-2").removeClass('active');
		$("#section-3").addClass('active');
			
        $("#section-1").css('display', 'none');
        $("#section-2").css('display', 'none');
		$(`form section#section-${3}`).css('display', 'block');
		
	});

	$('#btn_reg').on( "submit", function(event){
		e.preventDefault(event);
		console.log("Click");
		$.ajax({

			url: "http://localhost:5000/altausuario",
			dataType: 'json',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({
				"user": $('#user').val(),
				"mail": $('#mail').val(),
				"password": $('#password').val(),
				"password2": $('#password2').val()
			}),
			success: (datos) => {
				console.log(datos);
			}
		});
	})
});