//工作中心关联岗位
$(function () {
	//全选函数
	$('#modal_position_connect .checkbox-all').click(function () {
		var checklilst = $(this).parents("div").next().children().find('.checkboxs');
		//alert("checklilst="+checklilst.length+",checked="+$(this).prop('checked'));
		if ($(this).prop('checked')) {
			checklilst.prop("checked", true);
		} else {
			checklilst.prop('checked', false);
		}
		changeBtnStatus();
	});
	//单个checkbox与全选的关系函数
	$('#modal_position_connect .select-content').on('click', '.checkboxs', function (e) {
		var checkboxlist = $(this).parents('ul').children().find('.checkboxs');
		var checkednums = 0;
		$.each(checkboxlist, function (i, data) {
			if ($(this).prop('checked')) {
				checkednums++;
			}
		});
		//alert("checkboxlist="+checkboxlist.length + ",checkednums="+checkednums);
		var checkedAll = $(this).parents('.select-content').prev().find('.checkbox-all');
		if (checkboxlist.length == checkednums) {
			checkedAll.prop('checked', true);
		} else {
			checkedAll.prop('checked', false);
		}

		//stopFunc(e);
	});
	// 点击label时触发checkbox
	$('#modal_position_connect  .select-content').find('label').on('click', function () {
		$(this).prev(".checkboxs").click();
		changeBtnStatus();
	});
	// 点击行时选择checkbox
	$('#modal_position_connect .select-content').on('click', 'li', function () {
		$(this).find("span").children('.checkboxs').click();
		changeBtnStatus();
	});
	// 动态判断改变btn状态
	function changeBtnStatus() {
		var left_btn = false
		var right_btn = false
		var btn1 = document.getElementsByClassName('WUPositionRight')[0]
		var btn2 = document.getElementsByClassName('WUPositionLeft')[0]
		$("#modal_position_connect  ul.unselect-ul").find(".checkboxs").each(function () {
			//alert($(this).is(":checked"));
			if ($(this).is(":checked")) {
				right_btn = true;
			}

		});
		$("#modal_position_connect  ul.select-ul").find(".checkboxs").each(function () {
			//alert($(this).is(":checked"));
			if ($(this).is(":checked")) {
				left_btn = true;
			}
		});

		if (left_btn) {
			btn1.classList.add('btn-cursor')
		} else {
			btn1.classList.remove('btn-cursor')
		}
		if (right_btn) {
			btn2.classList.add('btn-cursor')
		} else {
			btn2.classList.remove('btn-cursor')
		}

	}
	//左右移按钮点击事件
	$('#modal_position_connect .arrow-btn').click(function () {
		var checkboxs, origin, target, num = 0;
		if ($(this).hasClass('WUPositionLeft')) {
			origin = $('#modal_position_connect .unselect-ul');
			target = $('#modal_position_connect .select-ul');
		} else {
			origin = $('#modal_position_connect .select-ul');
			target = $('#modal_position_connect .unselect-ul');
		}
		checkboxs = origin.find('.checkboxs');
		var idArray = new Array();
		for (var i = 0; i < checkboxs.length; i++) {
			if ($(checkboxs[i]).prop('checked')) {
				var id = $(checkboxs[i]).attr("id");
				idArray.push(id);
				var that = $(checkboxs[i]).parent().parent().clone();
				that.children('input').prop('checked', false);
				target.append(that);
				$(checkboxs[i]).parent().parent().remove();
			} else {
				num++;
			}
		}

		if (checkboxs.length == num) {
			alert('未选中任何一项');
		} else {
			origin.parent().prev().find('.checkbox-all').prop('checked', false);
			var ids = idArray.join(",");
			var operType = $(this).hasClass('WUPositionLeft') ? "selected" : "unselect";
		}
		changeBtnStatus();
	});
});
//工作中心关联设备
$(function () {
	//全选函数
	$('#modal_equip_connect .checkbox-all').click(function () {
		var checklilst = $(this).parents("div").next().children().find('.checkboxs');
		//alert("checklilst="+checklilst.length+",checked="+$(this).prop('checked'));
		if ($(this).prop('checked')) {
			checklilst.prop("checked", true);
		} else {
			checklilst.prop('checked', false);
		}
		changeBtnStatus();
	});
	//单个checkbox与全选的关系函数
	$('#modal_equip_connect .select-content').on('click', '.checkboxs', function (e) {
		var checkboxlist = $(this).parents('ul').children().find('.checkboxs');
		var checkednums = 0;
		$.each(checkboxlist, function (i, data) {
			if ($(this).prop('checked')) {
				checkednums++;
			}
		});
		//alert("checkboxlist="+checkboxlist.length + ",checkednums="+checkednums);
		var checkedAll = $(this).parents('.select-content').prev().find('.checkbox-all');
		if (checkboxlist.length == checkednums) {
			checkedAll.prop('checked', true);
		} else {
			checkedAll.prop('checked', false);
		}

		//stopFunc(e);
	});
	// 点击label时触发checkbox
	$('#modal_equip_connect  .select-content').find('label').on('click', function () {
		$(this).prev(".checkboxs").click();
		changeBtnStatus();
	});
	// 点击行时选择checkbox
	$('#modal_equip_connect .select-content').on('click', 'li', function () {
		$(this).find("span").children('.checkboxs').click();
		changeBtnStatus();
	});
	// 动态判断改变btn状态
	function changeBtnStatus() {
		var left_btn = false
		var right_btn = false
		var btn1 = document.getElementsByClassName('WUPositionRight')[0]
		var btn2 = document.getElementsByClassName('WUPositionLeft')[0]
		$("#modal_equip_connect  ul.unselect-ul").find(".checkboxs").each(function () {
			//alert($(this).is(":checked"));
			if ($(this).is(":checked")) {
				right_btn = true;
			}

		});
		$("#modal_equip_connect  ul.select-ul").find(".checkboxs").each(function () {
			//alert($(this).is(":checked"));
			if ($(this).is(":checked")) {
				left_btn = true;
			}
		});

		if (left_btn) {
			btn1.classList.add('btn-cursor')
		} else {
			btn1.classList.remove('btn-cursor')
		}
		if (right_btn) {
			btn2.classList.add('btn-cursor')
		} else {
			btn2.classList.remove('btn-cursor')
		}

	}
	//左右移按钮点击事件
	$('#modal_equip_connect .arrow-btn').click(function () {
		var checkboxs, origin, target, num = 0;
		if ($(this).hasClass('WUPositionLeft')) {
			origin = $('#modal_equip_connect .unselect-ul');
			target = $('#modal_equip_connect .select-ul');
		} else {
			origin = $('#modal_equip_connect .select-ul');
			target = $('#modal_equip_connect .unselect-ul');
		}
		checkboxs = origin.find('.checkboxs');
		var idArray = new Array();
		for (var i = 0; i < checkboxs.length; i++) {
			if ($(checkboxs[i]).prop('checked')) {
				var id = $(checkboxs[i]).attr("id");
				idArray.push(id);
				var that = $(checkboxs[i]).parent().parent().clone();
				that.children('input').prop('checked', false);
				target.append(that);
				$(checkboxs[i]).parent().parent().remove();
			} else {
				num++;
			}
		}

		if (checkboxs.length == num) {
			alert('未选中任何一项');
		} else {
			origin.parent().prev().find('.checkbox-all').prop('checked', false);
			var ids = idArray.join(",");
			var operType = $(this).hasClass('WUPositionLeft') ? "selected" : "unselect";
		}
		changeBtnStatus();
	});
});

