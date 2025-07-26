<?php echo $header; ?><?php echo $column_left; ?>
<div id="content">
	<div class="page-header">
		<div class="container-fluid">
			<div class="pull-right">
				<?php if (!empty($clear_cache)) { ?>
				<a href="<?php echo $clear_cache; ?>" class="btn btn-danger" data-toggle="tooltip" title="<?php echo $button_clear_cache; ?>"><i class="fa fa-eraser"></i></a>
				<?php } ?>
				<a onclick="$('#form-html').attr('action', $('#form-html').attr('action') + '&apply=1'); $('#form-html').submit();" class="btn btn-primary"><?php echo $button_apply; ?></a>
				<button type="submit" form="form-html" data-toggle="tooltip" title="<?php echo $button_save; ?>" class="btn btn-primary"><i class="fa fa-save"></i></button>
				<a href="<?php echo $cancel; ?>" data-toggle="tooltip" title="<?php echo $button_cancel; ?>" class="btn btn-default"><i class="fa fa-reply"></i></a></div>
				<h1><?php echo $heading_title; ?></h1>
				<ul class="breadcrumb">
					<?php foreach ($breadcrumbs as $breadcrumb) { ?>
					<li><a href="<?php echo $breadcrumb['href']; ?>"><?php echo $breadcrumb['text']; ?></a></li>
					<?php } ?>
				</ul>
			</div>
		</div>
		<div class="container-fluid">
			<?php if ($error_warning) { ?>
			<div class="alert alert-danger"><i class="fa fa-exclamation-circle"></i> <?php echo $error_warning; ?>
				<button type="button" class="close" data-dismiss="alert">&times;</button>
			</div>
			<?php } ?>
			<?php if ($success) { ?>
			<div class="alert alert-success"><i class="fa fa-check-circle"></i> <?php echo $success; ?>
				<button type="button" class="close" data-dismiss="alert">&times;</button>
			</div>
			<?php } ?>
			<div class="panel panel-default">
				<div class="panel-heading">
					<h3 class="panel-title"><i class="fa fa-pencil"></i> <?php echo $text_edit; ?></h3>
				</div>
				<div class="panel-body">
					<form action="<?php echo $action; ?>" method="post" enctype="multipart/form-data" id="form-html" class="form-horizontal">
						<ul class="nav nav-tabs setting-tabs">
							<li class="active"><a href="#tabs-block-general" data-toggle="tab"><?php echo $tab_general; ?></a></li>
							<li><a href="#tabs-block-data" data-toggle="tab"><?php echo $tab_data; ?></a></li>
							<li><a href="#tabs-block-filter" data-toggle="tab"><?php echo $tab_filter; ?></a></li>
						</ul>
						<div class="tab-content">
							<div id="tabs-block-general" class="tab-pane active">
								<div class="config">
									<div class="form-group">
										<label class="col-sm-2 control-label" for="input-name"><?php echo $entry_name; ?></label>
										<div class="col-sm-10">
											<input type="text" name="name" value="<?php if (!empty($module_info['name'])) echo $module_info['name']; ?>" id="input-name" class="form-control" />
											<?php if (!empty($error['name'])) { ?>
											<div class="text-danger"><?php echo $error['name']; ?></div>
											<?php } ?>
										</div>
									</div>
									<div class="form-group">
										<label class="col-sm-2 control-label" for="input-status"><?php echo $entry_status; ?></label>
										<div class="col-sm-10">
											<select name="status" id="input-status" class="form-control">
												<?php if (!empty($module_info['status'])) { ?>
												<option value="1" selected="selected"><?php echo $text_enabled; ?></option>
												<option value="0"><?php echo $text_disabled; ?></option>
												<?php } else { ?>
												<option value="1"><?php echo $text_enabled; ?></option>
												<option value="0" selected="selected"><?php echo $text_disabled; ?></option>
												<?php } ?>
											</select>
										</div>
									</div>
									<div class="form-group parent">
										<label class="col-sm-2 control-label" for="html-block-theme">
											<span data-toggle="tooltip" title="<?php echo $help_use_theme; ?>"><?php echo $entry_use_theme; ?></span>
										</label>
										<div class="col-sm-10">
											<div class="checkbox">
												<label><input id="html-block-theme" type="checkbox" class="slider form-control html-block-theme" name="theme" <?php if (!empty($module_info['theme'])) echo 'checked="checked"'; ?> /></label>
											</div>
										</div>
									</div>
									<div class="form-group template slider-content"<?php if (empty($module_info['theme'])) echo ' style="display:none"'; ?>>
										<label class="col-sm-2 control-label" for="html-block-theme-template">
											<?php echo $entry_theme; ?><br /><a class="js show-default"><?php echo $text_default_template; ?></a>
										</label>
										<div class="col-sm-10">
											<p class="link" style="margin-top: 0;"><a class="js"><?php echo $text_tokens; ?></a></p>
											<div class="content" style="display: none;">
												<table class="table table-bordered table-hover">
													<thead class="panel-heading">
														<tr>
															<td class="left"><?php echo $column_token; ?></td>
															<td class="left"><?php echo $column_value; ?></td>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td class="left">[title]</td>
															<td class="left"><?php echo $text_replace_title; ?></td>
														</tr>
														<tr>
															<td class="left">[content]</td>
															<td class="left"><?php echo $text_replace_content; ?></td>
														</tr>
													</tbody>
												</table>
											</div>
											<div class="template-wrapper">
												<textarea id="html-block-theme-template" rows="10" cols="100" name="template"><?php if (!empty($module_info['theme'])) echo $module_info['template']; ?></textarea>
												<p class="help"><?php echo $text_php_help; ?></p>
											</div>
										</div>
									</div>
									<div class="form-group parent">
										<label class="col-sm-2 control-label" for="html-block-style"><?php echo $entry_style; ?></label>
										<div class="col-sm-10">
											<div class="checkbox">
												<label><input id="html-block-style" type="checkbox" class="slider form-control" name="style" <?php echo !empty($module_info['style']) ? 'checked="checked"' : ''; ?>	value="1" /></label>
												<input type="hidden" name="css_change" value="0" />
											</div>
										</div>
									</div>
									<div class="form-group slider-content"<?php if (empty($module_info['style'])) echo ' style="display:none"'; ?>>
										<label class="col-sm-2 control-label"></label>
										<div class="col-sm-10">
											<textarea rows="10" cols="100" class="form-control" name="css"><?php echo isset($module_info['css']) ? $module_info['css'] : ''; ?></textarea>
										</div>
									</div>
								</div>
								<ul class="nav nav-tabs language-tabs language">
									<?php foreach ($languages as $language) { ?>
									<li><a href="#tab-language-<?php echo $language['language_id']; ?>" data-toggle="tab"><img src="view/image/flags/<?php echo $language['image']; ?>" title="<?php echo $language['name']; ?>" /> <?php echo $language['name']; ?></a></li>
									<?php } ?>
								</ul>
								<div class="tab-content">
									<?php foreach ($languages as $language) { ?>
									<div id="tab-language-<?php echo $language['language_id']; ?>" class="html-block-content tab-pane">
										<div class="form-group">
											<label class="col-sm-2 control-label" for="html-block-title-<?php echo $language['language_id']; ?>"><?php echo $entry_title; ?></label>
											<div class="col-sm-10 view">
												<input id="html-block-title-<?php echo $language['language_id']; ?>" type="text" class="form-control" name="title[<?php echo $language['language_id']; ?>]" value="<?php if (!empty($module_info['title'][$language['language_id']])) echo $module_info['title'][$language['language_id']]; ?>" />
												<a class="btn btn-default live-view"><i class="glyphicon glyphicon-eye-open"></i> <?php echo $button_live_view; ?></a>
											</div>
										</div>
										<div class="form-group content">
											<label class="col-sm-2 control-label" for="content-<?php echo $language['language_id']; ?>">
												<?php echo $entry_content; ?>
												<br /><a class="js show-hide-editor help"><?php echo !empty($module_info['editor'][$language['language_id']]) ? $text_disable_editor : $text_enabled_editor; ?></a>
											</label>
											<div class="col-sm-10">
												<p class="link">
													<a class="js"><?php echo $text_tokens; ?></a>
												</p>
												<div class="content" style="display: none;">
													<table class="table table-bordered table-hover">
														<thead>
															<tr>
																<td class="left"><?php echo $column_token; ?></td>
																<td class="left"><?php echo $column_value; ?></td>
															</tr>
														</thead>
														<tbody>
															<tr>
																<td class="left" colspan="2"><span class="title"><?php echo $text_title_shop; ?></span></td>
															</tr>
															<tr>
																<td class="left">[config::name]</td>
																<td class="left"><?php echo $text_token_config_name; ?></td>
															</tr>
															<tr>
																<td class="left">[config::title]</td>
																<td class="left"><?php echo $text_token_config_title; ?></td>
															</tr>
															<tr>
																<td class="left">[config::owner]</td>
																<td class="left"><?php echo $text_token_config_owner; ?></td>
															</tr>
															<tr>
																<td class="left">[config::address]</td>
																<td class="left"><?php echo $text_token_config_address; ?></td>
															</tr>
															<tr>
																<td class="left">[config::email]</td>
																<td class="left"><?php echo $text_token_config_email; ?></td>
															</tr>
															<tr>
																<td class="left">[config::telephone]</td>
																<td class="left"><?php echo $text_token_config_telephone; ?></td>
															</tr>
															<tr>
																<td class="left">[config::fax]</td>
																<td class="left"><?php echo $text_token_config_fax; ?></td>
															</tr>
															<tr>
																<td class="left" colspan="2"><span class="title"><?php echo $text_title_customer; ?></span> <sup>[1]</sup></td>
															</tr>
															<tr>
																<td class="left">[customer::firstname]</td>
																<td class="left"><?php echo $text_token_customer_firstname; ?></td>
															</tr>
															<tr>
																<td class="left">[customer::lastname]</td>
																<td class="left"><?php echo $text_token_customer_lastname; ?></td>
															</tr>
															<tr>
																<td class="left">[customer::email]</td>
																<td class="left"><?php echo $text_token_customer_email; ?></td>
															</tr>
															<tr>
																<td class="left">[customer::telephone]</td>
																<td class="left"><?php echo $text_token_customer_telephone; ?></td>
															</tr>
															<tr>
																<td class="left">[customer::fax]</td>
																<td class="left"><?php echo $text_token_customer_fax; ?></td>
															</tr>
															<tr>
																<td class="left">[customer::reward]</td>
																<td class="left"><?php echo $text_token_customer_reward; ?></td>
															</tr>
															<tr>
															<td class="left" colspan="2"><span class="title"><?php echo $text_title_over; ?></span></td>
															</tr>
															<tr>
																<td class="left">[currency::code]</td>
																<td class="left"><?php echo $text_token_currency_code; ?></td>
															</tr>
															<tr>
																<td class="left">[currency::title]</td>
																<td class="left"><?php echo $text_token_currency_title; ?></td>
															</tr>
															<tr>
																<td class="left">[language::code]</td>
																<td class="left"><?php echo $text_token_language_code; ?></td>
															</tr>
															<tr>
																<td class="left">[language::name]</td>
																<td class="left"><?php echo $text_token_language_name; ?></td>
															</tr>
														</tbody>
													</table>
													<p><sup>[1]</sup> <span class="help"><?php echo $text_help_tokens_customer; ?></span></p>
												</div>	
												<textarea class="form-control <?php echo (!empty($module_info['editor'][$language['language_id']])) ? 'enabled' : 'disable'; ?>" rows="19" cols="130" name="content[<?php echo $language['language_id']; ?>]" id="content-<?php echo $language['language_id']; ?>"><?php echo (!empty($module_info['content'][$language['language_id']])) ? $module_info['content'][$language['language_id']] : ''; ?></textarea><p class="help"><?php echo $text_php_help . '.<br />' . $text_php_help_editor; ?></p><input type="hidden" name="editor[<?php echo $language['language_id']; ?>]" value="<?php echo (int)empty($module_info['editor'][$language['language_id']]); ?>" />
											</div>
										</div>
									</div>
									<?php } ?>
								</div>
							</div>
							<div id="tabs-block-data" class="tab-pane">
								<div class="config">
									<div class="form-group">
										<label class="col-sm-2 control-label" for="html-block-use-php"><?php echo $entry_php; ?></label>
										<div class="col-sm-10">
											<div class="checkbox">
												<label><input id="html-block-use-php" type="checkbox" name="use_php" <?php echo isset($module_info['use_php']) ? 'checked="checked"' : ''; ?>	/></label>
											</div>
										</div>
									</div>
									<div class="form-group">
										<label class="col-sm-2 control-label" for="html-block-use-cache">
											<span data-toggle="tooltip" title="<?php echo $help_cache; ?>"><?php echo $entry_cache; ?></span>
										</label>
										<div class="col-sm-10">
											<div class="checkbox">
												<label><input id="html-block-use-cache" type="checkbox" name="use_cache" <?php echo isset($module_info['use_cache']) ? 'checked="checked"' : ''; ?>	/></label>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div id="tabs-block-filter" class="tab-pane">
								<div class="form-group">
									<label class="col-sm-2 control-label"><?php echo $entry_store; ?></label>
									<div class="col-sm-10">
										<div class="well well-sm" style="height: 150px; overflow: auto;">
											<?php foreach ($stores as $store) { ?>
											<div class="checkbox">
												<label>
													<input type="checkbox" name="filter_store[]" value="<?php echo $store['store_id']; ?>" <?php	if (isset($module_info['filter_store']) && in_array($store['store_id'], $module_info['filter_store'])) echo 'checked="checked"'; ?> />
													<?php echo $store['name']; ?>
												</label>
											</div>
											<?php } ?>
										</div>
										<a onclick="$(this).parent().find(':checkbox').prop('checked', true);"><?php echo $text_select_all; ?></a> / <a onclick="$(this).parent().find(':checkbox').prop('checked', false);"><?php echo $text_unselect_all; ?></a>
									</div>
								</div>
								<div class="form-group">
									<label class="col-sm-2 control-label"><?php echo $entry_customer_group; ?></label>
									<div class="col-sm-10">
										<div class="well well-sm" style="height: 150px; overflow: auto;">
											<?php foreach ($customer_groups as $customer_group) { ?>
											<div class="checkbox">
												<label>
													<input type="checkbox" name="filter_customer_group[]" value="<?php echo $customer_group['customer_group_id']; ?>" <?php	if (isset($module_info['filter_customer_group']) && in_array($customer_group['customer_group_id'], $module_info['filter_customer_group'])) echo 'checked="checked"'; ?> />
													<?php echo $customer_group['name']; ?>
												</label>
											</div>
											<?php } ?>
										</div>
										<a onclick="$(this).parent().find(':checkbox').prop('checked', true);"><?php echo $text_select_all; ?></a> / <a onclick="$(this).parent().find(':checkbox').prop('checked', false);"><?php echo $text_unselect_all; ?></a>
									</div>
								</div>
								<div class="form-group">
									<label class="col-sm-2 control-label"><?php echo $entry_manufacturer; ?></label>
									<div class="col-sm-10">
										<div class="well well-sm" style="height: 150px; overflow: auto;">
											<?php foreach ($manufacturers as $manufacturer) { ?>
											<div class="checkbox">
												<label>
													<input type="checkbox" name="filter_manufacturer[]" value="<?php echo $manufacturer['manufacturer_id']; ?>" <?php	if (!empty($module_info['filter_manufacturer']) && in_array($manufacturer['manufacturer_id'], $module_info['filter_manufacturer'])) echo 'checked="checked"'; ?> />
													<?php echo $manufacturer['name']; ?>
												</label>
											</div>
											<?php } ?>
										</div>
										<a onclick="$(this).parent().find(':checkbox').prop('checked', true);"><?php echo $text_select_all; ?></a> / <a onclick="$(this).parent().find(':checkbox').prop('checked', false);"><?php echo $text_unselect_all; ?></a>
									</div>
								</div>
								<div class="form-group">
									<label class="col-sm-2 control-label"><?php echo $entry_category; ?></label>
									<div class="col-sm-10">
										<div class="well well-sm" style="height: 150px; overflow: auto;">
											<?php foreach ($categories as $category) { ?>
											<div class="checkbox">
												<label>
													<input type="checkbox" name="filter_category[]" value="<?php echo $category['category_id']; ?>" <?php	if (!empty($module_info['filter_category']) && in_array($category['category_id'], $module_info['filter_category'])) echo 'checked="checked"'; ?> />
													<?php echo $category['name']; ?>
												</label>
											</div>
											<?php } ?>
										</div>
										<a onclick="$(this).parent().find(':checkbox').prop('checked', true);"><?php echo $text_select_all; ?></a> / <a onclick="$(this).parent().find(':checkbox').prop('checked', false);"><?php echo $text_unselect_all; ?></a>
									</div>
								</div>
								<div class="form-group">
									<label class="col-sm-2 control-label" for="input-product"><?php echo $entry_product; ?></label>
									<div class="col-sm-10">
										<input type="text" name="product" value="" placeholder="<?php echo $entry_product; ?>" class="form-control" />
										<div class="well well-sm filter-product" style="height: 150px; overflow: auto;">
											<?php if (!empty($module_info['filter_product'])) { ?>
											<?php foreach ($module_info['filter_product'] as $product) { ?>
											<div id="filter-product-<?php echo $product['product_id']; ?>">
												<i class="fa fa-minus-circle"></i> <?php echo $product['name']; ?>
												<input type="hidden" name="filter_product[]" value="<?php echo $product['product_id']; ?>" />
											</div>
											<?php } ?>
											<?php } ?>
										</div>
									</div>
								</div>
								<div class="form-group">
									<label class="col-sm-2 control-label" for="input-related"><?php echo $entry_information; ?></label>
									<div class="col-sm-10">
										<input type="text" name="information" value="" placeholder="<?php echo $entry_information; ?>" class="form-control" />
										<div class="well well-sm filter-information" style="height: 150px; overflow: auto;">
											<?php if (!empty($module_info['filter_information'])) { ?>
											<?php foreach ($module_info['filter_information'] as $information) { ?>
											<div id="filter-information-<?php echo $information['information_id']; ?>">
											<i class="fa fa-minus-circle"></i> <?php echo $information['name']; ?>
												<input type="hidden" name="filter_information[]" value="<?php echo $information['information_id']; ?>" />
											</div>
											<?php } ?>
											<?php } ?>
										</div>
									</div>
								</div>
							</div>
						</div>
					</form>
					<div class="donate">
						<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
							<input type="hidden" name="cmd" value="_s-xclick">
							<input type="hidden" name="hosted_button_id" value="RW8MDHJM3D392">
							<button type="submit" class="btn btn-primary"><i class="fa fa-thumbs-up"></i> Thanks</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
	<script type="text/javascript"><!--
		
		<?php foreach ($languages as $language) { ?>
		if ($("#content-<?php echo $language['language_id']; ?>").hasClass('enabled')) {
			$("#content-<?php echo $language['language_id']; ?>").summernote({height: 300});
		}
		<?php } ?>
		
		$('input[name=product]').autocomplete({
			'source': function(request, response) {
				
				$.ajax({
					url: 'index.php?route=catalog/product/autocomplete&token=<?php echo $token; ?>&filter_name=' +	encodeURIComponent(request),
					dataType: 'json',			
					success: function(json) {
						response($.map(json, function(item) {
							return {
								label: item['name'],
								value: item['product_id']
							}
						}));
					}
				});
			},
			select: function(item) {
				$(this.self).val('');
				$('#filter-product-' + item['value']).remove();
				$('.filter-product').append('<div id="filter-product-' + item['value'] + '"><i class="fa fa-minus-circle"></i> ' + item['label'] + '<input type="hidden" name="filter_product[]" value="' + item['value'] + '" /></div>');	
			}
		});
		
		$('input[name=information]').autocomplete({
			'source': function(request, response) {
				
				$.ajax({
					url: 'index.php?route=module/html_block/autocomplete&token=<?php echo $token; ?>&filter_name=' +	encodeURIComponent(request),
					dataType: 'json',			
					success: function(json) {
						response($.map(json, function(item) {
							return {
								label: item['name'],
								value: item['information_id']
							}
						}));
					}
				});
			},
			select: function(item) {
				$(this.self).val('');
				$('#filter-information-' + item['value']).remove();
				$('.filter-information').append('<div id="filter-information-' + item['value'] + '"><i class="fa fa-minus-circle"></i> ' + item['label'] + '<input type="hidden" name="filter_information[]" value="' + item['value'] + '" /></div>');	
			}
		});
		
		$('#html-block-style').change(function(event){
			$('input:hidden[name=css_change]').val(1);
		});
		
		$('textarea[name=css]').change(function(event){
			$('input:hidden[name=css_change]').val(1);
		});
		
		$('textarea[name=css]').keyup(function(event){
			$('input:hidden[name=css_change]').val(1);
		});
		
		$('body').delegate('.well .fa-minus-circle', 'click', function() {
			$(this).parent().remove();
		});
		
		$('body').delegate('.live-view', 'click', function(event){
			
			var languale_id = $(this).closest('.html-block-content').attr('id');
			
			var data = '.config input, .config input:checkbox:checked, .config textarea, #' + languale_id + ' input, #' + languale_id + ' textarea';
			
			var html = '<div class="modal preview fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">';
			html += '	<div class="modal-dialog modal-lg">';
			html += '		<div class="modal-content" style="padding: 3px 0px 0px 0px;width:800px;">';
			html += '			<div class="modal-header">';
			html += '				<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>';
			html += '				<h4 class="modal-title" id="myModalLabel"><?php echo $text_preview; ?></h4>';
			html += '			</div>';
			html += '			<div class="modal-body" style="min-height: 450px;">';
			html += '				<div class="throbber">&nbsp;</div><iframe name="preview-iframe" id="preview-iframe" style="padding:0;margin:0;display:block;width:100%;min-height:450px;" frameborder="no" scrolling="auto"></iframe>';
			html += '			</div>';
			html += '		</div>';
			html += '	</div>';
			html += '</div>';
			
			$('.modal.preview, #preview-form').remove();
			
			$('#content').prepend(html);
			
			$('.modal.preview').modal();
			$('.modal.preview').modal({keyboard:false});
			$('.modal.preview').modal('show');
			
			$('#preview-iframe').load(function(){
				$('.modal.preview .throbber').remove();
			});
			
			preview_form = document.createElement("form");
			preview_form.style.display = "none";
			preview_form.enctype = "application/x-www-form-urlencoded";
			preview_form.method = "POST";
			
			document.body.appendChild(preview_form);
		
			preview_form.action = "<?php echo HTTP_CATALOG; ?>index.php?route=module/html_block/preview&key=dmkapd8qweuqiweqjwkeh123123123";
			preview_form.target = 'preview-iframe';
			preview_form.setAttribute("target", 'preview-iframe');
			preview_form.id = 'preview-form';
			preview_form.setAttribute("id", 'preview-form');
		
			$(data).each(function(){
				
				if ($(this).is(':checkbox')) {
					if ($(this).is(':checked')) {
						var html = '<input type="hiden" name="' + $(this).attr('name') + '" value="' + $(this).val() + '" />';
					}
				} else if ($(this).is(':text')) {
					
					if ($(this).val()) {
						var html = '<input type="hiden" name="' + $(this).attr('name') + '" value="' + $(this).val() + '" />';
					}
					
				} else {
					
					if ($(this).attr('name') != '') {
						
						if ($(this).next('.note-editor').length) {
							var value = $(this).code();
						} else {
							var value = $(this).val();
						}
						
						var html = '<textarea name="' + $(this).attr('name') + '">' + value + '</textarea>';
						
					}
					
				}
				
				$('#preview-form').append(html);
			});
			
			$(preview_form).submit();
		});
		
		$('#content').delegate('.show-hide-editor', 'click', function(event){
			
			event.preventDefault();
			
			var context = $(this).closest('.form-group');
			
			var textarea = $('textarea', context);
			
			if ($('.note-editor', context).length) {
				
				var val = 0;
				$(textarea).destroy();
				var help_text = '<?php echo $text_enabled_editor; ?>';
				
			} else {
				
				var val = 1;
				addEditor(textarea);
				var help_text = '<?php echo $text_disable_editor; ?>';
			}
			
			$('input[type=hidden]', context).val(val);
			
			$(this).text(help_text);
		});
		
		function addEditor(el) {
			
			$(el).summernote({
				height: 300
			});
		}
		
		$('#content').delegate('p.link a.js', 'click', function(event){
			event.preventDefault();
			$(this).parent().next('.content').slideToggle('fast');
		});
		
		$('#content').on('change', '.slider', function(event) {
			$(this).closest('.form-group').next('.form-group.slider-content').slideToggle('fast');
		});
		
		$('#content').on('click', 'a.js.show-default', function(event){
			
			event.preventDefault();
			
			var default_theme = '<div>\n';
			default_theme +=	'	<h2>[title]</h2>\n';
			default_theme +=	'	[content]\n';
			default_theme +=	'</div>\n';
			
			$(this).closest('.form-group').find('textarea').val(default_theme);
		});
		
		$('.language a:first').tab('show');
		
	//--></script>
<?php echo $footer; ?>