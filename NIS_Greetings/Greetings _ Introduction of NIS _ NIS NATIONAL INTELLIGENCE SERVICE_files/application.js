var NIS = {
	console:function(str) {
		//console.log(str);
	},
	cancel:function(back_url) {
		if (confirm('작성 하신 내용이 삭제 됩니다. 취소 하시겠습니까?')) {
            location.href = back_url;
        }
	},
	confirm:function(callback) {
		
		var status = $('input[name=status]:checked').val();
		var use_yn = $('input[name=use_yn]:checked').val();
		var origin_use_yn = $('input[name=origin_use_yn]').val();
		var origin_status = $('input[name=origin_status]').val();

		if (status=='P') {
			if (confirm("해당 내용을 임시저장 하시겠습니까?")) {
				callback();	
			};
		}
		else if ((origin_status=='' || origin_status=='P') && status=='W') {
			if (confirm("승인 요청을 하시겠습니까?")) {
				callback();	
			};
		}
		else if (origin_status=='S' || origin_status=='F') {
			
			if (origin_use_yn=='N' && use_yn=='Y') {
				if (confirm("홈페이지에 게재되어 이용자들이 해당 게시물을 볼 수 있습니다. 계속하시겠습니까?")) {
					callback();	
				};
			}
			else if (use_yn=='N' || use_yn=='Y') {
				callback();	
			}
		}
	},
	popup:function(title, content, w, h, x, y) {

		var option = 'width='+w+', height='+h+', left='+x+' top='+y+', location=yes, scrollbar=yes';

		var popup = window.open('','',option);
		$(popup.document.body).append(content);
	},
	uploadFile:function(file, f) {
		var data = new FormData();
		data.append("file", file);
		
		$.ajax({
			url: '/common/uploadSingleFile.do',
			type: 'POST',
			data: data,
			cache: false,
			dataType: "json",
			processData: false,
			contentType: false,
			success: function (response) {
			   	f(response)
			}
		});
	},
	post:function(url, data, callback) {
		NIS.console(data);	// 배포시 삭제

		$.ajax({
			url: url,
			type: 'POST',
			data: data,
			cache: false,
			dataType: "json",
			// processData: false,
			// contentType: false,
			success: function (json) {
				NIS.console(json);	// 배포시 삭제
				
				if (json.resultState == "success") {
					callback(json);
				}
				else {
					alert (json.msg + "(" + json.resultCode + ")");
				}
			}
		});
	},
	ajaxFileSubmit:function(url, form, callback) {

		form.ajaxSubmit({
			url: url,
			type: 'POST',
			dataType: "json",
			beforeSubmit: function(arr, $form, options) {
				// The array of form data takes the following form:
				// [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
				// return false to cancel submit
				NIS.console($form.serialize());
			},
	        success:function(json, statusText, xhr, $form) {
				NIS.console(json);
				
				if (json.resultState == "success") {
					alert (json.msg);
					callback(json);
				}
				else {
					alert (json.msg + "(" + json.resultCode + ")");
				}
			},
	        error:function(e){
	    		NIS.console(e);
	        }

	    });
	},
	bind:function () {	// 공통 바인드 함수
		$("input[name=title]").on('keyup',function() {
			$(this).parent().find(".byte-area em").text($(this).val().length);
		});
		
		$("#selectListForm select").change(function() {
			$("#selectListForm").submit();
		});
	},

    //숫자만 입력하게 처리 jquery.alphanumeric.pack과 사용
    onlyNum:function (id) {
        $('#'+id).numeric({allow:"."});
        $('#'+id).css("ime-mode","disabled");
    },

    //.도 허용하지 않은 숫자
    onlyNum2: function (id) {
        $('#'+id).numeric();
        $('#'+id).css("ime-mode","disabled");
    },

    //숫자만 입력하게 처리 jquery.alphanumeric.pack과 사용  (- 하이픈 허용)
    onlyNum3: function (id) {
        $('#'+id).numeric({allow:"-"});
        $('#'+id).css("ime-mode","disabled");
    },

    //라디오 박스 선택 안하면 true 반환
    isEmptyRadioVal: function (radioName, msg) {
        if($.trim( $("input[name="+radioName+"]:checked").val()).length < 1) {
            alert(msg);
            $("input[name="+radioName+"]").focus();
            return true;
        } else {
            return false;
        }
    },
    
    // 스마트 에디터 관련
    se_object:[],	// 스마트 에디터 객체
    initSmartEditor: function (isEnable) {
    	nhn.husky.EZCreator.createInIFrame({
            oAppRef: this.se_object,
            elPlaceHolder: "smarteditor",
            sSkinURI: "/resources/SmartEditor2/SmartEditor2Skin.html",
            htParams : {
                bUseToolbar : true,
                bUseVerticalResizer : false,	
                bUseModeChanger : true,
            },
            fOnAppLoad : function(){
            	if (isEnable==false) {
            		NIS.se_object.getById["smarteditor"].exec("DISABLE_WYSIWYG");
            		NIS.se_object.getById["smarteditor"].exec("HIDE_EDITING_AREA_COVER");
            	}
            },
    	});
    },
    getSmartEditor: function () {

		return this.se_object.getById["smarteditor"].getContents();
    },
    updateSmartEditor: function (isEnable) {
    	
		this.se_object.getById["smarteditor"].exec("UPDATE_CONTENTS_FIELD", []);
    },
    initBoard: function () { // 수정 화면의 경우 권한에 따라 화면 초기화
    	 
    	var origin_status = $('input[name=origin_status]').val();
    	if (origin_status == 'W') {

    		if ($('#smarteditor').length != 0) {
    			NIS.initSmartEditor(false);
    		}
    		$('input').attr('readonly', true);
    		$('input[name=file]').attr('disabled', true);
    	}
    	else if (origin_status == 'S') {

    		if ($('#smarteditor').length != 0) {
    			NIS.initSmartEditor(false);
    		}
    		$('input').attr('readonly', true);
    		$('input[name=file]').attr
    		('disabled', true);
    	}
    	else if (origin_status == 'F') {

    		if ($('#smarteditor').length != 0) {
    			NIS.initSmartEditor(false);
    		}
    		$('input').attr('readonly', true);
    		$('input[name=file]').attr('disabled', true);
    	}
    	else {
    		if ($('#smarteditor').length != 0) {
    			NIS.initSmartEditor(true);
    		}
    	}
    },
    
	removeFile:function (file_num) {
		var parent = $("input[name="+file_num+"]").parent();
		
		NIS.console(parent);
		parent.find("p.name").hide();
		parent.find("#isDeleted").val("Y")
	},
    
    mainContentRemoveFile:function (file_num, area_no) {
		var parent = $("input[name="+file_num+"]").parent();
		
		NIS.console(parent);
		parent.find("p.name").hide();
		parent.find("#isDeleted_" + area_no).val("Y")
	}
};

/*************************************************************************
 함수명: valueEmpty
 설  명: input,textarea type value가 empty 인지 확인
 리  턴: boolean
 사용예:
 $("#userid").valueEmpty();   msg인자가 들어올경우 message 반환
 ***************************************************************************/
$.fn.valueEmpty = function(msg) {

	if ($.trim($(this).val()).length < 1) {
		if(msg != undefined){
			alert(msg);
			$(this).focus();
		}
		return true;
	} else {
		return false;
	}
};