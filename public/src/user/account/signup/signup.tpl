<div ng-controller="SignUpController as signup">
<form class="form-signin" ng-submit="signup.submit()">

  <h2 class="form-signin-heading">Sign Up Page</h2>

  <div ng-hide="!signup.enable" class="alert alert-warning" data-ng-bind= "signup.message">
    
  </div>

  <label for="inputName" class="sr-only" >Your Name</label>
  <input data-ng-model="signup.name" type="text" id="inputName" class="form-control" placeholder="Name" required>
  <label for="inputEmail" class="sr-only">Email address</label>
  <input data-ng-model="signup.email" type="text" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
  <label for="inputPassword" class="sr-only">Password</label>
  <input data-ng-model="signup.password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
  <div class="checkbox">
    <label>
      <input type="checkbox" value="remember-me"> Remember me
    </label>
  </div>
  <button ng-disabled="signup.enable" class="btn btn-lg btn-primary btn-block" type="submit">Sign Up</button>
</form>

</div>