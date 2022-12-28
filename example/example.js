const firstBtn = document.getElementById('first');
const codeFirst = document.getElementById('codeFirst');

const secondBtn = document.getElementById('second');
const codeSecond = document.getElementById('codeSecond');

const thirdBtn = document.getElementById('third');
const codeThird = document.getElementById('codeThird');

const fourthBtn = document.getElementById('fourth');
const codeFourth = document.getElementById('codeFourth');

const fifthBtn = document.getElementById('fifth');
const codeFifth = document.getElementById('codeFifth');

const six = document.getElementById('six')
const codeSix = document.getElementById('codeSix');


const Native = document.getElementById('Native')
const codeNative = document.getElementById('codeNative')


firstBtn.addEventListener('click', () => {
    codeFirst.classList.toggle("active")
})

secondBtn.addEventListener('click', () => {
    codeSecond.classList.toggle("active")
})

thirdBtn.addEventListener('click', () => {
    codeThird.classList.toggle("active")
})

fourthBtn.addEventListener('click', () => {
    codeFourth.classList.toggle("active")
})

fifthBtn.addEventListener('click', () => {
    codeFifth.classList.toggle("active")
})

six.addEventListener('click', () => {
    codeSix.classList.toggle("active")
})

Native.addEventListener('click', () => {
    codeNative.classList.toggle("active")
})