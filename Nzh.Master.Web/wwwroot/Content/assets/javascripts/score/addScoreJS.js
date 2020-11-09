$(function () {

	//单个checkbox与全选的关系函数
	$('.select-content').on('click', '.checkboxs', function (e) {
		var checkedAll = $(this).parents('.select-content').prev().find('.checkbox-all');
		var checkboxs = $(this).prop('checked');
		if (!checkboxs && checkedAll.prop('checked')) {
			checkedAll.prop('checked', false);
		} else if (checkboxs && !checkedAll.prop('checked')) {
			var lis = $(this).parents('ul').children();
			for (var i = 0; i < lis.length; i++) {
				if ($(lis[i]).find('.checkboxs').prop('checked')) {
					if (i == lis.length - 1) {
						checkedAll.prop('checked', true)
					}
				} else {
					break;
				}
			}
		}
		stopFunc(e);
	});
	//=========加分项Modal页面================
	//=========加分人员信息==============
	//全选函数
	$('#AddScoreUserleft,#AddScoreUserright').click(function () {
		if ($(this).prop('checked')) {
			$(this).parent().next().find('.checkboxs').prop('checked', true);
		} else {
			$(this).parent().next().find('.checkboxs').prop('checked', false);
		}
		btn_statusAddUser();
	});
	$('#AddModalScoreUser .select-content').on('click', 'li', function () {
		$(this).children('.checkboxs').click();
		btn_statusAddUser();
	});
	// 动态判断改变btn状态
	function btn_statusAddUser() {
		var btn1 = $("#PUserSelectbtn_right").get(0);
		var btn2 = $("#PUserSelectbtn_left").get(0);
		var left_ul = $("#PUserSelect_left").get(0);
		var right_ul = $("#PUserSelect_right").get(0);
		var left_ul_li = left_ul.children
		var right_ul_li = right_ul.children
		var left_btn = false
		var right_btn = false
		for (var i = 0; i < left_ul_li.length; i++) {
			if (left_ul_li[i].firstElementChild.checked == true) {
				left_btn = true
			}
		}
		for (var i = 0; i < right_ul_li.length; i++) {
			if (right_ul_li[i].firstElementChild.checked == true) {
				right_btn = true
			}
		}
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
	$("#PUserSelectbtn_right").click(function () {
		var checkboxs, origin, target, num = 0;
		origin = $("#PUserSelect_left");
		target = $("#PUserSelect_right");
		checkboxs = origin.find('.checkboxs');
		for (var i = 0; i < checkboxs.length; i++) {
			if ($(checkboxs[i]).prop('checked')) {
				var that = $(checkboxs[i]).parent().clone();
				that.children('input').prop('checked', false);
				target.append(that);
				$(checkboxs[i]).parent().remove();
			} else {
				num++;
			}
		}
		if (checkboxs.length == num) {
			//					alert('未选中任何一项');
		} else {
			origin.parent().prev().find('.checkbox-all').prop('checked', false);
		}
		btn_statusAddUser();
	});
	$("#PUserSelectbtn_left").click(function () {
		var checkboxs, origin, target, num = 0;
		origin = $("#PUserSelect_right");
		target = $("#PUserSelect_left");
		checkboxs = origin.find('.checkboxs');
		for (var i = 0; i < checkboxs.length; i++) {
			if ($(checkboxs[i]).prop('checked')) {
				var that = $(checkboxs[i]).parent().clone();
				that.children('input').prop('checked', false);
				target.append(that);
				$(checkboxs[i]).parent().remove();
			} else {
				num++;
			}
		}
		if (checkboxs.length == num) {
			//					alert('未选中任何一项');
		} else {
			origin.parent().prev().find('.checkbox-all').prop('checked', false);
		}
		btn_statusAddUser();
	});
	//=========加分项信息==============
	$('#AddScoreItemleft,#AddScoreItemright').click(function () {
		if ($(this).prop('checked')) {
			$(this).parent().next().find('.checkboxs').prop('checked', true);
		} else {
			$(this).parent().next().find('.checkboxs').prop('checked', false);
		}
		btn_statusAddScoreItem();
	});
	//单个checkbox与全选的关系函数
	$('#AddModalItemUser .select-content').on('click', 'li', function () {
		$(this).children('.checkboxs').click();
		btn_statusAddScoreItem();
	});
	// 动态判断改变btn状态
	function btn_statusAddScoreItem() {
		var btn1 = $("#PScoreSelectbtn_right").get(0);
		var btn2 = $("#PScoreSelectbtn_left").get(0);
		var left_ul = $("#PScoreSelect_left").get(0);
		var right_ul = $("#PScoreSelect_right").get(0);
		var left_ul_li = left_ul.children
		var right_ul_li = right_ul.children
		var left_btn = false
		var right_btn = false
		for (var i = 0; i < left_ul_li.length; i++) {
			if (left_ul_li[i].firstElementChild.checked == true) {
				left_btn = true
			}
		}
		for (var i = 0; i < right_ul_li.length; i++) {
			if (right_ul_li[i].firstElementChild.checked == true) {
				right_btn = true
			}
		}
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
	$("#PScoreSelectbtn_right").click(function () {
		var checkboxs, origin, target, num = 0;
		origin = $("#PScoreSelect_left");
		target = $("#PScoreSelect_right");
		checkboxs = origin.find('.checkboxs');
		for (var i = 0; i < checkboxs.length; i++) {
			if ($(checkboxs[i]).prop('checked')) {
				var that = $(checkboxs[i]).parent().clone();
				that.children('input').prop('checked', false);
				target.append(that);
				$(checkboxs[i]).parent().remove();
			} else {
				num++;
			}
		}
		if (checkboxs.length == num) {
			//					alert('未选中任何一项');
		} else {
			origin.parent().prev().find('.checkbox-all').prop('checked', false);
		}
		btn_statusAddScoreItem();
	});
	$("#PScoreSelectbtn_left").click(function () {
		var checkboxs, origin, target, num = 0;
		origin = $("#PScoreSelect_right");
		target = $("#PScoreSelect_left");
		checkboxs = origin.find('.checkboxs');
		for (var i = 0; i < checkboxs.length; i++) {
			if ($(checkboxs[i]).prop('checked')) {
				var that = $(checkboxs[i]).parent().clone();
				that.children('input').prop('checked', false);
				target.append(that);
				$(checkboxs[i]).parent().remove();
			} else {
				num++;
			}
		}
		if (checkboxs.length == num) {
			//					alert('未选中任何一项');
		} else {
			origin.parent().prev().find('.checkbox-all').prop('checked', false);
		}
		btn_statusAddScoreItem();
	});
	//=========减分项Modal页面================
	//=========减分人员信息==============
	$('#RemoveScoreUserleft,#RemoveScoreUserright').click(function () {
		if ($(this).prop('checked')) {
			$(this).parent().next().find('.checkboxs').prop('checked', true);
		} else {
			$(this).parent().next().find('.checkboxs').prop('checked', false);
		}
		btn_statusRemoveUserItem();
	});
	//单个checkbox与全选的关系函数
	$('#RemoveModalScoreUser .select-content').on('click', 'li', function () {
		$(this).children('.checkboxs').click();
		btn_statusRemoveUserItem();
	});
	// 动态判断改变btn状态
	function btn_statusRemoveUserItem() {
		var btn1 = $("#NUserSelectbtn_right").get(0);
		var btn2 = $("#NUserSelectbtn_left").get(0);
		var left_ul = $("#NUserSelect_left").get(0);
		var right_ul = $("#NUserSelect_right").get(0);
		var left_ul_li = left_ul.children
		var right_ul_li = right_ul.children
		var left_btn = false
		var right_btn = false
		for (var i = 0; i < left_ul_li.length; i++) {
			if (left_ul_li[i].firstElementChild.checked == true) {
				left_btn = true
			}
		}
		for (var i = 0; i < right_ul_li.length; i++) {
			if (right_ul_li[i].firstElementChild.checked == true) {
				right_btn = true
			}
		}
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
	$("#NUserSelectbtn_right").click(function () {
		var checkboxs, origin, target, num = 0;
		origin = $("#NUserSelect_left");
		target = $("#NUserSelect_right");
		checkboxs = origin.find('.checkboxs');
		for (var i = 0; i < checkboxs.length; i++) {
			if ($(checkboxs[i]).prop('checked')) {
				var that = $(checkboxs[i]).parent().clone();
				that.children('input').prop('checked', false);
				target.append(that);
				$(checkboxs[i]).parent().remove();
			} else {
				num++;
			}
		}
		if (checkboxs.length == num) {
			//					alert('未选中任何一项');
		} else {
			origin.parent().prev().find('.checkbox-all').prop('checked', false);
		}
		btn_statusRemoveUserItem();
	});
	$("#NUserSelectbtn_left").click(function () {
		var checkboxs, origin, target, num = 0;
		origin = $("#NUserSelect_right");
		target = $("#NUserSelect_left");
		checkboxs = origin.find('.checkboxs');
		for (var i = 0; i < checkboxs.length; i++) {
			if ($(checkboxs[i]).prop('checked')) {
				var that = $(checkboxs[i]).parent().clone();
				that.children('input').prop('checked', false);
				target.append(that);
				$(checkboxs[i]).parent().remove();
			} else {
				num++;
			}
		}
		if (checkboxs.length == num) {
			//					alert('未选中任何一项');
		} else {
			origin.parent().prev().find('.checkbox-all').prop('checked', false);
		}
		btn_statusRemoveUserItem();
	});
	//=========减分项信息==============
	$('#RemoveScoreItemleft,#RemoveScoreItemright').click(function () {
		if ($(this).prop('checked')) {
			$(this).parent().next().find('.checkboxs').prop('checked', true);
		} else {
			$(this).parent().next().find('.checkboxs').prop('checked', false);
		}
		btn_statusRemoveScoreItem();
	});
	//单个checkbox与全选的关系函数
	$('#RemoveModalItemUser .select-content').on('click', 'li', function () {
		$(this).children('.checkboxs').click();
		btn_statusRemoveScoreItem();
	});
	// 动态判断改变btn状态
	function btn_statusRemoveScoreItem() {
		var btn1 = $("#NScoreSelectbtn_right").get(0);
		var btn2 = $("#NScoreSelectbtn_left").get(0);
		var left_ul = $("#NScoreSelect_left").get(0);
		var right_ul = $("#NScoreSelect_right").get(0);
		var left_ul_li = left_ul.children
		var right_ul_li = right_ul.children
		var left_btn = false
		var right_btn = false
		for (var i = 0; i < left_ul_li.length; i++) {
			if (left_ul_li[i].firstElementChild.checked == true) {
				left_btn = true
			}
		}
		for (var i = 0; i < right_ul_li.length; i++) {
			if (right_ul_li[i].firstElementChild.checked == true) {
				right_btn = true
			}
		}
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
	$("#NScoreSelectbtn_right").click(function () {
		var checkboxs, origin, target, num = 0;
		origin = $("#NScoreSelect_left");
		target = $("#NScoreSelect_right");
		checkboxs = origin.find('.checkboxs');
		for (var i = 0; i < checkboxs.length; i++) {
			if ($(checkboxs[i]).prop('checked')) {
				var that = $(checkboxs[i]).parent().clone();
				that.children('input').prop('checked', false);
				target.append(that);
				$(checkboxs[i]).parent().remove();
			} else {
				num++;
			}
		}
		if (checkboxs.length == num) {
			//					alert('未选中任何一项');
		} else {
			origin.parent().prev().find('.checkbox-all').prop('checked', false);
		}
		btn_statusRemoveScoreItem();
	});
	$("#NScoreSelectbtn_left").click(function () {
		var checkboxs, origin, target, num = 0;
		origin = $("#NScoreSelect_right");
		target = $("#NScoreSelect_left");
		checkboxs = origin.find('.checkboxs');
		for (var i = 0; i < checkboxs.length; i++) {
			if ($(checkboxs[i]).prop('checked')) {
				var that = $(checkboxs[i]).parent().clone();
				that.children('input').prop('checked', false);
				target.append(that);
				$(checkboxs[i]).parent().remove();
			} else {
				num++;
			}
		}
		if (checkboxs.length == num) {
			//					alert('未选中任何一项');
		} else {
			origin.parent().prev().find('.checkbox-all').prop('checked', false);
		}
		btn_statusRemoveScoreItem();
	});


	//=============================编辑==================================

	//=========加分项==============

	//左右移按钮点击事件
	$("#EditPositivebtn_right").click(function () {
		var checkboxs, origin, target, num = 0;
		origin = $("#EditPositive_left");
		target = $("#EditPositive_right");
		checkboxs = origin.find('.checkboxs');
		for (var i = 0; i < checkboxs.length; i++) {
			if ($(checkboxs[i]).prop('checked')) {
				var that = $(checkboxs[i]).parent().clone();
				that.children('input').prop('checked', false);
				target.append(that);
				$(checkboxs[i]).parent().remove();
			} else {
				num++;
			}
		}
		if (checkboxs.length == num) {
			//					alert('未选中任何一项');
		} else {
			origin.parent().prev().find('.checkbox-all').prop('checked', false);
		}
		Editbtn_statusAddScoreItem();
	});

	$("#EditPositivebtn_left").click(function () {
		var checkboxs, origin, target, num = 0;
		origin = $("#EditPositive_right");
		target = $("#EditPositive_left");
		checkboxs = origin.find('.checkboxs');
		for (var i = 0; i < checkboxs.length; i++) {
			if ($(checkboxs[i]).prop('checked')) {
				var that = $(checkboxs[i]).parent().clone();
				that.children('input').prop('checked', false);
				target.append(that);
				$(checkboxs[i]).parent().remove();
			} else {
				num++;
			}
		}
		if (checkboxs.length == num) {
			//					alert('未选中任何一项');
		} else {
			origin.parent().prev().find('.checkbox-all').prop('checked', false);
		}
		Editbtn_statusAddScoreItem();
	});

	function Editbtn_statusAddScoreItem() {
		var btn1 = $("#EditPositivebtn_right").get(0);
		var btn2 = $("#EditPositivebtn_left").get(0);
		var left_ul = $("#EditPositive_left").get(0);
		var right_ul = $("#EditPositive_right").get(0);
		var left_ul_li = left_ul.children
		var right_ul_li = right_ul.children
		var left_btn = false
		var right_btn = false
		for (var i = 0; i < left_ul_li.length; i++) {
			if (left_ul_li[i].firstElementChild.checked == true) {
				left_btn = true
			}
		}
		for (var i = 0; i < right_ul_li.length; i++) {
			if (right_ul_li[i].firstElementChild.checked == true) {
				right_btn = true
			}
		}
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

	//=========减分项==============

	//左右移按钮点击事件
	$("#EditNegativebtn_right").click(function () {
		var checkboxs, origin, target, num = 0;
		origin = $("#EditNegative_left");
		target = $("#EditNegative_right");
		checkboxs = origin.find('.checkboxs');
		for (var i = 0; i < checkboxs.length; i++) {
			if ($(checkboxs[i]).prop('checked')) {
				var that = $(checkboxs[i]).parent().clone();
				that.children('input').prop('checked', false);
				target.append(that);
				$(checkboxs[i]).parent().remove();
			} else {
				num++;
			}
		}
		if (checkboxs.length == num) {
			//					alert('未选中任何一项');
		} else {
			origin.parent().prev().find('.checkbox-all').prop('checked', false);
		}
		Editbtn_statusRemoveScoreItem();
	});

	$("#EditNegativebtn_left").click(function () {
		var checkboxs, origin, target, num = 0;
		origin = $("#EditNegative_right");
		target = $("#EditNegative_left");
		checkboxs = origin.find('.checkboxs');
		for (var i = 0; i < checkboxs.length; i++) {
			if ($(checkboxs[i]).prop('checked')) {
				var that = $(checkboxs[i]).parent().clone();
				that.children('input').prop('checked', false);
				target.append(that);
				$(checkboxs[i]).parent().remove();
			} else {
				num++;
			}
		}
		if (checkboxs.length == num) {
			//					alert('未选中任何一项');
		} else {
			origin.parent().prev().find('.checkbox-all').prop('checked', false);
		}
		Editbtn_statusRemoveScoreItem();
	});

	function Editbtn_statusRemoveScoreItem() {
		var btn1 = $("#EditNegativebtn_right").get(0);
		var btn2 = $("#EditNegativebtn_left").get(0);
		var left_ul = $("#EditNegative_left").get(0);
		var right_ul = $("#EditNegative_right").get(0);
		var left_ul_li = left_ul.children
		var right_ul_li = right_ul.children
		var left_btn = false
		var right_btn = false
		for (var i = 0; i < left_ul_li.length; i++) {
			if (left_ul_li[i].firstElementChild.checked == true) {
				left_btn = true
			}
		}
		for (var i = 0; i < right_ul_li.length; i++) {
			if (right_ul_li[i].firstElementChild.checked == true) {
				right_btn = true
			}
		}
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

	//加分项全选事件
	$('#EditModelPScoreItemleft,#EditModelPScoreItemright').click(function () {
		if ($(this).prop('checked')) {
			$(this).parent().next().find('.checkboxs').prop('checked', true);
		} else {
			$(this).parent().next().find('.checkboxs').prop('checked', false);
		}
		Editbtn_statusAddScoreItem();
	});

	//减分项全选事件
	$('#EditModelNScoreItemleft,#EditModelNScoreItemright').click(function () {
		if ($(this).prop('checked')) {
			$(this).parent().next().find('.checkboxs').prop('checked', true);
		} else {
			$(this).parent().next().find('.checkboxs').prop('checked', false);
		}
		Editbtn_statusRemoveScoreItem();
	});
});


function stopFunc(e) {
	e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
}

//=============================人员左右切换==================================
//人员左右切换
function UserSwitch(cbk) {
	var selectbtn = $(cbk).attr("selectbtn");
	console.log(cbk);
	console.log($(cbk).attr("selectbtn"));
	if (selectbtn == null || selectbtn == undefined || selectbtn == "left") {
		$(cbk).attr("selectbtn", "right");
		if ($("#AddModalScore").is(":visible")) {
			$("#PUserSelectbtn_right").click();
		}
		else {
			$("#NUserSelectbtn_right").click();
		}
	}
	else {
		console.log($(cbk).attr("selectbtn"));
		$(cbk).attr("selectbtn", "left")
		if ($("#AddModalScore").is(":visible")) {
			$("#PUserSelectbtn_left").click();
		}
		else {
			$("#NUserSelectbtn_left").click();
		}
	}
}

//=============================评分项左右切换==================================
//评分项左右切换
function ItemSwitch(cbk) {
	var selectbtn = $(cbk).attr("selectbtn");
	console.log(cbk);
	console.log($(cbk).attr("selectbtn"));
	if (selectbtn == null || selectbtn == undefined || selectbtn == "left") {
		$(cbk).attr("selectbtn", "right");
		if ($("#AddModalScore").is(":visible")) {
			$("#PScoreSelectbtn_right").click();
		}
		else {
			$("#NScoreSelectbtn_right").click();
		}
	}
	else {
		console.log($(cbk).attr("selectbtn"));
		$(cbk).attr("selectbtn", "left")
		if ($("#AddModalScore").is(":visible")) {
			$("#PScoreSelectbtn_left").click();
		}
		else {
			$("#NScoreSelectbtn_left").click();
		}
	}
}

//=============================编辑加分左右切换==================================
//编辑评分项左右切换（加分）
function EditPItemSwitch(cbk) {
	var selectbtn = $(cbk).attr("selectbtn");
	console.log(cbk);
	console.log($(cbk).attr("selectbtn"));
	if (selectbtn == null || selectbtn == undefined || selectbtn == "left") {
		$(cbk).attr("selectbtn", "right");
		$("#EditPositivebtn_right").click();
	}
	else {
		console.log($(cbk).attr("selectbtn"));
		$(cbk).attr("selectbtn", "left")
		$("#EditPositivebtn_left").click();
	}
}

//=============================编辑减分左右切换==================================
//编辑评分项左右切换（减分）
function EditNItemSwitch(cbk) {
	var selectbtn = $(cbk).attr("selectbtn");
	console.log(cbk);
	console.log($(cbk).attr("selectbtn"));
	if (selectbtn == null || selectbtn == undefined || selectbtn == "left") {
		$(cbk).attr("selectbtn", "right");
		$("#EditNegativebtn_right").click();
	}
	else {
		console.log($(cbk).attr("selectbtn"));
		$(cbk).attr("selectbtn", "left")
		$("#EditNegativebtn_left").click();
	}
}