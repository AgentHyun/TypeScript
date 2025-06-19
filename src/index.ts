import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // CORS 허용
app.use(express.json()); // JSON 파싱

app.get("/", (_req, res) => {
  res.send("🌐 Hello from Express + TypeScript + .env + CORS!");
});

app.listen(PORT, () => {
  console.log(`✅ 서버가 http://localhost:${PORT} 에서 시작되었습니다`);
});
