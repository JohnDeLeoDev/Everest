//test data for building GUI

export const test_stores = [
  {
    name : 'myStore',
    description: 'myStore is yourStore',
    logo: null,
    owner: {
        'firstName':'Alana', 
        'lastName':'Turing',
        'email':'singularityNow@me.com',
        'address': {
            'street': '357 Pacific Hwy',
            'apt': null,
            'city': 'Encinitas',
            'zip': '90111',
            'state': 'CA',
            'country': 'USA'
        }
     },
    storeID: '1234',
    location: {
        lat : '45',
        long: '45'
    },
    storeBalance: '45,004.66'

  },

  {
  name : 'thyStore',
    description: 'thyStore is myStore',
    logo: null,
    owner: {
        'firstName':'Adam', 
        'lastName':'Toxicavenger',
        'email':'slimequeen@hotmail.com',
        'address': {
            'street': '333 Fake Street',
            'apt': null,
            'city': 'Shelbyville',
            'zip': '12345',
            'state': 'WV',
            'country': 'USA'
        }
     },
    storeID: '4321',
    location: {
        lat : '25',
        long: '15'
    },
    storeBalance: '99,999.66'

  },

  {
    name : "Sandy's Stolen Goods",
    description: 'smashing deals on hot goods',
    logo: null,
    owner: {
        'firstName':'Sandy', 
        'lastName':'Steel',
        'email':'crimespree@gmail.com',
        'address': {
            'street': '0 Trout Rd',
            'apt': '44',
            'city': 'Fort Worth',
            'zip': '33889',
            'state': 'TX',
            'country': 'USA'
        }
     },
    storeID: '0004',
    location: {
        lat : '40',
        long: '15'
    },
    storeBalance: '230,450.00'

  }
]

/*
Store
~name: String
~description: String [0..1]
~logo: Image [0..1]
~owner: StoreOwner
~computers:Computer[0..*]
~storeID: int
~location:Location
~storeBalance: float

StoreOwner
~ownerFirstName: String
~ownerLastName: String
~email: String
~address: Address
~login: Login

Address
~street: String
~apt: String [0..1]
~city: String
~zip: String
~state: String
~country: String


*/