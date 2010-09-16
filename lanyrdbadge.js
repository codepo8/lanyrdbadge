lanyrdbadge = function(){
  var l;
  function init(){
    l = document.getElementById('lanyrd');
    if(l && l.nodeName.toLowerCase() === 'a'){
      l.innerHTML += ' <span>(Loading&hellip)</span>';
      var user = l.getAttribute('href');
      var url = 'http://query.yahooapis.com/v1/public/yql?'+
                'q=select%20*%20from%20html%20where%20url%3D%22'+
                 encodeURIComponent(user)+
                '%22%20and%20xpath%3D%22%2F%2Fh2%5Bcontains(.%2C\''+
                'Future\')%5D%2F..%22&diagnostics=true&format=xml'+
                '&callback=lanyrdbadge.seed';
      var s = document.createElement('script');
      s.setAttribute('src',url);
      document.getElementsByTagName('head')[0].appendChild(s);
    }
  }
  function seed(o){
    var res = o.results[0];
    res = res.replace(/class="split"/,'id="lanyrd"');
    res = res.replace(/speaking at/,'');
    res = res.replace(/href="/,'href="http://lanyrd.com');
    res = res.replace(/src="/gi,'src="http://lanyrd.com'); 
    l.parentNode.innerHTML = res;
  }
  return {seed:seed,init:init}
}();
lanyrdbadge.init();