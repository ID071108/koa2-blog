/**
 * Home
 * @author swan last modified on 19/1/4
 * @desc homepage js for effect、login and so on
 */

// const localStore = require('../../util/localStore')
const Home = {
  // navbar dropdown
  $userName: null,
  $liUserInfo: null,
  $liLogin: null,
  $liExit: null,
  // login modal
  $loginModal: null,
  $loginForm: null,
  $alertElem: null,
  // userinfo
  $userInfoID: null,
  $userInfoNickName: null,
  $userInfoAccount: null,
  $userInfoPwd: null,
  $userInfoSex: null,
  $userInfoEdit: null,
  $userInfoSlogan: null,
  $userInfoProfession: null,
  $userInfoNickName: null,
  $btnEdit: null,
  userInfo: null,
  init() {
    /** storage curr page dom */
    // navbar dropdown dom
    this.$liUserInfo = $('.li--userInfo')
    this.$liLogin = $('.li--login')
    this.$liSignin = $('.li--signin')
    this.$liExit = $('.li--exit')
    // login modal dom
    this.$loginModal = $('.login-modal')
    this.$loginForm = $('.login-form')
    this.$alertElem = $('.login-form .alert')
    this.$formGroup = $('.login-form .form-group')
    this.$userName = $('.user-name')
    // userinfo dom
    this.$userInfoID = $('.userInfo-form input[name="id"]')
    this.$userInfoNickName = $('.userInfo-form input[name="nickname"]')
    this.$userInfoAccount = $('.userInfo-form input[name="account"]')
    this.$userInfoPwd = $('.userInfo-form input[name="password"]')
    this.$userInfoSex = $('.userInfo-form input[name="sex"]')
    this.$userInfoEdit = $('.userInfo-form input[name="email"]')
    this.$userInfoSlogan = $('.userInfo-form input[name="slogan"]')
    this.$userInfoProfession = $('.userInfo-form input[name="profession"]')
    this.$btnEdit = $('.userInfo-modal .btn--edit')
    this.$btnSave = $('.userInfo-modal .btn--save')
    this.userInfo = SessionStorage.getSession('userInfo')
    /** initial event */
    // login event
    this.handleShowLogin()
    this.handleLogin()
    this.handleCloseAlert()
    this.handleExit()
    // userinfo evnet
    this.getUserInfo()
    this.handleShowUserInfo()
    this.handleEditUserInfo()
    this.handleSaveUserInfo()
  },
  getUserInfo() {
    if (this.userInfo && this.userInfo.nickname) {
      this.$userName.html(this.userInfo.nickname)
      this.$liUserInfo.show()
      this.$liLogin.hide()
      this.$liSignin.hide()
      this.$liExit.show()
    } else {
      this.$userName.html('未登陆')
      this.$liUserInfo.hide()
      this.$liLogin.show()
      this.$liSignin.show()
      this.$liExit.hide()
    }
  },
  handleEditUserInfo() {
    this.$btnEdit.click(() => {
      this.handleSetUserInfoDisabled(false)
      this.$btnEdit.fadeOut()
      this.$btnSave.fadeIn()
    })
  },
  handleSetUserInfoDisabled(bool) {
    this.$userInfoNickName.prop('disabled', bool)
    this.$userInfoAccount.prop('disabled', bool)
    this.$userInfoPwd.prop('disabled', bool)
    this.$userInfoSex.prop('disabled', bool)
    this.$userInfoEdit.prop('disabled', bool)
    this.$userInfoSlogan.prop('disabled', bool)
    this.$userInfoProfession.prop('disabled', bool)
  },
  handleSaveUserInfo() {
    this.$btnSave.click(() => {
      this.handleSetUserInfoDisabled(true)
      this.$btnSave.fadeOut()
      this.$btnEdit.fadeIn()
    })
  },
  handleShowUserInfo() {
    this.$liUserInfo.click(() => {
      if (this.userInfo) {
        this.$userInfoID.val(this.userInfo.id)
        this.$userInfoNickName.val(this.userInfo.nickname)
        this.$userInfoAccount.val(this.userInfo.account)
        this.$userInfoPwd.val(this.userInfo.password)
        this.$userInfoSex.val(this.userInfo.sex)
        this.$userInfoEdit.val(this.userInfo.email)
        this.$userInfoSlogan.val(this.userInfo.slogan)
        this.$userInfoProfession.val(this.userInfo.profession)
      } else {
        this.$userInfoID.val('')
        this.$userInfoNickName.val('')
        this.$userInfoAccount.val('')
        this.$userInfoPwd.val('')
        this.$userInfoSex.val('')
        this.$userInfoEdit.val('')
        this.$userInfoSlogan.val('')
        this.$userInfoProfession.val('')
      }
      this.handleSetUserInfoDisabled(true)
      this.$btnEdit.show()
      this.$btnSave.hide()
      $('.userInfo-modal').modal('show')
    })
  },
  handleShowLogin() {
    this.$liLogin.click(() => {
      this.$alertElem.hide()
      this.$loginForm[0].reset()
      this.$formGroup.removeClass('has-error')
      this.$loginModal.modal('show')
    })
  },
  handleCloseAlert() {
    let _btn = $('.login-form .alert > button')
    _btn.click(() => {
      this.$alertElem.fadeOut()
    })
  },
  handleInput() {
    this.$formGroup.on('input', 'input', () => {
      this.$formGroup.removeClass('has-error')
    })
  },
  handleLogin() {
    $('.modal-footer .btn-primary').click(() => {
      $.ajax({
        url: '/login',
        type: 'POST',
        data: this.$loginForm.serializeObject(),
        dataType: 'json',
        success: res => {
          let _spanElem = $('.login-form .alert>span')

          if (res.code === 200 && res.result) {
            this.$formGroup.removeClass('has-error')
            _spanElem.html('登陆成功')
            this.$alertElem
              .removeClass('alert-danger')
              .addClass('alert-success')
              .fadeOut()
            this.$loginModal.modal('hide')
            SessionStorage.setSession('userInfo', res.result)
            this.userInfo = res.result
            this.getUserInfo()
          } else {
            this.$formGroup.addClass('has-error')
            _spanElem.html('登陆失败，请正确输入账号密码')
            this.$alertElem
              .removeClass('alert-success')
              .addClass('alert-danger')
              .fadeIn()
          }
        }
      })
    })
  },
  handleExit() {
    this.$liExit.click(e => {
      SessionStorage.removeSession('userInfo')
      window.location.reload()
    })
  }
}

// execute after document ready
$(document).ready(function() {
  Home.init()
})
