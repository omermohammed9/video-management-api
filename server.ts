import app from './app';

import fs from 'fs';
import path from 'path';

const PORT = process.env.PORT || 5000;


const uploadsDir = path.join(__dirname, '../uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
