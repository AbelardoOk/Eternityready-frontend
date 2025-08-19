<?php
/* Smarty version 3.1.33, created on 2025-08-08 04:21:56
  from '/home/eternity/public_html/old/templates/apollo/header.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.33',
  'unifunc' => 'content_68957b6421b9e0_63038180',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '3d86af79b72b5169f74943de23b57ebd24aa2782' => 
    array (
      0 => '/home/eternity/public_html/old/templates/apollo/header.tpl',
      1 => 1752522855,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:modal-user-login.tpl' => 1,
    'file:modal-user-register.tpl' => 1,
    'file:modal-addvideo.tpl' => 1,
  ),
),false)) {
function content_68957b6421b9e0_63038180 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_checkPlugins(array(0=>array('file'=>'/home/eternity/public_html/old/Smarty/plugins/modifier.date_format.php','function'=>'smarty_modifier_date_format',),));
?>
<!DOCTYPE html>
<!--[if IE 7 | IE 8]>
<html class="ie" dir="<?php if (@constant('_IS_RTL') == '1') {?>rtl<?php } else { ?>ltr<?php }?>">
<![endif]-->
<!--[if !(IE 7) | !(IE 8)  ]><!-->
<html dir="<?php if (@constant('_IS_RTL') == '1') {?>rtl<?php } else { ?>ltr<?php }?>">
<!--<![endif]-->

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />

<head>
    
   <meta charset="UTF-8" />

	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
	<title><?php echo $_smarty_tpl->tpl_vars['meta_title']->value;?>
</title>
	<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=edge,chrome=1">
	<?php if ($_smarty_tpl->tpl_vars['no_index']->value == '1' || @constant('_DISABLE_INDEXING') == '1') {?>
		<meta name="googlebot" content="noindex,nofollow">
	<?php }?>
	<meta name="title" content="<?php echo $_smarty_tpl->tpl_vars['meta_title']->value;?>
" />
	<meta name="keywords" content="<?php echo $_smarty_tpl->tpl_vars['meta_keywords']->value;?>
" />
	<meta name="description" content="<?php echo $_smarty_tpl->tpl_vars['meta_description']->value;?>
" />
	<link rel="apple-touch-icon" sizes="180x180"
		href="<?php echo @constant('_URL');?>
/templates/<?php echo @constant('_TPLFOLDER');?>
/img/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32"
		href="<?php echo @constant('_URL');?>
/templates/<?php echo @constant('_TPLFOLDER');?>
/img/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16"
		href="<?php echo @constant('_URL');?>
/templates/<?php echo @constant('_TPLFOLDER');?>
/img/favicon-16x16.png">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap" rel="stylesheet">
	<link rel="shortcut icon" href="<?php echo @constant('_URL');?>
/templates/<?php echo @constant('_TPLFOLDER');?>
/img/favicon.ico">
	<?php if ($_smarty_tpl->tpl_vars['tpl_name']->value == "video-category") {?>
		<link rel="alternate" type="application/rss+xml" title="<?php echo $_smarty_tpl->tpl_vars['meta_title']->value;?>
"
			href="<?php echo @constant('_URL');?>
/rss.php?c=<?php echo $_smarty_tpl->tpl_vars['cat_id']->value;?>
" />
	<?php } elseif ($_smarty_tpl->tpl_vars['tpl_name']->value == "video-top") {?>
		<link rel="alternate" type="application/rss+xml" title="<?php echo $_smarty_tpl->tpl_vars['meta_title']->value;?>
"
			href="<?php echo @constant('_URL');?>
/rss.php?feed=topvideos" />
	<?php } elseif ($_smarty_tpl->tpl_vars['tpl_name']->value == "article-category") {?>
		<link rel="alternate" type="application/rss+xml" title="<?php echo $_smarty_tpl->tpl_vars['meta_title']->value;?>
"
			href="<?php echo @constant('_URL');?>
/rss.php?c=<?php echo $_smarty_tpl->tpl_vars['cat_id']->value;?>
&feed=articles" />
	<?php } else { ?>
		<link rel="alternate" type="application/rss+xml" title="<?php echo $_smarty_tpl->tpl_vars['meta_title']->value;?>
" href="<?php echo @constant('_URL');?>
/rss.php" />
	<?php }?>

	<?php if ($_smarty_tpl->tpl_vars['comment_system_facebook']->value && $_smarty_tpl->tpl_vars['fb_app_id']->value != '') {?>
		<meta property="fb:app_id" content="<?php echo $_smarty_tpl->tpl_vars['fb_app_id']->value;?>
" />
	<?php }?>
	<!--[if lt IE 9]>
        <?php echo '<script'; ?>
 src="//html5shim.googlecode.com/svn/trunk/html5.js"><?php echo '</script'; ?>
>
        <![endif]-->
	<link rel="stylesheet" href="<?php echo @constant('_URL');?>
/templates/<?php echo $_smarty_tpl->tpl_vars['template_dir']->value;?>
/css/bootstrap.min.css">
	<link rel="stylesheet" href="<?php echo @constant('_URL');?>
/templates/<?php echo $_smarty_tpl->tpl_vars['template_dir']->value;?>
/css/model.css">
	
	<?php echo '<script'; ?>
 src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"><?php echo '</script'; ?>
>
    <?php echo '<script'; ?>
 src="<?php echo @constant('_URL');?>
/templates/<?php echo $_smarty_tpl->tpl_vars['template_dir']->value;?>
/js/bootstrap.min.js"><?php echo '</script'; ?>
>

	<!--[if lt IE 9]>
        <?php echo '<script'; ?>
 src="//css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"><?php echo '</script'; ?>
>
        <![endif]-->
	<link rel="stylesheet" type="text/css" media="screen"
		href="<?php echo @constant('_URL');?>
/templates/<?php echo $_smarty_tpl->tpl_vars['template_dir']->value;?>
/css/apollo.css">
	<link rel="stylesheet" type="text/css" media="screen"
		href="<?php echo @constant('_URL');?>
/templates/<?php echo $_smarty_tpl->tpl_vars['template_dir']->value;?>
/css/animate.min.css">
	<?php if (@constant('_IS_RTL') == '1') {?>
		<link rel="stylesheet" type="text/css" media="screen"
			href="<?php echo @constant('_URL');?>
/templates/<?php echo $_smarty_tpl->tpl_vars['template_dir']->value;?>
/css/bootstrap.min.rtl.css">
		<link rel="stylesheet" type="text/css" media="screen"
			href="<?php echo @constant('_URL');?>
/templates/<?php echo $_smarty_tpl->tpl_vars['template_dir']->value;?>
/css/apollo.rtl.css">
	<?php }?>
	<link rel="stylesheet" type="text/css"
		href="//fonts.googleapis.com/css?family=Roboto:400,300,500,700|Open+Sans:400,500,700">
	<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
	<link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" media="screen"
		href="<?php echo @constant('_URL');?>
/templates/<?php echo $_smarty_tpl->tpl_vars['template_dir']->value;?>
/css/custom.css?<?php echo smarty_modifier_date_format(time(),"%s");?>
">
	<?php if ($_smarty_tpl->tpl_vars['tpl_name']->value == 'video-watch') {?>
		<link rel="canonical" href="<?php echo $_smarty_tpl->tpl_vars['video_data']->value['video_href'];?>
" />
	<?php }?>
	<?php if ($_smarty_tpl->tpl_vars['allow_google_login']->value && (!$_smarty_tpl->tpl_vars['logged_in']->value)) {?>
		<meta name="google-signin-client_id" content="<?php echo $_smarty_tpl->tpl_vars['oauth_google_clientid']->value;?>
">
		<?php echo '<script'; ?>
 src="https://apis.google.com/js/api:client.js"><?php echo '</script'; ?>
>
		<?php echo '<script'; ?>
 type="text/javascript">
			var gapi_clientid = "<?php echo $_smarty_tpl->tpl_vars['oauth_google_clientid']->value;?>
";
		<?php echo '</script'; ?>
>
	<?php }?>
	<?php echo '<script'; ?>
 type="text/javascript">
		var MELODYURL = "<?php echo @constant('_URL');?>
";
		var MELODYURL2 = "<?php echo @constant('_URL2');?>
";
		var TemplateP = "<?php echo @constant('_URL');?>
/templates/<?php echo $_smarty_tpl->tpl_vars['template_dir']->value;?>
";
		var _LOGGEDIN_ = <?php if ($_smarty_tpl->tpl_vars['logged_in']->value) {?>true<?php } else { ?>false<?php }?>;

		<?php if ($_smarty_tpl->tpl_vars['tpl_name']->value == 'index' || $_smarty_tpl->tpl_vars['tpl_name']->value == 'video-watch' || $_smarty_tpl->tpl_vars['tpl_name']->value == 'video-watch-episode') {?>
			
				var pm_video_data = {
				
				uniq_id: "<?php echo $_smarty_tpl->tpl_vars['video_data']->value['uniq_id'];?>
",
				url: "<?php echo $_smarty_tpl->tpl_vars['video_data']->value['video_href'];?>
",
				duration: <?php echo (($tmp = @$_smarty_tpl->tpl_vars['video_data']->value['yt_length'])===null||$tmp==='' ? 0 : $tmp);?>
,
				duration_str: "<?php echo $_smarty_tpl->tpl_vars['video_data']->value['duration'];?>
",
				category: "<?php echo $_smarty_tpl->tpl_vars['video_data']->value['category'];?>
".split(','),
				category_str: "<?php echo $_smarty_tpl->tpl_vars['video_data']->value['category'];?>
",
				featured: <?php echo (($tmp = @$_smarty_tpl->tpl_vars['video_data']->value['featured'])===null||$tmp==='' ? 0 : $tmp);?>
,
				restricted: <?php echo (($tmp = @$_smarty_tpl->tpl_vars['video_data']->value['restricted'])===null||$tmp==='' ? 0 : $tmp);?>
,
				allow_comments: <?php echo (($tmp = @$_smarty_tpl->tpl_vars['video_data']->value['allow_comments'])===null||$tmp==='' ? 0 : $tmp);?>
,
				allow_embedding: <?php echo (($tmp = @$_smarty_tpl->tpl_vars['video_data']->value['allow_embedding'])===null||$tmp==='' ? 0 : $tmp);?>
,
				is_stream: <?php if ($_smarty_tpl->tpl_vars['video_data']->value['is_stream']) {?>true<?php } else { ?>false<?php }?>,
				views: <?php echo (($tmp = @$_smarty_tpl->tpl_vars['video_data']->value['site_views'])===null||$tmp==='' ? 0 : $tmp);?>
,
				likes: <?php echo (($tmp = @$_smarty_tpl->tpl_vars['video_data']->value['likes'])===null||$tmp==='' ? 0 : $tmp);?>
,
				dislikes: <?php echo (($tmp = @$_smarty_tpl->tpl_vars['video_data']->value['dislikes'])===null||$tmp==='' ? 0 : $tmp);?>
,
				publish_date_str: "<?php echo $_smarty_tpl->tpl_vars['video_data']->value['html5_datetime'];?>
",
				publish_date_timestamp: <?php echo (($tmp = @$_smarty_tpl->tpl_vars['video_data']->value['added_timestamp'])===null||$tmp==='' ? 0 : $tmp);?>
,
				embed_url: "<?php echo $_smarty_tpl->tpl_vars['video_data']->value['embed_href'];?>
",
				thumb_url: "<?php echo $_smarty_tpl->tpl_vars['video_data']->value['thumb_img_url'];?>
",
				preview_image_url: "<?php echo $_smarty_tpl->tpl_vars['video_data']->value['preview_image'];?>
",
				title: '<?php echo preg_replace("%(?<!\\\\)'%", "\'",$_smarty_tpl->tpl_vars['video_data']->value['video_title']);?>
',
				autoplay_next: <?php if ($_smarty_tpl->tpl_vars['video_data']->value['autoplay_next']) {?>true<?php } else { ?>false<?php }?>,
				autoplay_next_url: "<?php echo $_smarty_tpl->tpl_vars['video_data']->value['autoplay_next_url'];?>
"
				
				}
			
		<?php }?>
	<?php echo '</script'; ?>
>
	
		<?php echo '<script'; ?>
 type="text/javascript">
			var pm_lang = {
				lights_off: "<?php echo $_smarty_tpl->tpl_vars['lang']->value['lights_off'];?>
",
				lights_on: "<?php echo $_smarty_tpl->tpl_vars['lang']->value['lights_on'];?>
",
				validate_name: "<?php echo $_smarty_tpl->tpl_vars['lang']->value['validate_name'];?>
",
				validate_username: "<?php echo $_smarty_tpl->tpl_vars['lang']->value['validate_username'];?>
",
				validate_pass: "<?php echo $_smarty_tpl->tpl_vars['lang']->value['validate_pass'];?>
",
				validate_captcha: "<?php echo $_smarty_tpl->tpl_vars['lang']->value['validate_captcha'];?>
",
				validate_email: "<?php echo $_smarty_tpl->tpl_vars['lang']->value['validate_email'];?>
",
				validate_agree: "<?php echo $_smarty_tpl->tpl_vars['lang']->value['validate_agree'];?>
",
				validate_name_long: "<?php echo $_smarty_tpl->tpl_vars['lang']->value['validate_name_long'];?>
",
				validate_username_long: "<?php echo $_smarty_tpl->tpl_vars['lang']->value['validate_username_long'];?>
",
				validate_pass_long: "<?php echo $_smarty_tpl->tpl_vars['lang']->value['validate_pass_long'];?>
",
				validate_confirm_pass_long: "<?php echo $_smarty_tpl->tpl_vars['lang']->value['validate_confirm_pass_long'];?>
",
				choose_category: "<?php echo $_smarty_tpl->tpl_vars['lang']->value['choose_category'];?>
",
				validate_select_file: "<?php echo $_smarty_tpl->tpl_vars['lang']->value['upload_errmsg10'];?>
",
				validate_video_title: "<?php echo $_smarty_tpl->tpl_vars['lang']->value['validate_video_title'];?>
",
				please_wait: "<?php echo $_smarty_tpl->tpl_vars['lang']->value['please_wait'];?>
",
				// upload video page
				swfupload_status_uploaded: "<?php echo $_smarty_tpl->tpl_vars['lang']->value['swfupload_status_uploaded'];?>
",
				swfupload_status_pending: "<?php echo $_smarty_tpl->tpl_vars['lang']->value['swfupload_status_pending'];?>
",
				swfupload_status_queued: "<?php echo $_smarty_tpl->tpl_vars['lang']->value['swfupload_status_queued'];?>
",
				swfupload_status_uploading: "<?php echo $_smarty_tpl->tpl_vars['lang']->value['swfupload_status_uploading'];?>
",
				swfupload_file: "<?php echo $_smarty_tpl->tpl_vars['lang']->value['swfupload_file'];?>
",
				swfupload_btn_select: "<?php echo $_smarty_tpl->tpl_vars['lang']->value['swfupload_btn_select'];?>
",
				swfupload_btn_cancel: "<?php echo $_smarty_tpl->tpl_vars['lang']->value['swfupload_btn_cancel'];?>
",
				swfupload_status_error: "<?php echo $_smarty_tpl->tpl_vars['lang']->value['swfupload_status_error'];?>
",
				swfupload_error_oversize: "<?php echo $_smarty_tpl->tpl_vars['lang']->value['swfupload_error_oversize'];?>
",
				swfupload_friendly_maxsize: "<?php echo $_smarty_tpl->tpl_vars['upload_limit']->value;?>
",
				upload_errmsg2: "<?php echo $_smarty_tpl->tpl_vars['lang']->value['upload_errmsg2'];?>
",
				// playlist
				playlist_delete_confirm: "<?php echo $_smarty_tpl->tpl_vars['lang']->value['playlist_delete_confirm'];?>
",
				playlist_delete_item_confirm: "<?php echo $_smarty_tpl->tpl_vars['lang']->value['playlist_delete_item_confirm'];?>
",
				show_more: "<?php echo $_smarty_tpl->tpl_vars['lang']->value['show_more'];?>
",
				show_less: "<?php echo $_smarty_tpl->tpl_vars['lang']->value['show_less'];?>
",
				delete_video_confirmation: "<?php echo (($tmp = @$_smarty_tpl->tpl_vars['lang']->value['delete_video_confirmation'])===null||$tmp==='' ? 'Are you sure you want to delete this video?' : $tmp);?>
",
				browse_all: "<?php echo (($tmp = @$_smarty_tpl->tpl_vars['lang']->value['browse_all'])===null||$tmp==='' ? 'Browse All' : $tmp);?>
"
			}
		<?php echo '</script'; ?>
>
	

	<?php if ($_smarty_tpl->tpl_vars['facebook_image_src']->value != '') {?>
		<link rel="image_src" href="<?php echo $_smarty_tpl->tpl_vars['facebook_image_src']->value;?>
" />
		<meta property="og:url"
			content="<?php if ($_smarty_tpl->tpl_vars['tpl_name']->value == 'article-read') {
echo $_smarty_tpl->tpl_vars['article']->value['link'];
} elseif (!empty($_smarty_tpl->tpl_vars['episode_data']->value)) {
echo $_smarty_tpl->tpl_vars['episode_data']->value['url'];
} else {
echo $_smarty_tpl->tpl_vars['video_data']->value['video_href'];
}?>" />
		<?php if ($_smarty_tpl->tpl_vars['tpl_name']->value == 'article-read') {?>
			<meta property="og:type" content="article" />
		<?php }?>
		<meta property="og:title" content="<?php echo $_smarty_tpl->tpl_vars['meta_title']->value;?>
" />
		<meta property="og:description" content="<?php echo $_smarty_tpl->tpl_vars['meta_description']->value;?>
" />
		<meta property="og:image" content="<?php echo $_smarty_tpl->tpl_vars['facebook_image_src']->value;?>
" />
		<meta property="og:image:width" content="480" />
		<meta property="og:image:height" content="360" />
		<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['localhost']['source_id']) {?>
			<link rel="video_src" href="<?php echo @constant('_URL');?>
/uploads/videos/<?php echo $_smarty_tpl->tpl_vars['video_data']->value['url_flv'];?>
" />
			<meta property="og:video:url" content="<?php echo @constant('_URL');?>
/uploads/videos/<?php echo $_smarty_tpl->tpl_vars['video_data']->value['url_flv'];?>
" />
			<meta property="og:video:type" content="video/mp4" />
			<link rel="video_src" href="<?php echo @constant('_URL2');?>
/videos.php?vid=<?php echo $_smarty_tpl->tpl_vars['video_data']->value['uniq_id'];?>
" />
			<meta property="og:video:url" content="<?php echo @constant('_URL');?>
/uploads/videos/<?php echo $_smarty_tpl->tpl_vars['video_data']->value['url_flv_raw'];?>
" />
			<meta property="og:video" content="<?php echo @constant('_URL');?>
/uploads/videos/<?php echo $_smarty_tpl->tpl_vars['video_data']->value['url_flv_raw'];?>
">
			<meta property="og:video:secure_url" content="<?php echo @constant('_URL');?>
/uploads/videos/<?php echo $_smarty_tpl->tpl_vars['video_data']->value['url_flv_raw'];?>
">
		<?php }?>
	<?php }?>
	<style type="text/css">
		body{ color:#ffffff; } <?php echo $_smarty_tpl->tpl_vars['theme_customizations']->value;?>


		.modal {
  display: none;
  position: fixed;
  z-index: 1000;
  left: 0; top: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
}

.modal-content {
  background: #000;
  margin: 5% auto;
  padding: 108px 34px 400px 25px;
  width: 95%;
  max-width: 100%;
  border-radius: 8px;
  position: relative;
  max-height: 100%;
}

#searchInput {
  width: 100%;
  padding: 0.5rem;
  font-size: 1.5rem;
  background: #000;
  color: #fff;
  opacity: 1;
  font-weight: normal;
}

.close {
  position: absolute;
  top: 10px; right: 15px;
  font-size: 40px;
  cursor: pointer;
  color: #fff !important;
  opacity: 1;
  font-weight: normal;
}
	</style>
	<link rel="stylesheet" type="text/css" media="screen" href="<?php echo @constant('_URL');?>
/beta/styles.css">
</head>
<?php if ($_smarty_tpl->tpl_vars['tpl_name']->value == "video-category") {?>

	<body class="video-category catid-<?php echo $_smarty_tpl->tpl_vars['cat_id']->value;?>
 page-<?php echo $_smarty_tpl->tpl_vars['gv_pagenumber']->value;?>
" style=" background-color: #000000 !important;">
	<?php } elseif ($_smarty_tpl->tpl_vars['tpl_name']->value == "video-watch") {?>

		<body
			class="video-watch videoid-<?php echo $_smarty_tpl->tpl_vars['video_data']->value['id'];?>
 author-<?php echo $_smarty_tpl->tpl_vars['video_data']->value['author_user_id'];?>
 source-<?php echo $_smarty_tpl->tpl_vars['video_data']->value['source_id'];
if ($_smarty_tpl->tpl_vars['video_data']->value['featured'] == 1) {?> featured<?php }
if ($_smarty_tpl->tpl_vars['video_data']->value['restricted'] == 1) {?> restricted<?php }?>"
			style=" background-color: #000000 !important;">
		<?php } elseif ($_smarty_tpl->tpl_vars['tpl_name']->value == "article-category") {?>

			<body class="article-category catid-<?php echo $_smarty_tpl->tpl_vars['cat_id']->value;?>
" style=" background-color: #000000 !important;">
			<?php } elseif ($_smarty_tpl->tpl_vars['tpl_name']->value == "article-read") {?>

				<body
					class="article-read articleid-<?php echo $_smarty_tpl->tpl_vars['article']->value['id'];?>
 author-<?php echo $_smarty_tpl->tpl_vars['article']->value['author'];?>
 <?php if ($_smarty_tpl->tpl_vars['article']->value['featured'] == 1) {?> featured<?php }
if ($_smarty_tpl->tpl_vars['article']->value['restricted'] == 1) {?> restricted<?php }?>"
					style=" background-color: #000000 !important;">
				<?php } elseif ($_smarty_tpl->tpl_vars['tpl_name']->value == "page") {?>

					<body class="page pageid-<?php echo $_smarty_tpl->tpl_vars['page']->value['id'];?>
 author-<?php echo $_smarty_tpl->tpl_vars['page']->value['author'];?>
" style=" background-color: #000000 !important;">
					<?php } elseif ($_smarty_tpl->tpl_vars['tpl_name']->value == "video-watch-episode") {?>

						<body
							class="video-watch-episode series-<?php echo $_smarty_tpl->tpl_vars['episode_data']->value['series_id'];
if ($_smarty_tpl->tpl_vars['episode_data']->value['featured'] == 1) {?> featured<?php }
if ($_smarty_tpl->tpl_vars['episode_data']->value['restricted'] == 1) {?> restricted<?php }?>"
							style=" background-color: #000000 !important;">
						<?php } elseif ($_smarty_tpl->tpl_vars['tpl_name']->value == "video-series") {?>

							<body class="video-series" style=" background-color: #000000 !important;">
							<?php } else { ?>

								<body style=" background-color: #000000 !important;">
								<?php }?>
								<?php if (($_smarty_tpl->tpl_vars['tpl_name']->value == 'article-read' || $_smarty_tpl->tpl_vars['tpl_name']->value == 'video-watch' || $_smarty_tpl->tpl_vars['tpl_name']->value == 'video-watch-episode') && $_smarty_tpl->tpl_vars['comment_system_facebook']->value) {?>
									<!-- Facebook Javascript SDK -->
									<div id="fb-root"></div>
									
										<?php echo '<script'; ?>
>
											(function(d, s, id) {
												var js, fjs = d.getElementsByTagName(s)[0];
												if (d.getElementById(id))
													return;
												js = d.createElement(s);
												js.id = id;
												js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2";
												fjs.parentNode.insertBefore(js, fjs);
											}(document, 'script', 'facebook-jssdk'));
											window.fbAsyncInit = function() {
												FB.init({
													xfbml: false // Will stop the fb like button from rendering automatically
												});
											};
										<?php echo '</script'; ?>
>
									
								<?php }?>
								<?php if ($_smarty_tpl->tpl_vars['maintenance_mode']->value) {?>
									<div class="alert alert-danger" align="center"><strong>Currently running in maintenance mode.</strong>
									</div>
								<?php }?>

								<?php echo '<script'; ?>
>
									window.onload = function(e) {
										$('nav.navbar li.dropdown').hover(function() {
											event.preventDefault();
											event.stopPropagation();
											if (window.innerWidth >= 992) {
												$(this).addClass('open');
											}
										}, function() {
											event.preventDefault();
											event.stopPropagation();
											if (window.innerWidth >= 992) {
												$(this).removeClass('open');
											};
										});
										$('nav.navbar li.dropdown>a').click(function() {
											event.preventDefault();
											event.stopPropagation();
											if (window.innerWidth <= 991) {
												if ($(this).siblings('ul.dropdown-menu').length > 0) {
													if ($(this).parent('li.dropdown').hasClass('open')) {
														$(this).parent('li.dropdown').removeClass('open');
													} else {
														$(this).parent('li.dropdown').siblings('li.dropdown').removeClass('open');
														$(this).parent('li.dropdown').find('li.dropdown-submenu').removeClass('open');
														$(this).parent('li.dropdown').addClass('open');
													}
												}
											}
										});
										$('nav.navbar li.dropdown-submenu>a').click(function() {
											event.preventDefault();
											event.stopPropagation();
											if (window.innerWidth <= 991) {
												console.log('click alkjdl');
												if ($(this).siblings('ul.dropdown-menu').length > 0) {
													if ($(this).parent('li.dropdown-submenu').hasClass('open')) {
														$(this).parent('li.dropdown-submenu').removeClass('open');
													} else {
														$(this).parent('li.dropdown-submenu').siblings('li.dropdown-submenu').removeClass('open');
														$(this).parent('li.dropdown-submenu').addClass('open');
													}
												}
											}
										});
										$('.searchToggleBtn').click(function(event) {
											if ($('header .collapse.navbar-collapse').hasClass('in')) {
												$('.navbar-toggle').click();
											}
											$('.searchWrapper').fadeIn();
											// $('#pm-search').focus();
										});
										$('.searchWrapper').hover(function() {}, function() {
											$('.searchWrapper').fadeOut();
										});
										$('.closeSearchBtn').click(function(event) {
											$('.searchWrapper').fadeOut();
										});
										$(document).click(function(event) {
											$target = $(event.target);
											if ($(event.target).hasClass('searchToggleBtn')) {
												// console.log('kjadlfjaldj');
											} else {
												if (!$target.closest('.searchWrapper').length && $('.searchWrapper').is(":visible")) {
													$('.searchWrapper').fadeOut();
												}
											}
										});
										// if (window.innerWidth >= 992) {
										//     if ($('.searchWrapper>form').length > 0) {
										//         $('.searchWrapper>form').remove().clone().prependTo('.mobileHeightFix');
										//     }
										// }
										if (window.innerWidth <= 991) {
											if ($('.lgSearchWrap>form').length > 0) {
												// $('.lgSearchWrap>form').remove().clone().prependTo('.searchWrapper')
											}
										}
										$(window).resize(function(event) {
											if (window.innerWidth >= 992) {
												if ($('.searchWrapper>form').length > 0) {
													//       $('.searchWrapper>form').remove().clone().prependTo('.lgSearchWrap');
												}
											} else if (window.innerWidth <= 991) {
												console.log('991<')
												if ($('.lgSearchWrap>form').length > 0) {
													//   $('.lgSearchWrap>form').remove().clone().prependTo('.searchWrapper')
												}
											}
										});
									}

									function hideSearch() {
										$('.searchWrapper').fadeOut();
									}
								<?php echo '</script'; ?>
>

								<style>
									.navbar-nav li {
										margin-top: 0 !important;
										margin-right: 0 !important;
										margin-top: 0 !important;
										padding: 0 !important;
									}

									.navbar-nav>li:last-child {
										margin-right: 0px !important;
									}

									.navbar-nav>li>a {
										padding: 0 !important;
									}

									.navbar-nav>li>a.btn {
										padding: 5px !important;
									}

									#header .nav {
										margin-top: 0 !important;
									}

									.navbar-nav>li>.btn {
										margin-top: 0 !important;
									}

									.pm-search-form {
										margin-bottom: 0 !important;
									}

									.navbar-brand {
										padding: 0 !important;
									}

									.mobileHeightFix .closeSearchBtn {
										display: none !important;
									}

									.lgSearchWrap {
										position: relative;
									}

									.lgSearchWrap>form {
										padding: 0;
									}

									#main_header .centered_menu > ul > li:hover span,
									#main_header .centered_menu > ul > li:hover svg {
										color: #fb2c36;
									}

									#main_header .centered_menu > ul > li:hover .icon {
										transform: rotate(180deg);
									}

									@media (min-width: 992px) {
										.navbar-nav>li {
											margin-right: 20px !important;
										}

										ul.nav.navbar-nav {
											/*padding-top: 8px !important; */
										}

										ul.nav.navbar-nav li.nav-menu-item {
											margin-top: -5px !important;
										}

										ul.nav.navbar-nav+ul.nav.navbar-nav {
											margin-right: 10px;
										}

										header .header-logo {
											/*margin-left: -15px;*/
										}

										ul.nav.navbar-nav.headerBtns {
											/*padding-top: 5px !important;*/
										}

										header .navbar-collapse {
											text-align: center;
										}

										header .mobileHeightFix>*:not(.hide-me) {
											display: inline-block !important;
											float: none !important;
											vertical-align: middle;
											padding: 0;
											margin: 0 5px;
										}

										.navbar-collapse {
											padding-right: 0 !important;
											padding-left: 0 !important;
											padding-top: 12px;
										}
									}

									@media (max-width: 991px) {
										.dontate-btn {
									        background:transparent; border:none;
										}
									        
									   .dontate-btn .pt-3 {
                                           padding-top: .75rem;
                                           text-decoration:none;
                                         }
                                        .w-full {
                                           width: 100%;
                                         }
                                        .flex {
                                            display: flex;
    
                                        }
									    .duration-200 {
                                                 transition-duration: .2s;
                                          }
                                         .duration-150, .transition-all {
                                          transition-duration: .15s;
                                         }
                                        .transition-all {
                                              transition-property: all;
                                             transition-timing-function: cubic-bezier(.4,0,.2,1);
                                          }
								    
										.searchToggleBtn {
											background-color: #060404 !important;
											border-color: #100d0d;
											border: none;
											width: 290px;
                                            text-align: right;
										}
.pm-video-heading h1, .pm-video-heading .pm-video-watch-featured h2 a, .pm-video-watch-featured h2 .pm-video-heading a{
    color:#696969;
}
									    .shadow, .shadow-2xl {
											box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
										}
										.shadow {
											--tw-shadow: 0 1px 3px 0 rgba(0,0,0,.1), 0 1px 2px -1px rgba(0,0,0,.1);
											--tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
										}

										.gap-x-2 {
											-moz-column-gap: .5rem;
											column-gap: .5rem;
										}
										.justify-end {
											justify-content: flex-end;
										}

										.z-40 {
											z-index: 40;
										}
										.relative {
											position: relative;
										}


										.text-center {
											text-align: center;
										}
										.py-2 {
											padding-top: .5rem;
											padding-bottom: .5rem;
										}

										.bg-brand-primary {
											--tw-bg-opacity: 1;
											background-color: rgb(0 174 239 / var(--tw-bg-opacity));
										}
										.rounded-full {
											border-radius: 9999px;
											line-height: 24px;
										}
										.justify-center {
											justify-content: center;
										}
										.items-center {
											align-items: center;
										}
										.flex {
											display: flex;
										}
										.bg-gradient-sunset {
											background: linear-gradient(135deg, #c63663, #ed6430 50%, #ffdf63);
										}
										.text-white {
											--tw-text-opacity: 1;
											color: rgb(255 255 255 / var(--tw-text-opacity));
										}
										.font-bold {
											font-weight: 700;
										}
										.flex-1 {
											flex: 1 1 0%;
										}
										.flex-1 svg{
											margin-left:1px !important;
											width: 10px !important;
										}

										#content,
										.container {
											padding-bottom: 0px;
										}

										footer {
											margin-top: 40px !important;
										}

										.pm-search-suggestions ul.suggesstionSearch {
											width: 100% !important;
											padding-left: 10px;
											padding-right: 10px;
										}

										.lgSearchWrap {
											display: none;
										}

										.navbar-collapse {
											padding-right: 15px !important;
											padding-left: 15px !important;
										}

										header .navbar-header {
											margin-right: -0 !important;
											margin-left: -0 !important;
										}
									}

									.header-bg {
										background: black !important;
										padding-bottom: 5px !important;
									}

									#header .navbar-brand {
										margin-top: 0 !important;
										margin-left: 0 !important;
									}

									header .header-logo {
										padding: 5px 0;
									}

									header .header-logo img {
										max-height: 50px !important;
										margin-left: 0 !important;
									}

									.navbar-default .navbar-nav>.open>a,
									.navbar-default .navbar-nav>.open>a:focus,
									.navbar-default .navbar-nav>.open>a:hover {
										background: none !important;
									}

									nav.navbar .dropdown-menu>li>a {
										color: #F5F5F5;
										font-size: 14px;
										padding: 5px 0px 5px 20px;
										font-weight: 600;
									}

									.navbar-nav {
										padding: 0 !important;
									}

									#header .navbar {
										margin-bottom: 0 !important;
										background: none;
										border: none;
									}

									header .pm-top-head {
										padding: 0 !important;
									}

									.navbar-toggle {
										margin-right: 0 !important;
										border-color: #bf1e2e !important;
										background: transparent !important;
										margin-top: 12px !important;
									}

									.navbar-default .navbar-toggle .icon-bar {
										background-color: #bf1e2e !important
									}

									nav.navbar .dropdown-menu>li>a.btnClrWhite,
									.clrWhtie {
										color: #fff !important;
									}

									.headerHeightFix {
										height: 60px;
									}

									header {
										position: fixed !important;
										left: 0 !important;
										;
										top: 0 !important;
										width: 100% !important;
									}

									.mob-second-row {
										display: none;
									}

									.donate-button {
										display: none;
									}

									.top-search {
										display: block;
									}

									@media (max-width: 991px) {
									    .dontate-btn{
									        display: none;
									    }
										.top-search {
											display: none;
										}

										.navbar-header {
											float: none;
											padding-left: 15px;
											padding-right: 15px;
										}

										.mobileHeightFix {
											/*height: calc(100vh - 60px);*/
											/*overflow: auto;*/
											/*padding:10px 0;*/
											/*border-top: 1px solid #eee;*/
										}

										header .collapse.navbar-collapse {
											/*padding-right: 0 !important;*/
											background: #fff !important;
										}

										.navbar-left,
										.navbar-right {
											float: none !important;
										}

										.navbar-toggle {
											display: block;
										}

										header .collapse.navbar-collapse {
											/*border-top: 1px solid transparent;*/
											box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
											height: 100vh !important;
											overflow: auto !important;
											background: #FFF !important;
										}

										header .collapse.navbar-collapse.in {
											height: 100vh !important;
											display: block !important;
										}

										.navbar-header {
											height: 60px;
										}

										.navbar-collapse.collapse {
											overflow: auto !important;
										}

										.navbar-fixed-top {
											top: 0;
											border-width: 0 0 1px;
										}

										.navbar-collapse.collapse {
											display: none !important;
										}

										.navbar-nav {
											float: none !important;
											margin-top: 7.5px;
										}

										.navbar-nav>li {
											float: none;
										}

										.navbar-nav>li>a {
											padding-top: 10px;
											padding-bottom: 10px;
										}

										.collapse.in {
											display: block !important;
										}

										.dropdown-submenu>.dropdown-menu {
											left: 0 !important;
											margin-top: 0 !important;
											padding: 0 0 0 20px !important;
										}

										.dropdown-submenu:not(.open)>.dropdown-menu {
											display: none !important;
										}

										header ul.nav.navbar-nav.navbar-right {
											margin: 0 !important
										}

										.header-logo {
											display: block !important
										}

										.navbar-nav>li {
											margin-bottom: 10px !important;
										}

										.navbar-nav>li:last-child {
											margin-bottom: 5px !important;
										}

										.navbar-nav>li>a:not(.btn) {
											background: none !important;
											color: #777777 !important;
										}

										.navbar-nav>li>a.btn {
											display: inline-block;
											/*width: 100px;*/
											padding: 5px 14px !important;
										}

										.searchToggleBtn {
											/*position: absolute;*/
											/*left: 110px;*/
											right: 0;
											/*margin: 11px auto;*/
											z-index: 10;
										}

										.navbar-header {
											display: flex;
											flex-direction: row-reverse;
											align-items: center;
										}

										.searchToggleBtn i {
											pointer-events: none;
										}

										.mastcontent-wrap {
											top: 60px;
										}

										.pm-top-head .container-fluid {
											padding-left: 0px;
											padding-right: 0px;
										}

										.header-bg {
											padding-bottom: 0px !important;
										}

										.live-button a {
											background-color: #C00;
											border-radius: 3px 3px 3px 3px;
											margin: 0px 10px 0px 10px;
											padding: 10px 10px 10px 10px;
											color: #fff;
											font-size: 14px;
											font-weight: 500;
										}

										.mob-second-row {
											display: block;
											width: 81%;
											margin: 0 auto;
										}

										.donate-button {
											display: block;
										}

										.donate-button a {
											background-color: #1BBC9B;
											border-radius: 3px 3px 3px 3px;
											margin: 0px 10px 0px 10px;
											padding: 10px 10px 10px 10px;
											color: #fff;
											font-size: 14px;
											font-weight: 500;
										}

										.mob-second-row .btn-default {
											background-color: #002a3a !important;
											border-color: #002a3a;
										}

										.searchWrapper {
											top: 60px !important;
											height: 60px !important;
										}

										.navbar-header {
											justify-content: space-between;
										}

										.container-fluid.container-footer {
											padding-top: 60px;
										}

										.navbar-nav.navbar-right {
											padding: 20px !important;
										}

										.navbar-nav .open .dropdown-menu {
											position: static;
											float: none;
											width: auto;
											margin-top: 0;
											background-color: transparent;
											border: 0;
											-webkit-box-shadow: none;
											box-shadow: none;
										}

										.navbar-default .navbar-nav .open .dropdown-menu>li>a {
											color: #777;
										}

										.navbar-default .dropdown-menu {
											left: 200vw !important;
										}

										.navbar-nav button.navbar-toggle.collapsed.menubtn {
											right: 32px;
										}
									}

									@media (max-width: 760px) {
										.mob-second-row {
											width: 100%;
										}
									}

									.searchWrapper {
										display: none;
										position: absolute;
										left: 0;
										top: 0;
										height: 100%;
										width: 100%;
										z-index: 100;
										background: #fff;
									}

									.searchWrapper:empty {
										display: none !important
									}

									.searchWrapper form#search {
										padding: 0;
										margin: 10px auto 0 !important;
										width: 270px;
										float: none !important;
										position: relative;
									}

									.searchWrapper form#search>.input-group {
										width: 100%;
									}

									.searchWrapper form#search>.input-group>.input-group-btn {
										width: 34px;
									}

									.searchWrapper form#searchLg {
										padding: 0;
										margin: 10px auto 0 !important;
										width: 270px;
										float: none !important;
										position: relative;
									}

									.searchWrapper form#searchLg>.input-group {
										width: 100%;
									}

									.searchWrapper form#searchLg>.input-group>.input-group-btn {
										width: 34px;
									}

									.closeSearchBtn {
										position: absolute;
										z-index: 10;
										width: 24px;
										height: 24px;
										border-radius: 50%;
										background: #bf1e2e;
										text-align: center;
										right: 0;
										top: 50%;
										line-height: 24px;
										color: #fff;
										-webkit-transform: translate(110%, -50%);
										transform: translate(110%, -50%);
										cursor: pointer;
									}

									.dropdown-menu li {
										display: inline-block !important;
										min-width: 201px !important;
									}

									ul.nav.navbar-nav.navbar-right>li>a {
										font-size: 16px;
										font-weight: 700;
										text-transform: uppercase;
										font-family: 'Oswald', sans-serif;
									}

									ul.nav.navbar-nav.navbar-right .wide-nav-link:hover {
										color: #1BBC9B !important;
									}

									#sign-in-btn {
										font-size: 15px;
										text-transform: unset;
										font-family: 'Roboto';
									}

									header form#search.pm-search-form button {
										height: 35px;
										width: 35px;
									}

									header form#search.pm-search-form input {
										width: 200px;
										padding-left: 5px;
										font-weight: bolder;
										font-size: 16px;
									}

									header form#search.pm-search-form .input-group-btn {
										padding-left: 2px;
									}

									header form#searchLg.pm-search-form button {
										height: 35px;
										width: 35px;
									}

									header form#searchLg.pm-search-form input {
										width: 200px;
										padding-left: 5px;
										font-weight: bolder;
										font-size: 16px;
									}

									header form#searchLg.pm-search-form .input-group-btn {
										padding-left: 2px;
									}

									.pm-search-suggestions ul.pm-search-suggestions-list li a {
										font-weight: 700;
									}

									.navbar .dropdown-menu {
										max-height: 400px;
										/* Adjust as needed */
										overflow-y: auto;
										/* Enable vertical scrolling */
										overflow-x: hidden;
										/* Hide horizontal scrollbar */
										flex-wrap: wrap;
										/* Allow items to wrap onto new lines */
									}

									.navbar .dropdown-menu li {
										flex: 0 0 auto;
										/* Adjust flex items */
									}
									
									.dropdown {
                                      position: relative;
                                      display: inline-block;
                                    }
                                    
                                    /* O conteúdo do dropdown - ESCONDIDO POR PADRÃO */
                                    .dropdown-content {
                                      display: none; /* Continua escondido por padrão */
                                      position: absolute;
                                      min-width: 160px;
                                      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
                                      z-index: 1;
                                      list-style: none;
                                      padding: 0;
                                      margin-top: 5px !important;
                                    }
                                    
                                    /* Links dentro do dropdown */
                                    .dropdown-content a {
                                      color: black;
                                      padding: 8px 0;
                                      text-decoration: none;
                                      display: block;
                                      text-align: left;
                                    }
                                    
                                    .dropdown-content li {
                                        padding: 0 !important;
                                        margin: 0 !important;
                                    }
                                    
                                    
                                    .dropdown-content a:hover {
                                      background-color: #101828;
                                    }
                                    
                                    /* NOVA CLASSE: Esta classe será adicionada/removida pelo JavaScript para mostrar o menu */
                                    .dropdown-content.show {
                                      display: block !important;
                                    }
                                    
                                    
                                    .menuButton {
                                      background: #f00;
                                      padding: 8px 24px;
                                      border-radius: 8px;
                                      font-weight: 700;
                                      transition: all 0.5s ease;
                                    }
                                    
                                    .menuButton:hover{
                                      background: #de0000 !important;   
                                    }
                                    
                                    .menuButton {
                                      background: #f00;
                                      padding: 10px 24px !important;
                                      border-radius: 8px;
                                      font-weight: 700;
                                      width: min-content !important;
                                      transition: all 0.5s ease;
                                    }
                                    
                                    
                                    .menuButton:hover{
                                      background: #de0000 !important;   
                                    }
                                    
                                    #side_menu {
                                      position: fixed;
                                      display: flex;
                                      justify-content: flex-end;
                                      backdrop-filter: blur(40px);
                                      inset: 0;
                                      z-index: 50;
                                      opacity: 0;
                                      visibility: hidden;
                                      transition: all 0.2s;
                                    }
                                    #side_menu a {
                                      color: #fff !important;
                                      text-decoration: none;
                                    }
                                    #side_menu.open {
                                      visibility: visible;
                                      opacity: 1;
                                    }
                                    
                                    #side_menu .bar {
                                      width: 300px;
                                      height: 100%;
                                      background-image: linear-gradient(rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%);
                                      box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
                                        rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
                                        oklab(0 0 0 / 0.5) 0px 10px 15px -3px, oklab(0 0 0 / 0.5) 0px 4px 6px -4px;
                                      transform: translateX(100%);
                                      transition: all 0.2s;
                                    }
                                    
                                    #side_menu.open .bar {
                                      transform: translateX(0);
                                    }
                                    
                                    #side_menu .inner {
                                      padding: 24px;
                                      color: #fff;
                                    }
                                    
                                    #side_menu .top {
                                      display: flex;
                                      justify-content: space-between;
                                      align-items: center;
                                      margin: 0 0 32px;
                                    }
                                    
                                    #side_menu .top h2 {
                                      font-weight: 700;
                                      font-size: 24px;
                                      line-height: 32px;
                                    }
                                    
                                    #side_menu #side_menu_close_button {
                                      padding: 8px;
                                      transition: all 0.2s;
                                      background: transparent;
                                      color: #fff;
                                      cursor: pointer;
                                    }
                                    
                                    #side_menu #side_menu_close_button svg {
                                      width: 18px;
                                      height: 24px;
                                      line-height: 24px;
                                      overflow: visible;
                                      vertical-align: -0.125em;
                                    }
                                    
                                    #side_menu ul {
                                      list-style: none;
                                    }
                                    
                                    #side_menu li {
                                      width: 100%;
                                      margin: 0 0 16px;
                                      padding: 12px;
                                      font-size: 18px;
                                      line-height: 28px;
                                      border-radius: 10px;
                                      transition: all 0.2s;
                                      cursor: pointer;
                                      text-align: -webkit-match-parent;
                                      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                                    }
                                    
                                    #side_menu li:hover {
                                      background-color: #101828;
                                    }
                                    
                                    #side_menu li span {
                                      position: absolute;
                                      padding: 0 8px;
                                      background-image: linear-gradient(
                                        to right,
                                        oklch(0.637 0.237 25.331) 0%,
                                        oklch(0.577 0.245 27.325) 50%,
                                        rgb(255, 255, 255) 100%
                                      );
                                      background-size: 150% 100%;
                                      background-position: 0% 0%;
                                      animation: 2.5s ease-in-out 0s infinite normal none running shine;
                                      text-shadow: rgba(255, 255, 255, 0.5) 0px 0px 5px;
                                      font-size: 12px;
                                      line-height: 16px;
                                      font-weight: 700;
                                      border-radius: 6px;
                                    }
								</style>

								<div class="container-fluid no-padding">
									
				<!---------------->
							<div id="main_header">
									<div class="logo">       
										<img src="<?php echo $_smarty_tpl->tpl_vars['_custom_logo_url']->value;?>
