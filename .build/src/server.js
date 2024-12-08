const express = require('express');
const path = require('path');  // Đảm bảo thêm dòng này để sử dụng module path
const app = express();

// Cấu hình để phục vụ các file tĩnh từ thư mục dist/shopapp-angular/browser
app.use(express.static(path.join(__dirname, 'dist', 'shopapp-angular', 'browser')));

// Đảm bảo mọi route không phải là file tĩnh đều quay lại index.html
app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'shopapp-angular', 'browser', 'index.html'));
});

// Lắng nghe trên cổng được Render cung cấp
const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
