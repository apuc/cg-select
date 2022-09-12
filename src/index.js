const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(drop => {
    const select = drop.querySelector('.select');
    const caret = drop.querySelector('.caret');
    const list = drop.querySelector('.list');
    const options = drop.querySelectorAll('.list__item')
    const selected = drop.querySelector('.selected')

    select.addEventListener('click', () => {
        caret.classList.toggle('caret-rotate');
        list.classList.toggle('open');
    });

    options.forEach(option => {
        option.addEventListener('click', () =>{
            selected.innerText = option.innerText;
            caret.classList.remove('caret-rotate'); 
            list.classList.remove('open');
            
            options.forEach(option =>{
                option.classList.remove('active');
            })
            option.classList.add('active');
        })
    })
}) 