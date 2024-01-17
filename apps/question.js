import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const questionRouter = Router();

questionRouter.post("/", async (req, res) => {
  try {
    const collection = db.collection("Questions");
    const questionData = { ...req.body, create_at: new Date() };
    const newQuestionData = await collection.insertOne(questionData);
    return res.json({
      message: `Question Id ${newQuestionData.insertedId} has been created successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      message: `${error}`,
    });
  }
});

questionRouter.get("/", async (req, res) => {
  try {
    const collection = db.collection("Questions");
    const title = req.query.title;
    const category = req.query.category;
    const query = {};
    if (title) {
      query.title = new RegExp(title, "i");
    }
    if (category) {
      query.categories = new RegExp(category, "i");
    }
    const questions = await collection.find(query).limit(10).toArray();
    return res.json({
      data: questions,
    });
  } catch (error) {
    return res.status(500).json({
      message: `${error}`,
    });
  }
});

questionRouter.get("/:id", async (req, res) => {
  try {
    const collection = db.collection("Questions");
    const questionId = new ObjectId(req.params.id);
    const questionById = await collection.findOne({ _id: questionId });
    return res.json({
      data: questionById,
    });
  } catch (error) {
    return res.status(500).json({
      message: `${error}`,
    });
  }
});

questionRouter.put("/:id", async (req, res) => {
  try {
    const collection = db.collection("Questions");
    const questionId = new ObjectId(req.params.id);
    const newQuestionUpdate = { ...req.body, modified_at: new Date() };
    await collection.updateOne(
      {
        _id: questionId,
      },
      {
        $set: newQuestionUpdate,
      }
    );
    return res.json({
      message: `question ${questionId} has been updated successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      message: `${error}`,
    });
  }
});

questionRouter.delete("/:id", async (req, res) => {
  try {
    const collection = db.collection("Questions");
    const questionId = new ObjectId(req.params.id);
    await collection.deleteOne({ _id: questionId });
    return res.json({
      message: `question ${questionId} has been deleted successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      message: `${error}`,
    });
  }
});

export default questionRouter;
