const $=document.querySelector.bind(document)
const $$=document.querySelectorAll.bind(document)

const btnSu=$('.showSu')
const btnWa=$('.showWa')
const btnDa=$('.showDa')
const main=$('main')
const toast=$('#toast')
function showToast(
  {
    title='',
    des='',
    type='',
    icon='',
    duration=0
  }
) {
  const subtoast=document.createElement('div')
  const timeDelay=(duration/3).toFixed(2)
   subtoast.classList.add('toast',`toast--${type}`)
   const idTimeOut=setTimeout(function(){
    toast.removeChild(subtoast)
  },duration+1000)
   subtoast.onclick=function(e){
   if( e.target.closest('.close-icon'))
   {
    toast.removeChild(subtoast)
    clearTimeout(idTimeOut)
   }
   }
   subtoast.style.animation=`slideInLeft linear .3s,fadeOut linear 1s ${timeDelay} forwards`
  subtoast.innerHTML=`
    <div class="sign-icon">
      <i class="fa-solid fa${icon}"></i>
    </div>
    <div class="body">
      <h2>${title}</h2>
      <p>${des}</p>
    </div>
    <div class="close-icon">
      <i class="fa-solid fa-xmark"></i>
    </div>
  `;
  toast.appendChild(subtoast)
 
}
btnSu.onclick=function(){
  return showToast(
    {
     title:'Success',
     des:"You have subsribed NhatErik",
     type:'success',
     icon:'-check',
     duration:3000
})
}
btnWa.onclick=function(){
  return showToast(
    {
     title:'Warning',
     des:"There is wrong",
     type:'warn',
     icon:'-exclamation',
     duration:3000
})
}
btnDa.onclick=function(){
  return showToast(
    {
     title:'Danger',
     des:"You have failed",
     type:'danger',
     icon:'-triangle-exclamation',
     duration:3000
})
}

