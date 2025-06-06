const express = require('express');
const cors = require('cors');
const sanBongRoutes = require('./routes/sanbong');


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/san-bong', sanBongRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
