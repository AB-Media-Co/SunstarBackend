import { Enquiry, Bookings } from "../models/Enquiry.js";
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
    console.log("Incoming request body:", req.body);

    const enquiryData = req.body;
    const newEnquiry = await Enquiry.create(enquiryData);

    console.log("Enquiry saved to DB:", newEnquiry);


    let sheetGIDs = [];
    if (enquiryData.gid) {
      sheetGIDs = Array.isArray(enquiryData.gid)
        ? enquiryData.gid
        : [enquiryData.gid];
    } else {
      sheetGIDs = [0];
    }

    // Google Sheets ke liye data prepare karte hain
    const spreadsheetId = process.env.SPREADSHEET_ID;
    // Split submittedAt into date and time
    const submittedDate = newEnquiry.submittedAt.toLocaleDateString('en-IN');
    const submittedTime = newEnquiry.submittedAt.toLocaleTimeString('en-IN');
    const dateToUse = enquiryData.date || submittedDate;


    const values = [[
      enquiryData.page,
      enquiryData.name,
      enquiryData.email,
      enquiryData.phone,
      enquiryData.companyName,
      enquiryData.enquiry,
      dateToUse,
      submittedTime,
      enquiryData.address,
      enquiryData.decisionMaker,
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
    const {
      hotelCode,
      Hoteldata,
      checkIn,
      checkOut,
      userEmail,
      userPhone,
      selectedRooms = [],
    } = req.body;

    if (!userEmail || !userPhone || selectedRooms.length === 0) {
      return res.status(400).json({ message: "Email, phone and at least one room are required." });
    }

    // Append each selected room to Google Sheet
    const rows = selectedRooms.map((room) => [
      hotelCode,
      Hoteldata,
      checkIn,
      checkOut,
      room.roomName,
      room.option,
      room.price,
      room.RoomTypeID,
      room.RateTypeID,
      userEmail,
      userPhone,
    ]);

    // Google Sheets append
    const spreadsheetId = process.env.SPREADSHEET_ID;
    const targetGid = 1645243460;

    const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
    const sheetMeta = spreadsheet.data.sheets.find(
      (sheet) => sheet.properties.sheetId === Number(targetGid)
    );

    if (!sheetMeta) {
      return res.status(400).json({ message: `Sheet with gid ${targetGid} not found` });
    }

    const sheetTitle = sheetMeta.properties.title;
    const range = `${sheetTitle}!A:K`;

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: rows },
    });

    // Save to MongoDB
    const dbSavePromises = selectedRooms.map((room) =>
      new Bookings({
        hotelCode,
        Hoteldata,
        checkIn,
        checkOut,
        roomName: room.roomName,
        option: room.option,
        price: room.price,
        RoomTypeID: room.RoomTypeID,
        RateTypeID: room.RateTypeID,
        userEmail,
        userPhone,
        submittedAt: new Date(),
      }).save()
    );

    await Promise.all(dbSavePromises);

    res.status(200).json({ message: "Data saved to Google Sheet and Database successfully." });

  } catch (error) {
    console.error("Error in submitHotelData:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export const getUserHotelBookings = async (req, res) => {
  try {
    let { email, phone } = req.query;
    console.log("QUERY:", { email, phone });

    if (!email || !phone) {
      return res.status(400).json({ message: "Both email and phone number are required." });
    }

    // ✅ Normalize email and phone
    email = email.toLowerCase();
    phone = phone.replace(/[^0-9]/g, "").replace(/^91/, "");

    // ✅ Debug all bookings
    const all = await Bookings.find({});
    console.log("Stored:", all.map(b => ({ email: b.userEmail, phone: b.userPhone })));

    // ✅ Query with normalized data
    const bookings = await Bookings.find({
      userEmail: email,
      userPhone: phone
    }).sort({ submittedAt: -1 });

    if (!bookings.length) {
      return res.status(404).json({ message: "No bookings found for this user." });
    }

    res.status(200).json({ data: bookings });

  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

