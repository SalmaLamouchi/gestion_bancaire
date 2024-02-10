const Client=require('../models/client');
const bcrypt=require('bcryptjs');

exports.createClient= async (req, res) => {
    try {
      const { nom, prenom, email, motDePasse } = req.body;
  
      // Check if the email is already registered
      const emailExists = await Client.findOne({ email });
      if (emailExists) {
        res.status(400).send({ error: 'Email already exists' });
      } else {
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(motDePasse, salt);
  
        // Create a new student
        const client = new Client({
          nom,
          prenom,
          email,
          motDePasse: hashedPassword,
          estValide: true,
        });
  
        // Save the new student
        const savedClient = await client.save();
        res.send(savedClient);
      }
    } catch (err) {
      res.status(400).send(err);
    }
  };

// getALLClient
exports.getAllClients = async (req, res) => {
    try {
      // Get all the valid students
      const clients = await Client.find({ estValide: true });
      res.send(clients);
    } catch (err) {
      res.status(400).send(err);
    }
  };


//getClientById

exports.getClientById=async(req,res)=>{
    try{
        const client=await Client.findById(req.params.id);
        if(!client){
            return res.status(404).json({ success: false, message: 'Client not found' });
        }
        res.status(200).json({ success: true, data: client });
    }catch(error){
        res.status(400).json({ success: false, message: 'Failed to fetch client', error: error.message });
    }
}

//update client
exports.updateClient= async (req, res) => {
  try {
    const { nom, prenom, email, motDePasse, estValide, estSuspendu } = req.body;

    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Student not found' });
    }

    if (email !== client.email) {
      // Check if the email is already registered
      const emailExists = await Client.findOne({ email });
      if (emailExists) {
        return res.status(400).send({ error: 'Email already exists' });
      }
    }

    client.nom = nom || client.nom;
    client.prenom = prenom || client.prenom;
    client.email = email || client.email;
    client.motDePasse = motDePasse || client.motDePasse;
    client.estValide = estValide || client.estValide;
    client.estSuspendu = estSuspendu || client.estSuspendu;
    
    const updatedClient = await client.save();
    res.send(updatedClient);
  } catch (err) {
    res.status(400).send(err);
  }
};

//delete client
exports.deleteClient=async(req,res)=>{
    try{
    const client=await Client.findByIdAndDelete(req.params.id)
    if (!client) {
        return res.status(404).json({ success: false, message: 'Client not found' });
    }
    res.status(200).json({ success: true, message: 'Client deleted successfully' });
    }catch(error){
        res.status(500).json({ success: false, message: 'Failed to delete client', error: error.message });
    }
}
// GET request to get students with estValide set to false
exports.getNonValidClients= async (req, res) => {
    try {
      // Get all the invalid students
      const clients = await Client.find({ estValide: false });
      res.send(clients);
    } catch (err) {
      res.status(400).send(err);
    }
  };

  exports.toggleSuspendAccount = async (req, res) => {
    try {
      const client = await Client.findById(req.params.id);
      if (!client) {
        return res.status(404).json({ message: 'client non trouvé' });
      }
  
      client.estSuspendu = !client.estSuspendu;
      await client.save();
  
      return res.json(client);
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ message: 'Erreur du serveur' });
    }
  };