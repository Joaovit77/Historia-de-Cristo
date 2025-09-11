function throttle(fn, wait){
    let isThrottled = false, args, context;

    return function(){
        if (isThrottled){
            args = arguments;
            context = this;
            return;
        }

        fn.apply(this, arguments);
        isThrottled = true;

        setTimeout(() => {
            isThrottled = false;
            if (args){
                fn.apply(context, args);
                args = context = null;
            }
        }, wait)

    }
}
function revelarScroll(){
    const elementos = document.querySelectorAll('.reveal');
    const alturaTela = window.innerHeight;
    elementos.forEach((el, index) => {
        const topo = el.getBoundingClientRect().top;
        

        if (topo < alturaTela * 0.8){
            el.style.transitionDelay = `${index * 0.1}s`;
            el.classList.add('active');
        } else{
            el.classList.remove('active');
        }
    });

}

const revelarScrollThrottle = throttle(revelarScroll, 200)

window.addEventListener('scroll', revelarScrollThrottle);
window.addEventListener('load', revelarScroll);