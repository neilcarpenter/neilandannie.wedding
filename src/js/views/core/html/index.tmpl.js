export default `
<!DOCTYPE html>
<!--[if lte IE 9]>     <html class="no-js lte-ie9"> <![endif]-->
<!--[if gt IE 9]><!--> <html class="no-js"> <!--<![endif]-->
<head>
  <meta name="content-type" content="text/html; charset=utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <title><%= title %></title>

  <meta name="description" content="">
  <meta name="keywords" content="">
  <meta name="author" content="">
  <meta name="viewport" content="initial-scale=1.0, width=device-width">

  <link rel="shortcut icon" href="/assets/appIcons/favicon.png" type="image/x-icon" />
  <link rel="apple-touch-icon" href="/assets/appIcons/apple-touch-icon.png" />
  <link rel="apple-touch-icon" sizes="80x80" href="/assets/appIcons/apple-touch-icon-80x80.png" />
  <link rel="apple-touch-icon" sizes="120x120" href="/assets/appIcons/apple-touch-icon-120x120.png" />
  <link rel="apple-touch-icon" sizes="152x152" href="/assets/appIcons/apple-touch-icon-152x152.png" />
  <link rel="apple-touch-icon" sizes="167x167" href="/assets/appIcons/apple-touch-icon-167x167.png" />

  <meta property="og:title"         content="">
  <meta property="og:url"           content="">
  <meta property="og:image"         content="">
  <meta property="og:description"   content="">
  <meta property="og:site_name"     content="">

  <meta name="twitter:card"         content="">
  <meta name="twitter:site"         content="">
  <meta name="twitter:creator"      content="">
  <meta name="twitter:url"          content="">
  <meta name="twitter:title"        content="">
  <meta name="twitter:description"  content="">
  <meta name="twitter:image"        content="">
  <meta name="twitter:image:width"  content="">
  <meta name="twitter:image:height" content="">

  <link href="https://fonts.googleapis.com/css?family=Amatica+SC:400,700|Muli:400,400i" rel="stylesheet">
  <link rel="stylesheet" href="/assets/<%= assets.cssMain %>">

  <script src="/assets/<%= assets.jsModernizr %>"></script>

  <!--[if IE9]>
    <script src="/<%= assets.jsClassList %>"></script>
  <![endif]-->

</head>
<body>

  <%= svgSymbols %>

  <div
    data-naaw-app
    data-naaw-tmpl='naaw-app'
    data-app-model='<%= JSON.stringify(config) %>'
    class="<%= isHome ? 'is-home' : '' %> <%= isGallery ? 'is-gallery' : '' %>">
    <%= header %>
    <%= main %>
    <%= galleryGrid %>
    <%= galleryGridModal %>
  </div>
  <script src="/assets/<%= assets.jsMain %>"></script>
  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    var gaCode = window.location.host === 'neilandannie.wedding' ? 'UA-87414771-1' : ''
    ga('create', gaCode, 'auto');
    ga('send', 'pageview');

  </script>
  </script>

  <noscript>
    <p>For a more complete experience, please enable JavaScript</p>
  </noscript>
</body>
</html>
`
