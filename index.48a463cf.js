!function(){var e=document.querySelector(".js-timer-items"),t=document.querySelector(".js-buttons__wrapper"),n=-(new Date).getTimezoneOffset()/60,r=null;function o(e){return String(e).padStart(2,0)}function s(e,t){return t[e%100>4&&e%100<20?2:[2,0,1,1,1,2][e%10<5?e%10:5]]}t.addEventListener("click",(function(t){var i=t.target.matches("button.js-show"),a=t.target.matches("button.js-hide");if(i)return c=e,r=setInterval((function(){var e=function(e){var t=(Math.floor(e/1e3/60/60)%24+n)%24,r=Math.floor(e/1e3/60)%60,o=Math.floor(e/1e3)%60;return{hours:t,minutes:r,seconds:o}}(Date.now()),t=e.hours,r=e.minutes,i=e.seconds,a=t>=12?"PM":"AM";c.querySelector(".js-timer__hours").textContent=o(t),c.querySelector(".js-timer__minutes").textContent=o(r),c.querySelector(".js-timer__seconds").textContent=o(i),c.querySelector(".js-timer__timezone").textContent=a,c.querySelector(".js-timer__hours").dataset.title=s(t,["година","години","годин"]),c.querySelector(".js-timer__minutes").dataset.title=s(r,["хвилина","хвилини","хвилин"]),c.querySelector(".js-timer__seconds").dataset.title=s(i,["секунда","секунди","секунд"])}),1e3),void setTimeout((function(){document.querySelector(".timer").classList.remove("is-hidden"),document.querySelector(".js-show").classList.add("is-hidden"),document.querySelector(".js-hide").classList.remove("is-hidden"),document.querySelector(".js-change").classList.remove("is-hidden")}),1e3);var c;if(a)return clearInterval(r),void setTimeout((function(){document.querySelector(".timer").classList.add("is-hidden"),document.querySelector(".js-show").classList.remove("is-hidden"),document.querySelector(".js-hide").classList.add("is-hidden"),document.querySelector(".js-change").classList.add("is-hidden")}),1e3);var d=document.querySelector(".js-change").textContent.trim();setTimeout((function(){e.querySelector(".js-timer__timezone").classList.toggle("is-hidden"),document.querySelector(".js-change").textContent="Прибрати PM/AM"===d?"Показати PM/AM":"Прибрати PM/AM"}),1e3)}));var i={save:function(e,t){try{var n=JSON.stringify(t);localStorage.setItem(e,n)}catch(e){console.error("Set state error: ",e.message)}},load:function(e){try{var t=localStorage.getItem(e);return null===t?void 0:JSON.parse(t)}catch(e){console.error("Get state error: ",e.message)}},remove:function(e){try{localStorage.removeItem(e)}catch(e){console.log("Remove item error: ",e.message)}}},a=document.querySelector("form"),c=document.querySelector("ul"),d="todo-items",u=i.load(d)||[];function l(){var e=u.map((function(e){return'\n      <li>\n      <span class="text'.concat(e.done?" done":"",'">').concat(e.text,'</span>\n      <div>\n        <button type="button" data-id="').concat(e.id,'" class="delete">Видалити</button>\n        <button type="button" data-id="').concat(e.id,'" class="done">').concat(e.done?"Виконано!":"Не виконано","</button>\n      </div>\n      </li>\n    ")})).join("");c.innerHTML=e;var t=!0,n=!1,r=void 0;try{for(var o,s=u[Symbol.iterator]();!(t=(o=s.next()).done);t=!0){var i=o.value;if(i.done)document.querySelector('[data-id="'.concat(i.id,'"].done')).classList.add("сompleted")}}catch(e){n=!0,r=e}finally{try{t||null==s.return||s.return()}finally{if(n)throw r}}}a.addEventListener("submit",(function(e){e.preventDefault();var t=e.currentTarget.elements["user-todos"],n=t.value.trim();if(""!=n){if(u.find((function(e){return e.text===n})))return void alert("Така задача вже існує")}var r={id:Date.now(),text:n,done:!1};u.push(r),t.value="",console.log(t),i.save(d,u),l()})),c.addEventListener("click",(function(e){var t=e.target.matches("button.delete"),n=e.target.classList.contains("done");if(t){var r=parseInt(e.target.dataset.id);u=u.filter((function(e){return e.id!==r})),i.save(d,u),l()}if(n){var o=parseInt(e.target.dataset.id),s=u.find((function(e){return e.id===o}));if(s){var a=e.target;s.done=!s.done,a.classList.toggle("сompleted"),a.innerText=s.done?"Виконано!":"Не виконано",a.parentElement.previousElementSibling.classList.toggle("done"),i.save(d,u)}}})),l()}();
//# sourceMappingURL=index.48a463cf.js.map