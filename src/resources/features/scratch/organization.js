export class Organization {
  constructor() {
    this.org = {
      name: 'Warden.io',
      description: 'I sense a soul in search of answers',
      status: 'green',
      wardens: [
        {
          name: 'Spetz-PC 001',
          watchers: 12,
        },
        {
          name: 'Database monitor',
          watchers: 7,
        },
        {
          name: 'Server load monitor',
          watchers: 1,
        }
      ],
      users: [
        {
          name: 'Piotr Gankiewicz',
          status: 0
        },
        {
          name: 'Mariusz Pruszyński',
          status: 1
        },
        {
          name: 'Adrian Kremski',
          status: 1
        },
        {
          name: 'Maciej Zając',
          status: 1
        },
        {
          name: 'Bobik Chrupek',
          status: 1
        },
        {
          name: 'Donki Kong',
          status: 1
        },
        {
          name: 'Człowiek Szafa',
          status: 1
        },
        {
          name: 'Drzwi do lasu',
          status: 1
        }
      ]
    }
  }
}
