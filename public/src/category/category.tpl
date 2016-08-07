
      <div class="row row-offcanvas row-offcanvas-right">

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
    				<li class="active"><a ng-click="category.priceUp()" ></a>Price Up</li>
    				<li><a ng-click="category.priceDown()"></a>Price Down</li>
				    <li><a ng-click="category.rating()"></a>Rating</li>
  				</ul>
			</div>
        </div>
        <div>
        	<label>Filter</label>

        	Filter by price interval:
        	 <rzslider rz-slider-model="category.min_val"
          rz-slider-high="category.max_val"
          rz-slider-options="category.options"></rzslider>
        </div>
    <div>
        Filter by rating:
    <!-- <form > -->
		<label class="checkbox-inline"><input type="checkbox" id = "rat1" ng-model = "category.rat1" value="1"> 1</label>
		<label class="checkbox-inline"><input type="checkbox" id = "rat2" ng-model = "category.rat2" value="2"> 2</label>
		<label class="checkbox-inline"><input type="checkbox" id = "rat3" ng-model = "category.rat3" value="3"> 3</label>
		<label class="checkbox-inline"><input type="checkbox" id = "rat4" ng-model = "category.rat4" value="4"> 4</label>
		<label class="checkbox-inline"><input type="checkbox" id = "rat5" ng-model = "category.rat5" value="5"> 5</label>
    <!-- </form> -->
		</div>
    <!-- ToDo: Below add orderBy filter and range -->
		<div class="row">
          <div class="col-xs-6 col-lg-4">
            <img src="">
            <h3>Heading</h3>
            <p> Product description..here!!!</p>
            <p> for rating</p>
            <p><a class="btn btn-default" href="#" role="button">View</a></p><!-- Get selected product here-->
            <p><a class="btn btn-default" href="#" role="button">Add to Cart</a></p>
            <p><a class="btn btn-default" href="#" role="button">Add to Wishlist</a></p>
          </div>
            
        </div>
      </div>

      <div class="col-xs-6 col-sm-3 sidebar-offcanvas" id="sidebar">
      <h2>Choose category:</h2>
        <div class="list-group">
          <a href="#" class="list-group-item active">Category 1</a>
        </div>
      </div>
    </div>