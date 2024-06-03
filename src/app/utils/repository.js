const findOneById = async (Schema, id) => {
    try {
        const result = await Schema.findOneById({ _id: id });
        return result;
    } catch (error) {
        next(error);
    }
};
