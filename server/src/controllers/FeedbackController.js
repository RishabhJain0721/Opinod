import Feedback from "../models/Feedback.js";

const sendFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().lean();
    res.status(200).send(feedbacks);
  } catch (error) {
    res.status(400).send({ message: "Error fetching feedbacks", error });
  }
};

const addFeedback = async (req, res) => {
  const { feedbackText, username } = req.body;

  try {
    const feedback = new Feedback({
      text: feedbackText,
      username: username,
    });

    await feedback.save();
    res.status(200).send({ message: "Feedback added successfully" });
  } catch (error) {
    res.status(400).send({ message: "Error adding feedback", error });
  }
};

const sendOneFeedback = async (req, res) => {
  const { id } = req.body;
  try {
    const feedback = await Feedback.findById(id).lean();
    res.status(200).send(feedback);
  } catch (error) {
    res.status(400).send({ message: "Error fetching feedback", error });
  }
};

export { sendFeedbacks, addFeedback, sendOneFeedback };
