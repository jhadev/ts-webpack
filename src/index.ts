const section = document.getElementsByTagName('section')[0];

async function getPeople(url: string) {
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}

interface Person {
  firstName: string;
  lastName?: string;
  position?: string;
  fullName?: string;
}

function createPerson(
  person: Person
): {
  firstName: string;
  lastName?: string;
  fullName?: string;
  position?: string;
} {
  if (person.lastName) {
    person.fullName = `${person.firstName} ${person.lastName}`;
  }

  return person;
}

const me: Person = createPerson({
  firstName: 'Josh',
  lastName: 'A',
  position: 'Developer',
});

const somebody: Person = createPerson({
  firstName: 'Some',
  lastName: 'Body',
});

function filterPeople(people: Person[], value: string): Person[] | [] {
  return people.filter((person: Person) => person.firstName !== value);
}

let filtered: Person[] = filterPeople([me, somebody], 'Some');

function print(arr: any[]): void {
  arr.forEach((item) => {
    const wrapper = document.createElement('div');
    section?.appendChild(wrapper);

    const ul = document.createElement('ul');

    for (let [key, value] of Object.entries(item)) {
      if (typeof value === 'object') {
        value = JSON.stringify(value);
      }
      const li = document.createElement('li');
      li.innerHTML = `${key}: ${value}`;
      ul?.appendChild(li);
    }

    wrapper?.appendChild(ul);
  });
}

getPeople('https://randomuser.me/api/?results=50&nat=us').then((users) => {
  console.log(users);
  print(users);
});

print(filtered);
