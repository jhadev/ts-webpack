export interface Person {
  firstName: string;
  lastName?: string;
  position?: string;
  fullName?: string;
  cell?: string;
  email?: string;
  picture?: string;
}

export function createPerson(
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

export function filterPeople(people: Person[], value: string): Person[] | [] {
  return people.filter((person: Person) => person.firstName !== value);
}
