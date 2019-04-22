// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase : {
   apiKey: "AIzaSyAfBS0pXwQtoIKEsKoxADhwr9Rp99nfEyo",
    authDomain: "crud-firestore-18f04.firebaseapp.com",
    databaseURL: "https://crud-firestore-18f04.firebaseio.com",
    projectId: "crud-firestore-18f04",
    storageBucket: "crud-firestore-18f04.appspot.com",
    messagingSenderId: "153758141859"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
