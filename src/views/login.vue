<template>
  <div class="container center">
    <div class="row">
      <div class="col-md-offset-3 col-md-12">
        <form class="form-horizontal">
          <img title="img" class="img" src="../assets/logo.png" />
          <!-- <span class="heading">用户登录</span> -->
          <div class="form-group">
            <input type="email" class="form-control" id="inputEmail3" v-model="user_name" placeholder="用户名或手机号">
            <i class="fa fa-user"></i>
          </div>
          <div class="form-group help">
            <input type="password" class="form-control" id="inputPassword3" v-model="password" placeholder="密 码" />
            <i class="fa fa-lock"></i>
            <a href="#" class="fa fa-question-circle"></a>
          </div>
          <div class="d-grid gap-2 col-6 mx-auto ">
            <button class="btn btn-primary" @click="login" type="button" >登录</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      user_name: "",
      password: ""
    }
  },
  methods: {
    login: function () {
      let that = this
      axios.post('/api/users', {
          mobile: this.user_name,
          password: this.password
      }).then((res) => {
        console.log('数据：', res.data.data.msg);
        localStorage.setItem("token",res.data.data.token);
        console.log(res)
        if (res.status===200){
                           
                           that.$router.push({name:'address'});
                      }else if(res.status!=200){
                            alert("登录失败，用户名不存在或者密码错误")
                      }


      })

    },
  }
}

</script>

<style>
.center {
  margin-top: 200px;
  height: 600px;
}

.img {
  height: 150px;
  width: 300px
}

.form-bg {
  background: #00b4ef;
}

.form-horizontal {
  background: #fff;
  padding-bottom: 40px;
  border-radius: 15px;
  text-align: center;
}

.form-horizontal .heading {
  display: block;
  font-size: 35px;
  font-weight: 700;
  padding: 35px 0;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 30px;
}

.form-horizontal .form-group {
  padding: 0 40px;
  margin: 0 0 25px 0;
  position: relative;
}

.form-horizontal .form-control {
  background: #f0f0f0;
  border: none;
  border-radius: 20px;
  box-shadow: none;
  padding: 0 20px 0 45px;
  height: 40px;
  transition: all 0.3s ease 0s;
}

.form-horizontal .form-control:focus {
  background: #e0e0e0;
  box-shadow: none;
  outline: 0 none;
}

.form-horizontal .form-group i {
  position: absolute;
  top: 12px;
  left: 60px;
  font-size: 17px;
  color: #c8c8c8;
  transition: all 0.5s ease 0s;
}

.form-horizontal .form-control:focus+i {
  color: #00b4ef;
}

.form-horizontal .fa-question-circle {
  display: inline-block;
  position: absolute;
  top: 12px;
  right: 60px;
  font-size: 20px;
  color: #808080;
  transition: all 0.5s ease 0s;
}

.form-horizontal .fa-question-circle:hover {
  color: #000;
}

.form-horizontal .main-checkbox {
  float: left;
  width: 20px;
  height: 20px;
  background: #98FB98;
  border-radius: 50%;
  position: relative;
  margin: 5px 0 0 5px;
  border: 1px solid #98FB98;
}

.form-horizontal .main-checkbox label {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
}

.form-horizontal .main-checkbox label:after {
  content: "";
  width: 10px;
  height: 5px;
  position: absolute;
  top: 5px;
  left: 4px;
  border: 3px solid #fff;
  border-top: none;
  border-right: none;
  background: transparent;
  opacity: 0;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.form-horizontal .main-checkbox input[type=checkbox] {
  visibility: hidden;
}

.form-horizontal .main-checkbox input[type=checkbox]:checked+label:after {
  opacity: 1;
}

.form-horizontal .text {
  float: left;
  margin-left: 7px;
  line-height: 20px;
  padding-top: 5px;
  text-transform: capitalize;
}

.form-horizontal .btn {
  float: center;
  font-size: 14px;
  color: #fff;
  background: #3CB371;
  border-radius: 30px;
  padding: 10px 100px;
  border: none;
  text-transform: capitalize;
  transition: all 0.5s ease 0s;
}

@media only screen and (max-width: 479px) {
  .form-horizontal .form-group {
    padding: 0 25px;
  }

  .form-horizontal .form-group i {
    left: 45px;
  }

  .form-horizontal .btn {
    padding: 10px 50px;
  }
}
</style>
