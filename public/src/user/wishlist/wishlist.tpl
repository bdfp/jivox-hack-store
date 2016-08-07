<div class="row" ng-controller="WishlistController as wishlist">
    <div class="col-md-8">
        <div class="row col-md-6">
 			<div class="row">
        
        
          <div class="col-xs-6 col-lg-4" ng-repeat = "prod in wishlist.prodlist">
            
            <img src="{{prod.photos[0].url}}" height="200" width="200">
            <h3>{{prod.name}}</h3>
            <p> {{prod.description}}</p>
            <p> {{prod.cum_rating}}</p>
            <p><a class="btn btn-default" ui-href="product/{{prod.product_id}}" role="button">View</a></p>
            <p><a class="btn btn-default" ng-click = "wishlist.addToCart(prod.product_id)" role="button">Add to Cart</a></p>
            
          </div>
          </div> 
        
        </div>
        <div class="row">
        <toaster-container></toaster-container>
        </div>
    </div>
</div>