
      <div class="row row-offcanvas row-offcanvas-right" ng-controller="CategoryController as category">

        <div class="col-xs-12 col-sm-9">
          <p class="pull-right visible-xs">
            <button type="button" class="btn btn-primary btn-xs" data-toggle="offcanvas">Toggle nav</button>
          </p>
        <div>
        	<label>Sort By:</label>
        	<div class="dropdown">
  				<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Sort by
  				<span class="caret"></span></button>
  				<ul class="dropdown-menu">
    				<li><a ng-click="category.priceUp()" >Price Up</a></li>
    				<li><a ng-click="category.priceDown()">Price Down</a></li>
				    <li><a ng-click="category.rating()">Rating</a></li>
  				</ul>
			</div>
        </div>

        <!-- <div>
          <label>Filter</label>
        
          Filter by price interval:
           <rzslider rz-slider-model="category.min_val"
          rz-slider-high="category.max_val"
          rz-slider-options="category.options"></rzslider>
        </div> -->
    
    <div>
        Filter by rating:
    <!-- <form > -->
		<label class="radio-inline"><input type="radio" id = "rat1" ng-model = "category.rat" value="1"> 1</label>
		<label class="radio-inline"><input type="radio" id = "rat2" ng-model = "category.rat" value="2"> 2</label>
		<label class="radio-inline"><input type="radio" id = "rat3" ng-model = "category.rat" value="3"> 3</label>
		<label class="radio-inline"><input type="radio" id = "rat4" ng-model = "category.rat" value="4"> 4</label>
		<label class="radio-inline"><input type="radio" id = "rat5" ng-model = "category.rat"  value="5"> 5</label>
    <a ng-click="category.rclear()">Clear Rating Filter</a>
    <!-- </form> -->
		</div>
    <!-- ToDo: Below add orderBy filter and range -->
		<div class="row" ng-repeat="prod in category.productList | orderBy: category.sort_val" ng-show="prod.cum_rating >= category.rat" >
          <div class="col-xs-6 col-lg-4">
            <img src="{{prod.photos[0].url}}" height="200" width="200">
            <h3>{{prod.name}}</h3>
            <p> {{prod.description}}</p>
            <p>{{prod.cum_rating}} </p>
            <p>{{prod.cost}}</p>
            <p><a class="btn btn-default" ui-sref="products({prodId: prod.product_id})" role="button">View</a></p><!-- Get selected product here-->
            <p><a class="btn btn-default" ng-click = "category.addToCart()" role="button">Add to Cart</a></p>
            <p><a class="btn btn-default" ng-click="category.addToWishlist()" role="button">Add to Wishlist</a></p>
          </div>
            
        </div>
      </div>

      <div class="col-xs-6 col-sm-3 sidebar-offcanvas" id="sidebar">
      <h2>Choose category:</h2>
        <u class="list-group">
      
          <li ng-repeat="each in category.catList" ui-sref="category({catId: each.category_id})" class="list-group-item" value="{{each.category_id}}">{{each.name}}</li>
        
      </u>
      </div>
    </div>