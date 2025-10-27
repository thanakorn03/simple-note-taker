// เรียกใช้ library ที่จำเป็น
const knex = require('knex')({
    // ระบุว่าเราจะใช้ฐานข้อมูลประเภท sqlite3
    client: 'sqlite3',
    // ระบุตำแหน่งและชื่อไฟล์ของฐานข้อมูล
    connection: {
        filename: './data/notes.db',
    },
    // ตั้งค่าพื้นฐานเพื่อให้ทำงานกับ SQLite ได้ราบรื่น
    useNullAsDefault: true,
});

// สร้างฟังก์ชันสำหรับตั้งค่าฐานข้อมูล (สร้างตาราง)
async function setupDatabase() {
    try {
        // ตรวจสอบว่ามีตารางชื่อ 'notes' อยู่แล้วหรือยัง
        const tableExists = await knex.schema.hasTable('notes');

        // ถ้ายังไม่มีตาราง 'notes'
        if (!tableExists) {
            console.log("Creating 'notes' table...");
            // สร้างตาราง 'notes' พร้อมคอลัมน์ต่างๆ
            await knex.schema.createTable('notes', (table) => {
                table.increments('id').primary(); // คอลัมน์ id (รันเลขอัตโนมัติ)
                table.string('title'); // คอลัมน์ title สำหรับหัวข้อ
                table.text('content').notNullable(); // คอลัมน์ content สำหรับเนื้อหา (ห้ามว่าง)
                table.timestamp('createdAt').defaultTo(knex.fn.now()); // คอลัมน์ createdAt (เก็บเวลาที่สร้าง)
            });
            console.log("'notes' table created successfully.");
        } else {
            // ถ้ามีตารางอยู่แล้ว
            console.log("'notes' table already exists.");
        }
    } catch (error) {
        // หากเกิดข้อผิดพลาดในการตั้งค่าฐานข้อมูล
        console.error("Error setting up the database:", error);
    }
}

// Export ตัวแปร knex และฟังก์ชัน setupDatabase ออกไปให้ไฟล์อื่นเรียกใช้
module.exports = { knex, setupDatabase };