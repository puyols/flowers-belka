function initSeoTagsSliderCloud(tags) {
	$(tags).slick({
		dots: false,
		arrows: true,
		infinite: true,
		autoplay: false,
		variableWidth: true,
		centerMode: true,
		slidesToShow: 3,
		responsive: [
			{
				breakpoint: 560,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
}
$(document).ready(function() {
	initSeoTagsSliderCloud('#tags_cloud .seotags_list');
	$('#tags_cloud .seotags_list_nav').on('click', '.seotags_list_button', function(){
		var tags_button = $(this),
		tags_operation = tags_button.data('type'),
		tags_cloud = tags_button.parents('.seotags_cloud'),
		tags_nav = tags_cloud.find('.seotags_list_nav');
		tags_button.hide();

		if (tags_operation == 'open') {
			tags_nav.addClass('seotags_list_relative');
			tags_nav.find('[data-type="close"]').show();
			tags_cloud.addClass('seotags_list_open');
			tags_cloud.find('.seotags_list').slick('unslick');
		} else {
			tags_nav.removeClass('seotags_list_relative');
			tags_nav.find('[data-type="open"]').show();
			tags_cloud.removeClass('seotags_list_open');
			initSeoTagsSliderCloud(tags_cloud.find('.seotags_list'));
		}
	});
});