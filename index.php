<!DOCTYPE html>
<html>
<head>
	<title>Afeefa.de - Engagement sichtbar machen</title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="description" content="Afeefa.de ist die Vernetzungsplattform für eine engagierte Stadtgesellschaft. Hier wird Engagement sichtbar, Kooperation gefördert und die Teilhabe aller Menschen in unserer Stadt direkt unterstützt.">

	<meta property="og:url"           content="https://www.afeefa.de" />
  <meta property="og:type"          content="website" />
  <meta property="og:title"         content="" />
  <meta property="og:description"   content="" />
	<meta property="og:image" content="/afeefa.jpg">

	<!-- mapbox mobile optimization -->
	<meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' />

	<!-- favicons -->
	<link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png?v=2bbvyE2wzd">
	<link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png?v=2bbvyE2wzd">
	<link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png?v=2bbvyE2wzd">
	<link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png?v=2bbvyE2wzd">
	<link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png?v=2bbvyE2wzd">
	<link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png?v=2bbvyE2wzd">
	<link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png?v=2bbvyE2wzd">
	<link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png?v=2bbvyE2wzd">
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png?v=2bbvyE2wzd">
	<link rel="icon" type="image/png" href="/favicon-32x32.png?v=2bbvyE2wzd" sizes="32x32">
	<link rel="icon" type="image/png" href="/favicon-194x194.png?v=2bbvyE2wzd" sizes="194x194">
	<link rel="icon" type="image/png" href="/favicon-96x96.png?v=2bbvyE2wzd" sizes="96x96">
	<link rel="icon" type="image/png" href="/android-chrome-192x192.png?v=2bbvyE2wzd" sizes="192x192">
	<link rel="icon" type="image/png" href="/favicon-16x16.png?v=2bbvyE2wzd" sizes="16x16">
	<link rel="manifest" href="/manifest.json?v=2bbvyE2wzd">
	<link rel="mask-icon" href="/safari-pinned-tab.svg?v=2bbvyE2wzd" color="#5bbad5">
	<link rel="shortcut icon" href="/favicon.ico?v=2bbvyE2wzd">
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	<meta name="apple-mobile-web-app-title" content="Afeefa.de">
	<meta name="application-name" content="Afeefa.de">
	<meta name="msapplication-TileColor" content="#333333">
	<meta name="msapplication-TileImage" content="/mstile-144x144.png?v=2bbvyE2wzd">
	<meta name="theme-color" content="#41829e">

	<!-- CSS styles (also containing vendor styles, all combined with SASS) -->
	<link rel="stylesheet" href="/DDFA/css/afeefa.css" />

	<!-- mapbox -->
	<!-- <link href='https://api.mapbox.com/mapbox.js/v2.4.0/mapbox.css' rel='stylesheet' /> -->
	<link href='https://api.mapbox.com/mapbox.js/v3.1.0/mapbox.css' rel='stylesheet' />

	<script>
	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

	  ga('create', 'UA-34351955-4', 'auto');
	  ga('send', 'pageview');
	</script>

	<!-- requirejs (module loader) handles all further js includes -->
	<?php
		$config = include 'config.php';
		$apiUrl = $config['APIUrl'];
		$backendApiUrl = $config['backendAPIUrl'];
	# check if calling dev or production version to load raw or built frontend
	if (preg_match("/(dev\.afeefa\.fx|localhost)/", $_SERVER['HTTP_HOST'])) { ?>
		<script>window.apiurl = '<?= $apiUrl ?>'</script>
		<script>window.backendapiurl = '<?= $backendApiUrl ?>'</script>
		<script data-main="/DDFA/js/main" type="text/javascript" src="/requirejs/require.js"></script>
	<?php } else { ?>
		<script>window.apiurl = '<?= $apiUrl ?>'</script>
		<script>window.backendapiurl = '<?= $backendApiUrl ?>'</script>
		<script data-main="/built/DDFA/js/main" type="text/javascript" src="/requirejs/require.js"></script>
	<?php } ?>
  
</head>
<body>
	<div id="main-container">
	</div>

	<div id="footer">
		<div class="opt2">
			<p class="donate">Sie finden Afeefa.de wichtig? Unterstützen Sie unsere Arbeit mit einer <a target="_blank" href="https://about.afeefa.de/spenden/"><strong>Spende</strong></a>
			</p>
			<p class="facebook">
				<a href="https://www.facebook.com/afeefa.de" target="_blank"> </a>
			</p>
		</div>
		<div class="opt1">
			<p class="donate">Was meinen Sie zu Afeefa.de? Für eine Beantwortung unserer kurzen <a target="_blank" href="https://afeefade.typeform.com/to/csN7YQ"><strong>Umfrage</strong></a> wären wir sehr dankbar!
			</p>
		</div>
	</div>
</body>
</html>