" alt="<?php echo @constant('_SITENAME');?>
" width="150" height="50">
									</div>
									<div class="hidden-lg hidden-md searchWrapper">
																						<form action="<?php echo @constant('_URL');?>
/search.php" method="get" id="searchLg"
																							class="navbar-form pm-search-form" name="searchLg"
																							onSubmit="return validateSearch('true');">
																							<i class="fa fa-close closeSearchBtn" onclick="hideSearch()"></i>
																							<div class="input-group">
																								<input class="form-control" id="pm-search" size="16" name="keywords" type="text"
																									placeholder="<?php echo $_smarty_tpl->tpl_vars['lang']->value['submit_search'];?>
..." x-webkit-speech="x-webkit-speech"
																									onwebkitspeechchange="this.form.submit();"
																									<?php if (@constant('_SEARCHSUGGEST') == 1) {?>onblur="fill();" autocomplete="off" <?php }?>>
																								<input class="form-control" id="pm-video-lg-id" size="16" name="video-id"
																									type="hidden">
																								<span class="input-group-btn">
																									<button class="btn btn-default" type="submit"><i
																											class="fa fa-search clrWhtie"></i></button>
																								</span>
																							</div><!-- /input-group -->
																						</form>
																						<div class="pm-search-suggestions hide-me">
																							<ul class="pm-search-suggestions-list list-unstyled suggesstionSearch"></ul>
																						</div>

																					</div>
									<div class="centered_menu">
									
										<ul>
											<li>
                                                <button id="openSearch" style="background: transparent; border: none; font-size: 18px; color: #fff;"> <i class="fas fa-search"></i></button>
												<div id="searchModal" class="modal">
													<div class="modal-content">
														<span id="closeSearch" class="close">&times;</span>
															<input type="text" id="searchInput" placeholder="Type to search...">
														<div id="channel-grid" class="channel-grid"> </div>
													</div>
												</div>
											</li>
											<li>
												<a class="flex items-center justify-center rounded-full bg-brand-primary py-2 text-center text-sm font-bold text-white" target="_self" data-tealium_event="navigate" data-event_action="link" data-event_label="On Demand" data-event_location="header" href="https://www.eternityready.com/category.php">On Demand</a>
												<div class="icon">
													<svg aria-hidden="true" focusable="false" data-icon="angle-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path></svg>
												</div>
												<div class="submenu">
													<ul>
														<li>Option 1</li>
														<li>Option 2</li>
														<li>Option 3</li>
													</ul>
												</div>
											</li>
										
											<li>
												<a class="flex items-center justify-center rounded-full bg-brand-primary py-2 text-center text-sm font-bold text-white" target="_self" data-tealium_event="navigate" data-event_action="link" data-event_label="TV" data-event_location="header" href="https://tv.eternityready.com/" >TV & Movies</a>
												
											</li>
											
											<li>
												<a class="flex items-center justify-center rounded-full bg-brand-primary py-2 text-center text-sm font-bold text-white" target="_self" data-tealium_event="navigate" data-event_action="link" data-event_label="Podcasts" data-event_location="header" href="https://podcasts.eternityready.com/" >Podcasts</a>
											
											</li>   
											<li>
												<a class="flex items-center justify-center rounded-full bg-brand-primary py-2 text-center text-sm font-bold text-white" target="_self" data-tealium_event="navigate" data-event_action="link" data-event_label="Music" data-event_location="header" href="https://www.eternityready.com/radio" >Music & Radio</a>
												
											</li>
										</ul>
									</div>
									<div class="right">
										<button onclick="window.open('https://eternityreadyradio.com/', '_self')">Radio</button>
										<div id="burger_menu">
											<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu text-white cursor-pointer"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>
										</div>
									</div>

								</div>
							</div>
							<div id="side_menu">
										<div class="bar">
											<div class="inner">
												<div class="top">
													<h2>Menu</h2>
													<button id="side_menu_close_button">
														<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path>
														</svg>
													</button>
												</div>
                                                   <ul>
                                                        <li class="item"><button id="openSearch2" style="background: transparent; border: none; font-size: 18px; color: #fff;"> <i class="fas fa-search"></i></button></li>
                                                        <li class="item menuButton"><a href="https://www.eternityready.com/donate" target="_self">Donate</a></li>
                                                        <li class="item"><a href="https://www.eternityready.com/radio" target="_self">Music & Radio</a></li>
                                                        <li class="item"><a href="https://podcasts.eternityready.com/" target="_self">Podcasts</a></li>
                                                        <li class="item"><a href="https://tv.eternityready.com/" target="__self">TV & Movies</a></li>
                                                        <li class="item dropdown">
                                                            <a href="#" id="dropdown-btn" target="_self">More Options  &#9662;</a>
                                                            <ul class="dropdown-content" id="dropdown-menu">
                                                                <li><a href="/link-submenu-1">Sub-item 1</a></li>
                                                                <li><a href="/link-submenu-2">Sub-item 2</a></li>
                                                                <li><a href="/link-submenu-3">Sub-item 3</a></li>
                                                            </ul>
                                                        </li>
                                                   </ul>
											</div>
										</div>
									</div>
									<!---------------->


									


									<?php if (!$_smarty_tpl->tpl_vars['logged_in']->value) {?>
										<?php $_smarty_tpl->_subTemplateRender("file:modal-user-login.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
										<?php if ($_smarty_tpl->tpl_vars['allow_registration']->value == '1') {?>
											<?php $_smarty_tpl->_subTemplateRender("file:modal-user-register.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
										<?php }?>
									<?php }?>

									<?php if (@constant('_ALLOW_USER_SUGGESTVIDEO') == '1' && @constant('_ALLOW_USER_UPLOADVIDEO') == '1') {?>
										<?php $_smarty_tpl->_subTemplateRender("file:modal-addvideo.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
									<?php }?>
									<a id="top"></a>

									
	

<?php echo '<script'; ?>
>
    const dropdownBtn = document.getElementById("dropdown-btn");
    const dropdownMenu = document.getElementById("dropdown-menu");

    dropdownBtn.addEventListener("click", function(event) {
        console.log("oi")
        event.preventDefault(); 
        event.stopPropagation(); 
        dropdownMenu.classList.toggle("show");
    });

    window.addEventListener("click", function(event) {
        if (dropdownMenu.classList.contains('show') && !dropdownBtn.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove('show');
        }
    });
<?php echo '</script'; ?>
>								

<?php echo '<script'; ?>
>

document.getElementById('burger_menu').addEventListener('click', () => {
			document.getElementById('side_menu').classList.toggle('open');
			document.body.classList.toggle('overflow_hidden');
		});

		document.getElementById('side_menu_close_button').addEventListener('click', () => {
			document.getElementById('side_menu').classList.toggle('open');
			document.body.classList.toggle('overflow_hidden');
		});

const openBtn = document.getElementById("openSearch");
const openBtn2 = document.getElementById("openSearch2");

const modal = document.getElementById("searchModal");
const closeBtn = document.getElementById("closeSearch");
const input = document.getElementById("searchInput");
const results = document.getElementById("searchResults");
const resultEL = document.getElementById("channel-grid");

openBtn.onclick = () => { 
    modal.classList.add('show');
    input.focus();
  };
  
openBtn2.onclick = function () { 
		document.getElementById('side_menu').classList.remove('open');
		modal.classList.add('show');
        input.focus();
};
			
closeBtn.onclick = () => {
      modal.classList.remove('show');
      input.value = '';
      resultsEl.innerHTML = '';
};

window.onclick = (e) => {
  if (e.target === modal) {
    closeBtn.click();
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  const res = await fetch('content.json');
  const pages = await res.json();
  const input = document.getElementById('searchInput');

  input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    console.log(query);
    if (!query) {
      resultsEl.innerHTML = '';
      return;
    }

    const filtered = pages.filter(page =>
      page.title.toLowerCase().includes(query) ||
      page.video_slug.toLowerCase().includes(query)
    );
    
    

    const container2 = document.querySelector('.channel-grid');
    container2.innerHTML = filtered.map(page => `
    <li></li>
    <div class="channel-card">
           <img src="<?php echo $_smarty_tpl->tpl_vars['page']->value['image'];?>
" style="width:100%">
            <div class="channel-details">
                <div class="main_buttons item show">
									<span style="width: 116%;">Radio</span>
										<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 384 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
										<path d="M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z"></path>
									</svg>
								
							</div>
            </div></div>`).join('');

  });
});

<?php echo '</script'; ?>
><?php }
}
