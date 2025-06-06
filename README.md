**db:**
chuẩn bị file schema csdl và insert dữ liệu vào
=> qlsb.db

- mở cmd
- vào thư mục dự án: cd study-qlsb
- vào thư mục db chứa qlsb.db: cd db
- truy cập file qlsb.db bằng sqlite: sqlite3 qlsb.db
- thử kiểm tra các bảng: .table => hiện ra dsach các bảng trong csdl
- chuẩn bị file data với các câu lệnh insert dữ liệu: seed.sql
- thêm data vào qlsb.db: sqlite3 qlsb.db < seed.sql 

**be:**
- cài node.js,nodemon,express,cors,dotenv,sqlite
- thêm scripts: "dev": "nodemon src/server.js" để chạy tiện hơn

chạy lệnh: npm run dev
server chạy tại  http://localhost:3001

**fe**
- npx create-react-app fe
- cd fe
- mở bash và cài thêm j bạn muốn vd: axios...

chạy lệnh: npm start
server chạy tại  http://localhost:3000

- tạo file .gitignore để ko push file node_modules lên github
- nếu cài chay thì npm init -y