let arr: [string, string, number, number] = ['hi', 'cool', 5, 9];

const section = document.getElementsByTagName('section')[0];

const p = document.createElement('p');

p.textContent = `${arr.join(', ')}`;

section?.appendChild(p);
