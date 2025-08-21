(function() {
    var e = window.parent != window,
        t = document.getElementsByTagName("script"),
        n = t[t.length - 1],
        o = n.getAttribute("data-config"),
        i = document.getElementsByTagName("head")[0],
        a = location.href.replace(/scmplayer\=true/g, "scmplayer=false"),
        d = a.substr(0, a.indexOf("/", 10)),
        r = n.getAttribute("src").replace(/script\.js.*/g, "scm.html?03022013") + "#" + a,
        c = r.substr(0, r.indexOf("/", 10)),
        l = !e || location.href.indexOf("scmplayer=true") > 0,
        s = function(e) {
            return window.top.document.getElementById("scmframe").contentWindow.postMessage(e, c)
        },
        u = function(e, t) {
            for (var t = t.split(","), n = function(e) {
                    return function(t) {
                        var n = "";
                        "undefined" != typeof t && (n = (e.match(/(play|queue)/) ? "new Song(" : "(") + JSON.stringify(t) + ")"), s("SCM." + e + "(" + n + ")")
                    }
                }, o = 0; o < t.length; o++) {
                var i = t[o];
                e[i] = n(i)
            }
        },
        f = function(e) {
            l || s("SCM.config(" + e + ")")
        },
        m = function(e, t, n) {
            e.addEventListener ? e.addEventListener(t, n) : e.attachEvent ? e.attachEvent("on" + t, n) : e["on" + t] = n
        },
        h = (function() {
            for (var e, t = 3, n = document.createElement("div"), o = n.getElementsByTagName("i"); n.innerHTML = "<!--[if gt IE " + ++t + "]><i></i><![endif]-->", o[0];);
            return t > 4 ? t : e
        }(), navigator.userAgent.match(/iPad|iPhone|Android|Blackberry/i)),
        p = function() {
            return document.body ? void(l ? w() : g()) : void setTimeout(p, 10)
        },
        w = function() {
            var e = "html,body{overflow:hidden;} body{margin:0;padding:0;border:0;} img,a,embed,object,div,address,table,iframe,p,span,form,header,section,footer{ display:none;border:0;margin:0;padding:0; } #scmframe{display:block; background-color:transparent; position:fixed; top:0px; left:0px; width:100%; height:100%; z-index:1667;} ",
                t = document.createElement("style");
            t.type = "text/css", t.id = "scmcss", t.styleSheet ? t.styleSheet.cssText = e : t.appendChild(document.createTextNode(e)), i.appendChild(t);
            var n = document.createElement("iframe");
            n.frameBorder = 0, n.id = "scmframe", n.allowTransparency = !0, n.src = r, document.body.insertBefore(n, document.body.firstChild), m(window, "load", function() {
                setTimeout(function() {
                    for (; document.body.firstChild != n;) document.body.removeChild(document.body.firstChild);
                    for (; document.body.lastChild != n;) document.body.removeChild(document.body.lastChild)
                }, 0)
            }), m(window, "resize", function() {
                n.style.height = function() {
                    return "number" == typeof window.innerHeight ? window.innerHeight : document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body && document.body.clientHeight ? document.body.clientHeight : void 0
                }()
            });
            var o = function() {
                    return location.href.replace(/#.*/, "")
                },
                a = o(),
                d = location.hash;
            setInterval(function() {
                o() != a && (a = o(), window.scminside.location.replace(a)), location.hash != d && (d = location.hash, window.scminside.location.hash = d)
            }, 100)
        },
        g = function() {
            window.top.document.title = document.title;
            var e = function(e) {
                return e.replace(/blogspot.[a-z.]*/i, "blogspot.com")
            };
            m(document.body, "click", function(t) {
                for (var n = t.target; !n.tagName.match(/^(a|area)$/i) && n != document.body;) n = n.parentNode;
                if (n.tagName.match(/^(a|area)$/i) && !n.href.match(/.(jpg|png)$/i) && !n.href.match(/^javascript:/) && -1 == n.getAttributeNode("onclick").textContent.indexOf("return false"))
                    if (0 == n.target.indexOf("_blank")) window.open(n.href, "_blank"), window.focus();
                    else if (0 == n.href.indexOf("#")) "#" != n.href && (window.top.scminside = window, window.top.location.hash = location.hash, t.preventDefault());
                else if (n.title.match(/^(SCM:|\[SCM\])/i)) {
                    var o = n.title.replace(/^(SCM:|\[SCM\])( )?/i, ""),
                        i = n.href;
                    y.play({
                        title: o,
                        url: i
                    }), t.preventDefault()
                } else if (n.href.match(/\.css$/)) window.open("http://scmplayer.net/#skin=" + n.href, "_blank"), window.focus(), t.preventDefault();
                else if (-1 == e(n.href).indexOf(e(location.host))) n.href.match(/^http(s)?/) && (window.open(n.href, "_blank"), window.focus(), t.preventDefault());
                else if (history.pushState) {
                    var i = e(n.href).replace(e(d), "");
                    window.top.scminside = window, window.top.history.pushState(null, null, i), t.preventDefault()
                }
            }), m(window, "load", function() {})
        },
        y = {};
    u(y, "queue,play,pause,next,previous,volume,skin,placement,loadPlaylist,repeatMode,isShuffle,showPlaylist,togglePlaylist,toggleShuffle,changeRepeatMode"), window.SCM && window.SCMMusicPlayer || (h || p(), o && f(o), y.init = f, window.SCMMusicPlayer = window.SCMMusicPlayer || y, window.SCM = window.SCM || y)
})();




function loadNowMyPlaylist() {

    var $ = jQuery;

    var data = {

        'action': 'list',

    };



    $.ajax({

        'url': '/api/playlist.php',

        'data': data,

        'method': 'POST',

        'dataType': 'json',

        'success': function(json) {

            if (json.length < 1) return;

            SCM.loadPlaylist(json);

        }

    });

}