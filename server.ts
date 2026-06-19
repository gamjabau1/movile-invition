import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

interface GuestMessage {
  id: string;
  name: string;
  content: string;
  password?: string;
  createdAt: string;
}

const app = express();
const PORT = 3000;
const DB_FILE = path.join(process.cwd(), "messages.json");

// JSON parsing middleware
app.use(express.json());

// Local File Persistence for Guest Messages
function loadMessages(): GuestMessage[] {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Failed to load messages:", error);
  }
  // Initialize with heartwarming wedding wishes
  return [
    {
      id: "1",
      name: "민수 & 지혜",
      content: "임지혁, 고은우! 결혼 축하해 🎉 오랜 기간 예쁘게 사랑을 키워오더니 드디어 가네! 두 사람이 그리는 앞날이 늘 빛나고 따뜻하길 바라.",
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
      id: "2",
      name: "가족 대표 김은영",
      content: "세상에서 가장 아름다운 두 사람의 소중한 날을 온 마음을 다해 축하합니다. 서로를 가득 품는 행복한 부부가 되기를 소망해요 ✨",
      createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    },
    {
      id: "3",
      name: "대학 동기 일동",
      content: "청첩장 디자인이 너무 예쁘다! 지혁이 진짜 장가 잘 가네 ㅎㅎ 신부님 최고! 예식날 다들 폼 나게 차려입고 축하해 주러 갈게!",
      createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    }
  ];
}

function saveMessages(messages: GuestMessage[]) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(messages, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to save messages:", error);
  }
}

let messages: GuestMessage[] = loadMessages();

// API: Get all guest messages (strip passwords for safety)
app.get("/api/messages", (req, res) => {
  const safeMessages = messages.map(({ password, ...rest }) => rest);
  res.json(safeMessages);
});

// API: Add a guest message
app.post("/api/messages", (req, res) => {
  const { name, content, password } = req.body;
  if (!name || !content) {
    return res.status(400).json({ error: "이름과 축하 메시지를 모두 입력해주세요." });
  }

  const newMessage: GuestMessage = {
    id: Date.now().toString(),
    name: name.slice(0, 50).trim(),
    content: content.slice(0, 500).trim(),
    password: password ? password.slice(0, 20) : undefined,
    createdAt: new Date().toISOString(),
  };

  messages.unshift(newMessage);
  saveMessages(messages);

  const { password: _, ...safeMessage } = newMessage;
  res.status(201).json(safeMessage);
});

// API: Delete a guest message
app.delete("/api/messages/:id", (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  const index = messages.findIndex((m) => m.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "메시지를 찾을 수 없습니다." });
  }

  const message = messages[index];
  if (message.password) {
    if (!password || message.password !== password) {
      return res.status(403).json({ error: "비밀번호가 올치하지 않습니다." });
    }
  }

  messages.splice(index, 1);
  saveMessages(messages);

  res.json({ success: true });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
