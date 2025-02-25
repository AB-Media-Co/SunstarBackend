import Enquiry from "../models/Enquiry.js";
import { google } from "googleapis";
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const keyFilePath = path.resolve(__dirname, '../service-account.json');

const auth = new google.auth.GoogleAuth({
  keyFile: keyFilePath,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

export const submitEnquiry = async (req, res) => {
  try {
    const enquiryData = req.body;
    // Save enquiry to MongoDB
    const newEnquiry = await Enquiry.create(enquiryData);

    // Prepare data for Google Sheets (adjust columns as needed)
    const spreadsheetId = '1LToDgMZmJO_gcp2LrUj3nD1BDfrVYRb9skuQyxV5ipQ';
    const values = [[
      enquiryData.companyName,
      enquiryData.email,
      enquiryData.address,
      enquiryData.decisionMaker,
      enquiryData.phone,
      enquiryData.enquiry,
      newEnquiry.submittedAt.toISOString(),
    ]];

    // Append data to the Google Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:G", // Adjust the range if needed
      valueInputOption: "USER_ENTERED",
      requestBody: { values },
    });

    res.status(200).json({ message: "Enquiry submitted successfully!" });
  } catch (error) {
    console.error("Error in submitEnquiry:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
