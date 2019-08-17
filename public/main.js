(function () {
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function resetDisplay() {
    const spans = document.getElementsByClassName('stats');
    for (let i = 0; i < spans.length; ++i) {
      spans[i].innerHTML = '---';
    }
  }

  function fetchData() {
    resetDisplay();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState != 4 || this.status != 200) {
        return;
      }
      const items = JSON.parse(this.responseText).data;
      for (let i = 0; i < items.length; ++i) {
        const keys = Object.keys(items[i]);
        for (let k = 0; k < keys.length; ++k) {
          const key = keys[k];
          try {
            document.getElementsByName(key)[i].innerHTML = numberWithCommas(items[i][key]);
          } catch {

          }
        }
      }
    };
    xhttp.open("GET", "/.netlify/functions/api", true);
    xhttp.send();
  }

  window.onload = function () {
    document.getElementById("btn-refresh").addEventListener("click", function () {
      fetchData();
    });
    fetchData();
  };
})();
