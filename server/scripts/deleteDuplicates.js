const deleteDuplicates = async () => {
  const duplicates = await Post.aggregate([
    {
      $group: {
        _id: "$title",
        count: { $sum: 1 },
      },
    },
  ]);

  const titlesToDelete = duplicates
    .filter((doc) => doc.count > 1)
    .map((doc) => doc._id);

  for (let title of titlesToDelete) {
    const deleteResult = await Post.deleteOne({ title: title });
    console.log("Deleted: ", deleteResult);
  }
};
