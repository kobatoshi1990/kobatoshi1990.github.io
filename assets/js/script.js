$(function() {

// タブ初期動作
$('.article_block').css('display','none');
$('.article_block').eq(0).css('display','block');

	//タブクリック処理
	$('.categoryBar li').click(function() {
		var index = $('.categoryBar li').index(this);
		$('.article_block').css('display','none').eq(index).css('display','block');
		$('.categoryBar li').removeClass('on');
		$(this).addClass('on')
	});
});
