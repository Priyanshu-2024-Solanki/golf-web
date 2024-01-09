var crsr = document.querySelector('#cursor');
var blur = document.querySelector('#cursor-blur');
document.addEventListener("mousemove" , function(dets){
    crsr.style.left = dets.x+"px";
    crsr.style.top = dets.y+"px";
    blur.style.left = dets.x-125+"px";
    blur.style.top = dets.y-125+"px";
})

var h4all = document.querySelectorAll('#nav h4');
h4all.forEach(function(elem){
    elem.addEventListener("mouseenter",function(){
        crsr.style.scale = 2;
        crsr.style.border = "1px solid #fff";
        crsr.style.backgroundColor = "transparent";
    })
    elem.addEventListener("mouseleave",function(){
        crsr.style.scale = 1;
        crsr.style.border = "0px solid #95C11E";
        crsr.style.backgroundColor = "#95C11E";
    })

})

gsap.to('#nav',{
    backgroundColor:"black",
    height:"80px",
    duration:0.5,
    scrollTrigger: {
        trigger:"#nav",
        scroller:"body",
        // markers:true,
        start:"top -10%",
        end:"top -11%",
        scrub:1,
    }
})

// i can do it , i will do it , nobody can stop me expect myself

gsap.to("#main",{
    backgroundColor:"#000",
    scrollTrigger:{
        trigger:"#main",
        scroller:"body",
        // markers:true,
        start:"top -25%",
        end:"top -80%",
        scrub:2
    }
})

gsap.from("#about-us img,#about-us-in",{
    y:70,
    opacity:0,
    duration:1,
    scrollTrigger:{
        trigger:"#about-us",
        scroller:"body",
        // markers:true,
        start:"top 65%",
        end:"top 55%",
        scrub:5,
    }
})

gsap.from(".card",{
    scale:0.8,
    opacity:0,
    duration:1,
    stagger: 0.1,
    scrollTrigger:{
        trigger:".card",
        scroller:"body",
        // markers:true,
        start:"top 70%",
        end:"top 60%",
        scrub:3,
    }
})
gsap.from("#colon1",{
    y:-70,
    x:-70,
    scrollTrigger:{
        trigger:"#colon1",
        scroller:"body",
        // markers:true,
        start:"top 60%",
        end:"top 50%",
        scrub:3,
    }
})
gsap.from("#colon2",{
    y:70,
    x:70,
    scrollTrigger:{
        trigger:"#colon2",
        scroller:"body",
        // markers:true,
        start:"top 85%",
        end:"top 80%",
        scrub:3,
    }
})
gsap.from('#page4 h1', {
    y:60,
    scrollTrigger:{
        trigger:"#page4 h1",
        scroller:"body",
        start:"top 85%",
        end:"top 80%",
        scrub:5,
    }
})
