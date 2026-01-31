export const notFound = (req, res) => {
    res.status(404).json({message: "This Request is not found"});
};