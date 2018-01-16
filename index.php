<!DOCTYPE html>
<html lang="en">
<head>
	<title>LoFiPhotos</title>
	 <meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
	<!-- Optional theme -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">
	<!-- Latest compiled and minified JavaScript -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
	<link rel="stylesheet" type="text/css" href="stylesheet.css"/>

</head>
<body>
	<nav class="navbar navbar-inverse">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#myNavbar" aria-expanded="false">
					<span class="sr-only">Toggle Navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="http://www.lofiphotos.com">LoFiPhotos</a>
			</div>
			<div class="collapse navbar-collapse" id="myNavbar">
			<ul class="nav navbar-nav">
				<li class="active"><a href="#">Home</a></li>
				<li><a href="photography/PhotoHome.php">Photography</a></li>
				<li><a href="CompSci/CSHome.php">Computer Science</a></li>
                <li><a href="biography.php">Biography</a></li>
                <li><a href="education.php">Education</a></li>
			</ul>
			</div>
		</div>
	</nav>
<div class="container-fluid" style="background-color:lightgrey;">
	<div class="row">
		<div class="col-xs-6"> 
			<h2></h2>
			<img src="pics/lofiphotos-3.jpg" height="500" width="500" class="img-rounded img-responsive center-block"/>
            <a href="photography/PhotoHome.php" class="btn btn-primary btn-lg center-block" role="button"><small>Photography</small>
			</a>
		</div>
		<div class="col-xs-6">
			<h2></h2>
			<img src="pics/lofiphotos-1.jpg" width="500" height="500"class="img-responsive center-block img-rounded"/>
            <a href="CompSci/CSHome.php" class="btn btn-primary btn-lg center-block" role="button"><small>Computer Science</small> </a>
		</div>
	</div>
	<div class="row">
		<div class="col-xs-6">
            <a href="updates.php" class="btn btn-primary center-block btn-lg" role="button">Updates</a>
		</div> 
		<div class="col-xs-6">
			
		</div>
	</div>
</div>
</body>
</html>
