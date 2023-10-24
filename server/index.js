const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const User = require("./models/User");
const RentingList = require('./models/RentingList');
const multer = require("multer");
const path = require("path");
const multerS3 = require('multer-s3')
const { S3Client } = require("@aws-sdk/client-s3"); 
const fakeRentingData = require('./fake_data/fake_renting_lists_data.js');
const fakeUserData = require('./fake_data/fake_user_data.js');


dotenv.config();

const app = express();
const jwtSecret = process.env.JWT_SECRET;
const S3AccessKey = process.env.S3_ACCESS_KEY;
const S3SecretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
const S3BucketName = process.env.S3_BUCKET_NAME;
const bcryptSalt = bcrypt.genSaltSync(10);
const s3 = new S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId: S3AccessKey,
        secretAccessKey: S3SecretAccessKey,
    },
});

app.use(cors({
    credentials: true,
    origin: "*",
}));
app.use(express.json());
app.use(cookieParser());

var profilePath;

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: S3BucketName,
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            const fileName = Date.now().toString() + '-' + file.originalname;
            profilePath=`https://${S3BucketName}.s3.amazonaws.com/${fileName}`;
            cb(null, fileName);
        }
    })
});

app.get("/api/logout", async (req, res, next) => {
    try{
        let date = new Date();
        date.setDate(date.getDate() - 1);
        res.cookie("token", 'none', {expires: date}).status(200).json("log out successful");
    } catch (err) {
        res.status(500).json("Error logging out.");
    }
}) 

app.get("/api/rentinglists", async (req, res) => {
    try{
        const allRentingLists = await RentingList.find();
        res.status(200).json(allRentingLists);
    } catch (err) {
        res.status(500).json("Something went wrong! Try again later.");
    }
})

app.get('/api/:userId/ishost', async (req, res) => {
    try{
        let userId = req.params.userId;
        RentingList.findOne({host: userId}).then((rentingList) => {
            if (rentingList) {
                res.status(200).json([true, rentingList._id]);
            } else {
                res.status(200).json([false, '']);
            }
        });
    } catch (err){
        res.status(500).json(err);
    }
})

app.get("/api/rentinglist/:id", async(req, res) => {
    try{
        const id = req.params.id;
        const rentingList = await RentingList.findById(id);
        console.log(rentingList);
        if (rentingList) {
            res.status(200).json(rentingList);
        } else {
            res.status(500).json("Couldn't find renting list!");
        }
        
    } catch(err){
        res.status(500).json("Erorr, renting list not found");
    }
})

app.get("/api/user/:userId", async(req, res) => {
    try{
        
        const id = req.params.userId;
        const user = await User.findById(id);
        const userResponse = {
            _id: user._id,
            picturePath: user.picturePath,
            firstName: user.firstName,
            lastName: user.lastName,
            likedListings: user.likedListings,
            reservations: user.reservations,
        }
        res.status(200).json(userResponse);

    } catch (err){
        res.status(500).json("Error, user not found");
    }
})

app.get('/api/user/wishlists/:userId', async (req, res) => {
    try{
        const userId = req.params.userId;
        const foundUser = await User.findById(userId);

        if (foundUser) {
            res.status(200).json(foundUser.likedListings);
        } else {
            res.status(500).json('User not found!');
        }

    } catch(err){
        res.status(500).json("Something went wrong, try again later.");
    }
})

app.put('/api/cancelreservation/:rentingListId/:userId', async (req, res) => {
    try{
        const userId = req.params.userId;
        const rentingListId = req.params.rentingListId;

        await RentingList.findByIdAndUpdate({_id: rentingListId}, {$set: {'renter': null}}, {new: true});

        await User.findByIdAndUpdate(
            {_id: userId},
            {$pull: {reservations: rentingListId}},
            {new: true}
        );


        res.status(200).json("Successfully cancelled reservation");

    } catch (err) {
        console.log(err);
        res.status(500).json("Something went wrong, try again later.");
    }
})


app.put('/api/wishlist/addOrRemove/:userId/:rentingListId', async(req, res) => {
    try{
        const userId = req.params.userId;
        const rentingListId = req.params.rentingListId;

        const foundUser = await User.findById(userId);

        if (foundUser.likedListings.includes(rentingListId)){
            await User.findByIdAndUpdate({_id: userId}, {$pull:{likedListings:rentingListId}}, {new: true});
            res.status(200).json("Successfully removed listing from wishlist");
        } else {
            await User.findByIdAndUpdate({_id:userId}, {$push:{likedListings:rentingListId}}, {new: true});
            res.status(200).json("Successfully added listing to wishlist");
        }
    } catch(err){
        res.status(500).json("Something went wrong, try again later.");
    }
});


