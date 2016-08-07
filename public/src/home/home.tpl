<div ng-controller="HomeController as home">
      <div class="row row-offcanvas row-offcanvas-right">
          <div class="row">
            <h2>Category Search</h2>
            <div id="custom-search-input">
              <div class="input-group col-md-12">
                <input type="text" class="  search-query form-control" placeholder="Search" />
              <span class="input-group-btn">
                <button class="btn btn-danger" type="button">
                  <span class=" glyphicon glyphicon-search"></span>
                </button>
              </span>
               </div>
             </div>
      </div>

        <div class="col-xs-12 col-sm-9" >
          <!-- <p class="pull-right visible-xs">
            <button type="button" class="btn btn-primary btn-xs" data-toggle="offcanvas">Toggle nav</button>
          </p> -->
<!--           <div id="myCarousel" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
    <li data-target="#myCarousel" data-slide-to="1"></li>
  </ol>

  <div class="carousel-inner" role="listbox">
    <div class="item active">
     <img src=".jpg">
  </div>

  <div class="item">
    <img src=".jpg">
  </div>
</div>

<a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
  <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
  <span class="sr-only">Previous</span>
</a>
<a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
  <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
  <span class="sr-only">Next</span>
</a>
        </div> -->
        <div class="row">
        <div ng-repeat="times in home.times(2)">
        <div ng-repeat="each in home.catList">
          <div ng-repeat = "t in home.times(3)">
          <div class="col-xs-6 col-lg-4" ng-repeat = "prods in Home.getCatProd({{each.category_id}})">
            
            <img src="{{prod.imgUrl}}">
            <h3>{{prod.name}}</h3>
            <p> {{prod.desc}}</p>
            <p> {{prod.rating}}</p>
            <p><a class="btn btn-default" ui-href="product/{{prod.product_id}}" role="button">View</a></p>
            <p><a class="btn btn-default" ng-click = "home.addToCart({{prod.product_id}})" role="button">Add to Cart</a></p>
            <p><a class="btn btn-default" ng-click = "home.addToWishlist({{prod.product_id}})" role="button">Add to Wishlist</a></p>
          </div>
          </div> 
        </div>
      </div>
      </div>
</div>
      <div class="col-xs-6 col-sm-3 sidebar-offcanvas" id="sidebar">
      <h2>Choose category:</h2>
        <u class="list-group">
      
          <li ng-repeat="each in home.catList" ui-href="category/{{each.category_id}}" class="list-group-item" value="{{each.category_id}}">{{each.name}}</li>
        
      </u>
      </div>
    </div>
</div>