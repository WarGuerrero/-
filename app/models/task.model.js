module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            title: String,
            description: String
        },
        { timestamps: true }
    );

    const Task = mongoose.model("task", schema);
    return Task;
};