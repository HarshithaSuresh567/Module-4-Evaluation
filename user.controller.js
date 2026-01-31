import {supabase} from "../config/supabase.js";

export const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if(!["customer", "owner", "driver"].includes(role)) {
            return 
            res.status(400).json({message: "Invalid role"});
        }
        const {error} = await supabase.from("users")
        .insert([{ name, email, password, role}]);

        if (error) throw error;

        res.status(201).json({message: "User registered successfully" });
       } catch (err) {
        res.status(400).json({error: exx.message });
       }
};