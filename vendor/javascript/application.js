import e from"http";import t from"util";import s from"error-page";import r from"fs";import o from"path";import n from"url";import i from"templar";import a from"ejs";import u from"keygrip";import p from"cookies";import l from"redsess";import c from"dnode";import f from"node-static";var d;var h="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof self?self:global;var m={};var g=t,y=s,S=e.STATUS_CODES,v,T,H,E,k,w,R,O,b,C;function Response(e,t,s){t.sendJSON=sendJSON;t.sendHTML=sendHTML;t.sendError=y(e,t,T);v&&(e.cookies=t.cookies=new E(e,t,H));w&&(e.session=t.session=new k(e,t,R));b&&(t.template=O(e,t,C));if(!s)return t.sendError(404);t._close=_close;e.res=t;e.route=s;e.method=s.params.method;e.params=s.params;t.headers=s.headers||{};s.fn.call(e)}Response.setup=function(e){v=e.useCookieParser;T=e.useErrorTemplate;H=e.Keygrip;E=e.Cookies;k=e.Session;w=e.useSession;R=e.useSessionOpts;O=e.TemplateEngine;b=e.useTemplateEngine;C=e.useTemplateEngineOpts};function sendJSON(e){if("undefined"===typeof e||null===typeof e)this.sendError(422);else{(this||h).payload=JSON.stringify(e,null,2);(this||h).headers=h.headers=d={"Content-Type":"application/json"};(this||h)._close.call(this||h)}}function sendHTML(e){(this||h).payload=e;(this||h).headers=d={"Content-Type":"text/html"};(this||h)._close.call(this||h)}function _close(e,t){if(!(this||h).statusCode)throw new Error("status code should be set");if(!(this||h).headers)throw new Error("headers should be set or passed");this.writeHead((this||h).statusCode,(this||h).headers);this.write((this||h).payload);this.end();"function"===typeof t&&t.call(this||h,null)}function auto(){if(null!==err&&void 0!==typeof err){console.error(err);return res.sendError(err)}return"object"===typeof data?res.sendJSON(data):"string"===typeof data?res.sendHTML(data):res.sendError(500)}m=Response;var D=m;var j={};function _nullRequire(e){var t=new Error("Cannot find module '"+e+"'");t.code="MODULE_NOT_FOUND";throw t}var P=r,x=o;j=function(e){var t={};P.readdirSync(e).forEach((function(s){var r=x.join(e,s);return P.statSync(r).isDirectory()?t[s.split(".js")[0]]=j(r):t[s.split(".js")[0]]=_nullRequire(r)}));return t};var A=j;var I="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof self?self:global;var N={};var _=[],K=n;var Route=function(e){var t,s,r=[];if(e instanceof RegExp){s=e;t=e.toString()}else{s=pathToRegExp(e,r);t=e}return{re:s,src:e.toString(),keys:r}};var pathToRegExp=function(e,t){e=e.concat("/?").replace(/\/\(/g,"(?:/").replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g,(function(e,s,r,o,n,i){t.push(o);s=s||"";return(i?"":s)+"(?:"+(i?s:"")+(r||"")+(n||"([^/]+?)")+")"+(i||"")})).replace(/([\/.])/g,"\\$1").replace(/\*/g,"(.+)");return new RegExp("^"+e+"$","i")};var match=function(e,t,s,r,o){var n,i=0,a=K.parse(t,true).query;for(var u=e.length;i<u;++i){var p=e[i],l=p.re,c=p.keys,f=[],d={};var h=t.split("?")[0];if(n=l.exec(h)){for(var m=1,u=n.length;m<u;++m){var g=c[m-1],y="string"===typeof n[m]?decodeURIComponent(n[m]):n[m];g?d[g]=y:f.push(y)}d.method=s.toLowerCase();for(var g in a)d[g]=a[g];if("POST"===s){var S=new formidable.IncomingForm;S.parse(r,(function(e,t,s){for(var r in t)d[r]=t[r];o(null,{params:d,splats:f,route:p.src,files:s})}))}else o(null,{params:d,splats:f,route:p.src})}}null!==n&&"undefined"!==typeof n||o(null)};var Router=function(){return{routes:[],routeMap:{},addRoute:function(e,t){if(!e)throw new Error(" route requires a path");if(!t)throw new Error(" route "+src+" requires a callback");var s=Route(e);s.fn=t;(this||I).routes.push(s);(this||I).routeMap[e]=t},match:function(e,t,s,r){var o=this||I;match(o.routes,e,t,s,(function(e,t){t&&(t.fn=o.routeMap[t.route]);r(e,t)}))}}};N={Route:Route,pathToRegExp:pathToRegExp,match:match,Router:Router};var M=N;var q="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof self?self:global;var J={};var L={Server:["node-application"],"Content-Type":["charset=utf-8"],"Set-Cookie":["path=/"]};var U=e,F=t;var $=D,z=A,B=M,G=new B.Router;function Application(e){var t=this||q;e=e||{};t.debug=e.debug||false;t.defaultHeaders=L;t.router=G;t.useErrorTemplate=e.useErrorTemplate||{};t.TemplateEngine=null;t.useTemplateEngine=e.useTemplateEngine||false;if(t.useTemplateEngine){t.useTemplateDir=e.useTemplateDir||function(){throw new Error("template directory is required when using a template engine")}();t.TemplateEngine=i;t.TemplateEngine.loadFolder(t.useTemplateDir);t.useTemplateEngineOpts=e.useTemplateEngineOpts||{engine:a,folder:t.useTemplateDir}}t.Cookies=null;t.useCookieParser=e.useCookieParser||false;if(t.useCookieParser){t.useCookieParserKeys=e.useCookieParserKeys;t.Keygrip=u;t.Cookies=p;t.Keygrip=new t.Keygrip(t.useCookieParserKeys)}t.Session=null;t.useSession=e.useSession||false;if(t.useSession){t.useSessionType=e.useSessionType||"redis";t.useSessionRedisOpts=e.useSessionRedisOpts||{};switch(t.useSessionType){case"redis":t.Session=l;t.Session.createClient(t.useSessionRedisOpts.host,t.useSessionRedisOpts.port,t.useSessionRedisOpts);break;default:throw new Error("session type not supported yet");break}t.useSessionOpts=e.useSessionOpts||{}}t.useInterfaceDir=e.useInterfaceDir||false;t.useInterfaceDir&&(t.interface=z(t.useInterfaceDir));t.interface=t.interface||{};e.interface=e.interface||{};t.interface=extend(t.interface,e.interface);t.Dnode=null;t.useDnode=e.useDnode||false;t.useDnode&&(t.Dnode=c);t.Http=null;t.useHttp=e.useHttp||false;if(t.useHttp){t.useHttpRoots=e.useHttpRoots||"home";t.useHttpHeaders=e.useHttpHeaders||{}}t.HttpStatic=null;t.useHttpStatic=e.useHttpStatic||false;if(t.useHttpStatic){t.useHttpStaticCache=e.useHttpStaticCache||3600;t.useHttpStaticHeaders=e.useHttpStaticHeaders||{};var s=f;t.HttpStatic=new s.Server(e.useHttpStatic,{cache:t.useHttpStaticCache,headers:t.useHttpStaticHeaders})}t.debug&&console.warn(JSON.stringify(e,true,2));return t}Application.prototype.addInterface=function(e){var t=this||q;if("object"!==typeof e&&"function"!==typeof e)throw new Error("addInterface takes an object or function");for(var s in e)t.interface[s]=e[s];return t};Application.prototype.makeHttpRoutes=function(e,t){var s=this||q;t=t||"";Object.keys(e).forEach((function(r){var o="",n=r;r.length||t.length||(o="/");r.length&&(o+="/");if(r===s.useHttpRoots){o="";n=""}t.length||o.length||n.length||(o="/");"function"===typeof e[r]&&s.router.addRoute(t+o+n,s.makeHttpRoute(e[r]));"object"!==typeof e[r]&&"function"!==typeof e[r]||s.makeHttpRoutes(e[r],t+o+r)}))};Application.prototype.makeHttpRoute=function(e){var t=this||q;return function(){var s=this||q;e.call(t.interface,s,s.res)}};Application.prototype.makeRpcRoutes=function(e,t){var s=this||q;Object.keys(e).forEach((function(r){"function"===typeof e[r]&&(e[r]=s.makeRpcRoute(e[r],t));"object"!==typeof e[r]&&"function"!==typeof e[r]||s.makeRpcRoutes(e[r],t)}))};Application.prototype.makeRpcRoute=function(e,t){var s=this||q;return function(r,o){e.call(s.interface,r,o,t)}};Application.prototype.serveStatic=function(e,t,s){var r=this||q;e.on("end",(function(){return r.HttpStatic.serve(e,t,(function(e){e&&s(e)}))}))};Application.prototype.listen=function(e){var t=this||q;t.makeHttpRoutes(clone(t.interface));t.debug&&console.warn("http",t.router.routeMap);if(t.useHttp){t.Http=U.createServer(server);t.Http.listen(e)}if(t.useDnode){t.Dnode=t.Dnode((function(e,s){var r=this||q;var o=clone(t.interface);t.makeRpcRoutes(o,e);extend(r,o);s.on("ready",(function(){t.debug&&console.log("dnode",s.id)}))}));t.Dnode.listen(t.Http||e)}$.setup({useCookieParser:t.useCookieParser,useErrorTemplate:t.useErrorTemplate,Keygrip:t.Keygrip,Cookies:t.Cookies,Session:t.Session,useSession:t.useSession,useSessionOpts:t.useSessionOpts,TemplateEngine:t.TemplateEngine,useTemplateEngine:t.useTemplateEngine,useTemplateEngineOpts:t.useTemplateEngineOpts});function server(e,s){if("OPTIONS"==e.method){s.writeHead(200,{});return s.end()}s.socket&&s.socket.setNoDelay&&s.socket.setNoDelay();t.router.match(e.url,e.method,e,(function(r,o){!o&&t.useHttpStatic?t.serveStatic(e,s,(function(e){e&&s.sendError(e.status,e)})):$(e,s,o)}))}console.warn(!!t.useCookieParser,"useCookieParser");console.warn(!!t.useTemplateEngine,"useTemplateEngine");console.warn(!!t.useSession,"useSession");console.warn(!!t.useInterfaceDir,"useInterfaceDir");console.warn(!!t.useDnode,"useDnode");console.warn(!!t.useHttp,"useHttp");console.warn(!!t.useHttpStatic,"useHttpStatic");console.warn(Object.keys({}).length+" modules loaded");console.warn("listening on",e)};function bind(e,t){return function(){return e.apply(t,arguments)}}function clone(e){return extend({},e)}function extend(e,t){Object.keys(t).forEach((function(s){if(F.isArray(t[s])){e[s]=e[s]||[];e[s]=e[s].concat(t[s])}else if("object"==typeof t[s]){e[s]=e[s]||{};e[s]=extend(e[s],t[s])}else e[s]=t[s]}));return e}J=Application;var Q=J;export default Q;

