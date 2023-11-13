import mongoose from "mongoose";

export async function connect() {

    // Nous essayons d'etablie une connexion avec la base de donnée

    try {

        //Connexion de la base de donnée MONGODB
        mongoose.connect(process.env.MONGODB_URI!)

        //Creation d'une Constante "connexion"
        const connection = mongoose.connection

        //Nous verifions si la connexion est faites, si oui, log(Connexion etablie)

        connection.on('connected', () => {
            console.log('MongoDB connected successfully')
        })

        //Nous verifions si la connexion est faites, si non, log(erreur de connexion)
        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please maje sure MongoDB is running.', +err)
            process.exit()
        })

    } catch (error) {
        console.log('something goes wrong')
        console.log(error)
    }
}