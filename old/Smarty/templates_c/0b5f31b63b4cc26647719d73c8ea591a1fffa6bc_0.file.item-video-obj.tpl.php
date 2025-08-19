<?php
/* Smarty version 3.1.33, created on 2025-08-08 04:21:56
  from '/home/eternity/public_html/old/templates/apollo/item-video-obj.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.33',
  'unifunc' => 'content_68957b64326590_68821870',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '0b5f31b63b4cc26647719d73c8ea591a1fffa6bc' => 
    array (
      0 => '/home/eternity/public_html/old/templates/apollo/item-video-obj.tpl',
      1 => 1730391553,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_68957b64326590_68821870 (Smarty_Internal_Template $_smarty_tpl) {
?><div class="thumbnail<?php if ($_smarty_tpl->tpl_vars['thumbSize']->value == 'small') {?> thumbnail-small<?php } elseif ($_smarty_tpl->tpl_vars['thumbSize']->value == 'medium') {?> thumbnail-medium<?php } elseif ($_smarty_tpl->tpl_vars['thumbSize']->value == 'large') {?> thumbnail-large<?php }?>">
	<div class="pm-video-thumb<?php if ($_smarty_tpl->tpl_vars['video_data']->value['pending_approval']) {?> pm-video-thumb-pending<?php }?> ripple">
		<?php if ($_smarty_tpl->tpl_vars['video_data']->value['yt_length'] != 0) {?><span class="pm-label-duration"><?php echo $_smarty_tpl->tpl_vars['video_data']->value['duration'];?>
</span><?php }?>

		<?php if ($_smarty_tpl->tpl_vars['profile_data']->value['id'] == $_smarty_tpl->tpl_vars['s_user_id']->value && $_smarty_tpl->tpl_vars['allow_user_edit_video']->value) {?>
			<?php if ($_smarty_tpl->tpl_vars['video_data']->value['pending_approval']) {?>
			<a href="<?php echo @constant('_URL');?>
/edit-video.php?vid=<?php echo $_smarty_tpl->tpl_vars['video_data']->value['id'];?>
&type=pending" class="btn btn-mini btn-edit-video" rel="tooltip" title="<?php echo $_smarty_tpl->tpl_vars['lang']->value['edit'];?>
"><i class="fa fa-pencil"></i></a>
			<?php } else { ?>
			<a href="<?php echo @constant('_URL');?>
/edit-video.php?vid=<?php echo $_smarty_tpl->tpl_vars['video_data']->value['uniq_id'];?>
" class="btn btn-mini btn-edit-video" rel="tooltip" title="<?php echo $_smarty_tpl->tpl_vars['lang']->value['edit'];?>
"><i class="fa fa-pencil"></i></a>
			<?php }?>
		<?php }?>

		<?php if (!$_smarty_tpl->tpl_vars['video_data']->value['pending_approval']) {?>
			<?php if ($_smarty_tpl->tpl_vars['logged_in']->value) {?>
			<div class="watch-later">
				<button class="pm-watch-later-add btn btn-xs btn-default hidden-xs watch-later-add-btn-<?php echo $_smarty_tpl->tpl_vars['video_data']->value['id'];?>
" onclick="watch_later_add(<?php echo $_smarty_tpl->tpl_vars['video_data']->value['id'];?>
); return false;" rel="tooltip" data-placement="left" title="<?php echo $_smarty_tpl->tpl_vars['lang']->value['watch_later'];?>
"><i class="fa fa-clock-o"></i></button>
				<button class="pm-watch-later-remove btn btn-xs btn-success hidden-xs watch-later-remove-btn-<?php echo $_smarty_tpl->tpl_vars['video_data']->value['id'];?>
" onclick="watch_later_remove(<?php echo $_smarty_tpl->tpl_vars['video_data']->value['id'];?>
); return false;" rel="tooltip" title="<?php echo $_smarty_tpl->tpl_vars['lang']->value['playlist_remove_item'];?>
"><i class="fa fa-check"></i></button>
			</div>
			<?php } else { ?>
			<a class="pm-watch-later-add btn btn-xs btn-default hidden-xs" rel="tooltip" data-placement="left" title="<?php echo $_smarty_tpl->tpl_vars['lang']->value['watch_later'];?>
" data-toggle="modal" data-backdrop="true" data-keyboard="true" href="#modal-login-form"><i class="fa fa-clock-o"></i></a>
			<?php }?>
		<?php }?>
		<a href="<?php echo $_smarty_tpl->tpl_vars['video_data']->value['video_href'];?>
" title="<?php echo $_smarty_tpl->tpl_vars['video_data']->value['attr_alt'];?>
">
			<?php if ($_smarty_tpl->tpl_vars['tpl_name']->value == "video-top") {?>
			<div class="pm-video-rank-no"><?php echo $_smarty_tpl->tpl_vars['video_data']->value['position'];?>
</div>
			<?php }?>
			<?php if ($_smarty_tpl->tpl_vars['hideLabels']->value != "1") {?>
			<div class="pm-video-labels hidden-xs">
				<?php if ($_smarty_tpl->tpl_vars['video_data']->value['pending_approval']) {?><span class="label label-pending"><?php echo $_smarty_tpl->tpl_vars['lang']->value['pending_approval'];?>
</span><?php }?>
				<?php if ($_smarty_tpl->tpl_vars['video_data']->value['mark_new']) {?><span class="label label-new"><?php echo $_smarty_tpl->tpl_vars['lang']->value['_new'];?>
</span><?php }?>
				<?php if ($_smarty_tpl->tpl_vars['video_data']->value['mark_popular']) {?><span class="label label-pop"><?php echo $_smarty_tpl->tpl_vars['lang']->value['_popular'];?>
</span><?php }?>
				<?php if ($_smarty_tpl->tpl_vars['video_data']->value['featured']) {?><span class="label label-featured"><?php echo $_smarty_tpl->tpl_vars['lang']->value['_feat'];?>
</span><?php }?>
			</div>
			<?php }?>
			<img src="<?php echo @constant('_URL');?>
/templates/<?php echo $_smarty_tpl->tpl_vars['template_dir']->value;?>
/img/melody-lzld.png" alt="<?php echo $_smarty_tpl->tpl_vars['video_data']->value['attr_alt'];?>
" data-echo="<?php echo $_smarty_tpl->tpl_vars['video_data']->value['thumb_img_url'];?>
" class="img-responsive">
		<span class="overlay"></span>
		</a>
	</div>

	<div class="caption">
		<h3><a href="<?php echo $_smarty_tpl->tpl_vars['video_data']->value['video_href'];?>
" title="<?php echo $_smarty_tpl->tpl_vars['video_data']->value['attr_alt'];?>
" class="ellipsis"><?php echo $_smarty_tpl->tpl_vars['video_data']->value['video_title'];?>
</a></h3>
		<?php if ($_smarty_tpl->tpl_vars['hideMeta']->value != "1") {?>
		<div class="pm-video-meta hidden-xs">
			<span class="pm-video-author"><?php echo $_smarty_tpl->tpl_vars['lang']->value['_by'];?>
 <a href="<?php echo $_smarty_tpl->tpl_vars['video_data']->value['author_profile_href'];?>
"><?php echo $_smarty_tpl->tpl_vars['video_data']->value['author_username'];?>
</a></span>
			<?php if ($_smarty_tpl->tpl_vars['langs_array']->value[$_smarty_tpl->tpl_vars['current_lang_id']->value]['title'] == 'Deutsch') {?>
			<span class="pm-video-since"><time datetime="<?php echo $_smarty_tpl->tpl_vars['video_data']->value['html5_datetime'];?>
" title="<?php echo $_smarty_tpl->tpl_vars['video_data']->value['full_datetime'];?>
"><?php echo $_smarty_tpl->tpl_vars['lang']->value['ago'];?>
 <?php echo $_smarty_tpl->tpl_vars['video_data']->value['time_since_added'];?>
</time></span>
			<?php } else { ?>
			<span class="pm-video-since"><time datetime="<?php echo $_smarty_tpl->tpl_vars['video_data']->value['html5_datetime'];?>
" title="<?php echo $_smarty_tpl->tpl_vars['video_data']->value['full_datetime'];?>
"><?php echo $_smarty_tpl->tpl_vars['video_data']->value['time_since_added'];?>
</time></span>
			<?php }?>
<!-- 			<span class="pm-video-views"><i class="fa fa-eye"></i> <?php echo $_smarty_tpl->tpl_vars['video_data']->value['views_compact'];?>
</span>
			<span class=""><i class="fa fa-thumbs-up"></i> <?php echo $_smarty_tpl->tpl_vars['video_data']->value['likes_formatted'];?>
</span> -->
		</div>
		<?php }?>
	</div>
</div><?php }
}
