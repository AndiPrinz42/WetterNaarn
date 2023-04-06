<script async src="https://www.googletagmanager.com/gtag/js?id=<?php echo getenv('GOOGLE_ANALYTICS_ID') ?>"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '<?php echo getenv('GOOGLE_ANALYTICS_ID') ?>');
</script>