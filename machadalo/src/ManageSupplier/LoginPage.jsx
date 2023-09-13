export default function LoginPage() {
  return (
    <div class="container ng-scope">
      <div class="row">
        <div class="form_page ">
          <form
            name="form"
            class="form-signin panel panel-default ng-pristine ng-invalid ng-invalid-required"
            ng-submit="login()"
            role="form"
          >
            <div class="errorMessages">
              <span
                ng-show="form.username.$dirty &amp;&amp; form.username.$error.required"
                class="help-block ng-hide"
              >
                Username is required
              </span>
              <span
                ng-show="form.password.$dirty &amp;&amp; form.password.$error.required"
                class="help-block ng-hide"
              >
                Password is required
              </span>
              <div ng-show="error" class="error ng-binding ng-hide"></div>
            </div>
            <div class="form-group">
              <label for="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                class="form-control ng-pristine ng-untouched ng-invalid ng-invalid-required"
                ng-model="username"
                required=""
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                class="form-control ng-pristine ng-untouched ng-invalid ng-invalid-required"
                ng-model="password"
                required=""
              />
            </div>
            <div class="login_footer">
              <span class="password_help">Forgot Password?</span>
              <span class="login_button">
                <button
                  type="submit"
                  class="btn btn-primary"
                  ng-disabled="form.$invalid || dataLoading"
                  disabled="disabled"
                >
                  Login
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
