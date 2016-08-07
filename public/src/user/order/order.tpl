<div class="col-md-8">
	<div class="row">
		<h1>Orders..!!</h1>
	</div>
	<div class="row" ng-repeat="order in order.allOrders">
        <h1>Order {{order.uorder_id}}</h1>
        <div class="col-md-4" ng-repeat="p in order.products">
            <h3>{{p.name}}</h3>
            <h3>{{p.description}}</h3>
        </div>
    </div>
</div>