app.put('/api/reserve/:rentingListId/:userId', async(req, res) => {
    try{
        const userId = req.params.userId;
        const reservationId = req.params.rentingListId;
        const reservationInfo = req.body;


        if (reservationInfo.checkOut === '' || reservationInfo.checkIn === ''){   
            return res.status(500).json("Error, must have valid dates");
        }

        const currentReservationData = await RentingList.findById(reservationId);

        if (currentReservationData.renter !== null && currentReservationData.renter.renterId === userId){
            return res.status(500).json("Reservation already made!");
        }

        const updatedReservationData = await RentingList.findByIdAndUpdate(reservationId, {renter: {renterId:new mongoose.Types.ObjectId(userId), checkIn:reservationInfo.checkIn, checkOut:reservationInfo.checkOut, numGuests:reservationInfo.numGuests}}, {new: true});
        const updatedUserData = await User.findByIdAndUpdate(userId, {$push: {reservations: reservationId}}, {new: true});


        if (updatedUserData && updatedReservationData) {
            res.status(200).json('Successful reservation made!');
        } else {
            res.status(500).json("Something went wrong. Try again later.");
        }
    } catch (err){
        res.status(500).json("Something went wrong. Try again later.");
    }
});

app.post("/api/airbnbyourhome", upload.none(), async (req, res) => {
    try{
        setTimeout(() => {
            const {host, photos, title, startDate, endDate, priceBeforeTax, priceAfterTax, description, type, numGuests, numBedrooms, numBaths, numBeds, country} = req.body;
            RentingList.create({
                host: host,
                photos: photos.split(','),
                title: title,
                startDate: startDate,
                endDate: endDate,
                numGuests: numGuests,
                numBeds: numBeds,
                numBedrooms: numBedrooms,
                numBaths: numBaths,
                reviews: [],
                country: country,
                priceBeforeTax: priceBeforeTax,
                priceAfterTax: priceAfterTax,
                stars: 6.9,
                renter: null,
                description: description,
                homeType: type,
            });
            res.status(200).json('Congrats! Renting list created!');
        }, 3500)
        
        
        
    } catch (err) {
        res.status(500).json("Something went wrong, try again later!");
    }
});

app.post('/api/photo/upload', upload.single('photo'), async (req, res) => {
    try{   
        res.status(200).json(profilePath);
    } catch (err) {
        res.status(500).json("Something went wrong while uploading your photo.");
    }
})

app.post("/api/register", upload.single("picture"), async (req, res, next) => {
    const {email, password, firstName, lastName} = req.body;
    try{
        const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
        const createdUser = await User.create({
            email: email, 
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName,
            picturePath: profilePath,
        });


        jsonwebtoken.sign({userId:createdUser._id, email}, jwtSecret, {}, (err, token) => {
            if (err) {
                return res.status(500).json({error: "Something went wrong. Try again later."})
            } 
            res.cookie("token", token, {sameSite: "none", secure: true}).status(201).json({
                user: createdUser,
                token: token,
            });
        })
    } catch(err){
        res.status(500).json("User with that email already exists.");
        console.log("user already exists.");
    }
});

app.post('/api/login', async (req, res) => {
    
    try{
        const {email, password} = req.body;
        const foundUser = await User.findOne({email: email});
        if (foundUser) {
            const passOk = bcrypt.compareSync(password, foundUser.password);
            if (passOk) {
                jsonwebtoken.sign({userId:foundUser._id, email}, jwtSecret, {}, (err, token) => {
                    if (err) throw err;
                    res.cookie("token", token, {sameSite: "none", secure: true}).json({
                        user: foundUser,
                        token: token,
                    });
                });
            }
        } else{
            res.status(500).json("Incorrect email or password. Try again");
            console.log("Invalid Credentials");
        }

    } catch (err){
        res.status(500).json("Incorrect email or password. Try again");
        console.log("Invalid Credentials");
    }
   
});


const PORT = 3001;

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
}).catch((err) => {
    console.log(`${err} did not connect`);
});


