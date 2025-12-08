
import { google } from 'googleapis';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Constants
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const TARGET_GID = '1770338648'; // The specific tab ID provided
const SERVICE_ACCOUNT_FILE = path.join(__dirname, '../service-account.json');

// Initialize Auth
const auth = new google.auth.GoogleAuth({
    keyFile: SERVICE_ACCOUNT_FILE,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

/**
 * Finds the sheet title for a given GID
 */
async function getSheetNameByGid(gid) {
    try {
        const response = await sheets.spreadsheets.get({
            spreadsheetId: SPREADSHEET_ID,
        });

        const sheet = response.data.sheets.find(
            (s) => s.properties.sheetId.toString() === gid.toString()
        );

        return sheet ? sheet.properties.title : null;
    } catch (error) {
        console.error('Error fetching spreadsheet details:', error);
        return null;
    }
}

/**
 * Appends a user to the Google Sheet
 * @param {Object} user - The user object
 */
export const syncUserToSheet = async (user) => {
    try {
        if (!SPREADSHEET_ID) {
            console.error('SPREADSHEET_ID is missing in .env');
            return;
        }

        const sheetName = await getSheetNameByGid(TARGET_GID);
        if (!sheetName) {
            console.error(`Could not find sheet with GID: ${TARGET_GID}`);
            return;
        }

        const { email, firstName, lastName, phone, role, updatedAt } = user;
        const fullName = `${firstName || ''} ${lastName || ''}`.trim();
        const updatedStr = updatedAt ? new Date(updatedAt).toISOString() : new Date().toISOString();

        const values = [[
            email,
            fullName,
            phone || '',
            role || 'user',
            updatedStr
        ]];

        const range = `'${sheetName}'!A:E`; // Appends to cols A-E

        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: range,
            valueInputOption: 'USER_ENTERED',
            resource: {
                values,
            },
        });

        console.log(`Successfully synced user ${email} to sheet: ${sheetName}`);
    } catch (error) {
        console.error('Error syncing user to sheet:', error);
    }
};
