<script async src="https://www.googletagmanager.com/gtag/js?id=<?php echo parse_ini_file("/usr/www/users/wetterkk/config/apikey.ini", true)['googleanalytics'];?>"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '<?php echo parse_ini_file("/usr/www/users/wetterkk/config/apikey.ini", true)['googleanalytics'];?>');
</script>