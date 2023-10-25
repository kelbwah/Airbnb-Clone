<div align="center">
  <h1 fontSize="24px">Full Stack Airbnb Clone</h1>
  <p>made by kelbwah</p>
</div>
<br/>
<div align="center">
  <b><p size="12">Tech stack: React, Redux, AWS, MongoDB, Node.js, Express.js, and TailwindCSS</p></b>
  <p>Deployed with Vercel: <a href="https://airbnb-clone-kelbwah.vercel.app/">Live Deployment on Vercel</a></p>
</div>
<br/>
<div>
  <p>This is a full stack Airbnb clone that mimics the front end UI design of the current Airbnb website. This implements the repsonsive design of their website with my own little twist!
  This lets users save their own state and stay logged in even after closing the tab, users can Airbnb their own home and filter out through different listings. It 
    also uses jsonwebtoken and bcrypt for basic user authentication and password encryption and decryption. Using AWS a user is actually able to upload their Airbnb listing photos and their own profile pictures as well.
  </p>
</div>

<br/>
<img width="1706" alt="Screenshot 2023-10-24 at 5 31 29 PM" src="https://github.com/kelbwah/Airbnb-Clone/assets/124933520/122256a3-60e3-4fe8-8d88-369b4e40db13">


<h2 align="center">How to run this on your own local machine</h2>
<br/>
<div>
  <ol>
    <li>Clone this repo into your own computer using "git clone https://github.com/kelbwah/Airbnb-Clone.git"</li>
    <li>Change directory (cd) into the client folder and run "npm i" then do "cd .." to go back to the root directory</li>
    <li>Change directory (cd) into the api folder and run "npm i"</li>
    <li>You will need to create your own .env file to be able to let API requests work and to add in photo upload functionality with AWS, 
    so first make sure that you have created your own free AWS File Storage Bucket and save the ACCESS_KEY, SECRET_ACCESS_KEY, and the BUCKET_NAME. 
    </li>
    <li>You will also need to create your own test MongoDB cluster so make a MongoDB cluster and make sure to keep note of your password and get the connection string. Once you
    have the connection string, we will use that inside the .env file as well.</li>
    <li>Also create a random secret key with a mix of numbers, special characters, and letters as a jsonwebtoken secret which will be set as JWT_SECRET in index.js </li>
    <li>Now, create a .env file in the api folder and setup the environment variables like this:</b></li>
    <img width="795" alt="Screenshot 2023-10-24 at 5 23 25 PM" src="https://github.com/kelbwah/Airbnb-Clone/assets/124933520/2190013a-a7d4-48af-adca-c8f9e402e9de">
    <li>Change the cors origin to "http://localhost:3001" in the index.js file</li>
    <li>In App.jsx which can be found in the 'client/src' folder, change the axios.defaults.baseURL to "http://localhost:3001/api" </li>
  </ol>
  <b><p>Happy coding and if you want to make any changes, make any pull requests and create your own branch so I can overlook the changes before deploying them to production!</p></b>
</div>

