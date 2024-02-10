const Client=require('../models/client');
const bcrypt=require('bcryptjs');

exports.createClient=async(req,res)=>{
try{
    const client=new Client(req.body);
    await client.save();
    res.status(201).json({ success: true, message: 'Client created successfully', data: client });

}catch(error){
    res.status(400).json({message:error.message});
}
}

// getALLClient
exports.getAllClient=async(req,res)=>{
    try{
        const clients=await Client.find();
        res.status(200).json({ success: true, count: clients.length, data: clients });
    }catch(error){
        res.status(500).json({ success: false, message: 'Failed to fetch clients', error: error.message });
    }
}

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
exports.updateClient=async(req,res)=>{
    try{
        const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!client) {
            return res.status(404).json({ success: false, message: 'Client not found' });
        }
        res.status(200).json({ success: true, message: 'Client updated successfully', data: client });
    }catch(error){
        res.status(500).json({ success: false, message: 'Failed to update client', error: error.message });
    }
}

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
