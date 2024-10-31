import Feedback from "../models/Feedback.js";
import Support from "../models/Support.js";

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

const supportMessage = async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const support = new Support({
      name,
      email,
      message,
    });
    await support.save();
    console.log("Done");
    res.status(200).send({ message: "Support message added successfully" });
  } catch (error) {
    res.status(400).send({ message: "Error adding support message", error });
  }
};
export { sendFeedbacks, addFeedback, sendOneFeedback, supportMessage };
