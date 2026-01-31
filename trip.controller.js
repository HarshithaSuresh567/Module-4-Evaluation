import { supabase } from "../config/supabase.js";

export const createTrip = async (req, res ) => {
    try {
        const { vehicle_id, passengers } = req.body;
        const { data: vehicle } = await supabase.from("vehicles")
        .select("*")
        .eq("id", vehicle_id)
        .single();

        if(!vehicle.isAvailable ) {
            return
            res.status(400).json({message: "Vehicle not available"});
        }
        if (passenegers > vehicle.allowed_passenegers) {
            return 
            res.status(400).json({message: "Passenger limit exceeded" });
        }
        await supabase
        .from("vehicles")
            .update({ isAvailable: false })
            .eq("id", vehicle_id);

            await supabase.from ("trips").insert([req.body]);

            res.status(201).json({message: "Trip created successfully"});
    } catch (err) {
        res.status(400).json({error: err.message});
    }
    };
    export const getTrip = async (req, res) => {
        const {data} = await supabase.from("trips")
        .select("*")
        .eq("id", req.params.tripId)
        .single();

        res.json(data);
    };

    export const updateTrip = aysnc (req, res) => {
        await supabase .from("trips")
        .update(req.body)
        .eq("id", req.params.tripId);
        res.json({message: "Trip updated successfully"});
    };

    export const deleteTrip = async (req, res) => {
        await supabase .from("trips")
        .delete()
        .eq("id", req.params.tripId);
        res.json({message: "Trip deleted successfully"});
    };

    export const endTrip = async (req, res) => {
        const { data: trip } = await supabase.from("trips")
        .select("*, vehicles(rate_per_km)")
        .eq("id", req.params.tripId)
        .single();

        const tripCost = trip.distance_km * trip.vehicles.rate_per_km;
        await supabase.from("trips")
        .update({isCompleted: true, tripCost})
        .eq("id", req.params.tripId);

        await supabase.from("vehicles")
        .update({isAvailable: true})
        .eq("id", trip.vehicle_id);

        res.json({message: "Trip ended successfully", tripCost });
    };

