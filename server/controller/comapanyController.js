import Company from "../models/Company.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";

export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;
  const imageFile = req.file;

  console.log("📦 BODY:", req.body);
  console.log("🖼️ FILE:", req.file);

  if (!name || !email || !password || !imageFile) {
    return res.json({ success: false, message: "Барлық өрістер толтырылуы керек" });
  }

  try {
    const companyExists = await Company.findOne({ email });

    if (companyExists) {
      return res.json({ success: false, message: "Мұндай компания тіркелген" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path);

    const company = await Company.create({
      name,
      email,
      password: hashedPassword,
      image: imageUpload.secure_url,
    });

    res.json({
      success: true,
      message: "Компания сәтті тіркелді",
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    console.error("❌ Компанияны тіркеу қатесі:", error);
    res.json({ success: false, message: "Сервер қатесі: " + error.message });
  }
};

export const loginCompany = async (req, res) => {
  const { email, password } = req.body;

  try {
    const company = await Company.findOne({ email });

    if (company && (await bcrypt.compare(password, company.password))) {
      res.json({
        success: true,
        message: "Кіру сәтті аяқталды",
        company: {
          _id: company._id,
          name: company.name,
          email: company.email,
          image: company.image,
        },
        token: generateToken(company._id),
      });
    } else {
      res.json({
        success: false,
        message: "Электрондық пошта немесе құпиясөз қате",
      });
    }
  } catch (error) {
    res.json({ success: false, message: "Сервер қатесі: " + error.message });
  }
};

export const getCompanyData = async (req, res) => {
  const company = req.company;

  try {
    res.json({ success: true, company });
  } catch (error) {
    res.json({
      success: false,
      message: "Компания деректерін алу қатесі",
    });
  }
};

export const postJob = async (req, res) => {
  const { title, description, location, salary, level, category } = req.body;
  const companyId = req.company._id;

  try {
    const newJob = new Job({
      title,
      description,
      location,
      salary,
      companyId,
      date: Date.now(),
      level,
      category,
      visible: true, 
    });

    await newJob.save();

    res.json({ success: true, message: "Жұмыс сәтті жарияланды", newJob });
  } catch (error) {
    res.json({ success: false, message: "Сервер қатесі: " + error.message });
  }
};

export const getCompanyJobApplicants = async (req, res) => {
  try {
    const companyId = req.company._id;

    const applications = await JobApplication.find({ companyId })
      .populate("userId", "name image email resume")
      .populate("jobId", "title location category level salary")
      .exec();

    return res.json({ success: true, applications });
  } catch (error) {
    res.json({ success: false, message: "Өтініштерді алу қатесі: " + error.message });
  }
};

export const getCompanyPostedJobs = async (req, res) => {
  try {
    const companyId = req.company._id;

    const jobs = await Job.find({ companyId });

    const jobsData = await Promise.all(
      jobs.map(async (job) => {
        const applicants = await JobApplication.find({ jobId: job._id });
        return { ...job.toObject(), applicants: applicants.length };
      })
    );

    res.json({ success: true, jobsData });
  } catch (error) {
    console.error("Қате:", error);
    res.json({ success: false, message: "Жарияланған жұмыстарды алу қатесі: " + error.message });
  }
};

export const ChangeJobApplicationStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    await JobApplication.findOneAndUpdate({ _id: id }, { status });

    res.json({ success: true, message: "Күйі өзгертілді" });
  } catch (error) {
    res.json({ success: false, message: "Қате: " + error.message });
  }
};

export const changeVisiblity = async (req, res) => {
  try {
    const { id } = req.body;
    const companyID = req.company._id;

    const job = await Job.findById(id);

    if (companyID.toString() === job.companyId.toString()) {
      job.visible = !job.visible;
    }
    await job.save();
    res.json({ success: true, message: "Көріну күйі өзгертілді", job });
  } catch (error) {
    res.json({ success: false, message: "Қате: " + error.message });
  }
};
