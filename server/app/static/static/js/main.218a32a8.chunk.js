(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{147:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(16),s=a.n(l),o=(a(79),a(26)),c=a(8),i=a(38),u=a(19),m=function(e){var t=e.path,a=e.component;return Object(u.c)((function(e){return e.session.userId}))?r.a.createElement(c.b,{path:t,component:a}):r.a.createElement(c.a,{to:"/signup"})},p=a(11),f=a.n(p),g=a(20),d=a(9);var h=function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement("strong",null,"Username:")," ",e.user.username,r.a.createElement("br",null),r.a.createElement("strong",null,"Email:")," ",e.user.email,r.a.createElement("br",null),r.a.createElement("hr",null))};var E=function(e){var t=Object(n.useState)([]),a=Object(d.a)(t,2),l=a[0],s=a[1];Object(n.useEffect)((function(){function e(){return(e=Object(g.a)(f.a.mark((function e(){var t,a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/users/");case 2:return t=e.sent,e.next=5,t.json();case 5:a=e.sent,s(a.users);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]);var o=l.map((function(e){return r.a.createElement(h,{key:e.id,user:e})}));return console.log("____Rendering User List____"),r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,"User List: "),o)},b={userInfo:null,map:null};var _=a(40),v=a.n(_),O=v.a.get("XSRF-TOKEN"),N="session/LOGIN",j=function(e,t){return function(){var a=Object(g.a)(f.a.mark((function a(n){var r;return f.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,fetch("/api/session/login",{method:"PUT",headers:{"X-CSRFToken":O,"Content-Type":"application/json"},body:JSON.stringify({email:e,password:t,csrfToken:O})});case 2:return r=a.sent,a.next=5,r.json();case 5:return r.data=a.sent,r.ok&&n((l=r.data.id,{type:N,userId:l})),a.abrupt("return",r);case 8:case"end":return a.stop()}var l}),a)})));return function(e){return a.apply(this,arguments)}}()},y={userId:null};var S=v.a.get("XSRF-TOKEN"),C=function(e,t,a,n,r,l,s,o,c){return function(){var i=Object(g.a)(f.a.mark((function i(u){var m;return f.a.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,fetch("/api/users/",{method:"POST",headers:{"Content-Type":"application/json","X-CSRFToken":S},body:JSON.stringify({first_name:e,last_name:t,email:a,password:n,confirm_password:r,date_of_birth:l.toISOString().split("T")[0],location:s,lat:o,lng:c,csrfToken:S})});case 2:return m=i.sent,i.next=5,m.json();case 5:if(m.data=i.sent,!m.ok){i.next=10;break}return u({type:"users/SIGNUP_USER",user:m.data}),i.next=10,u(j(a,n));case 10:return i.abrupt("return",m);case 11:case"end":return i.stop()}}),i)})));return function(e){return i.apply(this,arguments)}}()};var P=function(e){return{type:"errors/SET_ERRORS",errors:e}};var w=a(70),x=a.n(w),A=Object(n.createContext)(),R=a(4),F=a.n(R),I=(a(86),function(){var e=Object(n.useContext)(A),t=e.values,a=t.firstName,l=t.lastName,s=t.email,o=t.password,c=t.confirmPassword,i=t.dateOfBirth,u=e.handlers,m=u.setFirstName,p=u.setLastName,f=u.setEmail,g=u.setPassword,d=u.setConfirmPassword,h=u.setDateOfBirth;return r.a.createElement("form",{className:F.a.userInfoForm,method:"",action:""},r.a.createElement("div",{className:"form-control-group"},r.a.createElement("p",null,r.a.createElement("label",{className:F.a.labels,htmlFor:"firstName"},"First Name")),r.a.createElement("input",{type:"text",name:"firstName",className:"form-control",placeholder:"i.e. John",value:a,required:"required",onChange:function(e){return m(e.target.value)}})),r.a.createElement("div",{className:"form-control-group"},r.a.createElement("p",null,r.a.createElement("label",{className:F.a.labels,htmlFor:"lastName"},"Last Name")),r.a.createElement("input",{type:"text",name:"lastName",className:"form-control",placeholder:"i.e. Smith",value:l,required:"required",onChange:function(e){return p(e.target.value)}})),r.a.createElement("div",{className:"form-control-group"},r.a.createElement("p",null,r.a.createElement("label",{className:F.a.labels,htmlFor:"email"},"Email")),r.a.createElement("input",{type:"email",name:"email",className:"form-control",placeholder:"i.e. johnsmith@gmail.com",value:s,required:"required",onChange:function(e){return f(e.target.value)}})),r.a.createElement("div",{className:"form-control-group"},r.a.createElement("p",null,r.a.createElement("label",{className:F.a.labels,htmlFor:"password"},"Password")),r.a.createElement("input",{type:"password",name:"password",className:"form-control",value:o,required:"required",onChange:function(e){return g(e.target.value)}})),r.a.createElement("div",{className:"form-control-group"},r.a.createElement("p",null,r.a.createElement("label",{className:F.a.labels,htmlFor:"confirmPassword"},"Confirm Password")),r.a.createElement("input",{type:"password",name:"confirmPassword",className:"form-control",value:c,onChange:function(e){return d(e.target.value)}})),r.a.createElement("div",{className:"form-control-group"},r.a.createElement("p",null,r.a.createElement("label",{className:F.a.labels,htmlFor:"dateOfBirth"},"Date of Birth")),r.a.createElement(x.a,{selected:i,required:"required",onChange:function(e){return h(e)},className:"form-control"})))}),U=Object(n.memo)((function(e){e.apiKey;var t=Object(n.useState)(null),a=Object(d.a)(t,2),l=a[0],s=a[1],o=Object(n.useState)(null),c=Object(d.a)(o,2),u=c[0],m=c[1],p=Object(n.useState)(null),f=Object(d.a)(p,2),g=(f[0],f[1]),h=Object(n.useState)(null),E=Object(d.a)(h,2),b=E[0],_=E[1],v=Object(n.useContext)(A).handlers,O=v.setLocation,N=v.setLat,j=v.setLng,y=Object(n.useCallback)((function(e){var t=new window.google.maps.LatLngBounds;e.fitBounds(t),s(e)}),[]),S=Object(n.useCallback)((function(e){s(null)}),[]);return r.a.createElement("div",{className:F.a.mapContainer},r.a.createElement(i.b,{mapContainerStyle:{width:"450px",height:"465px"},center:u||{lat:44.3148443,lng:-85.60236429999999},zoom:1,onLoad:y,unMount:S},r.a.createElement(i.a,{onLoad:function(e){_(e)},onPlaceChanged:function(){if(console.log(b.getPlace()),b){var e=b.getPlace().geometry.location.lat(),t=b.getPlace().geometry.location.lng();console.log(e,t),N(e),j(t),O(document.querySelector("#autocomplete").value),g(new window.google.maps.Marker({position:{lat:e,lng:t},map:l})),m({lat:e,lng:t})}else console.log("Autocomplete is not loaded yet")}},r.a.createElement("input",{id:"autocomplete",type:"text",placeholder:"Enter your city here",style:{boxSizing:"border-box",border:"1px solid transparent",width:"240px",height:"32px",padding:"0 16px",borderRadius:"3px",boxShadow:"0 2px 6px rgba(0, 0, 0, 0.3)",fontSize:"16px",outline:"none",textOverflow:"ellipses",position:"absolute",left:"50%",marginLeft:"-120px"}}))))})),k=function(){return r.a.createElement("div",{className:F.a.leftContainer})},T=Object(c.g)((function(e){var t=e.history,a=Object(u.b)(),l=Object(u.c)((function(e){return e.ui.signUpForm})),s=l.userInfo,c=l.map,i=Object(u.c)((function(e){return e.errors}));Object(n.useEffect)((function(){return a({type:"ui/SIGN_UP_USER_INFO"}),function(){a({type:"ui/SIGN_UP_USER_INFO"})}}),[a]);var m=Object(n.useState)(""),p=Object(d.a)(m,2),h=p[0],E=p[1],b=Object(n.useState)(""),_=Object(d.a)(b,2),v=_[0],O=_[1],N=Object(n.useState)(""),j=Object(d.a)(N,2),y=j[0],S=j[1],w=Object(n.useState)(""),x=Object(d.a)(w,2),R=x[0],T=x[1],B=Object(n.useState)(""),L=Object(d.a)(B,2),D=L[0],q=L[1],W=Object(n.useState)(new Date),K=Object(d.a)(W,2),M=K[0],G=K[1],H=Object(n.useState)(""),X=Object(d.a)(H,2),z=X[0],J=X[1],Y=Object(n.useState)(null),V=Object(d.a)(Y,2),Q=V[0],Z=V[1],$=Object(n.useState)(null),ee=Object(d.a)($,2),te=ee[0],ae=ee[1],ne=Object(n.useState)(!0),re=Object(d.a)(ne,2),le=re[0],se=re[1];Object(n.useEffect)((function(){se(!1)}),[]),Object(n.useEffect)((function(){a({type:"errors/CLEAR_ERRORS"})}),[h,v,y,R,D,M,z]);var oe={values:{firstName:h,lastName:v,email:y,password:R,confirmPassword:D,dateOfBirth:M,location:z,lat:Q,lng:te},handlers:{setFirstName:E,setLastName:O,setEmail:S,setPassword:T,setConfirmPassword:q,setDateOfBirth:G,setLocation:J,setLat:Z,setLng:ae}},ce=function(){var e=Object(g.a)(f.a.mark((function e(n){var r;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),e.next=3,a(C(h,v,y,R,D,M,z,Q,te));case 3:r=e.sent,console.log(r),r.ok&&t.replace("/"),a(P(r.data.errors));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement(r.a.Fragment,null,r.a.createElement(A.Provider,{value:oe},r.a.createElement("div",{style:{display:"flex",width:"100vw",height:"100vh"}},r.a.createElement(k,null),r.a.createElement("div",{className:F.a.authRight},r.a.createElement("div",{className:F.a.signUpformContainer},r.a.createElement("div",{className:F.a.signUpheaderContainer},r.a.createElement("h1",{className:F.a.signUpHeader},"Sign Up")),i.length?r.a.createElement("ul",{className:F.a.authErrors},i.map((function(e,t){return r.a.createElement("li",{key:"error-".concat(t+1)},e)}))):r.a.createElement(r.a.Fragment,null),r.a.createElement("div",{className:F.a.contentContainer},r.a.createElement("div",{className:le?F.a.initialUserInfoOnscreen:s?F.a.userInfoOnscreen:F.a.userInfoOffscreen},r.a.createElement(I,null)),r.a.createElement("div",{className:c?F.a.mapOnscreen:F.a.mapOffscreen},r.a.createElement(U,null))),r.a.createElement("div",{className:F.a.bottomContainer},r.a.createElement("button",{className:c?F.a.bottomButton:F.a.bottomButton+" hidden",onClick:function(){a({type:"ui/SIGN_UP_USER_INFO"}),a({type:"errors/CLEAR_ERRORS"})}},r.a.createElement("span",null,"\u2039")," Previous"),r.a.createElement("div",{className:F.a.circleContainer},r.a.createElement("div",{className:s?F.a.activeDisplayCircle:F.a.inactiveDisplayCircle}),r.a.createElement("div",{className:c?F.a.activeDisplayCircle:F.a.inactiveDisplayCircle})),s?r.a.createElement("button",{className:F.a.bottomButton,type:"button",onClick:function(){a({type:"ui/SIGN_UP_DISPLAY_MAP"})}},"Next ",r.a.createElement("span",null,"\u203a")):r.a.createElement("button",{className:F.a.bottomButton,type:"button",onClick:ce},"Submit")),r.a.createElement("p",{className:F.a.loginText},"Already have an account? ",r.a.createElement(o.b,{className:F.a.linkText,to:"/login"},"Sign In")))))))})),B=Object(c.g)((function(e){var t=e.history,a=Object(u.b)(),l=Object(u.c)((function(e){return e.errors})),s=Object(n.useState)(""),c=Object(d.a)(s,2),i=c[0],m=c[1],p=Object(n.useState)(""),h=Object(d.a)(p,2),E=h[0],b=h[1];Object(n.useEffect)((function(){a({type:"errors/CLEAR_ERRORS"})}),[i,E]);var _=function(){var e=Object(g.a)(f.a.mark((function e(n){var r;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),e.next=3,a(j(i,E));case 3:(r=e.sent).ok&&t.replace("/"),a(P(r.data.errors));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",{style:{display:"flex",height:"100vh",width:"100vw"}},r.a.createElement(k,null),r.a.createElement("div",{className:F.a.authRight},r.a.createElement("div",{className:F.a.loginFormContainer},r.a.createElement("div",{className:F.a.loginHeaderContainer},r.a.createElement("h1",{className:F.a.signUpHeader},"Welcome back!")),l.length?r.a.createElement("div",{className:F.a.loginErrorWrapper},r.a.createElement("ul",{className:F.a.loginErrors},l.map((function(e,t){return r.a.createElement("li",{key:"error-".concat(t+1)},e)})))):r.a.createElement(r.a.Fragment,null),r.a.createElement("div",{className:F.a.loginFormWrapper},r.a.createElement("form",{className:F.a.loginForm,method:"",action:"",onSubmit:_},r.a.createElement("div",{className:"login-form-control-group"},r.a.createElement("p",null,r.a.createElement("label",{className:F.a.labels,htmlFor:"email"},"Email")),r.a.createElement("input",{className:"form-control",name:"email",type:"email",value:i,onChange:function(e){return m(e.target.value)}})),r.a.createElement("div",{className:"login-form-control-group"},r.a.createElement("p",null,r.a.createElement("label",{className:F.a.labels,htmlFor:"password"},"Password")),r.a.createElement("input",{className:"form-control",name:"password",type:"password",value:E,onChange:function(e){return b(e.target.value)}})),r.a.createElement("div",{className:F.a.loginSubmitWrapper},r.a.createElement("button",{className:F.a.bottomButton,type:"submit"},"Sign In")))),r.a.createElement("p",{className:F.a.loginBottomText},"Don't have an account? ",r.a.createElement(o.b,{className:F.a.linkText,to:"/signup"},"Sign up here")))))}));var L,D=function(e){var t=e.apiKey;return r.a.createElement(i.c,{googleMapsApiKey:t,libraries:["places"]},r.a.createElement(o.a,null,r.a.createElement(c.d,null,r.a.createElement(c.b,{path:"/users"},r.a.createElement(E,null)),r.a.createElement(c.b,{path:"/login"},r.a.createElement(B,null)),r.a.createElement(c.b,{path:"/signup"},r.a.createElement(T,null)),r.a.createElement(m,{path:"/"},r.a.createElement("h1",null,"My Home Page")))))},q=a(25),W=a(73),K=Object(q.c)({users:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0,a=Object.assign({},e);switch(t.type){case"users/SIGNUP_USER":return a[t.user.id]=t.user,a;default:return e}}}),M=Object(q.c)({signUpForm:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:b,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ui/SIGN_UP_USER_INFO":return{userInfo:!0,map:!1};case"ui/SIGN_UP_DISPLAY_MAP":return{userInfo:!1,map:!0};default:return e}}}),G=Object(q.c)({session:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:y,t=arguments.length>1?arguments[1]:void 0,a=Object.assign({},e);switch(t.type){case N:return a.userId=t.userId,a;default:return e}},entities:K,ui:M,errors:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"errors/SET_ERRORS":return t.errors;case"errors/CLEAR_ERRORS":return[];default:return e}}});L=Object(q.a)(W.a);var H,X=Object(q.d)(G,H,L);var z=fetch("/api/session/map-api-token").then((function(e){return e.json()})).then((function(e){return z=e.api_key})).then((function(){return fetch("/api/session/csrf")})).then((function(){s.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(u.a,{store:X},r.a.createElement(D,{apiKey:z}))),document.getElementById("root"))}))},4:function(e,t,a){e.exports={signUpHeader:"AuthPages_signUpHeader__3zUu3",signUpheaderContainer:"AuthPages_signUpheaderContainer__2vkBQ",loginHeaderContainer:"AuthPages_loginHeaderContainer__38gzg",activeDisplayCircle:"AuthPages_activeDisplayCircle__2OFxy",inactiveDisplayCircle:"AuthPages_inactiveDisplayCircle__BCPQZ",signUpformContainer:"AuthPages_signUpformContainer__3Z04K",loginFormContainer:"AuthPages_loginFormContainer__2XdXp",bottomContainer:"AuthPages_bottomContainer__1OAKh",circleContainer:"AuthPages_circleContainer__2I0q9",contentContainer:"AuthPages_contentContainer__3RREg",userInfoOnscreen:"AuthPages_userInfoOnscreen__1VVTW",initialUserInfoOnscreen:"AuthPages_initialUserInfoOnscreen__YP1lh",mapOnscreen:"AuthPages_mapOnscreen__1O2BX",userInfoOffscreen:"AuthPages_userInfoOffscreen__3RnKO",mapOffscreen:"AuthPages_mapOffscreen__1LrFF",userInfoForm:"AuthPages_userInfoForm__2f_zC",bottomButton:"AuthPages_bottomButton__wTAkR",labels:"AuthPages_labels__2YgPp",loginText:"AuthPages_loginText__2k-zB",linkText:"AuthPages_linkText__1Dw9U",leftContainer:"AuthPages_leftContainer__hD1Md",authRight:"AuthPages_authRight__3EXx5",authErrors:"AuthPages_authErrors__2KAjB",loginForm:"AuthPages_loginForm__1WrME",loginFormWrapper:"AuthPages_loginFormWrapper__2vl7f",loginSubmitWrapper:"AuthPages_loginSubmitWrapper__283wN",loginBottomText:"AuthPages_loginBottomText__36Tyi",loginErrors:"AuthPages_loginErrors__Ox_Mi",loginErrorWrapper:"AuthPages_loginErrorWrapper__3mtNV"}},74:function(e,t,a){e.exports=a(147)},79:function(e,t,a){}},[[74,1,2]]]);
//# sourceMappingURL=main.218a32a8.chunk.js.map