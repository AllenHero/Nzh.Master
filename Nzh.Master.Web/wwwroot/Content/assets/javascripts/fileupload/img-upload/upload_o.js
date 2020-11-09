+function(){
	class img_compress_upload {
		constructor (data){
			let this_default ={
				max_height: 1024,
				max_width: 1024,
				max_num: 100,
				list_box:'',
				add_btn:'',
				del_btn_class: 'del',
				submit_btn:'',
				submit_form:'',
			},
			self = this;
			this._data = $.extend(this_default, data);
			this._max_height = this._data.max_height;
			this._max_width = this._data.max_width;
			this._add_btn = this._data.add_btn;
			this._list_box = this._data.list_box;
			this._del_btn_class = this._data.del_btn_class;
			this._submit_btn = this._data.submit_btn;
			this._submit_form = this._data.submit_form;
			this._index = -1;

			this._add_event();
		}
		_add_event(){
			let self = this;
			$('body').append("<input type='file' id='add_file' style='display:none;'>");
			this._add_file = $('#add_file');
		    this._add_file.on('change',function (){//监听图片选择
		        if($(this).val()){//存在图片
		            self._storage();
		        }
		    });

		    this._add_btn.on('click',function(){
		    	self._index = -1;
		    	self._add_file.click();
		    });
		    this._list_box.on('click', 'li:not(".add_btn")', function(event){
		    	self._index = $(this).index();
		    	self._add_file.click();
		    });
		    
		    this._list_box.on('click', '.'+this._del_btn_class, function(event){
		    	$(this).parents('li').remove();
		    	event.stopPropagation();
		    });

		    this._submit_btn.click(function(){
		    	self._submit_form.submit();
		    });
		}
		_storage (){
			let self = this,
				reader = new FileReader(),
	        	file=this._add_file[0].files[0];
	        if(!/image\/\w+/.test(file.type)){
	            alert("请上传图片格式文件");
	            return false;
	        }
	        reader.readAsDataURL(file);
	        reader.onload = function(e){
	            self._compress(reader.result);//压缩图片
	        }
		}
		_modify_img_and_show (img_data){
			this._add_file.val('');
			if(this._index > -1){//修改
				let this_box = this._list_box.find('li').eq(this._index);
				this_box.find('img').attr('src', img_data);
				this_box.find('input').val(img_data);
			}else{
				let this_html = '<li><img src="' + img_data + '"> <i class="del">x</i><input name="img[]" type="hidden" valuer="' + img_data + '"></li>';
				this._add_btn.before(this_html);
			}
		}
		_compress (img_data){
			var self = this;
			if(!img_data)return;
			var canvas = document.createElement('canvas'),
				img = new Image(),
				max_height = this._max_height,
				max_width = this._max_width;

			img.onload = function(){
				if(img.height > max_height) {
					img.width = img.width * (max_height / img.height);
					img.height = max_height;
				}
				if(img.width > max_width){
					img.height = img.height *(max_width / img.width);
					img.width = max_width;
				}
				var ctx = canvas.getContext("2d");
				ctx.clearRect(0, 0, canvas.width, canvas.height);

				canvas.width = img.width; canvas.height = img.height;
				ctx.fillStyle="rgba(255,255,255,1)";
				ctx.fillRect(0,0, img.width, img.height);
				ctx.drawImage(img, 0, 0, img.width, img.height);
				self._modify_img_and_show(canvas.toDataURL("image/jpeg"));
			};
			img.src = img_data;//先绑定onload，再设置链接！！
		}
	}
	window.img_compress_upload = img_compress_upload;
}()