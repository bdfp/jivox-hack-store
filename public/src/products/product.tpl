<div class="row" ng-controller="ProductController as product">
<div class="col-md-4" >
  <img src="{{product.pic}}" height="200" width ="200">

<div class = "col-md-8">
  <h3>{{product.productDetails.name}}</h3>
	<p>{{product.productDetails.description}}</p>
	<br>
  <label> Rating </label>
  <p>{{product.productDetails.cum_rating}}</p>
	<p>
		<a class="btn btn-default" ng-click = "product.addCart()" >Add to cart</a>
		<a class="btn btn-default" ng-click = "product.addWish()" >Add to Wishlist</a>
	</p>
</div>
</div>
<div class="row">
<!-- ToDo: ng-repeat for below -->
	<div class="col-md-8">
		<div class="list-group">
          <p ng-repeat="r in product.reviewList">
          	 {{r.review}}
             -
             {{r.rating}}
          </p>
        </div>
        <label for="review" class="sr-only">Write review</label>
        <input type="text" name="rating" class="form-control" ng-model = "product.Urating">
  		<input type="text" id="review" class="form-control" placeholder="review" ng-model="product.Ureview">
        <button class="btn btn-lg btn-primary btn-block" type="submit" ng-click="product.addReview()">Submit review</button>
	</div>
</div>