//工作中心关联物料
$(function () {
	//全选函数
	$('#modal_materials_connect .checkbox-all').click(function () {
		var checklilst = $(this).parents("div").next().children().find('.checkboxs');
		//alert("checklilst="+checklilst.length+",checked="+$(this).prop('checked'));
		if ($(this).prop('checked')) {
			checklilst.prop("checked", true);
		} else {
			checklilst.prop('checked', false);
		}
		changeBtnStatus();
	});
	//单个checkbox与全选的关系函数
	$('#modal_materials_connect .select-content').on('click', '.checkboxs', function (e) {
		var checkboxlist = $(this).parents('ul').children().find('.checkboxs');
		var checkednums = 0;
		$.each(checkboxlist, function (i, data) {
			if ($(this).prop('checked')) {
				checkednums++;
			}
		});
		//alert("checkboxlist="+checkboxlist.length + ",checkednums="+checkednums);
		var checkedAll = $(this).parents('.select-content').prev().find('.checkbox-all');
		if (checkboxlist.length == checkednums) {
			checkedAll.prop('checked', true);
		} else {
			checkedAll.prop('checked', false);
		}

		//stopFunc(e);
	});
	// 点击label时触发checkbox
	$('#modal_materials_connect  .select-content').find('label').on('click', function () {
		$(this).prev(".checkboxs").click();
		changeBtnStatus();
	});
	// 点击行时选择checkbox
	$('#modal_materials_connect .select-content').on('click', 'li', function () {
		$(this).find("span").children('.checkboxs').click();
		changeBtnStatus();
	});
	// 动态判断改变btn状态
	function changeBtnStatus() {
		var left_btn = false
		var right_btn = false
		var btn1 = document.getElementsByClassName('WUMaterialRight')[0]
		var btn2 = document.getElementsByClassName('WUMaterialLeft')[0]
		$("#modal_materials_connect  ul.unselect-ul").find(".checkboxs").each(function () {
			//alert($(this).is(":checked"));
			if ($(this).is(":checked")) {
				right_btn = true;
			}

		});
		$("#modal_materials_connect  ul.select-ul").find(".checkboxs").each(function () {
			//alert($(this).is(":checked"));
			if ($(this).is(":checked")) {
				left_btn = true;
			}
		});

		if (left_btn) {
			btn1.classList.add('btn-cursor')
		} else {
			btn1.classList.remove('btn-cursor')
		}
		if (right_btn) {
			btn2.classList.add('btn-cursor')
		} else {
			btn2.classList.remove('btn-cursor')
		}

	}
	//左右移按钮点击事件
	$('#modal_materials_connect .arrow-btn').click(function () {
		var checkboxs, origin, target, num = 0;
		if ($(this).hasClass('WUMaterialLeft')) {
			origin = $('#modal_materials_connect .unselect-ul');
			target = $('#modal_materials_connect .select-ul');
		} else {
			origin = $('#modal_materials_connect .select-ul');
			target = $('#modal_materials_connect .unselect-ul');
		}
		checkboxs = origin.find('.checkboxs');
		var idArray = new Array();
		for (var i = 0; i < checkboxs.length; i++) {
			if ($(checkboxs[i]).prop('checked')) {
				var id = $(checkboxs[i]).attr("id");
				idArray.push(id);
				var that = $(checkboxs[i]).parent().parent().clone();
				that.children('input').prop('checked', false);
				target.append(that);
				$(checkboxs[i]).parent().parent().remove();
			} else {
				num++;
			}
		}

		if (checkboxs.length == num) {
			alert('未选中任何一项');
		} else {
			origin.parent().prev().find('.checkbox-all').prop('checked', false);
			var ids = idArray.join(",");
			var operType = $(this).hasClass('WUMaterialLeft') ? "selected" : "unselect";
		}
		changeBtnStatus();
	});
});