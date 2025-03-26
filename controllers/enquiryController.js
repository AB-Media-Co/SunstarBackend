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
    // MongoDB mein enquiry save karte hain
    const newEnquiry = await Enquiry.create(enquiryData);

    // Frontend se gid lene ke liye:
    // Expect kar rahe hain ki req.body.gid mein ya to ek single number ya multiple gid ke array ho.
    let sheetGIDs = [];
    if (enquiryData.gid) {
      sheetGIDs = Array.isArray(enquiryData.gid)
        ? enquiryData.gid
        : [enquiryData.gid];
    } else {
      // Agar gid na diya ho to default gid 0 set kar sakte hain.
      sheetGIDs = [0];
    }

    // Google Sheets ke liye data prepare karte hain
    const spreadsheetId = '1LToDgMZmJO_gcp2LrUj3nD1BDfrVYRb9skuQyxV5ipQ';
    // Split submittedAt into date and time
    const submittedDate = newEnquiry.submittedAt.toLocaleDateString('en-IN');
    const submittedTime = newEnquiry.submittedAt.toLocaleTimeString('en-IN');

    const values = [[
      enquiryData.page,
      enquiryData.companyName,
      enquiryData.email,
      enquiryData.address,
      enquiryData.decisionMaker,
      enquiryData.phone,
      enquiryData.enquiry,
      submittedDate,
      submittedTime,
    ]];

    // Spreadsheet metadata se sheet titles nikalne ke liye
    const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
    const sheetsMetadata = spreadsheet.data.sheets;

    // Har provided gid ke liye loop chala kar corresponding sheet mein data append karte hain
    for (const gid of sheetGIDs) {
      // Ensure gid is a number if needed
      const sheetMeta = sheetsMetadata.find(
        (sheet) => sheet.properties.sheetId === Number(gid)
      );
      if (sheetMeta) {
        const sheetTitle = sheetMeta.properties.title;
        const range = `${sheetTitle}!A:G`;
        await sheets.spreadsheets.values.append({
          spreadsheetId,
          range,
          valueInputOption: "USER_ENTERED",
          requestBody: { values },
        });
      } else {
        console.warn(`Sheet with gid ${gid} not found`);
      }
    }

    res.status(200).json({ message: "Enquiry submitted successfully!" });
  } catch (error) {
    console.error("Error in submitEnquiry:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};



export const submitHotelData = async (req, res) => {
  try {
    const bookingData = req.body;
    // Prepare rows: one row per selected room
    const rows = bookingData.selectedRooms.map(room => [
      bookingData.hotelCode,
      bookingData.Hoteldata,
      bookingData.checkIn,
      bookingData.checkOut,
      room.roomName,
      room.option,
      room.price,
      room.RoomTypeID,
      room.RateTypeID,
    ]);

    // Google Sheets configuration
    const spreadsheetId = '1LToDgMZmJO_gcp2LrUj3nD1BDfrVYRb9skuQyxV5ipQ';
    const targetGid = 1645243460;

    // Fetch the spreadsheet metadata to retrieve sheet titles
    const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
    const sheetsMetadata = spreadsheet.data.sheets;
    
    // Find the sheet with the given gid
    const sheetMeta = sheetsMetadata.find(
      (sheet) => sheet.properties.sheetId === Number(targetGid)
    );
    if (!sheetMeta) {
      console.warn(`Sheet with gid ${targetGid} not found`);
      return res.status(400).json({ message: `Sheet with gid ${targetGid} not found` });
    }
    
    const sheetTitle = sheetMeta.properties.title;
    // Define a range that covers 9 columns (A to I) as we have 9 fields
    const range = `${sheetTitle}!A:I`;

    // Append the prepared rows to the target sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: rows },
    });

    res.status(200).json({ message: "Hotel data submitted successfully!" });
  } catch (error) {
    console.error("Error in submitHotelData:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};