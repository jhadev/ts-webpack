const section = document.getElementsByTagName('section')[0];

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

function print(arr: any[]) {
  arr.forEach((item) => {
    const wrapper = document.createElement('div');
    section?.appendChild(wrapper);

    const ul = document.createElement('ul');

    for (let [key, value] of Object.entries(item)) {
      const li = document.createElement('li');
      li.innerHTML = `${key}: ${value}`;
      ul?.appendChild(li);
    }

    wrapper?.appendChild(ul);
  });
}

print(filtered);
