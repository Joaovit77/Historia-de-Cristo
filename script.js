function atualizarRelogio(){
    const agora = new Date();
    let horas = agora.getHours();
    let minutos = agora.getMinutes();
    let segundos = agora.getSeconds(); 

    horas = horas < 10 ? '0' + horas : horas;
    minutos = minutos < 10 ? '0' + minutos : minutos;
    segundos = segundos < 10 ? '0' + segundos : segundos;


    const dia =  agora.getDate() < 10 ? '0' + agora.getDate() : agora.getDate();
    let mes = agora.getMonth() + 1;
    mes = mes < 10 ? '0' + mes : mes;
    const ano = agora.getFullYear();


    const horaFormatada = `${horas}:${minutos}:${segundos}`;
    const dataFormatada = `${dia}/${mes}/${ano}`;

    


    document.getElementById('hora').textContent = horaFormatada;
    document.getElementById('data').textContent = dataFormatada
}

setInterval(atualizarRelogio, 1000)
atualizarRelogio()





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