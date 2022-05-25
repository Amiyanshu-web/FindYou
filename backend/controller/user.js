import People from '../models/people.js';

const peopleController = async (req, res) => {
    // const { name, age, image, identification } = req.body;
    console.log(req.body);
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
    // const people = new People({
    //     name: 'Sample Name',
    //     image: '/images/sample.jpg',
    //     age: 0,
    //     identification: 'Sample identificaiton',
    // })

    // const createdPeople = await people.save()
    // res.status(201).json(createdPeople)
}
// const updatepeopleController = async (req, res) => {
//     const people = await People.findById(req.params.id)
//     if (people) {

//         people.name = req.body.name
//         people.age = req.body.age
//         people.image = req.body.image
//         people.identification = req.body.identification
//         const updatePeople = await people.save()
//         res.json(updatePeople)
//     }
//     else {
//         res.status(404).json({ message: 'No people found' })
//     }
// }
export { peopleController };