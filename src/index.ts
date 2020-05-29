import { Person, createPerson, filterPeople } from './helpers';
import { lazyLoad } from './observer';
import './style.scss';

const section = document.getElementsByTagName('section')[0];

const me: Person = createPerson({
  firstName: 'Josh',
  lastName: 'A',
  position: 'Developer',
  picture: 'https://www.fillmurray.com/g/400/400',
});

const somebody: Person = createPerson({
  firstName: 'Some',
  lastName: 'Body',
});

let filtered: Person[] = filterPeople([me, somebody], 'Some');

async function getPeople(url: string): Promise<any> {
  try {
    const response = await fetch(url);
    const { results } = await response.json();
    return results;
  } catch (err) {
    console.log(err);
  }
}

function print(arr: any[]): void {
  arr.forEach((item) => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    section?.appendChild(wrapper);

    const ul = document.createElement('ul');

    if ('picture' in item) {
      let img = new Image() as HTMLImageElement;
      img.classList.add('photo');
      img.setAttribute('data-src', item.picture);
      ul?.appendChild(img);
    }

    for (let [key, value] of Object.entries(item)) {
      if (key !== 'picture') {
        const li = document.createElement('li');
        li.innerHTML = `${key}: ${value}`;
        ul?.appendChild(li);
      }
    }

    wrapper?.appendChild(ul);
  });
}

function mapPeople(arr: any[]): Person[] {
  return arr.map((person) => {
    return {
      firstName: person.name.first,
      lastName: person.name.last,
      cell: person.cell,
      email: person.email,
      picture: person.picture.large,
    };
  });
}

getPeople('https://randomuser.me/api/?results=50&nat=us').then((users) => {
  console.log(users);
  users = mapPeople(users);
  print(users);
  const observer = lazyLoad();

  const photos = document.querySelectorAll('[data-src]');

  photos.forEach((photo) => {
    observer.observe(photo);
  });
});

print(filtered);
