const Module = require("../models/moduleModel");
const Course = require("../models/courseModel");
const fs = require("fs");
//create new module
exports.addModule = async (req, res) => {
  try {
    //validate if user is teacher
    if (req.user.role !== "teacher") {
      return res
        .status(403)
        .json({ sucess: false, message: "The user is not a teacher" });
    }

    //add module
    const courseId = req.params.id;
    const existingCourse = await Course.findOne({ _id: courseId });
    if (!existingCourse) {
      res.status(404);
      throw new Error("Course not found");
    }
    const { title, description } = req.body;
    if (!title || !description) throw new Error("All fields are required");
    const newModule = await Module.create({
      title: title,
      description: description,
    });

    //add this module id to course modules array
    const course = await Course.findOneAndUpdate(
      { _id: courseId },
      { $push: { modules: newModule._id } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Module created",
      module: newModule,
      course: course,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//get the module
exports.getModule = async (req, res) => {
  try {
    const moduleId = req.params.moduleId;
    console.log(moduleId);
    const module = await Module.findOne({ _id: moduleId });
    console.log(module);
    res.status(201).json({ sucess: true, module: module });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

//delete a module
exports.deleteModule = async (req, res) => {
  try {
    //validate if user is teacher
    if (req.user.role !== "teacher") {
      return res
        .status(403)
        .json({ sucess: false, message: "The user is not a teacher" });
    }

    const moduleId = req.params.moduleId;
    const courseId = req.params.courseId;
    const deletedModule = await Module.findOneAndDelete({ _id: moduleId });

    //check if module exist
    if (!deletedModule) {
      return res
        .status(404)
        .json({ success: false, message: "Module not found " });
    }

    //pop the module from the course
    await Course.findOneAndUpdate(
      { _id: courseId },
      {
        $pull: { modules: moduleId },
      }
    );

    //send the response
    res.status(200).json({
      success: true,
      message: "Module deleted",
      deletedModule: deletedModule,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: "fail", message: error.message, error: error });
  }
};

//update a module
exports.updateModule = async (req, res) => {
  try {
    //validate if user is teacher
    if (req.user.role !== "teacher") {
      return res
        .status(403)
        .json({ sucess: false, message: "The user is not a teacher" });
    }

    const courseId = req.params.courseId;
    const moduleId = req.body.id;

    //find the targeted course
    const existingCourse = await Course.findOne({ _id: courseId }).populate(
      "modules"
    );

    //check if course exist
    if (!existingCourse) {
      return res.status(404).send("course not found");
    }

    //find the existing module
    const existingModule = existingCourse.modules.find((m) =>
      m._id.equals(moduleId)
    );

    //check if module exist
    if (!existingModule) {
      return res.status(404).send("module not found");
    }

    //new module details
    let updatedModule = {
      title: req.body.title || existingModule.title,
      description: req.body.description || existingModule.description,
      lectures: existingModule.lectures,
    };

    //update the module
    const newModule = await Module.findOneAndUpdate(
      { _id: moduleId },
      updatedModule,
      { new: true }
    );

    //send response
    res.status(201).json({
      success: true,
      message: "Module details updated!!",
      module: newModule,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.uploadLecture = async (req, res) => {
  try {
    const moduleId = req.params.moduleId;
    // console.log(moduleId);
    const file = req.file;
    // console.log(req.body);
    // console.log(file);
    const lecture = {
      title: req.body.title,
      description: req.body.description || " ",
      videoUrl: `${file.path}`,
      duration: parseInt(req.body.duration),
    };

    const newModule = await Module.findOneAndUpdate(
      { _id: moduleId },
      { $push: { lectures: lecture } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "New lecture has been uploaded",
      module: newModule,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: "fail", message: error.message, error: error });
  }
};

exports.deleteLecture = async (req, res) => {
  try {
    //validate if user is teacher
    if (req.user.role !== "teacher") {
      return res
        .status(403)
        .json({ sucess: false, message: "The user is not a teacher" });
    }

    const moduleId = req.params.moduleId;
    const lectureId = req.params.lectureId;

    //find the existing module and delete the lecture
    const existingModule = await Module.findOneAndUpdate(
      { _id: moduleId },
      { $pull: { lectures: { _id: lectureId } } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Lecture has been deleted successfuly!",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ sucess: false, message: "Failed to delete lecture" });
  }
};

exports.editLecture = async (req, res) => {
  try {
    //validate if user is teacher
    if (req.user.role !== "teacher") {
      return res
        .status(403)
        .json({ sucess: false, message: "The user is not a teacher" });
    }

    const moduleId = req.params.moduleId;
    const lectureId = req.params.lectureId;

    //find the existing module
    const existingModule = await Module.findOne({ _id: moduleId });

    //check if module exist
    if (!existingModule) {
      return res.status(404).send("module not found");
    }

    const lecture = existingModule.lectures.find((lecture) =>
      lecture._id.equals(lectureId)
    );
    lecture.title = req.body.title;
    lecture.description = req.body.description;
    lecture.duration = req.body.duration;
    const file = req.file;
    if (file) {
      console.log(file);
      lecture.videoUrl = `${file.path}`;
    }

    existingModule.save();
    res.status(201).json({
      success: true,
      message: "Lecture updated successfully!",
      lecture: lecture,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

exports.getLecture = async (req, res) => {
  try {
    const module = await Module.findOne({ _id: req.params.moduleId });
    const lecture = module.lectures.find((lecture) =>
      lecture._id.equals(req.params.lectureId)
    );

    const filePath = lecture.videoUrl;
    if (!filePath) {
      return res.status(404).send("File not found");
    }

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      const chunksize = end - start + 1;
      const file = fs.createReadStream(filePath, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(200, head);
      fs.createReadStream(filePath).pipe(res);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.commentLecture = async (req, res) => {
  try {
    const comment = req.body.comment;
    const moduleId = req.params.moduleId;

    const module = await Module.findOne({ _id: moduleId });

    const lecture = module.lectures.find(
      (lecture) => lecture.title === req.body.lectureTitle
    );

    //check if body has a question field
    //if it has a question field push the comment to replies
    if (!req.body.question) {
      lecture.QnA.push({
        question: { sender: req.user.userName, comment: comment },
      });
      await module.save();
      return res.status(201).json({ success: true, lecture: lecture });
    } else {
      let question = req.body.question;
      const qna = lecture.QnA.find((q) => q.question.comment == question);
      console.log(qna);
      qna.replies.push({ sender: req.user.userName, comment: comment });
      await module.save();
      console.log(qna);
      return res.status(201).json({ success: true, lecture: lecture });
    }

    /// yet to make
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error });
  }
};
