const Session = require("../Models/Sessions");

const SessionStart = async (req, res) => {
  try {
    const {
      teacherId,
      branch,
      semester,
      subject,
      classNumber,
      duration,
      teacherLocation,
    } = req.body;

    if (
      !teacherId ||
      !branch ||
      !semester ||
      !subject ||
      !classNumber ||
      !duration ||
      !teacherLocation
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const session = new Session({
      teacherId,
      branch,
      semester,
      subject,
      classNumber,
      duration,
      teacherLocation,
      expiresAt: new Date(Date.now() + duration * 60000),
    });

    await session.save();
    res.status(201).json({
      success: true,
      sessionId: session._id,
      session: session,
      message: "Session started successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

module.exports = { SessionStart };
