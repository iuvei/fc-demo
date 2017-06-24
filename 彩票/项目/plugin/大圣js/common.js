$('#isCheckBalance').click(function() {
  $('#showBalance,#hideBalance').toggleClass('hide');
});

function loginOut() {
  layer.confirm('确定要登出吗？', {
    skin: 'warning-class',
    title: '',
    maxmin: true, //开启最大化最小化按钮
    area: ['380px', '260px'],
    btn: ['确定', '取消']
  }, function() {
    out();
    layer.closeAll();
  }, function() {
    layer.closeAll();
  });
}
//退出登录
function out() {
  $.ajax({
    type: "POST",
    url: "/user/logout",
    datatype: "json",
    beforeSend: function(XMLHttpRequest) {
      $("#loading").show();
    },
    success: function(data, textStatus) {
      console.log('退出登录成功！');
      console.log(textStatus);
      console.log(data);
      $.cookie("password", "", {
        path: '/'
      });
      $.cookie("username", "", {
        path: '/'
      });
      window.open("/", "_self");
    },
    error: function() {
      console.log('退出登录失败！');
      layer.confirm('退出登录失败', {
        skin: 'error-class',
        title: '',
        maxmin: true, //开启最大化最小化按钮
        area: ['380px', '260px'],
        btn: ['确定']
      }, function() {
        layer.closeAll();
      });
    }
  });
}


//左边滚动导航栏
$('.sb-icons').click(function() {
    var val = $(this).attr('data-modal');
    if(val=='message/inbox' || val=='customerservice' || val=='help'){
        event.preventDefault();
        return false;
    }
  Tabs(this, '.icon', '.content', '');
  // center($('#pop'));
  $('#pop,#mark,.esc_words').fadeIn(0);
  $('.left-menu-icon').each(function() {
    var val2 = $(this).attr('data-modal2');
    if (val == val2) {
      console.log(val2);
      Tabs(this, '.icon', '.content', '');
      if (val2 == 'personal') {
        //获取用户详情
        personalInfo();
      }
    }
  });
});

function personalInfo() {
  $.ajax({
    type: 'POST',
    url: '/user/detail',
    datatype: 'json',
    success: function(e) {
      // console.log(e);
      if (e.status == 'success') {
        console.log(e);
        if (e['message'].payee != '') {
          $('.user-info').html(e['message'].payee);
        }

        if (e['message'].email != '') {
          $('.email-info').html(e['message'].email);
        }
        $('#nickname').val(e['message'].nickname);
        $('#l-nickname').html(e['message'].nickname);
        $('#phone').val(e['message'].cellphone);
        $('#qq').val(e['message'].qq);
        $('#user_name').html(e['message'].username);
        if (e['message'].set_fund_password == true) {
          $('.password-info').html('********');
        }
      }
    },
    error: function() {
      console.log('获取用户详情失败！');
    }
  });
}
//关闭左边滚动导航栏
$('#popup_close').click(function() {
  $('#pop,#mark,.esc_words').fadeOut(300);
});

function Tabs(elm, e, j, k) {
  $(elm).addClass(k).siblings(e).removeClass(k);
  var u = $(j).find('ul');
  u.find('.child_menus_li:gt(0)').removeClass('child_menus_acrive');
  u.find('.child_menus_li:eq(0)').addClass('child_menus_acrive');
  $(j).find('.info:gt(0)').hide();
  $(j).find('.info:eq(0)').show();
  $('#pop ' + j + ':eq(' + $(elm).index() + ')').css('display', 'inline-block').siblings(j).hide();
}
//左边滚动导航栏二级菜单
$('.child_menus_li').click(function() {
  $('.result').find('ul').remove();
  $('form').removeClass('enable');
  $('form').find('.bankRadioBtn').removeClass('selected-red');
  var _this = $(this),
    _index = $(this).index();
  var u = _this.parent('ul');
  _this.addClass('child_menus_acrive').siblings('.child_menus_li').removeClass('child_menus_acrive');
  var p = _this.parent().parent().parent('.content');
  p.find('.info').eq(_index).show().siblings('.info').hide();
});
// $(function(){
//     $(window).keydown(function (event) {
//         if (event.keyCode == 27) {
//             $('#popup_close').trigger("click");
//         }
//     });
// });
