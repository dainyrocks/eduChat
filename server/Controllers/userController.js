const User = require("../Models/User");
const mongoose = require("mongoose");

const sampleUsers = [
  {
    name: "John Doe",
    username: "johndoe",
    avatarUri: "https://randomuser.me/api/portraits/men/1.jpg",
    password: "hashedpassword1",
    passcode: "",
    branch: "CSE",
    semester: "3",
    enrollment: "0198CS223D06",
    posts: [
      {
        postCaption: "This is a sample post description.",
        postImageUri:
          "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        likes: 120,
        postTime: new Date("2025-01-01T10:00:00.000Z"),
      },
      {
        postCaption: "Another amazing sunset!",
        postImageUri:
          "https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-fall-waterfall-free-image.jpeg?w=600&quality=80",
        likes: 230,
        postTime: new Date("2025-01-02T12:15:00.000Z"),
      },
    ],
  },
  {
    name: "Jane Smith",
    username: "janesmith",
    avatarUri: "https://randomuser.me/api/portraits/women/1.jpg",
    password: "hashedpassword2",
    passcode: "",
    branch: "CSE",
    semester: "3",
    enrollment: "0198CS223D05",
    posts: [
      {
        postCaption: "Check out this cool video!",
        postVideoUri:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        likes: 450,
        postTime: new Date("2025-01-03T09:10:00.000Z"),
      },
      {
        postCaption: "Exploring the wilderness!",
        postImageUri:
          "https://images.pexels.com/photos/1461741/pexels-photo-1461741.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        likes: 320,
        postTime: new Date("2025-01-04T14:30:00.000Z"),
      },
    ],
  },
  {
    name: "Alice Johnson",
    username: "alicejohnson",
    avatarUri: "https://randomuser.me/api/portraits/women/2.jpg",
    password: "hashedpassword3",
    passcode: "",
    branch: "AIML",
    semester: "3",
    enrollment: "0198CS211097",
    posts: [
      {
        postCaption: "Beautiful sunset view from the beach.",
        postImageUri:
          "https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-fall-waterfall-free-image.jpeg?w=600&quality=80",
        likes: 190,
        postTime: new Date("2025-01-05T16:25:00.000Z"),
      },
      {
        postCaption: "A scenic mountain trail.",
        postImageUri:
          "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
        likes: 410,
        postTime: new Date("2025-01-06T11:50:00.000Z"),
      },
    ],
  },
  {
    name: "Robert Brown",
    username: "robertbrown",
    avatarUri: "https://randomuser.me/api/portraits/men/2.jpg",
    password: "hashedpassword4",
    passcode: "",
    branch: "AIML",
    semester: "3",
    enrollment: "0198CS211098",
    posts: [
      {
        postCaption: "A mesmerizing short film!",
        postVideoUri:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        likes: 670,
        postTime: new Date("2025-01-07T10:05:00.000Z"),
      },
      {
        postCaption: "A stunning cityscape!",
        postImageUri:
          "https://images.pexels.com/photos/3832829/pexels-photo-3832829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        likes: 540,
        postTime: new Date("2025-01-08T13:00:00.000Z"),
      },
    ],
  },
  {
    name: "Charlie Green",
    username: "charliegreen",
    avatarUri: "https://randomuser.me/api/portraits/men/3.jpg",
    password: "hashedpassword5",
    passcode: "",
    branch: "CSE",
    semester: "3",
    enrollment: "0198CS211099",
    posts: [
      {
        postCaption: "Admiring the beauty of nature.",
        postImageUri:
          "https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg",
        likes: 380,
        postTime: new Date("2025-01-09T09:00:00.000Z"),
      },
      {
        postCaption: "A beautiful day in the park.",
        postImageUri:
          "https://images.pexels.com/photos/4578826/pexels-photo-4578826.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        likes: 510,
        postTime: new Date("2025-01-10T15:30:00.000Z"),
      },
    ],
  },
];

const addSampleUsers = async (req, res) => {
  try {
    await User.insertMany(sampleUsers);
    res.status(201).json({ message: "Sample data added successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUsersWithPosts = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const singleUserData = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find user in the database
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user data
    res.status(200).json({ user, success: true });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const searchUser = async (req, res) => {
  const query = req.query.q?.toLowerCase();
  if (!query) {
    return res.status(400).json({ error: "Search query is required" });
  }
  try {
    const result = await User.find({
      $or: [
        {
          username: {
            $regex: query,
            $options: "i",
          },
        },
      ],
    });

    res.json(result);
  } catch (error) {
    console.error("Error searching profiles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const fetchDataBySemBranch = async (req, res) => {
  try {
    const { semester, branch } = req.body;
    const students = await User.find({ branch, semester }).select(
      "_id name enrollment"
    );
    if (students.length === 0) {
      return res.status(404).json({ message: "No matching records found" });
    }
    res.json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getUsersWithPosts,
  addSampleUsers,
  singleUserData,
  searchUser,
  fetchDataBySemBranch,
};
