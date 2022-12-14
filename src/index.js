import './styles.css';
import { faker } from '@faker-js/faker/locale/pl';

let venueArray = [];
let venueDetailsArray = [];
let usedIdsArray = [];
let generatedLocalizations = [];
let addressesCache = [];

//faker unique
function generateUniqueId() {
  let randomNumber = faker.datatype.number({ min: 1000, max: 99999 });
  while (usedIdsArray.includes(randomNumber)) {
    randomNumber = faker.datatype.number({ min: 1000, max: 99999 });
  }
  usedIdsArray.push(randomNumber);
  return randomNumber;
}

function generateRandomFeatures() {
  const featuresArray = [];
  const amountOfFeatures = faker.datatype.number({ min: 5, max: 9 });
  for (let i = 0; i <= amountOfFeatures; i++) {
    featuresArray.push(faker.lorem.word());
  }
  return featuresArray;
}

function generateFakeVenuesData(numberOfVenuesToGenerate) {
  for (let i = 1; i <= numberOfVenuesToGenerate; i++) {
    const newVenue = {
      id: i,
      location: {
        postalCode: faker.address.zipCode(),
        name: faker.address.cityName(),
      },
      pricePerNightInEur: faker.datatype.number({
        min: 10,
        max: 35,
        precision: 0.01,
      }),
      rating: faker.datatype.number({ min: 1, max: 5, precision: 0.1 }),
      capacity: faker.datatype.number({ min: 1, max: 8 }),
      name: faker.internet.domainWord(),
      albumId: i,
      landingImgUrl: faker.image.city(600, 600, true),
    };
    const newVenueDetails = {
      id: generateUniqueId(),
      venueId: newVenue.id,
      location: {
        postalCode: newVenue.location.postalCode,
        name: newVenue.location.name,
      },
      pricePerNightInEur: newVenue.pricePerNightInEur,
      rating: newVenue.rating,
      capacity: newVenue.capacity,
      name: newVenue.name,
      albumId: newVenue.albumId,
      description: faker.lorem.paragraph(3),
      features: generateRandomFeatures(),
      sleepingDetails: {
        maxCapacity: faker.datatype.number({ min: 3, max: 8 }),
        amountOfBeds: faker.datatype.number({ min: 1, max: 6 }),
      },
      checkInHour: '4pm',
      checkOutHour: '10am',
      distanceFromCityCenterInKM: faker.datatype.number({ min: 1, max: 15 }),
      contactDetails: {
        phone: faker.phone.number(),
        email: faker.internet.email(),
      },
      landingImgUrl: newVenue.landingImgUrl,
      venueDescriptionImgUrls: {
        1: faker.image.nature(600, 600, true),
        2: faker.image.nature(600, 600, true),
        3: faker.image.nature(600, 600, true),
        4: faker.image.nature(600, 600, true),
        5: faker.image.nature(600, 600, true),
        6: faker.image.nature(600, 600, true),
        7: faker.image.nature(600, 600, true),
      },
    };
    let addressToGenerate = faker.address.city();
    while (addressesCache.includes(addressToGenerate)) {
      addressToGenerate = faker.address.city();
    }
    generatedLocalizations.push({
      label: faker.address.city(),
    });
    addressesCache.push(addressToGenerate);

    venueArray.push(newVenue);
    venueDetailsArray.push(newVenueDetails);
  }
}

generateFakeVenuesData(100);

function createVenuesDetailsListWithPairedVenueId(venuesDetails) {
  let venueDetailsAndHisVenueId = {};
  venuesDetails.forEach((venue) => {
    venueDetailsAndHisVenueId[Number(venue.venueId)] = venue;
  });
  return venueDetailsAndHisVenueId;
}

const venuesDetailsAndHisVenueId =
  createVenuesDetailsListWithPairedVenueId(venueDetailsArray);

const dataToPost = {
  venues: venueArray,
  venuesDetails: venuesDetailsAndHisVenueId,
  localizationOptions: generatedLocalizations,
};

console.log(JSON.stringify(dataToPost));
