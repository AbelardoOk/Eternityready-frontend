<?php
/* Smarty version 3.1.33, created on 2025-08-08 04:21:56
  from '/home/eternity/public_html/old/templates/apollo/user-auth-login-form.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.33',
  'unifunc' => 'content_68957b64241694_55558961',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '7ab21d02b50440f90d5be9c0b04c351f7fc47663' => 
    array (
      0 => '/home/eternity/public_html/old/templates/apollo/user-auth-login-form.tpl',
      1 => 1730391553,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_68957b64241694_55558961 (Smarty_Internal_Template $_smarty_tpl) {
?><form name="login_form" id="login-form" method="post" action="<?php echo @constant('_URL');?>
/login.php">
	<div class="form-group">
		<label for="username"><?php echo $_smarty_tpl->tpl_vars['lang']->value['your_username_or_email'];?>
</label>
		<input type="text" class="form-control" name="username" value="<?php echo $_smarty_tpl->tpl_vars['inputs']->value['username'];?>
" placeholder="<?php echo $_smarty_tpl->tpl_vars['lang']->value['your_username_or_email'];?>
">
	</div>
	<div class="form-group">
		<label for="pass"><?php echo $_smarty_tpl->tpl_vars['lang']->value['password'];?>
</label>
		<input type="password" class="form-control" id="pass" name="pass" maxlength="32" autocomplete="off" placeholder="<?php echo $_smarty_tpl->tpl_vars['lang']->value['password'];?>
">
	</div>
	<div class="form-group">
		<button type="submit" name="Login" value="<?php echo $_smarty_tpl->tpl_vars['lang']->value['login'];?>
" class="btn btn-success btn-with-loader" data-loading-text="<?php echo (($tmp = @$_smarty_tpl->tpl_vars['lang']->value['logging_in'])===null||$tmp==='' ? 'Signing in...' : $tmp);?>
"><?php echo $_smarty_tpl->tpl_vars['lang']->value['login'];?>
</button> 
		<small><a href="<?php echo @constant('_URL');?>
/login.<?php echo @constant('_FEXT');?>
?do=forgot_pass"><?php echo $_smarty_tpl->tpl_vars['lang']->value['forgot_pass'];?>
</a></small>
	</div>
</form><?php }
}
