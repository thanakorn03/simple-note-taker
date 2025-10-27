const express = require('express');
const cors = require('cors');
const path = require('path');
const { setupDatabase } = require('./db');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

setupDatabase();

app.use('/api/notes', require('./routes/notes'));

// backend/server.js
if (process.env.NODE_ENV === 'production') {
    // สั่งให้ Express ให้บริการไฟล์ทั้งหมดในโฟลเดอร์ frontend/build
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    // ถ้ามี request เข้ามาที่ไม่ใช่ API ให้ส่งหน้าเว็บ React กลับไป
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));