import People from '../models/people.js';


// @desc    Create a missing Person 
// @route   POST /api/vi/people/missing
// @access  Public
const peopleController = async (req, res) => {
    // const { name, age, image, identification } = req.body;
    // console.log(req.body);
    const name = req.body.name;
    const age = req.body.age;
    const image = req.body.image;
    const identification = req.body.identification;
    const user = await People.create({ name, age, image, identification });
    if (user) {
        res.status(201).json({
            status: 'success',
            name: user.name,
            age: user.age,
            image: user.image,
            identification: user.identification
        })
    }
    else {
        res.status(401).json({ message: "Invalid data" })
    }

}

export { peopleController };