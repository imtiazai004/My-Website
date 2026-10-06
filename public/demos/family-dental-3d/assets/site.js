/* Family Dental — shared site JS */
(function(){
  'use strict';

  /* ---------- asset loader (logo + doctor photo from base64 .txt) ---------- */
  function assetBase(){
    var s=(document.currentScript&&document.currentScript.src)||'';
    var i=s.lastIndexOf('/');
    return i>0?s.slice(0,i+1):'';
  }
  function loadAssets(){
    var base=assetBase();
    fetch(base+'logo.txt').then(function(r){return r.text();}).then(function(b){
      var src='data:image/jpeg;base64,'+b.trim();
      document.querySelectorAll('img[data-asset="logo"]').forEach(function(el){el.src=src;});
    }).catch(function(){});
    fetch(base+'doctor.txt').then(function(r){return r.text();}).then(function(b){
      var src='data:image/jpeg;base64,'+b.trim();
      document.querySelectorAll('img[data-asset="doctor"]').forEach(function(el){el.src=src;});
    }).catch(function(){});
  }

  /* ---------- passcode gate ---------- */
  function gate(){
    var g=document.getElementById('gate');
    if(!g) return;
    if(sessionStorage.getItem('fdGate')==='1'){g.classList.add('hide');return;}
    var inp=document.getElementById('gateInput'), err=document.getElementById('gateErr');
    function go(){
      if(inp.value.trim()==='smile2026'){sessionStorage.setItem('fdGate','1');g.classList.add('hide');}
      else{err.textContent='Wrong passcode — please try again.';inp.value='';inp.focus();}
    }
    document.getElementById('gateBtn').addEventListener('click',go);
    inp.addEventListener('keydown',function(e){if(e.key==='Enter')go();});
    setTimeout(function(){inp.focus();},400);
  }

  /* ---------- mobile nav ---------- */
  function nav(){
    var b=document.getElementById('burger'), n=document.getElementById('mainNav');
    if(b&&n) b.addEventListener('click',function(){n.classList.toggle('mopen');});
  }

  /* ---------- FAQ accordion ---------- */
  function faq(){
    document.querySelectorAll('.faq-item').forEach(function(it){
      var q=it.querySelector('.faq-q'), a=it.querySelector('.faq-a');
      q.addEventListener('click',function(){
        var open=it.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(function(o){
          o.classList.remove('open');o.querySelector('.faq-a').style.maxHeight=null;
        });
        if(!open){it.classList.add('open');a.style.maxHeight=a.scrollHeight+'px';}
      });
    });
  }

  /* ---------- testimonial slider ---------- */
  function slider(){
    var tr=document.getElementById('tTrack');if(!tr)return;
    var dots=document.getElementById('tDots'), n=tr.children.length, i=0, timer;
    for(var k=0;k<n;k++){
      var d=document.createElement('button');
      d.setAttribute('aria-label','Show review '+(k+1));
      (function(k){d.addEventListener('click',function(){go(k);restart();});})(k);
      dots.appendChild(d);
    }
    function go(k){
      i=(k+n)%n;
      tr.style.transform='translateX(-'+(i*100)+'%)';
      dots.querySelectorAll('button').forEach(function(b,j){b.classList.toggle('on',j===i);});
    }
    function restart(){clearInterval(timer);timer=setInterval(function(){go(i+1);},6000);}
    go(0);restart();
  }

  /* ---------- scroll reveal ---------- */
  function reveal(){
    var els=document.querySelectorAll('.reveal');
    if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in');});return;}
    var o=new IntersectionObserver(function(es){
      es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');o.unobserve(e.target);}});
    },{threshold:.12});
    els.forEach(function(e){o.observe(e);});
  }

  /* ---------- contact form -> WhatsApp ---------- */
  function cform(){
    var f=document.getElementById('cForm');if(!f)return;
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var n=document.getElementById('cfName').value.trim(),
          p=document.getElementById('cfPhone').value.trim(),
          t=document.getElementById('cfTopic').value,
          m=document.getElementById('cfMsg').value.trim();
      var txt='Assalam-o-Alaikum! I am '+n+' ('+p+').%0AReason: '+encodeURIComponent(t)+
              (m?'%0A'+encodeURIComponent(m):'');
      window.open('https://wa.me/923339202134?text='+txt,'_blank');
    });
  }

  function init(){
    loadAssets();gate();nav();faq();slider();reveal();cform();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
  else init();
})();
