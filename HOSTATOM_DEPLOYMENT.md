# HostAtom WP Plus Deployment Notes

เอกสารนี้เป็นบริบทสำหรับ AI/นักพัฒนาที่ทำงานต่อใน repository นี้ โดยเฉพาะการ deploy ไปยัง HostAtom WordPress Hosting WP Plus

## Hosting constraint

HostAtom WP Plus ใช้เป็น static web hosting สำหรับชุดนี้ ห้ามสมมติว่า server มี Node.js, npm, Docker, PM2 หรือ process runner ให้ใช้งาน

ดังนั้นเว็บที่ deploy ต้องเป็น static files เท่านั้น:

- ไม่รัน `npm install` บน hosting
- ไม่รัน `npm run build` บน hosting
- ไม่รัน `npm run start` บน hosting
- ไม่ต้องใช้ Docker
- ห้ามนำ source root ไปตั้งเป็น Document Root แล้วคาดหวังให้ Node ทำงาน

## Production branch

ให้ทำงานที่ branch:

```text
drawihg
```

ปัจจุบัน branch นี้มี static deployment artifact อยู่ใน:

```text
public_html/
```

GitHub remote branch:

```text
origin/drawihg
```

อย่าพัฒนาต่อบน `main` แล้วลืม merge หรือ push ไป `drawihg`

## Build workflow

ทำ build บนเครื่องที่มี Node.js (ต้องใช้ Node.js >= 22.13.0):

```bash
npm ci
npm run build:wp
```

คำสั่ง `build:wp` ทำงานดังนี้:

1. รัน `vinext build`
2. ทำ static export จาก routes ทั้งหมด
3. คัดลอกผลลัพธ์ไปยัง `public_html/`
4. สร้าง `.htaccess` สำหรับ extensionless URLs

ต้องตรวจว่า build แสดงผลลักษณะนี้:

```text
Prerendered 6 routes (0 skipped)
Build complete
Prepared WP Plus files in public_html/
```

## Static routes

ไฟล์ production ที่ต้องมีใน `public_html/`:

```text
index.html
activities.html
en.html
th.html
zh.html
404.html
.htaccess
_next/
images/
```

`.htaccess` แปลง URL เหล่านี้:

```text
/             -> index.html
/activities   -> activities.html
/en           -> en.html
/th           -> th.html
/zh           -> zh.html
```

Document Root ของ domain ต้องชี้ไปที่:

```text
/path/to/repository/public_html
```

ถ้า webhook clone repository ไปยัง directory อื่น ให้เอาเฉพาะ contents ของ `public_html/` ไปไว้ใน Document Root ของ domain

## Webhook deployment

แนวทางปัจจุบันคือ build บนเครื่องพัฒนา แล้ว commit static artifact เข้า branch:

```bash
npm run build:wp
git add app next.config.ts package.json scripts public_html
git commit -m "build: update WP Plus static files"
git push origin drawihg
```

จากนั้น webhook/hosting ให้ pull branch `drawihg` พร้อม `public_html/`

`dist/` ถูก ignore ตามปกติ แต่ `public_html/` ต้องถูก commit เพราะ hosting ไม่มี npm สำหรับ build เอง

ห้าม commit:

```text
node_modules/
.env*
.git/
```

## Permissions on WP Plus

เว็บเป็น static site จึงไม่มี directory ที่ต้อง writable เป็นพิเศษ และไม่ต้องใช้ `777`

ค่าที่แนะนำ:

```text
Directories: 755
Files:       644
.htaccess:   644
```

ถ้าใช้ File Manager ให้ตั้ง permission แยกโฟลเดอร์กับไฟล์ อย่าตั้ง 775/755 แบบ recursive จนทำให้ไฟล์ทุกไฟล์ executable

## Verification checklist

หลัง deploy ให้ตรวจ:

```text
/
/en
/th
/zh
/activities
```

ทุก URL ต้องโหลดได้ และ assets ต้องไม่เป็น 404:

```text
/_next/static/...
/images/...
```

ถ้าเจอ 403 ให้ตรวจตามลำดับ:

1. Document Root ชี้ไปที่ `public_html/`
2. มี `public_html/index.html`
3. มี `public_html/.htaccess`
4. directory เป็น 755
5. file เป็น 644
6. owner เป็น user ของ hosting
7. ไม่มีการเปิด directory listing

ถ้าเจอ 404 ที่ `/en`, `/zh` หรือ `/activities` ให้ตรวจว่า `.htaccess` ถูกอัปโหลดและ Apache/hosting อนุญาต `mod_rewrite`

## Important vinext configuration

`next.config.ts` ต้องคงค่า static export:

```ts
const nextConfig: NextConfig = {
  output: "export",
};
```

อย่าเพิ่มสิ่งที่ต้องใช้ server เช่น:

- `getServerSideProps`
- API routes ที่ต้องรัน backend
- dynamic server data
- `force-dynamic`
- runtime database access

ถ้าเพิ่ม feature ที่ต้องมี backend ให้แจ้งก่อน เพราะ WP Plus static deployment ไม่รองรับ

## Tests before push

รันอย่างน้อย:

```bash
npm run build:wp
npm test
```

Expected:

```text
6 static routes prerendered
3 tests passed
```

`npm run lint` ใน repository เดิมมี lint errors ที่มาก่อนหน้านี้ใน source code หลายจุด จึงไม่ใช่ deployment gate ของ WP Plus ในตอนนี้ แต่ห้ามให้ build หรือ test ล้มเหลว

## Current deployment commit

เอกสารนี้ควรอัปเดตเมื่อมีการเปลี่ยน deployment workflow หรือข้อจำกัดของ HostAtom
