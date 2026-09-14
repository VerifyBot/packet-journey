(function(g){
  var K='pkt.journey.1';
  function read(){
    try{var o=JSON.parse(localStorage.getItem(K));return (o&&typeof o==='object')?o:{d:[],q:''}}
    catch(e){return {d:[],q:''}}
  }
  function write(o){try{localStorage.setItem(K,JSON.stringify(o))}catch(e){}}
  function has(n){var d=read().d;return Array.isArray(d)&&d.indexOf(n)>-1}
  function mark(n){var o=read();if(!Array.isArray(o.d))o.d=[];if(o.d.indexOf(n)<0){o.d.push(n);write(o)}}
  function reachable(n){return n===1||has(n-1)}

  function gate(n){
    if(reachable(n))return;
    document.documentElement.setAttribute('data-shut','');
    document.addEventListener('DOMContentLoaded',function(){
      var el=document.querySelector('.gate .prev');
      if(el)el.textContent=String(n-1);
    });
  }

  function hints(box,list){
    var i=0;
    return function(){
      var t=list[Math.min(i,list.length-1)];i++;
      box.hidden=false;box.className='fb near';
      box.innerHTML='<b>כמעט! רמז:</b> '+t;
      box.scrollIntoView({block:'nearest',behavior:'smooth'});
    };
  }

  function win(box,n,why,href,label){
    mark(n);
    box.hidden=false;box.className='fb won';
    box.innerHTML='<span class="mark">✓</span><span class="why">'+why+'</span>'+
      (href?'<a class="go" href="'+href+'">'+label+'</a>':'');
    box.scrollIntoView({block:'nearest',behavior:'smooth'});
  }

  function norm(s){return String(s==null?'':s).replace(/[‎‏\s]/g,'').toLowerCase()}

  g.J={read:read,write:write,has:has,mark:mark,reachable:reachable,gate:gate,hints:hints,win:win,norm:norm};
})(window);
