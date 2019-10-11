<script type="text/javascript">
  (function accountInstall() {
    var scriptSelectors = [
      '.cashier_loader_script',
      '#bold-subscriptions-custom-script',
      '#bold-subscriptions-script',
      '#bold-subscriptions-platform-script',
    ];

    if (document.querySelector(scriptSelectors[0]) && document.querySelector(scriptSelectors[2])) {
      return;
    }

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var wrapper = document.createElement('div');
        wrapper.innerHTML = xhr.responseText;

        for (var i = 0; i < scriptSelectors.length; i++) {
          const scriptSelector = scriptSelectors[i];
          var script = wrapper.querySelector(scriptSelector);
          var existingScript = document.querySelector(scriptSelector);

          if (script && !existingScript) {
            var newScript = document.createElement('script');
            newScript.type = 'text/javascript';
            newScript.innerHTML = script.innerHTML;

            if (scriptSelector.indexOf('#') !== -1) {
              newScript.id = scriptSelector.slice(1);
            }

            document.body.appendChild(newScript);
          }
        }

        window.setTimeout(function () {
          window.BOLD.subscriptions.contentLoaded();
          window.BOLD.subscriptions.platformContentLoaded();
        }, 0);
      }
    };

    xhr.open('GET', '/', true);
    xhr.send();
  }());
</script>
