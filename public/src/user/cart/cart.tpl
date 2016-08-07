<div ng-controller="CartController as cart">
<div class="col-md-8">
	<div class="col-md-6">
		
          <div class="col-xs-6 col-lg-4" ng-repeat = "prod in cart.prodlist">
            
            <img src="{{prod.photos[0].url}}" height="200" width="200">
            <h3>{{prod.name}}</h3>
            <p> {{prod.description}}</p>
            <p> {{prod.cum_rating}}</p>
            <p><a class="btn btn-default" ui-href="product/{{prod.product_id}}" role="button">View</a></p>
          </div>
          </div> 
        
        </div>
        <div class="row">
        <toaster-container></toaster-container>
        </div>	
	<div>
		  <button class="btn btn-lg btn-primary btn-block" type="submit" ng-click="cart.order()">Order!!</button>
	</div>
</div>
