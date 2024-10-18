const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer"); 

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    ); 
  },
});

const upload = multer({ storage: storage }); 


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "form.html"));
});


app.post("/submit-student", upload.single("photo"), (req, res) => {
  const {
    studentName,
    studentEmail,
    studentId,
    department,
    year,
    semester,
    cgpa,
    subjects,
    additionalComments,
  } = req.body;

  const photo = req.file;


  console.log(`Student Name: ${studentName}`);
  console.log(`Student Email: ${studentEmail}`);
  console.log(`Student ID: ${studentId}`);
  console.log(`Department: ${department}`);
  console.log(`Year: ${year}`);
  console.log(`Semester: ${semester}`);
  console.log(`CGPA: ${cgpa}`);
  console.log(`Subjects: ${subjects}`);
  console.log(`Additional Comments: ${additionalComments}`);

 
  if (photo) {
    console.log(`Uploaded Photo: ${photo.filename}`);
  } else {
    console.log("No photo uploaded.");
  }


  res.send(`
    <h2>Student Form Submitted Successfully!</h2>
    <p><strong>Student Name:</strong> ${studentName}</p>
    <p><strong>Student Email:</strong> ${studentEmail}</p>
    <p><strong>Student ID:</strong> ${studentId}</p>
    <p><strong>Department:</strong> ${department}</p>
    <p><strong>Year of Study:</strong> ${year}</p>
    <p><strong>Semester:</strong> ${semester}</p>
    <p><strong>CGPA:</strong> ${cgpa}</p>
    <p><strong>Subjects Enrolled:</strong> ${subjects}</p>
    <p><strong>Additional Comments:</strong> ${additionalComments}</p>
    <p><strong>Uploaded Photo:</strong> <img src="/uploads/${photo.filename}" alt="Student Photo" width="200"></p>
    <a href="/">Go back to the form</a>
  `);
});

app.use("/uploads", express.static("uploads")); 


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
