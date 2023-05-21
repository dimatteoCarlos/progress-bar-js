/****program js for progress bar step */
//step progress bar
//Icon data to show
const icon = [
  { i: 'fab fa-html5', c: '#ff5773' },
  { i: 'fab fa-css3-alt', c: '#264de4' },
  { i: 'fab fa-js', c: '#f7e018' },
  { i: 'fab fa-react', c: '#61dbfb' },
  { i: 'fab fa-node-js', c: '#8cc03e' },
];
/********DOM HANDLING******/
//DOM Elements Creation
const d = document;
const fragment = new DocumentFragment();
const h1 = d.createElement('h1');
h1.innerHTML = 'Step Progress Bar';

//progressContainer
const container = d.createElement('div');
container.classList.add('progressContainer');
const progress = d.createElement('div');
progress.classList.add('progress');

container.appendChild(progress);

//circles
for (let indx = 1; indx <= icon.length; indx++) {
  divCircle = d.createElement('div');
  divCircle.classList.add('circle');
  divCircle.innerHTML = indx;
  container.appendChild(divCircle);
}
//container
let div1 = d.createElement('div');
div1.classList.add('container');
div1.appendChild(h1);
div1.appendChild(container);

//Existent elements selection
const btnPrev = d.querySelector('#prev');
const btnNext = d.querySelector('#next');

//inserting the existent btns in div1 container
div1.appendChild(btnPrev);
div1.appendChild(btnNext);

//put everything in fragment and then append it to body
fragment.appendChild(div1);
d.body.appendChild(fragment);

//selecting dom elements and putting them into variables
const line = d.querySelector('.progress');
const circles = d.querySelectorAll('.circle');

//variables
const totalSteps = circles.length;
let currentStep = 0;
//objects
let param;

const act = { nextStep: 1, prevStep: -1, prev: 'prev', next: 'next' };

//functions
function updateProgress() {
  if (currentStep === 0) {
    btnPrev.disabled = true;
    btnNext.disabled = false;
  } else if (currentStep >= totalSteps) {
    btnPrev.disabled = false;
    btnNext.disabled = true;
  } else {
    btnPrev.disabled = false;
    btnNext.disabled = false;
  }

  circles.forEach((step, indx) => {
    if (indx < currentStep) {
      step.classList.add('active');
      step.innerHTML = `<i class='${icon[indx].i}'></i>`;
      step.style.borderColor = `${icon[indx].c}`;
      step.style.Color = `${icon[indx].c}`;
      // console.log(currentStep);
    } else {
      step.classList.remove('active');
      step.innerHTML = indx + 1;
      step.style.borderColor = '#c1c1c1';
    }
  });
  //progress line
  const passedSteps = document.querySelectorAll('.circle.active').length;
  const progress = ((passedSteps - 1) / (totalSteps - 1)) * 100;
  line.style.width = progress + '%';
  // console.log(progress);
}
/************************ */
const progressFn = (event) => {
  const id = event.target.id;

  if (id === act.next) {
    param = { step: 1, limit: totalSteps, compare: '>' };
  }

  if (id === act.prev) {
    param = { step: -1, limit: 0, compare: '<' };
  }

  currentStep += param.step;

  //Se desaconseja el uso de eval🤷🏻‍♂️
  //usage of eval is not recommended, though

  if (eval(`${currentStep} ${param.compare} ${param.limit}`)) {
    currentStep = param.limit;
  }

  updateProgress();
};

//listeners
btnPrev.addEventListener('click', progressFn);
btnNext.addEventListener('click', progressFn);
