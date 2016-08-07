<div class="row">
<div class="col-md-4">
	<!-- Image carousel -->
	          <div id="myCarousel" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
             <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
              <li data-target="#myCarousel" data-slide-to="1"></li>
            </ol>

            <div class="carousel-inner" role="listbox">
              <div class="item active">
                <img src=".jpg">
            </div>

            <div class="item">
              <img src=".jpg" >
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
        </div>

</div>
<div class = "col-md-8">
	<p></p>
	<br>
	<p>
		<a class="btn btn-default" ng-click = "self.adCart()" >Add to cart</a>
		<a class="btn btn-default" ng-click = "self.addWish()" >Add to Wishlist</a>
	</p>
</div>
</div>
<div class="row">
<!-- ToDo: ng-repeat for below -->
	<div class="col-md-8">
		<div class="list-group">
          <p>
          	Rating and reviews here..!
          </p>
        </div>
        <label for="review" class="sr-only">Write review</label>
  		<input type="text" id="review" class="form-control" placeholder="review">
        <button class="btn btn-lg btn-primary btn-block" type="submit" ng-click="self.addReview()">Submit review</button>
	</div>
</div>