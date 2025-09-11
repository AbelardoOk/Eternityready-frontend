<?php
/* Smarty version 3.1.33, created on 2025-08-08 04:21:56
  from '/home/eternity/public_html/old/templates/apollo/player.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.33',
  'unifunc' => 'content_68957b6430bb77_71278401',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '8a6e3e660c63c039082424086eb32138b05fb30c' => 
    array (
      0 => '/home/eternity/public_html/old/templates/apollo/player.tpl',
      1 => 1730391551,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:user-auth-login-form.tpl' => 1,
  ),
),false)) {
function content_68957b6430bb77_71278401 (Smarty_Internal_Template $_smarty_tpl) {
if ($_smarty_tpl->tpl_vars['video_data']->value['restricted'] == '1' && !$_smarty_tpl->tpl_vars['logged_in']->value) {?>
<div class="pm-restricted-item">
	<h2><?php echo $_smarty_tpl->tpl_vars['lang']->value['restricted_sorry'];?>
</h2>
	<p><?php echo $_smarty_tpl->tpl_vars['lang']->value['restricted_register'];?>
</p>
	<div class="pm-restricted-login-form">
	<?php $_smarty_tpl->_subTemplateRender('file:user-auth-login-form.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
	</div>
</div>
<?php } else {
if ($_smarty_tpl->tpl_vars['page']->value == "detail") {?>
	<?php if ($_smarty_tpl->tpl_vars['total_video_ads']->value > 0) {?>
		 
		<?php echo '<script'; ?>
 type="text/javascript">
		var embed_code = '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['embed_code'];?>
';
		<?php echo '</script'; ?>
>
		<link href="<?php echo @constant('_URL2');?>
/players/video-js/video-js.min.css" rel="stylesheet">
		<link href="<?php echo @constant('_URL2');?>
/players/video-js/video-js.pm.css" rel="stylesheet">
		<?php echo '<script'; ?>
 src="<?php echo @constant('_URL2');?>
/players/video-js/video.js" type="text/javascript"><?php echo '</script'; ?>
>
		<?php echo '<script'; ?>
 src="<?php echo @constant('_URL2');?>
/players/video-js/plugins/videojs.hotkeys.min.js"><?php echo '</script'; ?>
>
		<div id="embed_Playerholder">
		 <div id="<?php echo $_smarty_tpl->tpl_vars['video_ad_hash']->value;?>
-playerholder">
		 </div>
		</div>

		<div class="preroll-wrap">
			<div class="preroll-ad-url">
				<a href="<?php echo @constant('_URL2');?>
/videoads.php?h=<?php echo $_smarty_tpl->tpl_vars['video_ad_hash']->value;?>
&tz=t" target="_blank"></a>			
			</div>
			<div class="preroll-skip-button">
				<a href="" onclick="skipAds()"><?php echo (($tmp = @$_smarty_tpl->tpl_vars['lang']->value['preroll_ads_skip'])===null||$tmp==='' ? "Skip Ad" : $tmp);?>
</a>
			</div>
		</div>

		<video src="" id="video-js" class="video-js vjs-default-skin" poster="" preload="auto" data-setup='{ "techOrder": ["html5"], "controls": true, "autoplay": true }' width="100%" height="<?php echo @constant('_PLAYER_H');?>
"></video>
		<?php echo '<script'; ?>
 type="text/javascript">
				var skipTime = 2;
				var video = videojs('video-js').ready(function(){
					var player = this;
					var currentTime = 0;
					var playbackTime = player.currentTime();
					
					
					player.on('loadedmetadata', function() {
						$('.vjs-big-play-button').addClass('vjs-pm-show-big-play');
					});

					player.on("timeupdate", function(event) {
						if(player.currentTime() >= skipTime && player.currentTime() < skipTime + 1) {
							$('.preroll-skip-button').addClass('.enabled').show();
						}
					});

					player.on("seeking", function(event) {
					  if (currentTime < player.currentTime()) {
					    player.currentTime(currentTime);
					  }
					});

					player.on("seeked", function(event) {
					  if (currentTime < player.currentTime()) {
					    player.currentTime(currentTime);
					  }
					});

					setInterval(function() {
					  if (!player.paused()) {
					    currentTime = player.currentTime();
					  }
					}, 1000);

					player.src([
						{
							src: "<?php echo @constant('_URL2');?>
/videoads.php?h=<?php echo $_smarty_tpl->tpl_vars['video_ad_hash']->value;?>
",
							type: "video/mp4"
						}
					]);

					player.on('ended', function() {
						player.dispose();
						$('.preroll-wrap').hide();
						ajax_request("video", "do=getplayer&vid=<?php echo $_smarty_tpl->tpl_vars['video_data']->value['uniq_id'];?>
&aid=&player=<?php echo $_smarty_tpl->tpl_vars['page']->value;?>
&playlist=<?php echo $_smarty_tpl->tpl_vars['playlist']->value['list_uniq_id'];?>
", "#embed_Playerholder", "html");
					});
				});


				this.skipAds = function(){
					event.preventDefault();
					videojs('video-js').dispose(); 
					$('.preroll-wrap').hide();
					ajax_request("video", "do=getplayer&vid=<?php echo $_smarty_tpl->tpl_vars['video_data']->value['uniq_id'];?>
&aid=&player=<?php echo $_smarty_tpl->tpl_vars['page']->value;?>
&playlist=<?php echo $_smarty_tpl->tpl_vars['playlist']->value['list_uniq_id'];?>
", "#embed_Playerholder", "html");
				}


		<?php echo '</script'; ?>
>
		
	<?php } else { ?>

	<!-- Inplayer ads -->
	<?php if ($_smarty_tpl->tpl_vars['ad_900']->value != '' && $_smarty_tpl->tpl_vars['video_data']->value['restricted'] != '1') {?>
	<div class="pm-ads-inplayer alert-dismissible">
		<?php echo $_smarty_tpl->tpl_vars['ad_900']->value;?>

		<button type="button" class="close" data-dismiss="alert" aria-label="Close">
			<span aria-hidden="true">&times;</span>
		</button>
	</div>
	<?php }?>

	<?php if ($_smarty_tpl->tpl_vars['video_data']->value['video_player'] == "flvplayer") {?>
		
			<div id="Playerholder">
				<noscript>
					{$lang.enable_javascript}
				</noscript>
				<em>{$lang.please_wait}</em>
			</div>
			<?php echo '<script'; ?>
 type="text/javascript">
			var clips = "[ { name: 'ClickToPlay', overlayId: 'play', url: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['preview_image'];?>
' },";
			
			clips = clips + " { name: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['uniq_id'];?>
', url: '<?php echo @constant('_URL2');?>
/videos.php?vid=<?php echo $_smarty_tpl->tpl_vars['video_data']->value['uniq_id'];?>
', <?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['mp3']['source_id']) {?>type: 'mp3'<?php }?> } ]";
			
			var flashvars = {
				config: "{ playList: " + clips + ", useSmoothing: true, baseURL: '', autoPlay: <?php if ($_smarty_tpl->tpl_vars['playlist']->value) {?>true<?php } else {
echo (($tmp = @$_smarty_tpl->tpl_vars['video_data']->value['video_player_autoplay'])===null||$tmp==='' ? @constant('_AUTOPLAY') : $tmp);
}?>, autoBuffering: <?php echo @constant('_AUTOBUFF');?>
, startingBufferLength: 2, bufferLength: 5, loop: false,hideControls: false,initialScale: 'fit', showPlayListButtons: false, useNativeFullScreen: true,controlBarGloss: 'high', controlsOverVideo: 'locked', watermarkUrl: '<?php echo @constant('_WATERMARKURL');?>
', showWatermark: '<?php echo @constant('_WATERMARKSHOW');?>
', watermarkLinkUrl: '<?php echo @constant('_WATERMARKLINK');?>
', controlBarBackgroundColor: '0x<?php echo @constant('_BGCOLOR');?>
', progressBarColor1: '0xFFFFFF', progressBarColor2: '0x000000', timeDisplayFontColor: '0x<?php echo @constant('_TIMECOLOR');?>
', noVideoClip: { url: '<?php echo @constant('_URL');?>
/templates/<?php echo @constant('_TPLFOLDER');?>
/img/notfound.jpg' }, menuItems: [ false, false, true, true, true, false, false ], showStopButton: true, useHwScaling: false, showOnLoadBegin: true }"
			};
			
			var params = {
				allowfullscreen: "true",
				allowScriptAccess: "always",
				wmode: "opaque"
			};
			var attributes = {};
			swfobject.embedSWF("<?php echo @constant('_URL2');?>
/players/flowplayer2/flowplayer.swf", "Playerholder", "<?php echo @constant('_PLAYER_W');?>
", "<?php echo @constant('_PLAYER_H');?>
", "9.0.115", false, flashvars, params, attributes);

			function onStreamNotFound(a){
			   <?php if ($_smarty_tpl->tpl_vars['playlist']->value) {?>
				window.location = "<?php echo $_smarty_tpl->tpl_vars['playlist_next_url']->value;?>
";
				<?php }?>
			}
			function onClipDone(clip) {
				if (clip.name != "Advertisment") {
					<?php if ($_smarty_tpl->tpl_vars['playlist']->value) {?>
					window.location = "<?php echo $_smarty_tpl->tpl_vars['playlist_next_url']->value;?>
";
					<?php } else { ?>
						if (pm_video_data.autoplay_next && pm_video_data.autoplay_next_url != "") {
							window.location = pm_video_data.autoplay_next_url;
						}
					<?php }?>
				}
			}
			<?php echo '</script'; ?>
>
		
	<?php } elseif ($_smarty_tpl->tpl_vars['video_data']->value['video_player'] == "jwplayer") {?>
				<div id="Playerholder">
				<noscript>
					<?php echo $_smarty_tpl->tpl_vars['lang']->value['enable_javascript'];?>

				</noscript>
				<em><?php echo $_smarty_tpl->tpl_vars['lang']->value['please_wait'];?>
</em>
				</div>
				
				<?php echo '<script'; ?>
 type="text/javascript" src="<?php echo @constant('_URL2');?>
/players/jwplayer5/jwplayer.js"><?php echo '</script'; ?>
>
				<?php echo '<script'; ?>
 type='text/javascript'>
					var flashvars = {
						"flashplayer": "<?php echo @constant('_URL2');?>
/players/jwplayer5/jwplayer.swf",
						"playlist": [{
						
						<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == 0) {?>
							file: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['file'];?>
',
							image: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['preview_image'];?>
',
							streamer: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['streamer'];?>
',
							<?php if ($_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['provider'] != '') {?> provider: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['provider'];?>
',<?php }?>
							<?php if ($_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['startparam'] != '') {?> 'http.startparam': '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['startparam'];?>
',<?php }?>
							<?php if ($_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['loadbalance'] != '') {?> 'rtmp.loadbalance': '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['loadbalance'];?>
',<?php }?>
							<?php if ($_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['subscribe'] != '') {?> 'rtmp.subscribe': '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['subscribe'];?>
',<?php }?>
						<?php } elseif ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['youtube']['source_id']) {?>
							
							file: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['direct'];?>
',
							image: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['preview_image'];?>
',
							
						<?php } elseif ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['gfycat']['source_id']) {?>
							
							file: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['url_flv'];?>
',
								
						<?php } else { ?>
							
							file: '<?php echo @constant('_URL2');?>
/videos.php?vid=<?php echo $_smarty_tpl->tpl_vars['video_data']->value['uniq_id'];?>
',
							<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['mp3']['source_id']) {?>
							type: 'audio',
							<?php } else { ?>
							type: 'video',
							<?php }?>
							image: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['preview_image'];?>
',
							
						<?php }?>
						
						}],
						"controlbar": {
							"position": "bottom",
						},
						'wmode': 'transparent',
						'allowfullscreen': 'true',
						'allowscriptaccess': 'always',
						'allownetworking': 'all',
						'name': '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['uniq_id'];?>
',
						'id': '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['uniq_id'];?>
',
						'width': "100%",
						<?php if ($_smarty_tpl->tpl_vars['playlist']->value) {?>
						// 'height': "401px",
						'autostart': "true",
						<?php } else { ?>
						// 'height': "<?php echo @constant('_PLAYER_H');?>
",
						'autostart': "<?php echo (($tmp = @$_smarty_tpl->tpl_vars['video_data']->value['video_player_autoplay'])===null||$tmp==='' ? @constant('_AUTOPLAY') : $tmp);?>
", 
						<?php }?>
						'enablejs': "true",
						'backcolor': "<?php echo @constant('_BGCOLOR');?>
",
						'frontcolor': "<?php echo @constant('_TIMECOLOR');?>
",
						'screencolor': "000000",
						'repeat': "false",
						'logo': "<?php echo @constant('_WATERMARKURL');?>
",
						'linktarget': "_blank",
						'link': "<?php echo @constant('_WATERMARKLINK');?>
",
						'image': "<?php echo $_smarty_tpl->tpl_vars['video_data']->value['preview_image'];?>
", // XTRA
						'bufferlength': "5",
						'shownavigation':"true",
						'skin': "<?php echo @constant('_URL2');?>
/players/jwplayer5/skins/<?php echo @constant('_JWSKIN');?>
",
						'stretching': "fill",
						"plugins": {
								'captions': {
									<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['video_subtitles']->value, '_video_subtitles', false, 'k');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['k']->value => $_smarty_tpl->tpl_vars['_video_subtitles']->value) {
?>
									file: "<?php echo $_smarty_tpl->tpl_vars['_video_subtitles']->value['filename'];?>
",
									<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
								},
								//'timeslidertooltipplugin-3': {},
								'sharing-3': {
									'link': '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['video_href'];?>
',
									'code': encodeURIComponent('<?php echo $_smarty_tpl->tpl_vars['embedcode']->value;?>
')
								}
						},
						"events": {
								onComplete: function() {
									<?php if ($_smarty_tpl->tpl_vars['playlist']->value) {?>
									window.location = "<?php echo $_smarty_tpl->tpl_vars['playlist_next_url']->value;?>
";
									<?php } else { ?>
										
										if (pm_video_data.autoplay_next && pm_video_data.autoplay_next_url != "") {
											window.location = pm_video_data.autoplay_next_url;
										}
										
									<?php }?>
								},
								onError: function(object) { 
								ajax_request("video", "do=report&vid=<?php echo $_smarty_tpl->tpl_vars['video_data']->value['uniq_id'];?>
&error-message="+ object.message, "", "", false);
								<?php if ($_smarty_tpl->tpl_vars['playlist']->value) {?>
								window.location = "<?php echo $_smarty_tpl->tpl_vars['playlist_next_url']->value;?>
";
								<?php }?>
								}
							}
			};
		<?php echo $_smarty_tpl->tpl_vars['jw_flashvars_override']->value;?>

		jwplayer("Playerholder").setup(flashvars);
		<?php echo '</script'; ?>
>
			
	
  <?php } elseif ($_smarty_tpl->tpl_vars['video_data']->value['video_player'] == "jwplayer6") {?>
		<div id="Playerholder">
		<noscript>
			<?php echo $_smarty_tpl->tpl_vars['lang']->value['enable_javascript'];?>

		</noscript>
		<em><?php echo $_smarty_tpl->tpl_vars['lang']->value['please_wait'];?>
</em>
		</div>
		
		<?php echo '<script'; ?>
 type="text/javascript" src="<?php echo @constant('_URL2');?>
/players/jwplayer6/jwplayer.js"><?php echo '</script'; ?>
>
		<?php echo '<script'; ?>
 type="text/javascript">jwplayer.key="<?php echo $_smarty_tpl->tpl_vars['jwplayerkey']->value;?>
";<?php echo '</script'; ?>
>
		<?php echo '<script'; ?>
 type="text/javascript">
			var flashvars = {
					
						<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == 0) {?>
							file: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['file'];?>
',
							streamer: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['streamer'];?>
',
							rtmp: {
							<?php if ($_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['provider'] != '') {?> provider: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['provider'];?>
',<?php }?>
							<?php if ($_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['startparam'] != '') {?> startparam: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['startparam'];?>
',<?php }?>
							<?php if ($_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['loadbalance'] != '') {?> loadbalance: <?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['loadbalance'];?>
,<?php }?>
							<?php if ($_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['subscribe'] != '') {?> subscribe: <?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['subscribe'];?>
,<?php }?>
							<?php if ($_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['securetoken'] != '') {?> securetoken: "<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['securetoken'];?>
",<?php }?>
							},
						<?php } elseif ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['localhost']['source_id']) {?>
							
							file: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['url_flv'];?>
',
							//image: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['preview_image'];?>
',
							
						<?php } elseif ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['youtube']['source_id']) {?>
							
							file: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['direct'];?>
',
							//image: '//img.youtube.com/vi/<?php echo $_smarty_tpl->tpl_vars['video_data']->value['yt_id'];?>
/hqdefault.jpg',
							
						<?php } elseif ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['mp3']['source_id']) {?>
							
							file: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['url_flv'];?>
',
							type: 'mp3',
							//image: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['preview_image'];?>
',
						<?php } else { ?>		
							
							file: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['url_flv'];?>
',
							//image: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['preview_image'];?>
',
						<?php }?>
						
						flashplayer: "<?php echo @constant('_URL2');?>
/players/jwplayer6/jwplayer.flash.swf",                        
						primary: "html5",
						width: "100%",
						height: "100%",
						<?php if ($_smarty_tpl->tpl_vars['playlist']->value) {?>
						//height: "401", 
						autostart: true, 
						<?php } else { ?>
						//height: "<?php echo @constant('_PLAYER_H');?>
",
						autostart: "<?php echo (($tmp = @$_smarty_tpl->tpl_vars['video_data']->value['video_player_autoplay'])===null||$tmp==='' ? @constant('_AUTOPLAY') : $tmp);?>
", 
						<?php }?>					
						image: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['preview_image'];?>
',
						stretching: "fill",
						events: {
							onComplete: function() {
								<?php if ($_smarty_tpl->tpl_vars['playlist']->value) {?>
								window.location = "<?php echo $_smarty_tpl->tpl_vars['playlist_next_url']->value;?>
";
								<?php } else { ?>
									if (pm_video_data.autoplay_next && pm_video_data.autoplay_next_url != "") {
										window.location = pm_video_data.autoplay_next_url;
									}
								<?php }?>
							},
							onError: function(object) { 
								ajax_request("video", "do=report&vid=<?php echo $_smarty_tpl->tpl_vars['video_data']->value['uniq_id'];?>
&error-message="+ object.message, "", "", false);
								<?php if ($_smarty_tpl->tpl_vars['playlist']->value) {?>
								window.location = "<?php echo $_smarty_tpl->tpl_vars['playlist_next_url']->value;?>
";
								<?php }?>
							}
						},
						logo: {
							file: '<?php echo @constant('_WATERMARKURL');?>
',
							link: '<?php echo @constant('_WATERMARKLINK');?>
',
						},
						"tracks": [
						<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['video_subtitles']->value, '_video_subtitles', false, 'k');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['k']->value => $_smarty_tpl->tpl_vars['_video_subtitles']->value) {
?>
							{ file: "<?php echo $_smarty_tpl->tpl_vars['_video_subtitles']->value['filename'];?>
", label: "<?php echo $_smarty_tpl->tpl_vars['_video_subtitles']->value['language'];?>
", kind: "subtitles" },
						<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
						]
						};
						<?php echo $_smarty_tpl->tpl_vars['jw_flashvars_override']->value;?>

			jwplayer("Playerholder").setup(flashvars);
		<?php echo '</script'; ?>
>
		

	<?php } elseif ($_smarty_tpl->tpl_vars['video_data']->value['video_player'] == "jwplayer7") {?>
		<div id="Playerholder">
			<noscript>
				<?php echo $_smarty_tpl->tpl_vars['lang']->value['enable_javascript'];?>

			</noscript>
			<em><?php echo $_smarty_tpl->tpl_vars['lang']->value['please_wait'];?>
</em>
		</div>
		
		<?php echo '<script'; ?>
 type="text/javascript" src="<?php echo @constant('_URL2');?>
/players/jwplayer7/jwplayer.js"><?php echo '</script'; ?>
>
		<?php echo '<script'; ?>
 type="text/javascript">jwplayer.key="<?php echo $_smarty_tpl->tpl_vars['jwplayer7key']->value;?>
";<?php echo '</script'; ?>
>
		<?php echo '<script'; ?>
 type="text/javascript">
			var flashvars = {
					
						<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == 0) {?>
							file: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['file'];?>
',
							image: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['preview_image'];?>
',
							streamer: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['streamer'];?>
',
							rtmp: {
							<?php if ($_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['provider'] != '') {?> provider: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['provider'];?>
',<?php }?>
							<?php if ($_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['startparam'] != '') {?> startparam: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['startparam'];?>
',<?php }?>
							<?php if ($_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['loadbalance'] != '') {?> loadbalance: <?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['loadbalance'];?>
,<?php }?>
							<?php if ($_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['subscribe'] != '') {?> subscribe: <?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['subscribe'];?>
,<?php }?>
							<?php if ($_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['securetoken'] != '') {?> securetoken: "<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['securetoken'];?>
",<?php }?>
							},
						<?php } elseif ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['localhost']['source_id']) {?>
							
							file: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['url_flv'];?>
',
							image: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['preview_image'];?>
',
							
						<?php } elseif ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['youtube']['source_id']) {?>
							
							file: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['direct'];?>
',
							//image: '//img.youtube.com/vi/<?php echo $_smarty_tpl->tpl_vars['video_data']->value['yt_id'];?>
/hqdefault.jpg',
							
						<?php } elseif ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['mp3']['source_id']) {?>
							
							file: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['url_flv'];?>
',
							type: 'mp3',
							//image: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['preview_image'];?>
',
						<?php } else { ?>		
							
							file: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['url_flv'];?>
',
							//image: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['preview_image'];?>
',
						<?php }?>
						
						flashplayer: "<?php echo @constant('_URL2');?>
/players/jwplayer7/jwplayer.flash.swf",                        
						primary: "html5",
						width: "100%",
						<?php if ($_smarty_tpl->tpl_vars['playlist']->value) {?>
						//height: "401",
						autostart: true,
						<?php } else { ?>
						//height: "<?php echo @constant('_PLAYER_H');?>
",
						autostart: "<?php echo (($tmp = @$_smarty_tpl->tpl_vars['video_data']->value['video_player_autoplay'])===null||$tmp==='' ? @constant('_AUTOPLAY') : $tmp);?>
",
						<?php }?>					
						image: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['preview_image'];?>
',
						stretching: "fill",
						events: {
							onComplete: function() {
								<?php if ($_smarty_tpl->tpl_vars['playlist']->value) {?>
								window.location = "<?php echo $_smarty_tpl->tpl_vars['playlist_next_url']->value;?>
";
								<?php } else { ?>
									if (pm_video_data.autoplay_next && pm_video_data.autoplay_next_url != "") {
										window.location = pm_video_data.autoplay_next_url;
									}
								<?php }?>
							},
							onError: function(object) { 
								ajax_request("video", "do=report&vid=<?php echo $_smarty_tpl->tpl_vars['video_data']->value['uniq_id'];?>
&error-message="+ object.message, "", "", false);
								<?php if ($_smarty_tpl->tpl_vars['playlist']->value) {?>
								window.location = "<?php echo $_smarty_tpl->tpl_vars['playlist_next_url']->value;?>
";
								<?php }?>
							}
						},
						logo: {
							file: '<?php echo @constant('_WATERMARKURL');?>
',
							link: '<?php echo @constant('_WATERMARKLINK');?>
',
						},
						"tracks": [
						<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['video_subtitles']->value, '_video_subtitles', false, 'k');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['k']->value => $_smarty_tpl->tpl_vars['_video_subtitles']->value) {
?>
							{ file: "<?php echo $_smarty_tpl->tpl_vars['_video_subtitles']->value['filename'];?>
", label: "<?php echo $_smarty_tpl->tpl_vars['_video_subtitles']->value['language'];?>
", kind: "subtitles" },
						<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
						]
						};
						<?php echo $_smarty_tpl->tpl_vars['jw_flashvars_override']->value;?>

			jwplayer("Playerholder").setup(flashvars);
		<?php echo '</script'; ?>
>
		
	<?php } elseif ($_smarty_tpl->tpl_vars['video_data']->value['video_player'] == "jwplayer8") {?>
		<div id="Playerholder">
			<noscript>
				<?php echo $_smarty_tpl->tpl_vars['lang']->value['enable_javascript'];?>

			</noscript>
			<em><?php echo $_smarty_tpl->tpl_vars['lang']->value['please_wait'];?>
</em>
		</div>
		
		<?php echo '<script'; ?>
 type="text/javascript" src="<?php echo @constant('_URL2');?>
/players/jwplayer8/jwplayer.js"><?php echo '</script'; ?>
>
		<?php echo '<script'; ?>
 type="text/javascript">jwplayer.key="<?php echo $_smarty_tpl->tpl_vars['jwplayer7key']->value;?>
";<?php echo '</script'; ?>
>
		<?php echo '<script'; ?>
 type="text/javascript">
			var flashvars = {
					
						<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == 0) {?>
							file: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['file'];?>
',
							image: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['preview_image'];?>
',
							streamer: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['streamer'];?>
',
							rtmp: {
							<?php if ($_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['provider'] != '') {?> provider: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['provider'];?>
',<?php }?>
							<?php if ($_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['startparam'] != '') {?> startparam: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['startparam'];?>
',<?php }?>
							<?php if ($_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['loadbalance'] != '') {?> loadbalance: <?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['loadbalance'];?>
,<?php }?>
							<?php if ($_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['subscribe'] != '') {?> subscribe: <?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['subscribe'];?>
,<?php }?>
							<?php if ($_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['securetoken'] != '') {?> securetoken: "<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['securetoken'];?>
",<?php }?>
							},
						<?php } elseif ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['localhost']['source_id']) {?>
							
							file: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['url_flv'];?>
',
							image: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['preview_image'];?>
',
							
						<?php } elseif ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['youtube']['source_id']) {?>
							
							file: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['direct'];?>
',
							//image: '//img.youtube.com/vi/<?php echo $_smarty_tpl->tpl_vars['video_data']->value['yt_id'];?>
/hqdefault.jpg',
							
						<?php } elseif ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['mp3']['source_id']) {?>
							
							file: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['url_flv'];?>
',
							type: 'mp3',
							//image: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['preview_image'];?>
',
						<?php } else { ?>		
							
							file: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['url_flv'];?>
',
							//image: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['preview_image'];?>
',
						<?php }?>
						
						flashplayer: "<?php echo @constant('_URL2');?>
/players/jwplayer7/jwplayer.flash.swf",                        
						primary: "html5",
						width: "100%",
						<?php if ($_smarty_tpl->tpl_vars['playlist']->value) {?>
						//height: "401",
						autostart: true,
						<?php } else { ?>
						//height: "<?php echo @constant('_PLAYER_H');?>
",
						autostart: "<?php echo (($tmp = @$_smarty_tpl->tpl_vars['video_data']->value['video_player_autoplay'])===null||$tmp==='' ? @constant('_AUTOPLAY') : $tmp);?>
",
						<?php }?>					
						image: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['preview_image'];?>
',
						stretching: "fill",
						events: {
							onComplete: function() {
								<?php if ($_smarty_tpl->tpl_vars['playlist']->value) {?>
								window.location = "<?php echo $_smarty_tpl->tpl_vars['playlist_next_url']->value;?>
";
								<?php } else { ?>
									if (pm_video_data.autoplay_next && pm_video_data.autoplay_next_url != "") {
										window.location = pm_video_data.autoplay_next_url;
									}
								<?php }?>
							},
							onError: function(object) { 
								ajax_request("video", "do=report&vid=<?php echo $_smarty_tpl->tpl_vars['video_data']->value['uniq_id'];?>
&error-message="+ object.message, "", "", false);
								<?php if ($_smarty_tpl->tpl_vars['playlist']->value) {?>
								window.location = "<?php echo $_smarty_tpl->tpl_vars['playlist_next_url']->value;?>
";
								<?php }?>
							}
						},
						logo: {
							file: '<?php echo @constant('_WATERMARKURL');?>
',
							link: '<?php echo @constant('_WATERMARKLINK');?>
',
						},
						"tracks": [
						<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['video_subtitles']->value, '_video_subtitles', false, 'k');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['k']->value => $_smarty_tpl->tpl_vars['_video_subtitles']->value) {
?>
							{ file: "<?php echo $_smarty_tpl->tpl_vars['_video_subtitles']->value['filename'];?>
", label: "<?php echo $_smarty_tpl->tpl_vars['_video_subtitles']->value['language'];?>
", kind: "subtitles" },
						<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
						]
						};
						<?php echo $_smarty_tpl->tpl_vars['jw_flashvars_override']->value;?>

			jwplayer("Playerholder").setup(flashvars);
		<?php echo '</script'; ?>
>
		



	<?php } elseif ($_smarty_tpl->tpl_vars['video_data']->value['video_player'] == "videojs") {?>
	
		<link href="<?php echo @constant('_URL2');?>
/players/video-js/video-js.min.css" rel="stylesheet">
		<link href="<?php echo @constant('_URL2');?>
/players/video-js/video-js.pm.css" rel="stylesheet">
		<?php echo '<script'; ?>
 type="text/javascript" src="<?php echo @constant('_URL2');?>
/players/video-js/video.min.js"><?php echo '</script'; ?>
>
		<?php echo '<script'; ?>
 src="<?php echo @constant('_URL2');?>
/players/video-js/plugins/videojs.hotkeys.min.js"><?php echo '</script'; ?>
>
		<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['youtube']['source_id']) {?>
		<?php echo '<script'; ?>
 src="<?php echo @constant('_URL2');?>
/players/video-js/plugins/youtube.js"><?php echo '</script'; ?>
>
		<?php }?>
		<!-- <?php echo '<script'; ?>
 src="<?php echo @constant('_URL2');?>
/players/video-js/plugins/videojs.persistvolume.js"><?php echo '</script'; ?>
> -->
		<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['dailymotion']['source_id']) {?>
		<?php echo '<script'; ?>
 src="<?php echo @constant('_URL2');?>
/players/video-js/plugins/dailymotion.js"><?php echo '</script'; ?>
>
		
		<?php }?>
		<?php if (@constant('_WATERMARKURL') != '') {?>
		
		<!-- <?php echo '<script'; ?>
 src="<?php echo @constant('_URL2');?>
/players/video-js/plugins/videojs-bug.min.js"><?php echo '</script'; ?>
> -->
		
		<?php }?>
		

		<div id="Playerholder">
		<video src="" id="video-js" class="video-js vjs-default-skin" poster="<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] != $_smarty_tpl->tpl_vars['_sources']->value['youtube']['source_id']) {
echo $_smarty_tpl->tpl_vars['video_data']->value['preview_image'];
}?>" preload="auto" data-setup='{ "techOrder": [<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['youtube']['source_id']) {?>"youtube",<?php }
if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['dailymotion']['source_id']) {?>"dailymotion",<?php }?>"html5"], <?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['youtube']['source_id']) {?>"sources": [{ "type": "video/youtube", "src": "<?php echo $_smarty_tpl->tpl_vars['video_data']->value['direct'];?>
"}], <?php }?> "controls": true, "autoplay": <?php echo (($tmp = @$_smarty_tpl->tpl_vars['video_data']->value['video_player_autoplay'])===null||$tmp==='' ? @constant('_AUTOPLAY') : $tmp);?>
 }' width="100%" height="100%">
		<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['video_subtitles']->value, '_video_subtitles', false, 'k');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['k']->value => $_smarty_tpl->tpl_vars['_video_subtitles']->value) {
?>
		<track kind="captions" src="<?php echo $_smarty_tpl->tpl_vars['_video_subtitles']->value['filename'];?>
" srclang="<?php echo mb_strtolower($_smarty_tpl->tpl_vars['video_subtitles']->value['language_tag'], 'UTF-8');?>
" label="<?php echo $_smarty_tpl->tpl_vars['video_subtitles']->value['language'];?>
">
		<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
		</video>

		<?php echo '<script'; ?>
 type="text/javascript">
		var video = videojs('video-js').ready(function(){
			var player = this;
			
			player.on('loadedmetadata', function() {
				$('.vjs-big-play-button').addClass('vjs-pm-show-big-play');
			});

			player.hotkeys({
				volumeStep: 0.1,
				seekStep: 5,
				enableModifiersForNumbers: false
			});

			// player.on('error', function(){
			// 	var MediaError = player.error();
				
			// 	if (MediaError.code == 4) {
			// 		ajax_request("video", "do=report&vid=<?php echo $_smarty_tpl->tpl_vars['video_data']->value['uniq_id'];?>
&error-message="+ MediaError.message, "", "", false);
			// 	}
			// 	if (MediaError.code == 101 || MediaError.code == 150) {
			// 		ajax_request("video", "do=report&vid=<?php echo $_smarty_tpl->tpl_vars['video_data']->value['uniq_id'];?>
&error-message=Playback disabled by owner", "", "", false);
			// 	}
			// });
			<?php if (@constant('_WATERMARKURL') != '') {?>
			// player.bug({
			// 	height: 50,
			// 	width: 50,
			// 	imgSrc: '<?php echo @constant('_WATERMARKURL');?>
',
			// 	link: "<?php echo @constant('_WATERMARKLINK');?>
",
			// 	opacity: 0.5,
			// 	padding: '8px',
			// 	position: 'tr',
			// });
			<?php }?>

			<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == 0) {?>
			
			player.src([
				{
					src: "<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['streamer'];?>
&mp4:<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['file'];?>
", 
					type: "application/x-mpegURL"
				}
			]);
			
			<?php }?>

				<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['localhost']['source_id'] || $_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['other']['source_id']) {?>
			
			player.src([
				{
					src: "<?php echo @constant('_URL2');?>
/videos.php?vid=<?php echo $_smarty_tpl->tpl_vars['video_data']->value['uniq_id'];?>
",
					type: <?php if ($_smarty_tpl->tpl_vars['video_data']->value['file_type'] != '') {?>"<?php echo $_smarty_tpl->tpl_vars['video_data']->value['file_type'];?>
" <?php } else { ?> "video/flv" <?php }?>
				}
			]);
			
			<?php }?>

			<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['youtube']['source_id']) {?>
			
			player.src([{
				src: "<?php echo $_smarty_tpl->tpl_vars['video_data']->value['direct'];?>
",
				type: "video/youtube"
			}]);
			
			<?php }?>

			<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['dailymotion']['source_id']) {?>
			
			player.src([{
				src: "<?php echo $_smarty_tpl->tpl_vars['video_data']->value['direct'];?>
",
				type: "video/dailymotion"
			}]);
			
			<?php }?>
				<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['vimeo']['source_id']) {?>
			
			player.src([
				{
					src: "<?php echo @constant('_URL2');?>
/videos.php?vid=<?php echo $_smarty_tpl->tpl_vars['video_data']->value['uniq_id'];?>
",
					type: "video/mp4"
				}
			]);
			
			<?php }?>

			<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['mp3']['source_id']) {?>
			
			player.src([
				{
					src: "<?php echo @constant('_URL2');?>
/videos.php?vid=<?php echo $_smarty_tpl->tpl_vars['video_data']->value['uniq_id'];?>
",
					type: <?php if ($_smarty_tpl->tpl_vars['video_data']->value['file_type'] != '') {?>"<?php echo $_smarty_tpl->tpl_vars['video_data']->value['file_type'];?>
" <?php } else { ?> "audio/mp3" <?php }?>
				}
			]);
			
			<?php }?>
			
			<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['imgur']['source_id'] || $_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['gfycat']['source_id']) {?>
			
			player.src([
				{
					src: "<?php echo @constant('_URL2');?>
/videos.php?vid=<?php echo $_smarty_tpl->tpl_vars['video_data']->value['uniq_id'];?>
",
					type: <?php if ($_smarty_tpl->tpl_vars['video_data']->value['file_type'] != '') {?>"<?php echo $_smarty_tpl->tpl_vars['video_data']->value['file_type'];?>
" <?php } else { ?> "video/mp4" <?php }?>
				}
			]);
			
			<?php }?>

			<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['vbox7']['source_id']) {?>
			
			player.src([
				{
					src: "<?php echo @constant('_URL2');?>
/videos.php?vid=<?php echo $_smarty_tpl->tpl_vars['video_data']->value['uniq_id'];?>
",
					type: <?php if ($_smarty_tpl->tpl_vars['video_data']->value['file_type'] != '') {?>"<?php echo $_smarty_tpl->tpl_vars['video_data']->value['file_type'];?>
" <?php } else { ?> "video/mp4" <?php }?>
				}
			]);
			
			<?php }?>

			<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['googledrive']['source_id']) {?>
			
			player.src([{
				src: "<?php echo $_smarty_tpl->tpl_vars['video_data']->value['direct'];?>
",
				type: "video/mp4"
			}]);
			
			<?php }?>

			
			player.on('waiting', function() {
				$('.vjs-loading-spinner').removeClass('vjs-hidden');
			});

			<?php if ($_smarty_tpl->tpl_vars['playlist']->value) {?>
			player.play(); //autoplayback
			<?php }?>
			player.on('ended', function() {
				<?php if ($_smarty_tpl->tpl_vars['playlist']->value) {?>
				window.location = "<?php echo $_smarty_tpl->tpl_vars['playlist_next_url']->value;?>
";
				<?php } else { ?>
					if (pm_video_data.autoplay_next && pm_video_data.autoplay_next_url != "") {
						window.location = pm_video_data.autoplay_next_url;
					}
				<?php }?>
			});
			
		});
		<?php echo '</script'; ?>
>
		</div>

  <?php } elseif ($_smarty_tpl->tpl_vars['video_data']->value['video_player'] == "embed") {?>
		<div id="Playerholder" class="embedded-video">
			<?php echo $_smarty_tpl->tpl_vars['video_data']->value['embed_code'];?>

		</div>
	<?php }?>
   <?php }
}?>


<?php if ($_smarty_tpl->tpl_vars['page']->value == "index") {?>
	<!-- Inplayer ads -->
	<?php if ($_smarty_tpl->tpl_vars['ad_900']->value != '' && $_smarty_tpl->tpl_vars['video_data']->value['restricted'] != '1') {?>
	<div class="pm-ads-inplayer alert-dismissible">
		<?php echo $_smarty_tpl->tpl_vars['ad_900']->value;?>

		<button type="button" class="close" data-dismiss="alert" aria-label="Close">
			<span aria-hidden="true">&times;</span>
		</button>
	</div>
	<?php }?>

	<?php if ($_smarty_tpl->tpl_vars['video_data']->value['video_player'] == "flvplayer") {?>
		
		<div id="Playerholder">
			<noscript>
				{$lang.enable_javascript}
			</noscript>
			<em>{$lang.please_wait}</em>
		</div>

		<?php echo '<script'; ?>
 type="text/javascript">

		var clips = "[ { name: 'ClickToPlay', overlayId: 'play', url: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['preview_image'];?>
' }, { name: '', url: '<?php echo @constant('_URL2');?>
/videos.php?vid=<?php echo $_smarty_tpl->tpl_vars['video_data']->value['uniq_id'];?>
', <?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['mp3']['source_id']) {?>type: 'mp3'<?php }?> } ]";
		
		var flashvars = {
			config: "{ playList: " + clips + ", showPlayList: true,useSmoothing: true, baseURL: '', autoPlay: <?php echo (($tmp = @$_smarty_tpl->tpl_vars['video_data']->value['video_player_autoplay'])===null||$tmp==='' ? @constant('_AUTOPLAY') : $tmp);?>
, autoBuffering: <?php echo @constant('_AUTOBUFF');?>
, startingBufferLength: 2, bufferLength: 5, loop: false,hideControls: false,initialScale: 'fit', showPlayListButtons: false, useNativeFullScreen: true,controlBarGloss: 'high', controlsOverVideo: 'ease', controlBarBackgroundColor: '0x<?php echo @constant('_BGCOLOR');?>
', progressBarColor1: '0xFFFFFF', progressBarColor2: '0x000000', timeDisplayFontColor: '0x<?php echo @constant('_TIMECOLOR');?>
', noVideoClip: { url: '<?php echo @constant('_URL');?>
/templates/<?php echo @constant('_TPLFOLDER');?>
/img/notfound.jpg' },	useHwScaling: false,showMenu: false }"
		};
		var params = {
			allowfullscreen: "true",
			allowScriptAccess: "always",
			wmode: "transparent"
		};
		var attributes = {};
		swfobject.embedSWF("<?php echo @constant('_URL2');?>
/players/flowplayer2/flowplayer.swf", "Playerholder", "<?php echo @constant('_PLAYER_W_INDEX');?>
", "<?php echo @constant('_PLAYER_H_INDEX');?>
", "9.0.115", false, flashvars, params, attributes);
		
		<?php echo '</script'; ?>
>
		

	<?php } elseif ($_smarty_tpl->tpl_vars['video_data']->value['video_player'] == "jwplayer") {?>
	   <div id="Playerholder">
		<noscript>
			<?php echo $_smarty_tpl->tpl_vars['lang']->value['enable_javascript'];?>

		</noscript>
		<em><?php echo $_smarty_tpl->tpl_vars['lang']->value['please_wait'];?>
</em>
		</div>
		
		<?php echo '<script'; ?>
 type="text/javascript" src="<?php echo @constant('_URL2');?>
/players/jwplayer5/jwplayer.js"><?php echo '</script'; ?>
>
		<?php echo '<script'; ?>
 type='text/javascript'>
			var flashvars = {
				"flashplayer": "<?php echo @constant('_URL2');?>
/players/jwplayer5/jwplayer.swf",
				"playlist": [{
				
				<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == 0) {?>
					file: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['file'];?>
',
					streamer: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['streamer'];?>
',
					<?php if ($_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['provider'] != '') {?> provider: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['provider'];?>
',<?php }?>
					<?php if ($_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['startparam'] != '') {?> 'http.startparam': '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['startparam'];?>
',<?php }?>
					<?php if ($_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['loadbalance'] != '') {?> 'rtmp.loadbalance': '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['loadbalance'];?>
',<?php }?>
					<?php if ($_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['subscribe'] != '') {?> 'rtmp.subscribe': '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['subscribe'];?>
',<?php }?>
				<?php } elseif ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['youtube']['source_id']) {?>
					
					file: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['direct'];?>
',
					image: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['preview_image'];?>
',
					
				<?php } elseif ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['gfycat']['source_id']) {?>
					
					file: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['url_flv'];?>
',
					
				<?php } else { ?>		
					
					file: '<?php echo @constant('_URL2');?>
/videos.php?vid=<?php echo $_smarty_tpl->tpl_vars['video_data']->value['uniq_id'];?>
',
					<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['mp3']['source_id']) {?>
					type: 'audio',
					<?php } else { ?>
					type: 'video',
					<?php }?>
					image: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['preview_image'];?>
',
					
				<?php }?>
				
				}],
				"controlbar": {
					"position": "bottom",
				},
				'wmode': 'transparent',
				'allowfullscreen': 'true',
				'allowscriptaccess': 'always',
				'allownetworking': 'all',
				'name': '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['uniq_id'];?>
',
				'id': '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['uniq_id'];?>
',
				'width': "100%",
				<?php if ($_smarty_tpl->tpl_vars['playlist']->value) {?>
				//'height': "401px",
				'autostart': "true", 
				<?php } else { ?>
				//'height': "<?php echo @constant('_PLAYER_H_INDEX');?>
",
				'autostart': "<?php echo (($tmp = @$_smarty_tpl->tpl_vars['video_data']->value['video_player_autoplay'])===null||$tmp==='' ? @constant('_AUTOPLAY') : $tmp);?>
", 
				<?php }?>
				'enablejs': "true",
				'backcolor': "<?php echo @constant('_BGCOLOR');?>
",
				'frontcolor': "<?php echo @constant('_TIMECOLOR');?>
",
				'screencolor': "000000",
				'repeat': "false",
				'logo': "<?php echo @constant('_WATERMARKURL');?>
",
				'linktarget': "_blank",
				'link': "<?php echo @constant('_WATERMARKLINK');?>
",
				'image': "<?php echo $_smarty_tpl->tpl_vars['video_data']->value['preview_image'];?>
", // XTRA
				'bufferlength': "5",
				'shownavigation':"true",
				'skin': "<?php echo @constant('_URL2');?>
/players/jwplayer5/skins/<?php echo @constant('_JWSKIN');?>
",
				'stretching': "fill",
					"plugins": {
						'captions': {
							<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['video_subtitles']->value, '_video_subtitles', false, 'k');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['k']->value => $_smarty_tpl->tpl_vars['_video_subtitles']->value) {
?>
							file: "<?php echo $_smarty_tpl->tpl_vars['_video_subtitles']->value['filename'];?>
",
							<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
						},
						'sharing-3': {
							'link': '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['video_href'];?>
',
							'code': encodeURIComponent('<?php echo $_smarty_tpl->tpl_vars['embedcode']->value;?>
')
						},
						// 'timeslidertooltipplugin-3': {},
					},
					"events": {
							onError: function(object) { 
								ajax_request("video", "do=report&vid=<?php echo $_smarty_tpl->tpl_vars['video_data']->value['uniq_id'];?>
&error-message="+ object.message, "", "", false);
							}
					}
			};
		<?php echo $_smarty_tpl->tpl_vars['jw_flashvars_override']->value;?>

		jwplayer("Playerholder").setup(flashvars);
		<?php echo '</script'; ?>
>
			

		<?php } elseif ($_smarty_tpl->tpl_vars['video_data']->value['video_player'] == "jwplayer6") {?>
		<div id="Playerholder">
			<noscript>
				<?php echo $_smarty_tpl->tpl_vars['lang']->value['enable_javascript'];?>

			</noscript>
			<em><?php echo $_smarty_tpl->tpl_vars['lang']->value['please_wait'];?>
</em>
		</div>
		
		<?php echo '<script'; ?>
 type="text/javascript" src="<?php echo @constant('_URL2');?>
/players/jwplayer6/jwplayer.js"><?php echo '</script'; ?>
>
		<?php echo '<script'; ?>
 type="text/javascript">jwplayer.key="<?php echo $_smarty_tpl->tpl_vars['jwplayerkey']->value;?>
";<?php echo '</script'; ?>
>
		<?php echo '<script'; ?>
 type="text/javascript">
		var flashvars = {
				
					<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == 0) {?>
						file: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['file'];?>
',
						streamer: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['streamer'];?>
',
						rtmp: {
						<?php if ($_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['provider'] != '') {?> provider: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['provider'];?>
',<?php }?>
						<?php if ($_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['startparam'] != '') {?> startparam: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['startparam'];?>
',<?php }?>
						<?php if ($_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['loadbalance'] != '') {?> loadbalance: <?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['loadbalance'];?>
,<?php }?>
						<?php if ($_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['subscribe'] != '') {?> subscribe: <?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['subscribe'];?>
,<?php }?>
						<?php if ($_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['securetoken'] != '') {?> securetoken: "<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['securetoken'];?>
",<?php }?>
						},
					<?php } elseif ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['localhost']['source_id']) {?>
						
						file: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['url_flv'];?>
',
						image: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['preview_image'];?>
',
						
					<?php } elseif ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['youtube']['source_id']) {?>
						
						file: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['direct'];?>
',
						//image: '//img.youtube.com/vi/<?php echo $_smarty_tpl->tpl_vars['video_data']->value['yt_id'];?>
/hqdefault.jpg',
						
					<?php } elseif ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['mp3']['source_id']) {?>
						
						file: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['url_flv'];?>
',
						type: 'mp3',
						//image: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['preview_image'];?>
',
					<?php } else { ?>		
						
						file: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['url_flv'];?>
',
						//image: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['preview_image'];?>
',
					<?php }?>
					
					flashplayer: "<?php echo @constant('_URL2');?>
/players/jwplayer6/jwplayer.flash.swf",                    
					primary: "html5",
					width: "100%",
					//height: "<?php echo @constant('_PLAYER_H_INDEX');?>
",
					image: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['preview_image'];?>
',
					stretching: "fill",
					logo: {
						file: '<?php echo @constant('_WATERMARKURL');?>
',
						link: '<?php echo @constant('_WATERMARKLINK');?>
',
						},
					events: {
						onError: function(object) { 
						   ajax_request("video", "do=report&vid=<?php echo $_smarty_tpl->tpl_vars['video_data']->value['uniq_id'];?>
&error-message="+ object.message, "", "", false);
						}
					},
					autostart: '<?php echo (($tmp = @$_smarty_tpl->tpl_vars['video_data']->value['video_player_autoplay'])===null||$tmp==='' ? @constant('_AUTOPLAY') : $tmp);?>
',
					"tracks": [
					<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['video_subtitles']->value, '_video_subtitles', false, 'k');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['k']->value => $_smarty_tpl->tpl_vars['_video_subtitles']->value) {
?>
						{ file: "<?php echo $_smarty_tpl->tpl_vars['_video_subtitles']->value['filename'];?>
", label: "<?php echo $_smarty_tpl->tpl_vars['_video_subtitles']->value['language'];?>
", kind: "subtitles" },
					<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
					]
				};
			<?php echo $_smarty_tpl->tpl_vars['jw_flashvars_override']->value;?>

			jwplayer("Playerholder").setup(flashvars);
		<?php echo '</script'; ?>
>
		

	<?php } elseif ($_smarty_tpl->tpl_vars['video_data']->value['video_player'] == "jwplayer7") {?>
			<div id="Playerholder">
			<noscript>
				<?php echo $_smarty_tpl->tpl_vars['lang']->value['enable_javascript'];?>

			</noscript>
			<em><?php echo $_smarty_tpl->tpl_vars['lang']->value['please_wait'];?>
</em>
			</div>
			
			<?php echo '<script'; ?>
 type="text/javascript" src="<?php echo @constant('_URL2');?>
/players/jwplayer7/jwplayer.js"><?php echo '</script'; ?>
>
			<?php echo '<script'; ?>
 type="text/javascript">jwplayer.key="<?php echo $_smarty_tpl->tpl_vars['jwplayer7key']->value;?>
";<?php echo '</script'; ?>
>
			<?php echo '<script'; ?>
 type="text/javascript">
			var flashvars = {
					
						<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == 0) {?>
							file: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['file'];?>
',
							image: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['preview_image'];?>
',
							streamer: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['streamer'];?>
',
							rtmp: {
							<?php if ($_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['provider'] != '') {?> provider: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['provider'];?>
',<?php }?>
							<?php if ($_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['startparam'] != '') {?> startparam: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['startparam'];?>
',<?php }?>
							<?php if ($_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['loadbalance'] != '') {?> loadbalance: <?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['loadbalance'];?>
,<?php }?>
							<?php if ($_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['subscribe'] != '') {?> subscribe: <?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['subscribe'];?>
,<?php }?>
							<?php if ($_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['securetoken'] != '') {?> securetoken: "<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['securetoken'];?>
",<?php }?>
							},
						<?php } elseif ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['localhost']['source_id']) {?>
							
							file: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['url_flv'];?>
',
							image: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['preview_image'];?>
',
							
						<?php } elseif ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['youtube']['source_id']) {?>
							
							file: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['direct'];?>
',
							//image: '//img.youtube.com/vi/<?php echo $_smarty_tpl->tpl_vars['video_data']->value['yt_id'];?>
/hqdefault.jpg',
							
						<?php } elseif ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['mp3']['source_id']) {?>
							
							file: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['url_flv'];?>
',
							type: 'mp3',
							//image: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['preview_image'];?>
',
							
						<?php } else { ?>		
							
							file: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['url_flv'];?>
',
							//image: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['preview_image'];?>
',
							
						<?php }?>
						
						flashplayer: "<?php echo @constant('_URL2');?>
/players/jwplayer7/jwplayer.flash.swf",                    
						primary: "html5",
						width: "100%",
						//height: "<?php echo @constant('_PLAYER_H_INDEX');?>
",
						height: "100%",
						image: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['preview_image'];?>
',
						stretching: "fill",
						logo: {
							file: '<?php echo @constant('_WATERMARKURL');?>
',
							link: '<?php echo @constant('_WATERMARKLINK');?>
',
							},
						events: {
							onError: function(object) { 
							   ajax_request("video", "do=report&vid=<?php echo $_smarty_tpl->tpl_vars['video_data']->value['uniq_id'];?>
&error-message="+ object.message, "", "", false);
							}
						},
						autostart: '<?php echo (($tmp = @$_smarty_tpl->tpl_vars['video_data']->value['video_player_autoplay'])===null||$tmp==='' ? @constant('_AUTOPLAY') : $tmp);?>
',
						"tracks": [
						<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['video_subtitles']->value, '_video_subtitles', false, 'k');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['k']->value => $_smarty_tpl->tpl_vars['_video_subtitles']->value) {
?>
							{ file: "<?php echo $_smarty_tpl->tpl_vars['_video_subtitles']->value['filename'];?>
", label: "<?php echo $_smarty_tpl->tpl_vars['_video_subtitles']->value['language'];?>
", kind: "subtitles" },
						<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
						]
					};
				<?php echo $_smarty_tpl->tpl_vars['jw_flashvars_override']->value;?>

				jwplayer("Playerholder").setup(flashvars);
			<?php echo '</script'; ?>
>
			

			<?php } elseif ($_smarty_tpl->tpl_vars['video_data']->value['video_player'] == "videojs") {?>
			
		<link href="<?php echo @constant('_URL2');?>
/players/video-js/video-js.min.css" rel="stylesheet">
		<link href="<?php echo @constant('_URL2');?>
/players/video-js/video-js.pm.css" rel="stylesheet">
		<?php echo '<script'; ?>
 type="text/javascript" src="<?php echo @constant('_URL2');?>
/players/video-js/video.min.js"><?php echo '</script'; ?>
>
		<?php echo '<script'; ?>
 src="<?php echo @constant('_URL2');?>
/players/video-js/plugins/videojs.hotkeys.min.js"><?php echo '</script'; ?>
>

		<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['youtube']['source_id']) {?>
		<?php echo '<script'; ?>
 src="<?php echo @constant('_URL2');?>
/players/video-js/plugins/youtube.js"><?php echo '</script'; ?>
>
		<?php }?>
		<!-- <?php echo '<script'; ?>
 src="<?php echo @constant('_URL2');?>
/players/video-js/plugins/videojs.persistvolume.js"><?php echo '</script'; ?>
> -->
		<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['dailymotion']['source_id']) {?>
		<?php echo '<script'; ?>
 src="<?php echo @constant('_URL2');?>
/players/video-js/plugins/dailymotion.js"><?php echo '</script'; ?>
>
		
		<?php }?>
		<?php if (@constant('_WATERMARKURL') != '') {?>
		
		<!-- <?php echo '<script'; ?>
 src="<?php echo @constant('_URL2');?>
/players/video-js/plugins/videojs-bug.min.js"><?php echo '</script'; ?>
> -->
		
		<?php }?>
		

		<div id="Playerholder">
		<video src="" id="video-js" class="video-js vjs-default-skin" poster="<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] != $_smarty_tpl->tpl_vars['_sources']->value['youtube']['source_id']) {
echo $_smarty_tpl->tpl_vars['video_data']->value['preview_image'];
}?>" preload="auto" data-setup='{ "techOrder": [<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['youtube']['source_id']) {?>"youtube",<?php }
if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['dailymotion']['source_id']) {?>"dailymotion",<?php }?>"html5"], <?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['youtube']['source_id']) {?>"sources": [{ "type": "video/youtube", "src": "<?php echo $_smarty_tpl->tpl_vars['video_data']->value['direct'];?>
"}], <?php }?> "controls": true, "autoplay": <?php echo (($tmp = @$_smarty_tpl->tpl_vars['video_data']->value['video_player_autoplay'])===null||$tmp==='' ? @constant('_AUTOPLAY') : $tmp);?>
 }' width="100%" height="100%"> <!--<?php echo @constant('_PLAYER_H');?>
-->
		<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['video_subtitles']->value, '_video_subtitles', false, 'k');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['k']->value => $_smarty_tpl->tpl_vars['_video_subtitles']->value) {
?>
		<track kind="captions" src="<?php echo $_smarty_tpl->tpl_vars['_video_subtitles']->value['filename'];?>
" srclang="<?php echo mb_strtolower($_smarty_tpl->tpl_vars['video_subtitles']->value['language_tag'], 'UTF-8');?>
" label="<?php echo $_smarty_tpl->tpl_vars['video_subtitles']->value['language'];?>
">
		<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
		</video>

		<?php echo '<script'; ?>
 type="text/javascript">
		var video = videojs('video-js').ready(function(){
			var player = this;
			
			player.on('loadedmetadata', function() {
				$('.vjs-big-play-button').addClass('vjs-pm-show-big-play');
			});
			player.hotkeys({
				volumeStep: 0.1,
				seekStep: 5,
				enableModifiersForNumbers: false
			});
			// player.on('error', function(){
			// 	var MediaError = player.error();
				
			// 	if (MediaError.code == 4) {
			// 		ajax_request("video", "do=report&vid=<?php echo $_smarty_tpl->tpl_vars['video_data']->value['uniq_id'];?>
&error-message="+ MediaError.message, "", "", false);
			// 	}
			// 	if (MediaError.code == 101 || MediaError.code == 150) {
			// 		ajax_request("video", "do=report&vid=<?php echo $_smarty_tpl->tpl_vars['video_data']->value['uniq_id'];?>
&error-message=Playback disabled by owner", "", "", false);
			// 	}
			// });
			<?php if (@constant('_WATERMARKURL') != '') {?>
			// player.bug({
			// 	height: 50,
			// 	width: 50,
			// 	imgSrc: '<?php echo @constant('_WATERMARKURL');?>
',
			// 	link: "<?php echo @constant('_WATERMARKLINK');?>
",
			// 	opacity: 0.5,
			// 	padding: '8px',
			// 	position: 'tr',
			// });
			<?php }?>

			<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == 0) {?>
			
			player.src([
				{
					src: "<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['streamer'];?>
&mp4:<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['file'];?>
", 
					type: "application/x-mpegURL"
				}
			]);
			
			<?php }?>

				<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['localhost']['source_id'] || $_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['other']['source_id']) {?>
			
			player.src([
				{
					src: "<?php echo @constant('_URL2');?>
/videos.php?vid=<?php echo $_smarty_tpl->tpl_vars['video_data']->value['uniq_id'];?>
",
					type: <?php if ($_smarty_tpl->tpl_vars['video_data']->value['file_type'] != '') {?>"<?php echo $_smarty_tpl->tpl_vars['video_data']->value['file_type'];?>
" <?php } else { ?> "video/flv" <?php }?>
				}
			]);
			
			<?php }?>

			<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['youtube']['source_id']) {?>
			
			player.src([{
				src: "<?php echo $_smarty_tpl->tpl_vars['video_data']->value['direct'];?>
",
				type: "video/youtube"
			}]);
			
			<?php }?>

			<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['dailymotion']['source_id']) {?>
			
			player.src([{
				src: "<?php echo $_smarty_tpl->tpl_vars['video_data']->value['direct'];?>
",
				type: "video/dailymotion"
			}]);
			
			<?php }?>
			<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['vimeo']['source_id']) {?>
			
			player.src([{
				src: "<?php echo @constant('_URL2');?>
/videos.php?vid=<?php echo $_smarty_tpl->tpl_vars['video_data']->value['uniq_id'];?>
",
				type: "video/mp4"
			}]);
			
			<?php }?>

			<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['mp3']['source_id']) {?>
			
			player.src([
				{
					src: "<?php echo @constant('_URL2');?>
/videos.php?vid=<?php echo $_smarty_tpl->tpl_vars['video_data']->value['uniq_id'];?>
",
					type: <?php if ($_smarty_tpl->tpl_vars['video_data']->value['file_type'] != '') {?>"<?php echo $_smarty_tpl->tpl_vars['video_data']->value['file_type'];?>
" <?php } else { ?> "audio/mp3" <?php }?>
				}
			]);
			
			<?php }?>
			
			<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['imgur']['source_id'] || $_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['gfycat']['source_id']) {?>
			
			player.src([
				{
					src: "<?php echo @constant('_URL2');?>
/videos.php?vid=<?php echo $_smarty_tpl->tpl_vars['video_data']->value['uniq_id'];?>
",
					type: <?php if ($_smarty_tpl->tpl_vars['video_data']->value['file_type'] != '') {?>"<?php echo $_smarty_tpl->tpl_vars['video_data']->value['file_type'];?>
" <?php } else { ?> "video/mp4" <?php }?>
				}
			]);
			
			<?php }?>

			<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['vbox7']['source_id']) {?>
			
			player.src([
				{
					src: "<?php echo @constant('_URL2');?>
/videos.php?vid=<?php echo $_smarty_tpl->tpl_vars['video_data']->value['uniq_id'];?>
",
					type: <?php if ($_smarty_tpl->tpl_vars['video_data']->value['file_type'] != '') {?>"<?php echo $_smarty_tpl->tpl_vars['video_data']->value['file_type'];?>
" <?php } else { ?> "video/mp4" <?php }?>
				}
			]);
			
			<?php }?>

			<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['googledrive']['source_id']) {?>
			
			player.src([{
				src: "<?php echo $_smarty_tpl->tpl_vars['video_data']->value['direct'];?>
",
				type: "video/mp4"
			}]);
			
			<?php }?>

			
			player.on('waiting', function() {
				$('.vjs-loading-spinner').removeClass('vjs-hidden');
			});

			});
			<?php echo '</script'; ?>
>
			</div>
			

	<?php } elseif ($_smarty_tpl->tpl_vars['video_data']->value['video_player'] == "jwplayer8") {?>
			<div id="Playerholder">
			<noscript>
				<?php echo $_smarty_tpl->tpl_vars['lang']->value['enable_javascript'];?>

			</noscript>
			<em><?php echo $_smarty_tpl->tpl_vars['lang']->value['please_wait'];?>
</em>
			</div>
			
			<?php echo '<script'; ?>
 type="text/javascript" src="<?php echo @constant('_URL2');?>
/players/jwplayer8/jwplayer.js"><?php echo '</script'; ?>
>
			<?php echo '<script'; ?>
 type="text/javascript">jwplayer.key="<?php echo $_smarty_tpl->tpl_vars['jwplayer8key']->value;?>
";<?php echo '</script'; ?>
>
			<?php echo '<script'; ?>
 type="text/javascript">
			var flashvars = {
					
						<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == 0) {?>
							file: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['file'];?>
',
							image: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['preview_image'];?>
',
							streamer: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['streamer'];?>
',
							rtmp: {
							<?php if ($_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['provider'] != '') {?> provider: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['provider'];?>
',<?php }?>
							<?php if ($_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['startparam'] != '') {?> startparam: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['startparam'];?>
',<?php }?>
							<?php if ($_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['loadbalance'] != '') {?> loadbalance: <?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['loadbalance'];?>
,<?php }?>
							<?php if ($_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['subscribe'] != '') {?> subscribe: <?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['subscribe'];?>
,<?php }?>
							<?php if ($_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['securetoken'] != '') {?> securetoken: "<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['securetoken'];?>
",<?php }?>
							},
						<?php } elseif ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['localhost']['source_id']) {?>
							
							file: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['url_flv'];?>
',
							image: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['preview_image'];?>
',
							
						<?php } elseif ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['youtube']['source_id']) {?>
							
							file: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['direct'];?>
',
							
						<?php } elseif ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['mp3']['source_id']) {?>
							
							file: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['url_flv'];?>
',
							type: 'mp3',
							
						<?php } else { ?>		
							
							file: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['url_flv'];?>
',
							
						<?php }?>
						
						primary: "html5",
						width: "100%",
						height: "100%",
						image: '<?php echo $_smarty_tpl->tpl_vars['video_data']->value['preview_image'];?>
',
						stretching: "fill",
						logo: {
							file: '<?php echo @constant('_WATERMARKURL');?>
',
							link: '<?php echo @constant('_WATERMARKLINK');?>
',
							},
						events: {
							onError: function(object) { 
							   ajax_request("video", "do=report&vid=<?php echo $_smarty_tpl->tpl_vars['video_data']->value['uniq_id'];?>
&error-message="+ object.message, "", "", false);
							}
						},
						autostart: '<?php echo (($tmp = @$_smarty_tpl->tpl_vars['video_data']->value['video_player_autoplay'])===null||$tmp==='' ? @constant('_AUTOPLAY') : $tmp);?>
',
						"tracks": [
						<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['video_subtitles']->value, '_video_subtitles', false, 'k');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['k']->value => $_smarty_tpl->tpl_vars['_video_subtitles']->value) {
?>
							{ file: "<?php echo $_smarty_tpl->tpl_vars['_video_subtitles']->value['filename'];?>
", label: "<?php echo $_smarty_tpl->tpl_vars['_video_subtitles']->value['language'];?>
", kind: "subtitles" },
						<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
						]
					};
				<?php echo $_smarty_tpl->tpl_vars['jw_flashvars_override']->value;?>

				jwplayer("Playerholder").setup(flashvars);
			<?php echo '</script'; ?>
>
			

			<?php } elseif ($_smarty_tpl->tpl_vars['video_data']->value['video_player'] == "videojs") {?>
			
			<link href="<?php echo @constant('_URL2');?>
/players/video-js/video-js.min.css" rel="stylesheet">
			<?php echo '<script'; ?>
 type="text/javascript" src="<?php echo @constant('_URL2');?>
/players/video-js/video.js"><?php echo '</script'; ?>
>
			<!-- <?php echo '<script'; ?>
 src="<?php echo @constant('_URL2');?>
/players/video-js/plugins/videojs.persistvolume.js"><?php echo '</script'; ?>
> -->

			<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['youtube']['source_id']) {?>
			<?php echo '<script'; ?>
 src="<?php echo @constant('_URL2');?>
/players/video-js/plugins/youtube.js"><?php echo '</script'; ?>
>
			
			<?php }?>
			<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['dailymotion']['source_id']) {?>
			<?php echo '<script'; ?>
 src="<?php echo @constant('_URL2');?>
/players/video-js/plugins/dailymotion.js"><?php echo '</script'; ?>
>
			<?php echo '<script'; ?>
 type="text/javascript">
				player.options.flash.swf = "<?php echo @constant('_URL2');?>
/players/video-js/plugins/video-js.swf";
			<?php echo '</script'; ?>
>
			
			<?php }?>
			
			<?php if (@constant('_WATERMARKURL') != '') {?>
			
			<?php echo '<script'; ?>
 src="<?php echo @constant('_URL2');?>
/players/video-js/plugins/videojs.logobrand.js"><?php echo '</script'; ?>
>
			
			<?php }?>
			

			<div id="Playerholder">
			<video src="" id="video-js" class="video-js vjs-default-skin" poster="<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] != $_smarty_tpl->tpl_vars['_sources']->value['youtube']['source_id']) {
echo $_smarty_tpl->tpl_vars['video_data']->value['preview_image'];
}?>" preload="auto" data-setup='{ "techOrder": [<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['youtube']['source_id']) {?>"youtube",<?php }
if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['dailymotion']['source_id']) {?>"dailymotion",<?php }?>"html5","flash"], "controls": true, "autoplay": <?php echo (($tmp = @$_smarty_tpl->tpl_vars['video_data']->value['video_player_autoplay'])===null||$tmp==='' ? @constant('_AUTOPLAY') : $tmp);?>
 }' width="100%" height="100%">
			<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['video_subtitles']->value, '_video_subtitles', false, 'k');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['k']->value => $_smarty_tpl->tpl_vars['_video_subtitles']->value) {
?>
			<track kind="captions" src="<?php echo $_smarty_tpl->tpl_vars['_video_subtitles']->value['filename'];?>
" srclang="<?php echo mb_strtolower($_smarty_tpl->tpl_vars['video_subtitles']->value['language_tag'], 'UTF-8');?>
" label="<?php echo $_smarty_tpl->tpl_vars['video_subtitles']->value['language'];?>
">
			<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
			</video>

			<?php echo '<script'; ?>
 type="text/javascript">
			var video = videojs('video-js').ready(function(){
				var player = this;

				player.on('loadedmetadata', function() {
					$('.vjs-big-play-button').addClass('vjs-pm-show-big-play');
					$('.vjs-control-bar').css({"display": "block"});
				});

				player.on('error', function(){
					var MediaError = player.error();

					if (MediaError.code == 4) {
						ajax_request("video", "do=report&vid=<?php echo $_smarty_tpl->tpl_vars['video_data']->value['uniq_id'];?>
&error-message="+ MediaError.message, "", "", false);
					}
					if (MediaError.code == 101 || MediaError.code == 150) {
						ajax_request("video", "do=report&vid=<?php echo $_smarty_tpl->tpl_vars['video_data']->value['uniq_id'];?>
&error-message=Playback disabled by owner", "", "", false);
					}

				});
				
				<?php if (@constant('_WATERMARKURL') != '') {?>
				player.logobrand({
					image: "<?php echo @constant('_WATERMARKURL');?>
",
					destination: "<?php echo @constant('_WATERMARKLINK');?>
"
				});
				<?php }?>

				<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == 0) {?>
				
				player.src([
					{
						src: "<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['streamer'];?>
&mp4:<?php echo $_smarty_tpl->tpl_vars['video_data']->value['jw_flashvars']['file'];?>
", 
						type: "application/x-mpegURL"
					}
				]);
				
				<?php }?>

				<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['localhost']['source_id'] || $_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['other']['source_id']) {?>
				
				player.src([
					{
						src: "<?php echo @constant('_URL2');?>
/videos.php?vid=<?php echo $_smarty_tpl->tpl_vars['video_data']->value['uniq_id'];?>
",
						type: <?php if ($_smarty_tpl->tpl_vars['video_data']->value['file_type'] != '') {?>"<?php echo $_smarty_tpl->tpl_vars['video_data']->value['file_type'];?>
" <?php } else { ?> "video/flv" <?php }?>
					}
				]);
				
				<?php }?>
				
				<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['youtube']['source_id']) {?>
				
				player.src([{
					src: "<?php echo $_smarty_tpl->tpl_vars['video_data']->value['direct'];?>
",
					type: "video/youtube"
				}]);
				
				<?php }?>

				<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['dailymotion']['source_id']) {?>
				
				player.src([{
					src: "<?php echo $_smarty_tpl->tpl_vars['video_data']->value['direct'];?>
",
					type: "video/dailymotion"
				}]);
				
				<?php }?>

				<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['vimeo']['source_id']) {?>
				
				player.src([
					{
						src: "<?php echo @constant('_URL2');?>
/videos.php?vid=<?php echo $_smarty_tpl->tpl_vars['video_data']->value['uniq_id'];?>
",
						type: "video/mp4"
					}
				]);
				
				<?php }?>

				<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['mp3']['source_id']) {?>
				
				player.src([
					{
						src: "<?php echo @constant('_URL2');?>
/videos.php?vid=<?php echo $_smarty_tpl->tpl_vars['video_data']->value['uniq_id'];?>
",
						type: <?php if ($_smarty_tpl->tpl_vars['video_data']->value['file_type'] != '') {?>"<?php echo $_smarty_tpl->tpl_vars['video_data']->value['file_type'];?>
" <?php } else { ?> "audio/mp3" <?php }?>
					}
				]);
				
				<?php }?>

				<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['imgur']['source_id'] || $_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['gfycat']['source_id']) {?>
				
				player.src([
					{
						src: "<?php echo @constant('_URL2');?>
/videos.php?vid=<?php echo $_smarty_tpl->tpl_vars['video_data']->value['uniq_id'];?>
",
						type: <?php if ($_smarty_tpl->tpl_vars['video_data']->value['file_type'] != '') {?>"<?php echo $_smarty_tpl->tpl_vars['video_data']->value['file_type'];?>
" <?php } else { ?> "video/mp4" <?php }?>
					}
				]);
				
				<?php }?>
				
				<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['vbox7']['source_id']) {?>
				
				player.src([
					{
						src: "<?php echo @constant('_URL2');?>
/videos.php?vid=<?php echo $_smarty_tpl->tpl_vars['video_data']->value['uniq_id'];?>
",
						type: <?php if ($_smarty_tpl->tpl_vars['video_data']->value['file_type'] != '') {?>"<?php echo $_smarty_tpl->tpl_vars['video_data']->value['file_type'];?>
" <?php } else { ?> "video/mp4" <?php }?>
					}
				]);
				
				<?php }?>

				<?php if ($_smarty_tpl->tpl_vars['video_data']->value['source_id'] == $_smarty_tpl->tpl_vars['_sources']->value['googledrive']['source_id']) {?>
				
				player.src([{
					src: "<?php echo $_smarty_tpl->tpl_vars['video_data']->value['direct'];?>
",
					type: "video/mp4"
				}]);
				
				<?php }?>

				
				player.on('waiting', function() {
					$('.vjs-loading-spinner').removeClass('vjs-hidden');
				});
				// player.persistvolume({
				// 	namespace: "Melody-vjs-Volume"
				// });

			});
			<?php echo '</script'; ?>
>
			</div>
			


	<?php } elseif ($_smarty_tpl->tpl_vars['video_data']->value['video_player'] == "embed") {?>
		<div id="Playerholder" class="embedded-video">
			<?php echo $_smarty_tpl->tpl_vars['video_data']->value['embed_code'];?>

		</div>
	<?php }
}?>

<?php }
}
}
