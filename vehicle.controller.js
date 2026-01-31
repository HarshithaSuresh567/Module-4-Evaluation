import { supabase } from "../config/supabase.js";

export const addVehicle = async (req, res) => {
    try {
        const {role} = req.body;
        if(role !== "owner") {
            return
            res.status(403).json({message: "Only owners can add vehicles"});
        }

        const { error } = await supabase.from("vehicles")
        .insert([req.body]);

        if (error) throw error;

        res.status(201).json({message: "Vehicle added successfully"});
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

export const assignDriver = async (req, res) => {
    try {
        const { driver_id } = req.body;
        const { err } = await supabase.from("vehicles")
        .update({ driver_id})
        .eq("id", req.params.vehicleId);

        if (error) throw error;

        res.josn({message: "Driver assigned successfully"});
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

export const getVehicle = async (req, res) => {
    const { data, error } = await supabase.from("vehicles")
    .select("*")
    .eq("id", req.params.vehicleId)
    .single();
    
    if (error) retrun 
    res.status(404).json ({error: error.message});

    res.json(data);
};