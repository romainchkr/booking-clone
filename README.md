
# Fullstack Booking.com clone

This project aim to create a fullstack clone of the booking.com using the following technos :

 - **React native** with Expo
 - **Typescript**
 - **Redux** for state management
 - **Firebase** as backend
 - **Clean Architecture** as system architecture

## Try the app

You can easily test the application on your phone without getting the source code.

&nbsp; 1. Install the [Expo Go](https://expo.dev/client) application on your phone \
&nbsp; 2. Scan the following QR code corresponding to your platform: 

Android  | IOS
-------- | ---------
![picture alt](http://via.placeholder.com/200x150 "android expo qrcode")  | ![picture alt](http://via.placeholder.com/200x150 "ios expo qrcode")

**(Soon available)**

## Installation

### Configuration

The app is using firebase as backend. In order for most of the functionnalities to work you need to create a firebase web project and set the following variables in a **.env** file at the root of the project :

EXPO_PUBLIC_FIREBASE_APIKEY \
EXPO_PUBLIC_FIREBASE_AUTHDOMAIN \
EXPO_PUBLIC_FIREBASE_PROJECTID \
EXPO_PUBLIC_FIREBASE_STORAGEBUCKET \
EXPO_PUBLIC_FIREBASE_MESSAGINGSENDERID \
EXPO_PUBLIC_FIREBASE_APPID

### Run
The app is using expo so it's easy to install. Just clone the repository and execute the commands:

```bash
  npm install
  npm run start
```

## Clean Architecture

This project is based on [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html), emphasizing modularity and adaptability. It's designed to simplify updates, especially when dealing with external data sources like Firebase. 

Clean Architecture enables efficient scaling by providing the flexibility to switch backends as needed. This separation of concerns ensures your code remains maintainable, adaptable, and cost-effective as your project grows.


### Project Directory Structure

Following the Clean Architecture approach, this is the directory structure:

&nbsp; 1. **Domain**: Contains the core business logic and entities.\
&nbsp; 2. **Application**: Manages the use cases, business rules, and interacts with the domain layer throught the redux state.\
&nbsp; 3. **Presentation**: Handles the user interface and interaction with the application layer.\
&nbsp; 4. **Infrastructure**: Deals with external dependencies such as Firebase and data storage.

Here's a simplified directory structure to illustrate the organization:
```bash
src/
├───application/                   <!-- Application layer -->
|   └───state/                     <!-- State with Redux -->
│       └───slices/
├───constants/
├───domain/                        <!-- Domain layer -->
│   ├───entities/
│   ├───repositories/
│   └───useCases/
├───infrastructure/                <!-- Infrastructure layer -->
│   ├───dto/
│   ├───mappers/
│   └───repositories/
├───presentation/                  <!-- Presentation layer -->
│   ├───components/
│   └───screens/
└───shared/                        <!-- Shared resources -->
```

:warning: **Note**: Due to the use of Expo router, all screens of the app are located in the `./app` folder instead of the `./src/presentation/screens` directory. Please keep this in mind when navigating the codebase.