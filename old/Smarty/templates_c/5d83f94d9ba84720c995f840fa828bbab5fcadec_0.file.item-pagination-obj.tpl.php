<?php
/* Smarty version 3.1.33, created on 2025-08-08 06:29:36
  from '/home/eternity/public_html/old/templates/apollo/item-pagination-obj.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.33',
  'unifunc' => 'content_689599509851b8_52209237',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '5d83f94d9ba84720c995f840fa828bbab5fcadec' => 
    array (
      0 => '/home/eternity/public_html/old/templates/apollo/item-pagination-obj.tpl',
      1 => 1730391554,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_689599509851b8_52209237 (Smarty_Internal_Template $_smarty_tpl) {
?><div class="row">
	<div class="col-md-12 text-center">
	<ul class="pagination pagination-sm <?php echo $_smarty_tpl->tpl_vars['custom_class']->value;?>
">
		<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['pagination']->value, 'pagination_data', false, 'k');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['k']->value => $_smarty_tpl->tpl_vars['pagination_data']->value) {
?>
		<li<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['pagination_data']->value['li'], 'attr_val', false, 'attr');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['attr']->value => $_smarty_tpl->tpl_vars['attr_val']->value) {
?> <?php echo $_smarty_tpl->tpl_vars['attr']->value;?>
="<?php echo $_smarty_tpl->tpl_vars['attr_val']->value;?>
"<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>>
			<a<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['pagination_data']->value['a'], 'attr_val', false, 'attr');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['attr']->value => $_smarty_tpl->tpl_vars['attr_val']->value) {
?> <?php echo $_smarty_tpl->tpl_vars['attr']->value;?>
="<?php echo $_smarty_tpl->tpl_vars['attr_val']->value;?>
"<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>><?php echo $_smarty_tpl->tpl_vars['pagination_data']->value['text'];?>
</a>
		</li>
		<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
	</ul>
	</div>
</div><?php }
}
