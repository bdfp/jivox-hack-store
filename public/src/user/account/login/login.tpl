<div ng-controller="LoginController as login">
<form ng-submit = "login.submit()" class="form-signin">

  <h2 class="form-signin-heading">Login</h2>
  
  <label for="inputEmail" class="sr-only">Email address</label>
  <input data-ng-model="login.email" type="text" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
  <label for="inputPassword" class="sr-only">Password</label>
  <input data-ng-model="login.password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
  <!-- 
  <div class="checkbox">
    <label>
      <input type="checkbox" value="remember-me"> Remember me
    </label>
  </div> -->
  <button class="btn btn-lg btn-primary btn-block" type="submit">Log in</button>
  <div data-ng-bind="login.message" >
    <!-- Error Message here!! -->
  </div>
</form>
</div>