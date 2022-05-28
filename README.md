# Microsoft Engage'22 Project
# FindYou

> Face Recognition web-application to find missing person built with the MERN stack & FaceApi.js.

![screenshot](https://res.cloudinary.com/dbvg8hyac/image/upload/v1653490950/Missing/Screenshot_324_gws18h.png)


### Built With

* [React.js](https://reactjs.org/)
* [Node.js](https://nodejs.org/en/)
* [Express.js](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [face-api.js](https://justadudewhohacks.github.io/face-api.js/docs/index.html)
* [Cloudinary](https://cloudinary.com/)

## Features

- Find and Report Missing
- Missing People search feature
- Search through Webcam/Image Uplaod
- Report missing through image and details 
- Random Facts about missing people
- Contact directly through email



## Usage

### Make sure you have NODE installed!
Make sure to have latest version of node installed.
Download the latest version of Node by [CLICKING HERE](https://nodejs.org/en/)

## Clone the Repo
Next, you will need to run the following command in the Terminal to clone the repo onto your machine.
```git clone https://github.com/Amiyanshu-web/FindYou.git```



### Env Variables

Create a .env file in the root and add the following

```
NODE_ENV = development
PROXY = 5000
MONGO_URI = your mongodb uri
```


### Install Dependencies (frontend & backend)

```
npm install
cd backend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run frontend only
npm start

# Run backend only
npm run server
```

### Testing Image

You can find images for testing purpose over here-
```bash
.
FindYou
    ├── ...
    ├── public
    │   ├── ...
    │   ├── images
    │   │   └── missing     #here you will find all testing images
    │   └── ...
    └── ...

